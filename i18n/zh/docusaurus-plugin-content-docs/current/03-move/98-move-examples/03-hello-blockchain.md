# Hello blockchain

这一章节主要介绍开发者如何在 Starcoin 区块链上测试部署一个测试工程，用以测试区块链的可用性

## 前提

该工程在 [hello-blockchain](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/hello_blockchain) 处，
需要预先将starcoin仓库下载到本地，编译以下工程
1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin),该二进制负责与peer进行连接
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager),该二进制负责进行打包
3. 执行以下执行令进行编译连接（假设starcoin二进制已经编译成功），并且打包工程
```shell

# 连接到starcoin控制台
➜ starcoin -n <network> console 

# 查看节点的同步进度，需要等待本地节点同步完成才能提交下面的测试交易
➜ starcoin% node sync progress

```

## 测试指令集

使用 mpm 先构建 blob 二进制包，需要注意先将`Move.toml`中的模块目标地址改成发布地址，此处为`0x143e9f2175f92f51d9adaeee2b3d8bf0`
```shell
➜ cd <work_dir>/starcoin/vm2/move-example/hello-blockchain
➜ mpm2 release

INCLUDING DEPENDENCY MoveStdlib
INCLUDING DEPENDENCY StarcoinFramework
INCLUDING DEPENDENCY StarcoinStdlib
BUILDING hello-blockchain

Packaging Modules:
	 0x143e9f2175f92f51d9adaeee2b3d8bf0::message
Release done: release/hello-blockchain.v0.0.1.blob, package hash: 0x4c3ba39b4e716aa4d80b3697721107e39e8d6d9244a5ece3de4670335749b030
```

在控制台中部署并测试
```shell

# 部署合约，若结果输出状态为Executed说明部署成功
startoin% dev -s <work_dir>/starcoin/vm2/move-example/hello-blockchain/release/hello-blockchain.v0.0.1.blob
txn 0x12481f66a05a56d93cb51d34e05c1815919ba6cea40ee073621f1d05a66341ac submitted.
{
  "ok": {
    ...
    "dry_run_output": {
      "explained_status": "Executed",
      "status": "Executed",
     }
     ...
  }
}

# 设置 message
starcoin% account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::set_message --arg b"abcdefg" -b

# 查看 message，该结果表示输出的为`abcdefg` 的BCS编码
starcoin% dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::get_message --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    {
      "bytes": "0x61626364656667"
    }
  ]
}
```
