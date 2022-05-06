# 移动虚拟机、字节码和反汇编程序
当我们在编写一段 Move 代码、编译并在 Move 虚拟机中执行它时，
我们有时希望了解幕后实际发生的事情。

在这篇文章中，我们将看一下 Move 底层是如何工作的。

## 移动虚拟机执行模型
移动解释器在字节码级别处理程序执行。

就像其他基于堆栈的解释器一样，当看到一条指令时，移动解释器
可能会消耗堆栈中的操作数并将结果推送给它。但与 x86 机器不同的是，
在 x86 机器上，操作数/变量与调用堆栈共享同一区域，但 Move VM 逻辑上将两者分离
开来：Move 解释器有两部分——一个操作数栈和一个调用栈（其内部结构如下图）。

```
解释器(Interpreter)
├── 操作数栈(operand Stack)
│   ├── value[0]  <---- 栈底
│   ├── value[1]
│   ├── ...
│   └── value[n]  <---- 栈顶
└── 调用栈(call stack)
    ├── frame[0]                            <-- 调用栈底
    │   ├── pc (程序计数器)
    │   ├── locals (一组 ValueImpl，包含局部变量和实参)
    │   ├── function (运行时函数)
    │   └── ty_args (类型参数)
    ├── frame[1]
    ├── ...
    └── frame[m]                            <-- 调用栈顶
```

在任何程序调用中，调用者准备参数（也称为实际参数）并把它们压
到操作数栈，然后 `Call` 指令将在栈顶创建一个新帧(frame)，分配给
被调用给函数，其中形式参数是从堆栈中复制的。

我们可以从它们的名称中理解大多数指令的含义。每当你想知道任何指令的效果，参考 `execute_code_impl()`
[interpreter.rs](https://github.com/starcoinorg/move/blob/main/language/move-vm/runtime/src/move_vm.rs)
以了解详情。

## Move 反汇编器 (Disassembler)
大多数时候，Move 开发人员在源代码级别编写代码、测试和调试。
然而，由于字节码实际上是 Move VM 执行的内容，在一些罕见的情况下，
我们可能需要检查特定模块或函数的相应字节码。

例如，在 Starcoin Framework 的 `IdentiferNFT` 模块中有一个函数 `owns()`，在
`NFT.move` 当中。它的原始实现是：
```
public fun owns<NFTMeta: copy + store + drop, NFTBody: store>(owner: address): bool acquires IdentifierNFT {
    if (!exists<IdentifierNFT<NFTMeta, NFTBody>>(owner)) {
        return false
    };
    let id_nft = borrow_global<IdentifierNFT<NFTMeta, NFTBody>>(owner);
    Option::is_some(&id_nft.nft)
}
```


有些读者可能已经注意到，`if not X then false else Y`形式的逻辑是
实际上相当于`X and Y`。因此，很容易将函数简化为这种形式
（让我们称之为单行版本）：
```
public fun owns<NFTMeta: copy + store + drop, NFTBody: store>(owner: address): bool acquires IdentifierNFT {
    exists<IdentifierNFT<NFTMeta, NFTBody>>(owner)) && 
        Option::is_some(borrow_global<IdentifierNFT<NFTMeta, NFTBody>>(owner)&.nft)
}
```

但是如果我们尝试运行测试，我们可能会注意到单行版本消耗的 gas 费用与
原始版本不一样。为什么？

现在让我们来检查一下字节码。

首先，让我们检查原始实现的字节码。
要反汇编模块 `IdentifierNFT`，请运行 `mpm package disassemble --name IdentifierNFT`。
这是 `owns` 函数的结果：
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

让我们尝试使用我们之前学到的东西来理解它：
函数中有4个[基本块](https://en.wikipedia.org/wiki/Basic_block):B0、B1、B2、B3。
在 B0 中，它把 `owner` 地址复制到栈中，然后用它来做存在性检查，
然后是一个否定，最后条件跳转到 B2。

B2 只是简单地把值 false 压栈并返回。

B1 是一个没有实际意义的基本块，它只将控制流带到 B3。B3 从指令 7-8 中对地址 owner 进行全局借用，
指令 9 将其借用结果存储在 `id_nft` 中。指令 10 再次将其加载到堆栈中（是的，你
可能已经注意到一个简单的窥视孔指令优化可以消除指令 9-10。目前 Move
编译器并没有真正做太多优化）。最后三个指令 11-13 返回
字段 0 上的谓词 `is_some()`。

现在让我们检查一下单行版本的字节码：
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

此处不再赘述，因为大部分指令的意思都是一样的。
这里提一下值得注意的一些不同之处：
1. 单行版本的基础块更多。
2. 结果不再直接从堆栈返回。请注意，编译器生成了一个未命名的局部变量 `%#1`，任何要返回的值都存储在其中，
  最后是 B4 返回它。
3. 原始字节码中的冗余指令 9-10 在这里不再存在，因为单行版本没有临时变量`id_nft`。

现在我们完全理解了重构带来的行为差异。
