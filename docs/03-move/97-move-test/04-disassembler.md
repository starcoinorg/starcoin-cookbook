# Move VM, Bytecode, and Disassembler
There are times we wish to understand what's actually going on under the hood when we write a piece of code, 
compile it, and execute it in the move VM.

In this post, we will take a look at them.

## Move VM execution model
A Move Interpreter handles program execution at the bytecode level.

Just like other stack-based interpreters, when seeing an instruction, move interpreters
may consume operands from the stack and may push results to it. But unlike x86 machines,
where operands/variables share the same region with the call stack, Move VM logically separate
them apart: a Move interpreter has two parts -- An operand stack, and a call stack
(its internal structure is shown below).
```
Interpreter
├── operand Stack
│   ├── value[0]  <---- stack bottom
│   ├── value[1]
│   ├── ...
│   └── value[n]  <---- stack top
└── call stack
    ├── frame[0]                            <-- Call stack bottom
    │   ├── pc (program counter)
    │   ├── locals (an array of ValueImpl, contains local variables and paramters)
    │   ├── function (a runtime function)
    │   └── ty_args (type arguments)
    ├── frame[1]
    ├── ...
    └── frame[m]                            <-- Call stack top
```
Upon any procedural call, the caller prepares arguments (a.k.a, actual parameters) and pushes them
to the operand stack, then the `Call` instruction will result in the creation of a new frame
for the callee on top of the call stack, where formal parameters are copied from the stack.

We can understand most instructions' meaning from their name. Whenever you wonder the effect of
any instruction, refer to the `execute_code_impl()` in 
[interpreter.rs](https://github.com/starcoinorg/move/blob/main/language/move-vm/runtime/src/move_vm.rs)
for details.

## Move Disassembler
Most of the time, Move developers write code, test, and debug at the source level.
However, since bytecode is actually what the Move VM executes, in some rare conditions, 
we might need to inspect the corresponding bytecode of a particular module or function.

For instance, in Starcoin Framework, there's a function `owns()` in the `IdentiferNFT` module of
`NFT.move`. Its original implementation is:
```
public fun owns<NFTMeta: copy + store + drop, NFTBody: store>(owner: address): bool acquires IdentifierNFT {
    if (!exists<IdentifierNFT<NFTMeta, NFTBody>>(owner)) {
        return false
    };
    let id_nft = borrow_global<IdentifierNFT<NFTMeta, NFTBody>>(owner);
    Option::is_some(&id_nft.nft)
}
```
Some readers may have noticed that the logic of the form `if not X then false else Y` is
actually equivalent to `X and Y`. Therefore, it is tempting to simplify the function to this form
(let's call it the one-liner version):
```
public fun owns<NFTMeta: copy + store + drop, NFTBody: store>(owner: address): bool acquires IdentifierNFT {
    exists<IdentifierNFT<NFTMeta, NFTBody>>(owner)) && 
        Option::is_some(borrow_global<IdentifierNFT<NFTMeta, NFTBody>>(owner)&.nft)
}
```
But if we try to run the tests, we might notice that the gas fee for the one-liner consumption differs from
that of the original version. Why?

Now it's time to examine the bytecode.

First, let's check the bytecode of the original implementation.
To disassemble the module `IdentifierNFT`, run `mpm package disassemble --name IdentifierNFT`.
Here's is the result of the `owns` function:
```
public owns<NFTMeta: copy + drop + store, NFTBody: store>(id_nft: address): bool {
B0:
    0: CopyLoc[0](owner: address)
    1: ExistsGeneric[0](IdentifierNFT<NFTMeta, NFTBody>)
    2: Not
    3: BrTrue(5)
B1:
    4: Branch(7)
B2:
    5: LdFalse
    6: Ret
B3:
    7: CopyLoc[0](owner: address)
    8: ImmBorrowGlobalGeneric[0](IdentifierNFT<NFTMeta, NFTBody>)
    9: StLoc[1](id_nft: &IdentifierNFT<NFTMeta, NFTBody>)
    10: MoveLoc[1](id_nft: &IdentifierNFT<NFTMeta, NFTBody>)
    11: ImmBorrowFieldGeneric[0](IdentifierNFT.nft: Option<NFT<NFTMeta, NFTBody>>)
    12: Call[5](is_some<NFT<NFTMeta, NFTBody>>(&Option<NFT<NFTMeta, NFTBody>>): bool)
    13: Ret
}
```
Let's try to understand it using what we've learned earlier:
There are 4 [basic blocks](https://en.wikipedia.org/wiki/Basic_block) in the function.
In B0, it copied the `owner` address to the stack, and then use it to do the existence check,
followed by a negation, finally branches to B2 conditionally.

B2 simply pushes false and returns.

B1 is a dummy block that takes the control flow to B3. It does the global borrow from instruction
7-8 and store it in `id_nft` at instruction 9. Instruction 10 loads that to the stack again (yes, you
might have noticed that a simple peephole instruction can eliminate instructions 9-10. Currently Move
compiler doesn't really do much optimization). The last three instructions 11-13 return the result of the
predicate `is_some()` on field 0.

Now let's check the one-liner's bytecode out:
```
public owns<NFTMeta: copy + drop + store, NFTBody: store>(%#1: address): bool {
B0:
    0: CopyLoc[0](owner: address)
    1: ExistsGeneric[0](IdentifierNFT<NFTMeta, NFTBody>)
    2: BrTrue(4)
B1:
    3: Branch(10)
B2:
    4: CopyLoc[0](owner: address)
    5: ImmBorrowGlobalGeneric[0](IdentifierNFT<NFTMeta, NFTBody>)
    6: ImmBorrowFieldGeneric[0](IdentifierNFT.nft: Option<NFT<NFTMeta, NFTBody>>)
    7: Call[5](is_some<NFT<NFTMeta, NFTBody>>(&Option<NFT<NFTMeta, NFTBody>>): bool)
    8: StLoc[1](%#1: bool)
    9: Branch(12)
B3:
    10: LdFalse
    11: StLoc[1](%#1: bool)
B4:
    12: MoveLoc[1](%#1: bool)
    13: Ret
}
```
We won't elaborate on the details here again, since most of the instructions are the same.
We can notice a few differences:
1. There are more basic blocks in the one-liner version.
2. Results are no longer returned directly from the stack. Notice that the compiler generated an unnamed local variable `%#1`, any value to be returned gets stored into it, and finally B4
   returns it.
3. Redundant instructions 9-10 in the original bytecode no longer exists here, since the one-liner
   don't have a temporary variable `id_nft`.

Now we fully understand the behavioral difference caused by the refactoring.
