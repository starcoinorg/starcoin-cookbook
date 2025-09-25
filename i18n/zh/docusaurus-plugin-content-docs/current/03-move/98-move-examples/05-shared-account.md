# 共享账户 (Shared Account)

本章节介绍如何在 Starcoin 区块链上测试和部署 `shared-account` 示例工程。该工程旨在模拟 NFT 佣金分发的场景：从主账户创建一个派生账户，将部分代币存入派生账户，并添加参与佣金分发的账户。在需要分发时，直接从派生账户中进行分发。

## 前提条件

该工程位于 starcoin的 [shared-account](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/shared_account) 仓库中。请先将 Starcoin 仓库克隆到本地，并编译以下工具：

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin)：用于与节点连接。
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager)：用于打包 Move 模块。

假设 Starcoin 二进制文件已编译成功，执行以下命令连接到 Starcoin 控制台并打包工程：

```shell
# 连接到 Starcoin 控制台，<network> 为网络名称（如 dev、barnard 等）
starcoin -n <network> console

# 查看节点的同步进度，确保本地节点同步完成后再提交测试交易
starcoin% node sync progress
There are no running sync tasks.
```

## 测试指令集

以下是在 Starcoin 控制台中部署和测试 `shared-account` 合约的步骤：

```shell
# 部署合约
dev deploy -s 0x82cbfefb8076f2da3339b782fb074438 /home/bob/starcoin/vm2/move-examples/shared_account/release/shared_account.v0.0.1.blob

# 查询派生账户的地址
dev call --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::get_derive_account --arg 0x82cbfefb8076f2da3339b782fb074438 --arg b"1"
{
  "ok": [
    "0x711f9777700a13eaf73b173aa2664216"
  ]
}

# 向派生账户转账，以确保分发时余额充足
account transfer -r 0x711f9777700a13eaf73b173aa2664216 -v 10000000000

# 初始化派生账户
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::initialize_with_resource_account --arg b"1" -b

# 添加参与分发的账户 R1
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100u64 -b

# 添加参与分发的账户 R2
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x7111c56355d63f3434aa7de8b3c94aff --arg 100u64 -b

# 执行佣金分发
account execute-function --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::disperse -t 0x1::starcoin_coin::STC --arg 0x711f9777700a13eaf73b173aa2664216 -b
```