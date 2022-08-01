# 如何部署智能合约

## 背景

在[快速开始](./02-quick-start.md)中，相信你已经了解了编写、编译、部署智能合约的的整个过程了。

在这篇文章中，将会更详细地讲解*部署智能合约*的内容。

Move 语言是 Meta（原 Facebook）公司为 *Libra* 项目（后更名为 *Diem*）开发的*领域专用语言*。
Move 语言作为*面向资源编程*的智能合约编程语言，无疑给区块链技术注入新的活力。
*Starcoin 区块链*是第一条使用 Move 语言的的公链，作为 Move 语言的贡献者以及受益者，Starcoin 一直努力构建 *Move 生态*。

虽然 Diem 因为一些不可抗拒的因素而告终，但是这过程中诞生的一批先进技术，无疑给 Web3 世界注入了新的活力。
不少热衷区块链技术、憧憬 Web3 美好的世界的技术者，纷纷奔赴新的航程，沿用 *Diem 区块链*留下的开源技术构建了两条基于 Move 语言来编写智能合约的新公链 *Aptos* 和 *Sui*（目前已处于测试网阶段）。

Move 生态中的三大公链 *Starcoin*、*Aptos* 和 *Sui*，正以*星星之火可以燎原*之势，共同为 Move 生态发光发热。

## 部署智能合约的重要性

区块链技术的发展经历了两个阶段，比特币（BTC）开启了*区块链1.0*时代，以太坊（ETH）开启了*区块链2.0*时代。
以太坊的出现为区块链带来了*智能合约*这一关键技术，让区块链不只停留在记账这一单的目的，而是带来更多的应用拓展性。
遗憾的是，智能合约如同一把双刃剑，在带来众多丰富功能拓展的同时，也容易让智能合约开发者无意间引入不安全的代码，让链的资产受到威胁。

我想，编写简单、安全、易部署的智能合约应该是*区块链3.0*时代应该关注的重点，*面向资源编程*的 Move 语言，无疑给这个问题提供了一个很好的解决方案。

部署*智能合约*几乎是每条*智能链*的最基本功能，接下来将详细介绍在 Starcoin 区块链部署合约的方法。

## 准备工作

通过这篇文章，你将学习到：

- 如何为 Move 项目开发设置工作目录和配置文件；
- 如何打包（编译）一个 Move 模块；
- 如何将编译好的二进制文件部署到 Starcoin 区块链上。

首先，根据[如何设置本地开发网络](../02-getting-started/02-setup/03-dev-network.md)的描述启动一个 *dev* 网络节点。
并且为账户获取一些 *dev* 网络的测试代币，并解锁账户。
这里将地址 `0xb19b07b76f00a8df445368a91c0547cc` 作为部署智能合约的账户地址。

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## 合约代码

这是一个[计数器合约](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter)，功能有创建计数器，递增计数器，详细介绍可以参考[快速开始](./02-quick-start.md)中的介绍。

项目结构：

```
.
├── Move.toml
└── sources
    └── MyCounter.move
```

```move title="my-counter/sources/MyCounter.move"
module MyCounterAddr::MyCounter {
     use StarcoinFramework::Signer;

     struct Counter has key, store {
        value:u64,
     }
     public fun init(account: &signer){
        move_to(account, Counter{value:0});
     }
     public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1;
     }

     public(script) fun init_counter(account: signer){
        Self::init(&account)
     }

     public(script) fun incr_counter(account: signer)  acquires Counter {
        Self::incr(&account)
     }
}
```

```toml title="my-counter/Move.toml" {7}
[package]
name = "my_counter"
version = "0.0.1"

[addresses]
StarcoinFramework = "0x1"
MyCounterAddr = "0xb19b07b76f00a8df445368a91c0547cc"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
```

*Move.toml* 文件和 *sources* 目录是一个 Move 项目目录的基本组成结构。

## 部署流程

好了，现在我们开始吧！

1. 修改合约地址

智能合约是部署在某个账户下的，因此需要修改 *Move.toml* 文件中 `MyCounterAddr` 的值为你实际的账户地址。
这里以 `0xb19b07b76f00a8df445368a91c0547cc` 为例。

2. 编译模块

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyCounter
Release done: release/my-counter.v0.0.0.blob, package hash: 0x3be68089a746a7a3d1aaf2e0282a7c73f3724e07d19dbdd5d5514f01ace9a662
```

该命令将会编译模块，并生成一个二进制包 `release/my-counter.v0.0.1.blob`。

> 提示：使用 `pwd` 命令确定合约的*绝对路径*，方便在 *Starcoin 控制台*中部署。

3. 解锁账户

```shell
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p <MY-PASSWORD>
```

4. 部署到区块链

目前有两个命令行工具可以将 Move 二进制包部署到区块链上：

分别是 `mpm deploy` 和 `starcoin% dev deploy`。

- mpm deploy

部署模块需要账号进行签名，`mpm deploy` 命令支持三种账号模式：
1) 本地钱包; 2) 私钥文件; 3) 环境变量。

三种账号模式对应的命令分别如下：

```
$ mpm deploy --rpc ws://127.0.0.1:9871 --local-account-dir /your/local/account/dir --password xxxxx /your/dev/path/my-counter/release/my-counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --secret-file /your/secret/file /your/dev/path/my-counter/release/my-counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --from-env /your/dev/path/my-counter/release/my-counter.v0.0.1.blob
```

如果要将模块部署到 Barnard 测试网或者主网上，只需将 `--rpc` 选项指定为对应的 RPC 地址即可。

**`secret-file`** 是一个储存私钥的本地文件，里面只包含一行私钥，无其他前缀，后缀。

环境变量的键值为：`STARCOIN_PRIVATE_KEY`。

- starcoin% dev deploy 

在 Starcoin 控制台模式下，运行命令：

```bash
starcoin% dev deploy /your/dev/path/my-counter/release/my-counter.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b

txn 0xeb055894f0c4440608246825c238a36683a8a0ad57144e905a12398a02ce806b submitted.
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
  .....
  ....
}
```

对于是使用 `mpm deploy` 命令直接在命令行部署，还是借助 Starcoin 控制台来部署，主要根据个人喜好或便利程度来选择。
