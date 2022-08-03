# 快速开始

在这个教程中，我们将实现一个简单的计数器，来展示 Move 是如何通过代码来管理资源的。
这篇文档涉及的内容包括背景知识、写代码、如何编译、如何发布到链上、如何调用。
完整的代码仓库在[这里](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter)。

提前准备：

1. 需要按照[如何设置本地开发网络](../02-getting-started/02-setup/03-dev-network.md)搭建 *dev* 网络，并通过 Starcoin 控制台连接到 *dev* 网络。
2. 按照[账号管理](../02-getting-started/03-accounts/01-account-manage.md)创建一个账号或者使用已有账号，并且给账号里转一点 STC。
3. 通过[第一笔链上交易](../02-getting-started/03-accounts/02-first-transaction.md)对*交易*有基本的理解。

接下来将介绍一些必备工具和项目结构。

## mpm 命令行工具以及项目结构

在开始写代码之前，我们先安装 `mpm`（Move Package Manager）命令行工具，并且简单介绍一下 Move 项目的结构。

:::tip mpm 简介
`mpm` 是由 Starcoin 开发者在 `move-cli` 的基础上封装并集成了一些额外的功能，方便开发、测试、部署 Starcoin 智能合约。
:::

安装方法见[设置 Move 开发环境](./01-prepare-move-env.md).

现在，可以通过 `mpm` 创建一个新项目：

``` shell
$ mpm package new my-counter
```

可以看到生成的目录结构：

```
my-counter
├── Move.toml
└── sources
```

- *sources* - 存放 Move 模块（module）的目录。
- *Move.toml* - 清单（manifest）文件：定义包的元数据、依赖以及命名地址。

:::tip Move 模块
模块是定义**结构体类型**和操作结构体的**函数**的库。*（可以借助其他编程语言“类（class）”的概念来帮助理解）*。

模块会被发布到发布者的地址下，模块中的*入口方法（entry functions）*可以被大家调用执行。
*（可以借助函数计算平台 —— 如 AWS Lambda —— 上发布函数、调用函数来帮助理解）*
:::

由 *Move.toml* 文件和 *sources* 目录组成的项目，会被认为是一个 [Move 包（Move Package）](./03-move-language/01-packages.md)。

## 创建 MyCounter 模块

在 *sources* 目录下创建一个 *MyCounter.move* 文件用来存放模块的代码。

我们将要创建的模块命名为 `MyCounter`，在本文中，使用笔者本地 *dev* 网络的一个账户地址 `0xcada49d6a37864931afb639203501695` 来演示，我们会将 `MyCounter` 模块发布到这个地址上。

定义模块的语法：

```move
module <address>::<identifier> {
    // module body
}
```

### 第一版代码

在 `MyCounter` 模块中，我们定义一个结构体 `Counter`，包含有一个字段 `value`，代表这个计数器触发的次数。
`value` 的类型是 `u64`，也就是无符号64位整型。

下面是 `MyCounter` 模块的第一版代码：

```move title="my-counter/sources/MyCounter.move"
module 0xcada49d6a37864931afb639203501695::MyCounter {
    struct Counter {
        value: u64,
    }
}
```

我们可以使用 `mpm package build` 这条命令来构建我们的计数器程序。

```shell
$ mpm package build

BUILDING my-counter
```

可以看到，程序顺利通过了编译，接着往下走。

由于这个地址太长，可以在 *Move.toml* 文件中设置一个*命名地址（named address）*，它可以做到在 Move 项目中全局替换。

```toml title="my-counter/Move.toml" {5,6}
[package]
name = "my-counter"
version = "0.0.1"

[addresses]
MyCounterAddr = "0xcada49d6a37864931afb639203501695"
...
```

:::note 提示
高亮的代码块是有变化的或是需要注意的部分。
:::

这样，第一版代码可以写为：

```move title="my-counter/sources/MyCounter.move" {1}
module MyCounterAddr::MyCounter {
    struct Counter {
        value: u64,
    }
}
```

`MyCounterAddr` 是命名地址，`MyCounter` 是模块标识符。

接着我们编译代码：

```shell
$ mpm package build

BUILDING my-counter
```

没有报错，说明没有问题。

### 初始化方法 init

接着我们定一个初始化方法，用来创建一个 `Counter` 实例，并*“移动（move）”*到调用者账户的存储空间下。

```move title="my-counter/sources/MyCounter.move" {6-8}
module MyCounterAddr::MyCounter {
    struct Counter {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }
}
```

这里的 `move_to<T>(&signer, T)` 是一个内置方法，作用是将类型为 `T` 的资源添加到账户 `signer` 的地址下的存储空间（尖括号在这里表示泛型）。

:::info 更多信息
这里的存储空间是 `GlobalState`，可以先简单理解为存放账户的*资源*和*模块代码*的地方。
更多详细信息可以查阅[概念-状态](../99-concepts/04-state.md)。
:::

在第6行的 `init` 函数的参数 `account: &signer` 中的 `signer` 是 Move 的内置类型。
想要将资源放到调用者的账户地址下，需要将 `&signer` 参数传递给函数。
`&signer` 数据类型代表当前交易的发起者（函数的调用者，可以是任何账户）。

:::info 帮你理解 —— signer
`signer` 就像是 Linux 下的 *uid* 一样的东西。登陆 Linux 系统后，你输入的所有命令，都被认为是“这个已登陆的**经过认证**的用户”操作的。
关键来了，这个认证过程不是在运行的命令、程序中做的，而是开机后由操作系统完成的。

对应到 Move 中，这个认证过程就是和其他区块链系统类似的、我们熟知的“私钥签名，公钥验证”的过程。
在带有 `&signer` 参数的函数执行时，发起者的身份已经被 Starcoin 区块链认证过了。
:::

我们试着编译一下：

```shell
$ mpm package build

BUILDING my-counter
error[E05001]: ability constraint not satisfied
  ┌─ ./sources/MyCounter.move:7:6
  │
2 │     struct Counter {
  │            ------- To satisfy the constraint, the 'key' ability would need to be added here
  ·
7 │         move_to(account, Counter { value: 0 });
  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  │         │                │
  │         │                The type 'MyCounterAddr::MyCounter::Counter' does not have the ability 'key'
  │         Invalid call of 'move_to'
```

出错了！提示我们 “ability constraint not satisfied”，下面还有一句 “The type 'MyCounterAddr::MyCounter::Counter' does not have the ability 'key'”。
编译器告诉我们 `MyCounterAddr::MyCounter::Counter` 这个资源类型缺少 `key` *能力（ability）*，所以不能用 `move_to` 添加到账户地址下。

这里涉及到了 Move 的*能力*特性。

:::tip 概念 —— ability
Move语言是面向资源的语言，核心是资源的管理。
针对资源拥有什么“**能力**”，Move 编程语言抽象了资源的四个属性 —— 可复制（copy)、可索引（key）、可丢弃（drop）、可储存（store）。
通过这四个属性的不同组合，用户可以方便的定义出任何能力的资源。
比如用户可以通过 `key + copy + drop + store` 的组合定义出一个普通的信息类型，通过 `key + store` 的组合定义出一个资产类型 —— 例如 NFT —— 没有 `copy` 属性可以保证 NFT 不能被随意的复制，提升了安全性。

Move 提供的四种能力：

* copy：表示该值是否可以被复制
* drop：表示该值是否可以在作用域结束时可以被丢弃
* key：表示该值是否可以作为全局状态的键进行访问
* store：表示该值是否可以被存储到全局状态

通过给资源赋予不同的能力，Move 虚拟机可以从根本上保证「资源」只能*转移（move）*，至于能否拷贝、修改、丢弃，需要看资源的具体能力。
如果强行拷贝、修改或者丢弃，代码编译会出错，根本没有机会运行。

更多信息可以参考：[认识 Ability](./04-understanding-ability.md) 章节。
:::

一般来说我们认为，**有 `key` 能力的结构体，就是资源**。

我们修改代码，按照提示添加 `key` 能力。

```move title="my-counter/sources/MyCounter.move" {2}
module MyCounterAddr::MyCounter {
    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }
}
```

此时再次编译可以通过。

### 计数器加一的方法 incr

现在给 `Counter` 资源添加一个 `incr` 方法。

```move title="my-counter/sources/MyCounter.move" {3,13-16}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }
}
```

注意第3行我们引用了一个依赖 —— [StarcoinFramwork](https://github.com/starcoinorg/starcoin-framework) 可以认为是 Starcoin 的 Stdlib 标准库。
我们需要使用库中的 `Signer::address_of(&signer)` 方法来提取 `signer` 的地址。

为了添加依赖到项目中，修改 *Move.toml* 文件

```toml title="my-counter/Move.toml" {6,9-10}
[package]
name = "my-counter"
version = "0.0.1"

[addresses]
StarcoinFramework = "0x1"
MyCounterAddr = "0xcada49d6a37864931afb639203501695"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
```

第16行有个新方法 `borrow_global_mut`，和前文的 `move_to` 一样，都是操作账户地址的存储空间上资源的内置方法。

:::tip 加油站 —— 资源的操作方法
1. `move_to<T>(&signer, T)`：发布、添加类型为 `T` 的资源到 `signer` 的地址下。
2. `move_from<T>(address): T`：从地址下删除类型为 `T` 的资源并返回这个资源。
3. `borrow_global<T>(address): &T`：返回地址下类型为 `T` 的资源的*不可变引用（immutable reference）*。
4. `borrow_global_mut<T>(address): &mut T`：返回地址下类型为 `T` 的资源的*可变引用（mutable reference）*。
5. `exists<T>(address): bool`：判断地址下是否有类型为 `T` 的资源。

要使用这些方法，资源 `T` 必须定义在当前模块。
**这确保了资源只能被定义资源的模块所提供的 API 方法来操作**。
参数 `address` 和 `signer` 代表了类型为 `T` 的资源存储的地址。
:::

然后我们试着编译一下：

```
$ mpm package build
CACHED StarcoinFramework
BUILDING my-counter
error[E04020]: missing acquires annotation
   ┌─ ./sources/MyCounter.move:14:20
   │
14 │         let counter = borrow_global_mut<Counter>(Signer::address_of(account));
   │                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   │                       │                 │
   │                       │                 The call acquires 'MyCounterAddr::MyCounter::Counter', but the 'acquires' list for the current function does not contain this type. It must be present in the calling context's acquires list
   │                       Invalid call to borrow_global_mut.
```

哦！又出错了。
报错信息提示了我们第14行调用方法获取 `Counter` 结构时，类型（Counter 结构）必须出现在调用上下文的 `acquires` 列表中，而当前函数的 `acquires` 列表没有包含这个类型。

这里我们引入 *acquire* 的概念。

:::tip 概念
当一个函数用 `move_from()`、`borrow_global()`、`borrow_global_mut()` 访问资源时，函数必须要显示声明需要“**获取**”哪种资源。
这会被 Move 的类型系统确保对资源的引用是安全的、不存在悬空引用。
:::

修改后的代码如下：

```move title="my-counter/sources/MyCounter.move" {13}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }
}
```

现在可以编译通过了。

下面我们编写可以通过控制台直接调用执行的函数。

### 编写可调用的 script function

前面编写的 `public fun init` 和 `public fun incr` 函数是不能直接在控制台中调用执行的。需要使用*入口方法（entry function）*来调用。

目前在 Move 中，入口方法是通过 `script function` 来实现的，写作 `public(script) fun`。

这里引入了函数*可见性（visibility）*的概念，不同的可见性决定了函数可以从何处被调用。（下面的概念 `tip` 可以先跳过）

:::tip 概念——函数可见性
| 可见性            | 写做               | 说明                                                                                                                                                      |
|-------------------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| internal          | fun                | 也可以叫 private，只能在同一个模块内调用                                                                                                              |
| public            | public fun         | 可以被任一模块内的函数调用                                                                                                                            |
| **public script** | public(script) fun | script function 是模块中的入口方法，可以**通过控制台发起一个交易来调用**，就像本地执行脚本一样（不过代码已经被存在了链上的模块地址下）。 |
| public friend     | public(friend) fun | 可以被同一模块内调用，可以被加入到 `friend list` 的可信任模块调用                                                                                 |
:::

下面，我们编写对应 `init` 和 `incr` 函数的 *script function*。

```move title="my-counter/sources/MyCounter.move" {18-24}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key, store {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }

    public(script) fun init_counter(account: signer) {
        Self::init(&account);
    }

    public(script) fun incr_counter(account: signer) acquires Counter {
        Self::incr(&account);
    }
}
```

唯一需要说明的就是 `Self` 指代当前模块。

现在，我们将模块发布到链上，并尝试调用。

## 发布到链上并调用

### 发布到链上

运行 `mpm release` 命令：

```shell
$ mpm release

Packaging Modules:
         0xcada49d6a37864931afb639203501695::MyCounter
Release done: release/my-counter.v0.0.1.blob, package hash: 0x31b36a1cd0fd13e84034a02e9972f68f1c9b1cde1c9dfbe7ac69f32f6fc6dafa
```

它将打包编译模块，获得二进制包。

前文中我们准备了地址为 `0xcada49d6a37864931afb639203501695` 的账户，如果没有余额，可以通过 `dev get-coin` 命令获取一些测试币。
现在将编译好的模块部署到这个账户地址下。

```starcoin title="starcoin控制台" {1,3,5}
starcoin% account unlock 0xcada49d6a37864931afb639203501695 -p <MY-PASSWORD>

starcoin% dev deploy /path/to/my-counter/release/my-counter.v0.0.1.blob -s 0xcada49d6a37864931afb639203501695 -b

txn 0xf60662ba0ac3373c28f827a0ac9d9db6667c3921056905356aa5414b3bf3df09 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "7800",
      "status": "Executed",
      "write_set": [
        {
          "access_path": "0x00000000000000000000000000000001/1/0x00000000000000000000000000000001::TransactionFee::TransactionFee<0x00000000000000000000000000000001::STC::STC>",
          "action": "Value",
          "value": {
            "Resource": {
              "json": {
                "fee": {
                  "value": 292331
                }
              },
              "raw": "0xeb750400000000000000000000000000"
            }
          }
        },
...
```

`-s` 即 `--sender` 是发送者，`-b` 即 `--blocking`，阻塞等待命令执行完成。

第5行的 `txn 0xf60662... submitted` 表示计数器的智能合约已经成功部署到发布者的地址下，这属于一个链上交易，链已经把这个交易状态记录下来了。

此时我们可以查看代码在链上的存储，

```starcoin title="starcoin控制台" {1}
starcoin% state list code 0xcada49d6a37864931afb639203501695

{
  "ok": {
    "codes": {
      "MyCounter": {
        "abi": {
          "module_name": {
            "address": "0xcada49d6a37864931afb639203501695",
            "name": "MyCounter"
          },
          ...
}
```

可以看到 `0xcada49d6a37864931afb639203501695` 地址下只有 `MyCounter` 这一个合约代码。

:::note state 命令
`state` 命令是用来查看账户地址下的数据的。可以在控制台中输入 `state --help` 查看更多帮助。
:::

### 调用 init_counter 初始化资源

使用 `account execute-function` 命令来执行一个 script function。现在我们调用 `init_counter` 方法，将 `Counter` 资源初始化到调用者的地址下。

```starcoin title="starcoin控制台" {1}
starcoin% account execute-function --function 0xcada49d6a37864931afb639203501695::MyCounter::init_counter -s 0xcada49d6a37864931afb639203501695 -b

txn 0x032c0eda779157e0ef3949338c3b3e4e6528c7720776d02c2cb0ddd64804f1c2 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "11667",
      "status": "Executed",
      "write_set": [
...
}
```

`init_counter` 函数中，我们初始化了一个 *Counter 对象（资源）*，然后 `move_to` 到了调用者地址下。
让我们看看这个资源是否存在。使用 `state list resource <ADDRESS>` 命令查看给定地址下的资源列表。

```starcoin title="starcoin控制台" {1}
starcoin% state list resource 0xcada49d6a37864931afb639203501695

{
    ...（输出很多，我们观察最后一部分）
    "0xcada49d6a37864931afb639203501695::MyCounter::Counter": {
        "json": {
          "value": 0
        },
        "raw": "0x0000000000000000"
    }
}
```

可以看到地址 `0xcada49d6a37864931afb639203501695` 下有了 `0xcada49d6a37864931afb639203501695::MyCounter::Counter` 这个类型的资源，内容是 `"value": 0`。

可能有小伙伴会疑惑为什么 `Counter` 资源类型名要写这么长，下面先帮大家回忆一下 FQN 的概念。

:::tip 概念——完整名称 FQN
*Fully Qualified Name(FQN)* 是一种计算机术语，是在一个调用上下文中，对一个资源（对象、函数、域名、文件）名称的无歧义定义。举例来说：

1. Linux 的绝对路径名 `/path/to/file` 就是 *fully qualified file name*，相对的 `./to/file` 是一个相对路径地址。
2. 域名系统中，`google.com.` 是一个 *fully qualified domain name*，注意最后的 `.`。意味着这个域名不要继续被递归解析。

那么对应到 Move 语言中，资源类型是发布到某个地址下的，属于这个地址。
地址 `0x001` 可以创建一个 `Counter` 类型的资源，地址 `0x002` 也可以创建一个 `Counter` 类型的资源，要区分两个 `Counter`，就需要带上地址和模块名。

```
<address>::<module_identifier>::<structure>
```
:::

### 调用 incr_counter 递增计数器

下面调用另一个函数 `incr_counter` 尝试对计数器加一。

```starcoin title="starcoin控制台" {1}
starcoin% account execute-function --function 0xcada49d6a37864931afb639203501695::MyCounter::incr_counter -s 0xcada49d6a37864931afb639203501695 -b

txn 0x032c0eda779157e0ef3949338c3b3e4e6528c7720776d02c2cb0ddd64804f1c2 submitted.
...
```

再次查看资源，有了前面 FQN 的概念，这次我们换一个命令，用 `state get resource <ADDRESS> [RESOURCE_TYPE]` 查看 `ADDRESS` 下特定的资源类型。

```starcoin title="starcoin控制台" {1}
starcoin% state get resource 0xcada49d6a37864931afb639203501695 0xcada49d6a37864931afb639203501695::MyCounter::Counter

{
  "ok": {
    "json": {
      "value": 1
    },
    "raw": "0x0100000000000000"
  }
}
```

可以看到计数器的值 `value` 变为了 `1`。

### 另一个账号调用

前面的例子中，我们用了同一个地址 `0xcada49d6a37864931afb639203501695` 来发布模块、创建 Counter 资源类型（dev deploy），以及调用函数添加计数器（account execute-function）。

我们再换一个账号来初始化计数器和自增计数器。假设本地的一个账号为 `0x012ABC`。

```starcoin title="starcoin控制台"
starcoin% account execute-function -s 0x012ABC  --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::init_counter -b

starcoin% state get resource 0x012ABC 0xcada49d6a37864931afb639203501695::MyCounter::Counter
```

读者可以自行观察 `0x012ABC` 下资源的变化。


:::info 历史 —— script 和 script function
为了防止大家在别处看的教程中有 `script` 出现而搞迷惑，这里简单说一下历史由来。*这部分内容可以跳过*。

我们用 *Python* 的 `pip` 或者 *Node.js* 的 `npm` 来辅助理解。

在 `pip` 和 `npm` 这样的中心化包管理托管平台出现之前，我们想安装一个包，需要 `setup.py install /path/to/package`。
这样子当然不便于包的分发传播与索引。
后来有了 `pip` 我们是怎么做的呢，包作者先将自己的包打包上传到 `pip` 仓库，`pip` 会存储包并建立索引。
普通用户只需要 `pip install package_name` 即可。
`pip` 工具会根据你提供的 `package_name` 下载源码，然后执行安装。这两种安装包的方式其实是一样的。

现在对应到 Move 中。在 `script function` 出现之前是只有 `script` 的，`script` 写在与 `sources` 目录平级的 `scripts` 目录下。

`script` 就像是本地的 Python 包，`script` 可以被编译为字节码，要调用 `script` 时，需要创建一个交易，`payload` 中带上编译好的字节码，`script` 就可以被节点上的 Move 虚拟机执行了。对应在 Starcoin 控制台中是：

```
starcoin% account execute-script </path/to/mv_file>
```

`script function` 作为 `script` 的替代，[被添加到了 Move 语言中](https://github.com/move-language/move/commit/e0a3acb7d5e3f5dbc07ee76b47dd05229584d4d0)。
类比于保存在 `pip` 仓库中的软件包。`script function` 会在模块中一起发布到一个地址下（就像包作者把软件包发布在 `pip` 中一样）。
此时，要调用 `script`，需要创建一个交易，`payload` 中指向已经发布的代码的地址即可。对应到 Starcoin 控制台中是:

```
starcoin% account execute-function --function  <0x地址>::<模块>::<函数> --arg xxx
```

当然，Move 也是一门正在演进的语言，`public(script) fun` [正在被 `public entry` 取代](https://github.com/move-language/move/pull/186)，让我们拭目以待。

总结一下：

1. `script` 可能会被废弃，推荐用 `script function` 做入口方法。
2. 下个版本的 Move 会用 `public entry fun` 替代 `public(script) fun`
:::

## 何去何从

恭喜你，你已经完成了一个简单合约的编写、部署和调用的全流程。

完整的代码仓库在[这里](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter)。

接下来，
* 你可以通过 [Move 语言](./03-move-language/README.md)来系统地学习 Move 语言
* 查看[更多 Move 例子]
* 了解[如何 Debug/测试 Move module](./97-move-test/01-move-unit-test.md)
* 了解 [Starcoin Move Framework](./06-starcoin-framework/README.md)
* 可以通过 [Move 高级开发]学习高级 Move。
* 了解 [Move 规范语言 和 Move Prover](./100-move-prover/01-move-spec-language.md) 开发更安全的 Move 应用
* 探索 [Move 包管理器](./05-move-package-manager.md)的更多功能

或者，你可以直接进入 Dapp 的世界，
* [Web3 和 DApp 开发](../04-web3/README.md)
