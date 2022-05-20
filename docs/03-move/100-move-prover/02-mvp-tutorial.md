# Verify Smart Contract: Move Prover Tutorials

## What is Move Prover

Formal verification is a technique that uses rigorous mathematical methods to describe the behavior and reason about the correctness of computer systems.
Now it has certain applications in the fields of operating systems, compilers and other fields that require high correctness.

Smart contracts deployed on the blockchain manipulate various digital assets, and their correctness is also critical.
**Move Prover (MVP)** is designed to prevent bugs in smart contracts written in the Move language.
Users can specify functional properties of smart contracts using the **Move Specification Language (MSL)**, and then use Move Prover to automatically and statically inspect them.

Simply put, there can be two components in a Move file:

- Part of it is program code, which is the part most of us are most familiar with. It is written in the Move programming language (sometimes just called the Move language). We use it to define data types, functions.

- The other part is the Formal specification. It is optional and written in the Move specification language. We use it to describe what properties a program code should satisfy. Such as describing the behavior of a function.

When we write the formal specification, after calling the Move Prover, it will verify whether the Move program meets these requirements according to the written specification, helping developers to find potential problems as early as possible in the development stage, and give other users confidence in the properties of the program that has been verified.

## Install Prover dependencies

Before using Move Prover, let's install some of its external dependencies.
It is assumed that you already have a copy of the [Starcoin](https://github.com/starcoinorg/starcoin) source code and have built the project.
We switch to the root directory of Starcoin and run the following command:

```bash
cd $PATH_TO_STARCOIN
./scripts/dev_setup.sh -ypt
source ~/.profile
```

When the above command is executed, enter `boogie /version`, if the output is similar to "Boogie program verifier version X.X.X", then the installation has been successful.

Note that currently Move Prover can only run under UNIX-based operating systems (such as Linux, macOS).
Windows users can run it by installing [WSL](https://docs.microsoft.com/en-us/windows/wsl/install).

## Prepare an example for verification

### Project creation

First, let's create a new empty Move package:

```bash
mpm package new BasicCoin
```

You can see that its directory structure is as follows:

```
BasicCoin
    |
    |---- Move.toml (text file)
    |
    `---- sources   (Directory)
```

### Module code

Now create `BasicCoin/sources/BasicCoin.move`.

<details>
<summary> BasicCoin.move content</summary>

```rust
/// This module defines a minimal and generic Coin and Balance.
module NamedAddr::BasicCoin {
    use StarcoinFramework::Errors;
    use StarcoinFramework::Signer;

    /// Error codes
    const ENOT_MODULE_OWNER: u64 = 0;
    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EALREADY_HAS_BALANCE: u64 = 2;

    struct Coin<phantom CoinType> has store {
        value: u64
    }

    struct Balance<phantom CoinType> has key {
        coin: Coin<CoinType>
    }

    /// Publish an empty balance resource under `account`'s address. This function must be called before
    /// minting or transferring to the account.
    public fun publish_balance<CoinType>(account: &signer) {
        let empty_coin = Coin<CoinType> { value: 0 };
        assert!(!exists<Balance<CoinType>>(Signer::address_of(account)), Errors::already_published(EALREADY_HAS_BALANCE));
        move_to(account, Balance<CoinType> { coin:  empty_coin });
    }

    /// Mint `amount` tokens to `mint_addr`. This method requires a witness with `CoinType` so that the
    /// module that owns `CoinType` can decide the minting policy.
    public fun mint<CoinType: drop>(mint_addr: address, amount: u64, _witness: CoinType) acquires Balance {
        // Deposit `total_value` amount of tokens to mint_addr's balance
        deposit(mint_addr, Coin<CoinType> { value: amount });
    }

    public fun balance_of<CoinType>(owner: address): u64 acquires Balance {
        borrow_global<Balance<CoinType>>(owner).coin.value
    }

    /// Transfers `amount` of tokens from `from` to `to`. This method requires a witness with `CoinType` so that the
    /// module that owns `CoinType` can  decide the transferring policy.
    public fun transfer<CoinType: drop>(from: &signer, to: address, amount: u64, _witness: CoinType) acquires Balance {
        let addr_from = Signer::address_of(from);
        let check = withdraw<CoinType>(addr_from, amount);
        deposit<CoinType>(to, check);
    }

    fun withdraw<CoinType>(addr: address, amount: u64) : Coin<CoinType> acquires Balance {
        let balance = balance_of<CoinType>(addr);
        assert!(balance >= amount, EINSUFFICIENT_BALANCE);
        let balance_ref = &mut borrow_global_mut<Balance<CoinType>>(addr).coin.value;
        *balance_ref = balance - amount;
        Coin<CoinType> { value: amount }
    }

    fun deposit<CoinType>(addr: address, check: Coin<CoinType>) acquires Balance{
        let balance = balance_of<CoinType>(addr);
        let balance_ref = &mut borrow_global_mut<Balance<CoinType>>(addr).coin.value;
        let Coin { value } = check;
        *balance_ref = balance + value;
    }
}
```

</details>

Here we assume that you have a certain grasp of the Move language, and can understand the source code of `BasicCoin.move` above and know the function of each part.

### TOML configuration

BasicCoin uses some facilities of the Starcoin standard library, and also needs to add `StarcoinFramework` to the dependencies.
At the same time, the named address is used in BasicCoin, and we also need to specify what numerical address it should be replaced with.
Therefore, we modify Move.toml as follows:

```toml
[package]
name = "BasicCoin"
version = "0.0.0"

[addresses]
NamedAddr = "0xcafe"

[dependencies]
StarcoinFramework = { git = "https://github.com/starcoinorg/starcoin-framework", rev="01c84198819310620f2417413c3c800df8292ae5" }
```

## The first verification code

To give us a first impression of the use of Move Prover, add the following code snippet to BasicCoin.move:

```rust
spec balance_of {
    pragma aborts_if_is_strict;
}
```

Syntactically, this code can be added anywhere in the BasicCoin module, but it is recommended to place it after the definition of the `balance_of` function in order to clearly see the correspondence between the definition and the specification when reading the code.

Simply put, the `spec balance_of {...}` block will contain our **property specification** for the `balance_of` function.
There are many types of property specifications, some common examples are:

- Will this function abort? Under what circumstances does it abort?
- What conditions must be met for the parameters to call this function?
- What is the return value of this function?
- After the function is executed, how will the state of the virtual machine be changed?
- What invariants does this function maintain?

For example, Move Prover allows all possible aborts by default when we don't give any abort conditions.
And in the simple snippet above, we tell Prover with the directive `aborts_if_is_strict`:

> I would like to strictly check the possibility of aborting this function. Report an error if there is any abort not listed by the programmer.

Now, we run the attestation command in the `BasicCoin` directory:

```bash
mpm package prove
```

mpm will call Move Prover to check the code in the package.
Then we can see the Prover reporting the following error message:

```
error: abort not covered by any of the `aborts_if` clauses
   ┌─ ./sources/BasicCoin.move:38:5
   │
35 │           borrow_global<Balance<CoinType>>(owner).coin.value
   │           ------------- abort happened here with execution failure
   ·
38 │ ╭     spec balance_of {
39 │ │       pragma aborts_if_is_strict;
40 │ │     }
   │ ╰─────^
   │
   =     at ./sources/BasicCoin.move:34: balance_of
   =         owner = 0x29
   =     at ./sources/BasicCoin.move:35: balance_of
   =         ABORTED

Error: exiting with verification errors
```

Prover's output tells us that it found a situation where the `balance_of` function aborts, but we don't explicitly point out the possibility of such aborts.
Looking at the code that triggers the abort, we can see that the exception is caused by calling the built-in `borrow_global` function when the `owner` does not own a resource of type `Balance<CoinType>`.
Following the guidance of the error message, we can add the following `aborts_if` condition:

```rust
spec balance_of {
    pragma aborts_if_is_strict;
    aborts_if !exists<Balance<CoinType>>(owner);
}
```

After adding this condition, try calling Prover again and see that there are no more validation errors.
Now we can confidently confirm that the `balance_of` function has one and only one possibility of abnormal termination, that is, the parameter `owner` does not own a resource of type `Balance<CoinType>`.

## Verify withdraw function

The signature of the function `withdraw` is as follows:

```rust
fun withdraw<CoinType>(addr: address, amount: u64) : Coin<CoinType> acquires Balance
```

Its role is to withdraw the `amount` of coins from the address `addr` and return it.

### Specify the abort condition for `widthdraw`

There are two possibilities for `withdraw` to abort:

1. No resource of type `Balance<CoinType>` in `addr`.
2. The balance in `addr` is less than `amount`.

From these, we can define the abort condition like this:

```rust
spec withdraw {
    let balance = global<Balance<CoinType>>(addr).coin.value;
    aborts_if !exists<Balance<CoinType>>(addr);
    aborts_if balance < amount;
}
```

- A spec block can contain let bindings, which bind a long expression with a name that can be used repeatedly.
`global<T>(addr): T` is a built-in function that returns a resource of type `T` at address `addr`.
Here, we set balance to the number of tokens owned by addr via the let binding;
- `exists<T>(address): bool` is a built-in function that returns true if resource `T` exists at address `addr`; otherwise returns false.

The two lines of `aborts_if` statements correspond to the two conditions mentioned above.
In general, if a function has multiple `aborts_if` conditions, the conditions are ORed together.

As mentioned earlier, if we don't specify any abort conditions, Prover will not impose any restrictions on aborts.
But once we give any kind of abort conditions, Prover defaults that we want to strictly check all possible aborts, so we need to list all possible conditions, which is equivalent to implicitly adding the instruction `pragma aborts_if_is_strict`.
If only some of the conditions for abnormal exit are listed, the Prover will report a validation error.
However, if the `pragma aborts_if_is_partial` is defined in the spec block, this is equivalent to telling the Prover:

> I just want to list some of the conditions that will cause an abort, please just verify that it will abort under those conditions.

If you are interested, you can do such a set of experiments to verify:

- When deleting any of the above two `aborts_if` conditions, Prover will report an error;
- When all `aborts_if` conditions are deleted at the same time, Prover will not report an error;
- When adding `pragma aborts_if_is_partial`, no matter how many `aborts_if` conditions are kept, Prover will not report an error (of course, the conditions themselves must be correct).

Some readers may be curious about the order of the three statements in the spec block:
Why the definition of balance can be written after `aborts_if !exists<Balance<CoinType>>(addr)`.
Because, if the latter holds true, `balance` does not actually exist.
Wouldn't this order cause the Prover to fail?
Simply put: no, the statements in the spec block are declarative and the order doesn't matter.

For a more detailed understanding, you can refer to the MSL documentation for more information.

### 指定 `withdraw` 的功能性质

接下来我们来定义功能性质。
下面 spec 块当中的两个 `ensures` 语句给出了我们对 `widthdraw` 功能上的期待：
```rust
spec withdraw {
    let balance = global<Balance<CoinType>>(addr).coin.value;
    aborts_if !exists<Balance<CoinType>>(addr);
    aborts_if balance < amount;

    let post balance_post = global<Balance<CoinType>>(addr).coin.value;
    ensures balance_post == balance - amount;
    ensures result == Coin<CoinType> { value: amount };
}
```
这段代码中，首先通过使用 let post 绑定，把 `balance_post` 定义为函数执行后 `addr` 的余额，它应该等于 `balance - amount`。
然后，`result` 是一个特殊的名字，表示返回值，它应该是金额为 `amount` 的代币。

## 验证 `deposit` 函数
函数 `deposit` 的签名如下：
```rust
fun deposit<CoinType>(addr: address, check: Coin<CoinType>) acquires Balance
```

它将 `check` 表示的代币资金存入到地址 `addr` 当中。它的规范定义如下:

```rust
spec deposit {
    let balance = global<Balance<CoinType>>(addr).coin.value;
    let check_value = check.value;

    aborts_if !exists<Balance<CoinType>>(addr);
    aborts_if balance + check_value > MAX_U64;

    let post balance_post = global<Balance<CoinType>>(addr).coin.value;
    ensures balance_post == balance + check_value;
}
```

这里将 `balance` 定义为函数执行前 `addr` 中的余额，将 `check_value` 定义为要存入的代币金额。它在下面两种情况下会异常中断：
1. `addr` 中没有类型为 `Balance<CoinType>` 的资源；
2. 或者 `balance` 和 `check_value` 之和大于 `u64` 类型的最大值。

`ensures` 语句用于让 Prover 确定在任何情况下，函数执行后 `addr` 中的余额都可以被正确地更新。

前面提到过的语法此处不再赘述。
敏锐的读者可能已经发现，有一点值得注意：表达式 `balance + check_value > MAX_U64` 在 Move 程序中是有问题的。
因为左边的加法会可能引起溢出的异常。
如果我们在 Move 程序中想写一个类似的检查，应该用类似 `balance > MAX_U64 - check_value` 的表达式来避开溢出的问题。

但是，这个表达式在 Move 规范语言（MSL）中却完全没问题。
由于 spec 块使用的是 MSL 语言，它的类型系统和 Move 不一样。
MSL 中，所有的整数都是 `num` 类型，它是数学意义上的整数。也就是说，它是有符号数，而且没有大小限制。
当在 MSL 中引用 Move 程序中的数据时，所有内置整数类型 （`u8`，`u64` 等）都会被自动转换成 `num` 类型。
在 MSL 文档中可以找到更详细的关于类型系统的说明。

## 验证 `transfer` 函数
函数 `transfer` 的签名如下：
```rust
public fun transfer<CoinType: drop>(from: &signer, to: address, amount: u64, _witness: CoinType) acquires Balance
```

它负责从账户 `from` 到地址 `to` 的转账，转账金额为 `amount`. 

我们先暂时忽略异常中止条件，只考虑它的功能性质，来试试将其验证规范写出来：
```rust
spec transfer {
    let addr_from = Signer::address_of(from);

    let balance_from = global<Balance<CoinType>>(addr_from).coin.value;
    let balance_to = global<Balance<CoinType>>(to).coin.value;
    let post balance_from_post = global<Balance<CoinType>>(addr_from).coin.value;
    let post balance_to_post = global<Balance<CoinType>>(to).coin.value;

    ensures balance_from_post == balance_from - amount;
    ensures balance_to_post == balance_to + amount;
}
```

这里的 `from` 是 `signer` 类型，而并非一个直接的地址。
虽然程序中我们有创建一个名为 `addr_from` 的局部变量，但在 spec 块中我们无法直接引用它。
同时，这个地址的表达式要重复好几次，反复书写很累赘，我们再次把它绑定到 `addr_from` 上面。
然后用 let 和 let post 定义几个变量，对应着函数执行前后 `addr_from` 和 `to` 两个地址内的余额。
最后用 `ensures` 语句告诉 Prover `from` 内的余额应该减去 `amount`；`to` 内的余额以应该增加 `amount`。

乍看之下，似乎完全没有问题。可是真的是这样吗？
我们来看看 Prover 是否认为这就是「对这个函数行为的正确描述」。
在输入 `mpm package prover` 后可以看到：
```
error: post-condition does not hold
   ┌─ ./sources/BasicCoin.move:58:9
   │
58 │         ensures balance_from_post == balance_from - amount;
   │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   │
   =     at ./sources/BasicCoin.move:45: transfer
   =     at ./sources/BasicCoin.move:51: transfer (spec)
   =     at ./sources/BasicCoin.move:53: transfer (spec)
   =     at ./sources/BasicCoin.move:54: transfer (spec)
   =     at ./sources/BasicCoin.move:45: transfer
   =         from = signer{0x0}
   =         to = 0x0
   =         amount = 1
   =         _witness = <generic>
```
令人有些出乎意料，Prover 提示了后置条件不满足，说明前面的 spec 块中的所描述的行为和 `transfer` 函数并不完全一致。
为什么会这样呢？我们再往下看：使得后置条件不满足的的参数是 `from = signer{0x0}` 和 `to = 0x0`.
看到这里我们应该清楚原因了：当账户向自己转账时，`to` 和 `from` 指向的地址都一样，所以余额不产生任何变化。

现在有两个解决方案：

**方案甲** 不修改函数定义，改变规范，在 spec 块中分情况考虑转账收发账户二者是否是同一地址两种情形：
```rust
let post eq_post = balance_to == balance_to_post;
let post ne_post = balance_from_post == balance_from - amount
                && balance_to_post   == balance_to   + amount;
ensures (addr_from == to && eq_post) || (addr_from != to && ne_post);
```
或者用另一种稍微直观些的 if 语法：
```rust
let post eq_post = balance_to == balance_to_post;
let post ne_post = balance_from_post == balance_from - amount
                && balance_to_post   == balance_to   + amount;
ensures if (addr_from == to) eq_post else ne_post;
```
注意这里的 `if (P) E1 else E2` 和程序逻辑中的条件执行不太相同——
它实际上是个语法糖，等价于同时 `ensures` 了 `P ==> E1` 和 `!P ==> E2`。
而 `p ==> q` 又实际上就是 `!p || q`.

也就是说，第二种写法的末尾实际上表示这样的逻辑：
```rust
ensures (addr_from == to  ===>  eq_post) && (addr_from != to  ===> ne_post);
```
即
```rust
ensures (addr_from != to || eq_post) && (addr_from == to  || ne_post);
```
有兴趣的读者可以通过直值表或化简到范式的方式自行验证一下，
前面的 `(addr_from == to && eq_post) || (addr_from != to && ne_post)`
和后面的 `(addr_from != to || eq_post) && (addr_from == to  || ne_post)` 
实际上也是完全等价的表达式。

**方案乙** 不修改 spec，直接在函数体内加上 `assert!(from_addr != to, EEQUAL_ADDR)`，
并在前面加上错误码 `EEQUAL_ADDR` 的定义，让自我转账交易无法完成。

显然，自己给自己转账并没有实际意义，不如直接禁止这种交易。
因此方案乙是更好的做法。它直接保证了成功执行时两者肯定不是同一地址，而且代码也更为简洁。

### 练习
目前我们只完成了 `transfer` 函数的功能性验证。但没有说明它会在哪些情况下异常中止。
作为练习，请给它加上合适的 `aborts_if` 条件。答案可以在后面章节中找到。TODO

## 验证 `mint` 函数
函数 `mint` 的签名如下：
```rust
public fun mint<CoinType: drop>(mint_addr: address, amount: u64, _witness: CoinType) acquires Balance
```
它负责铸造出金额为 `amount` 的代币，并存到地址 `mint_addr` 中。
比较有趣的是 `_witness`，其类型为 `CoinType`。
因为只有定义 `CoinType` 的模块才能构造出这个类型的值，这就保证了调用者身份。

`mint` 函数中实际上只有一句对 `deposit` 的调用。不难想到，它们俩的要满足的规范应该有很多的相似之处。 照猫画虎，不难写出:
```rust
spec mint {
    let balance = global<Balance<CoinType>>(mint_addr).coin.value;

    aborts_if !exists<Balance<CoinType>>(mint_addr);
    aborts_if balance + amount > MAX_U64;

    let post balance_post = global<Balance<CoinType>>(mint_addr).coin.value;
    ensures balance_post == balance + amount;
}
```

## 验证 `publish_balance` 函数

函数 `publish_balance` 的签名如下：
```rust
public fun publish_balance<CoinType>(account: &signer)
```
它在 `account` 下发布一个空的 `Balance<CoinType>` 类型的资源。因此如果资源已经存在时应当异常退出，而正常结束是余额应当是零：

```rust
spec publish_balance {
    let addr = Signer::address_of(account);
    aborts_if exists<Balance<CoinType>>(addr);

    ensures exists<Balance<CoinType>>(addr);
    let post balance_post = global<Balance<CoinType>>(addr).coin.value;
    ensures balance_post == 0;
}
```

## 使用 Schema 简化冗余规范
恭喜！到目前为止，我们已经一步一步完成了 BasicCoin 的全部函数的验证。
但是，如果仔细看代码的话，不少 spec 块看起来十分相似，如果能让它们精简一些的话，文件结构会更清晰。

Schema 是一种通过将属性分组来构建规范的手段。
从语义上讲，它们也是语法糖，在 spec 块中使用它们等价于将它们包含的条件展开到函数、结构或模块。

### 消除简单重复
作为一个最明显的例子，`mint` 和 `deposit` 的 spec 块除了变量名有点不一样
（用术语来说，它们是[可 alpha 转换](https://en.wikipedia.org/wiki/Lambda_calculus#%CE%B1-conversion)的），
整体结构可以说是完全一致。
为了简化它们，我们来创建一个 Schema:
```rust
spec schema DepositSchema<CoinType> {
    addr: address;
    amount: u64;

    let balance = global<Balance<CoinType>>(addr).coin.value;

    aborts_if !exists<Balance<CoinType>>(addr);
    aborts_if balance + amount > MAX_U64;

    let post balance_post = global<Balance<CoinType>>(addr).coin.value;
    ensures balance_post == balance + amount;
}
```
这个 Schema 声明了两个有类型的变量，以及一些关于这些变量应该满足的条件。
当其它地方想用这个 Schema 的时候，就要用 `include DepositSchema {addr: XX, amount: YY}` 来导入它。
其中 `XX` 和 `YY` 分是用来替代 `addr` 和 `amount` 的表达式。
如果表达式和对应的变量名正好一样，刚可以只写变量名，或者直接省略。

有了上面的 Schema 定义之后，我们现在可以简化之前的 spec 了：
```rust
spec mint {
  include DepositSchema<CoinType> {addr: mint_addr};
}
// ....
spec deposit {
    include DepositSchema<CoinType> {amount: check.value};
}
```

### Schema 组合
Schema 不仅可以消除上面这种几乎一样的重复，也可以组合起来，组成更为复杂的规范。

如果你按教程每一步进行了实验并完成了练习，现在你的 `tranfer` 函数的 spec 应该大概是这个样子：
```rust
// 初始版本
spec transfer {
    let addr_from = Signer::address_of(from);

    let balance_from = global<Balance<CoinType>>(addr_from).coin.value;
    let balance_to = global<Balance<CoinType>>(to).coin.value;
    let post balance_from_post = global<Balance<CoinType>>(addr_from).coin.value;
    let post balance_to_post = global<Balance<CoinType>>(to).coin.value;

    aborts_if !exists<Balance<CoinType>>(addr_from);
    aborts_if !exists<Balance<CoinType>>(to);
    aborts_if balance_from < amount;
    aborts_if balance_to + amount > MAX_U64;
    aborts_if addr_from == to;

    ensures balance_from_post == balance_from - amount;
    ensures balance_to_post == balance_to + amount;
}
```
它虽然相对复杂，但经过一点分析还是不难看出，实际上糅合了 `withdraw` 和 `deposit` 两种逻辑。
这一点从 `transfer` 的调用关系也可以分析出来。

在前面一步当中，我们已经有了 `DepositSchema`。
现在，我们把 `withdraw` 的验证规范重构一下：把它提取成一个 Schema，以及一个用到此 Schema 的 spec 块：
```rust
spec withdraw {
    include WithdrawSchema<CoinType>;
    ensures result == Coin<CoinType> { value: amount };
}

spec schema WithdrawSchema<CoinType> {
    addr: address;
    amount: u64;

    let balance = global<Balance<CoinType>>(addr).coin.value;
    aborts_if !exists<Balance<CoinType>>(addr);
    aborts_if balance < amount;

    let post balance_post = global<Balance<CoinType>>(addr).coin.value;
    ensures balance_post == balance - amount;
}
```
有了这两个 Schema，我们可以方便地改写 `transfer` 的验证规范了：
```rust
// 使用 Schema 重构后
spec transfer {
    let addr_from = Signer::address_of(from);

    include WithdrawSchema<CoinType> { addr: addr_from };
    include DepositSchema<CoinType> { addr: to };

    aborts_if addr_from == to;
}
```
怎么样？和初始版本对比起来，现在是不是简单清晰多了。

### 练习
除了上面的示例以外，再找一个 spec 块（例如 `publish_balance`），
将它也拆分成一个 Schema 声明和一个使用对应 Schema 的 spec 块。
作为一个练习，你创建的 Schema 可能在这份代码中无法利用，所以感觉看不出什么好处。
但如果在后面开发中，有别的函数调用 `publish_balance`，就会更方便了，
