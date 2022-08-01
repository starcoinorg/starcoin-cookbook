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

部署*智能合约*几乎是每条*智能链*的最基本功能，接下来将详细介绍在 Starcoin 区块链的方法。

这篇文章指导你如何编译和部署 Move 合约到 Starcoin 区块链。

Move 是一种新的编程语言，旨在为 *Diem 区块链*提供安全和可编程的基础。*Starcoin 区块链*还支持 Move 语言编写智能合约。

通过这篇文章，你将学习到：

- 如何为 Move 开发设置工作目录和配置文件；
- 如何打包（编译）一个 Move 模块；
- 如何将编译好的二进制文件部署到 Starcoin 区块链上。

首先，根据[如何设置本地开发网络](../02-getting-started/02-setup/03-dev-network.md)的描述启动一个 dev 网络，然后获取一些 dev 网络的测试代币，并解锁账户。这里假设账户地址是 0xb19b07b76f00a8df445368a91c0547cc 。

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p my-pass
```

好了，现在我们开始吧！

1. 假设工作目录为 `/your/dev/path/my-counter/` ，该目录下的结构为：

```
.
├── Move.toml
└── sources
    └── MyCounter.move
```

`Move.toml` 文件和 `sources` 目录是 mpm 打包工具所要求的，不可更改，所有的 Move 模块都放在 `sources/` 目录下。这里我们实现了一个简单的模块：MyCounter。

2. 完成 Move 模块的编码，该代码源文件位于 [my-counter](https://github.com/starcoinorg/starcoin-cookbook/blob/main/examples/my-counter/sources/MyCounter.move) 。

```
module MyCounter::MyCounter {
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

3. 编译模块。

修改模块的地址：

- 编辑 [Move.toml](https://github.com/starcoinorg/starcoin-cookbook/blob/main/examples/my-counter/Move.toml)
- MyCounter = “0xABCDE” to MyCounter = “0xb19b07b76f00a8df445368a91c0547cc”

> Move 模块的声明以 `module <Account>::<ModuleName> {` 开头，并且需要在 `Move.toml` 文件中将变量 Account 的值设置为你的账户地址。在本文示例中，代码第一行中第一个 MyCounter 就是需要设置的变量。

然后，在命令行中运行：

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyCounter
Release done: release/my_counter.v0.0.1.blob, package hash: 0xa7e3c02c102c85708c6fa8c9f84064d09cf530b9581278aa92568d67131c3b6d
```

该命令将编译模块，并生成一个二进制包 `release/my_counter.v0.0.1.blob`。

4. 部署到区块链

目前有两个命令行工具可以将 Move 二进制包部署到区块链上：
`mpm deploy` 和 `starcoin dev deploy`。

- mpm deploy

部署模块需要账号进行签名，`mpm deploy` 命令支持三种账号模式：
1) 本地钱包; 2) 私钥文件; 3) 环境变量。

三种账号模式对应的命令分别如下：

```
$ mpm deploy --rpc ws://127.0.0.1:9871 --local-account-dir /your/local/account/dir --password xxxxx /your/dev/path/my-counter/release/my_counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --secret-file /your/secret/file /your/dev/path/my-counter/release/my_counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --from-env /your/dev/path/my-counter/release/my_counter.v0.0.1.blob
```

如果要将模块部署到 Barnard 测试网或者主网上，只需将 `--rpc` 选项指定为对应的 RPC 地址即可。

**secret-file** 是一个储存私钥的本地文件，里面只包含一行私钥，无其他前缀，后缀。

环境变量的键值为： `STARCOIN_PRIVATE_KEY`.

- starcoin dev deploy 

在 `starcoin` 控制台模式下，运行命令：

```bash
starcoin% dev deploy /your/dev/path/my-counter/release/my_counter.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b
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
