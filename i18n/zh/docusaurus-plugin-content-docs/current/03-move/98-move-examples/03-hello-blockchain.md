# Hello Blockchain

本章节主要介绍开发者如何在 Starcoin 区块链上测试并部署一个示例工程，用于验证区块链的可用性。

## 前提条件

该示例工程位于 [hello-blockchain](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/hello_blockchain) 仓库中。请先将 Starcoin 仓库克隆到本地，并编译以下工具：
1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin)：用于与节点进行连接。
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager)：用于打包 Move 模块。

假设 Starcoin 二进制文件已编译成功，执行以下命令连接到 Starcoin 控制台并打包工程：

```shell
# 连接到 Starcoin 控制台，<network> 为网络名称（如 dev、barnard 等）
starcoin -n <network> console

# 查看节点的同步进度，确保本地节点同步完成后再提交测试交易
starcoin% node sync progress
```

## 测试指令集

首先，使用 `mpm2` 构建 Blob 二进制包。请注意，在打包前需将 `Move.toml` 中的模块目标地址修改为发布地址，例如 `0x143e9f2175f92f51d9adaeee2b3d8bf0`。

```shell
# 切换到工程目录
cd <work_dir>/starcoin/vm2/move-examples/hello-blockchain

# 执行打包命令
mpm2 release

INCLUDING DEPENDENCY MoveStdlib
INCLUDING DEPENDENCY StarcoinFramework
INCLUDING DEPENDENCY StarcoinStdlib
BUILDING hello-blockchain

Packaging Modules:
	 0x143e9f2175f92f51d9adaeee2b3d8bf0::message
Release done: release/hello-blockchain.v0.0.1.blob, package hash: 0x4c3ba39b4e716aa4d80b3697721107e39e8d6d9244a5ece3de4670335749b030
```

在 Starcoin 控制台中部署并测试合约：

```shell
# 部署合约，若结果显示 "Executed" 则表示部署成功
starcoin% dev deploy -s <work_dir>/starcoin/vm2/move-examples/hello-blockchain/release/hello-blockchain.v0.0.1.blob
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

# 设置消息
starcoin% account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::set_message --arg b"abcdefg" -b

# 查看消息，结果为 "abcdefg" 的 BCS 编码
starcoin% dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::get_message --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    {
      "bytes": "0x61626364656667"
    }
  ]
}
```