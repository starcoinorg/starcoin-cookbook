# 部署你的第一个智能合约

这篇文章指导你如何编译和部署 Move 合约到 starcoin 区块链。

Move 是一种新的编程语言，旨在为 [Diem 区块链](https://github.com/deim/diem) 提供安全和可编程的基础。 Starcoin Blockchain 还支持 Move 语言编写智能合约。

通过这篇文章，你将学习到：

- 如何为 Move 开发设置工作目录和配置文件；
- 如何打包（编译）一个 Move 模块；
- 如何将编译好的二进制文件部署到 starcoin 区块链上。

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
