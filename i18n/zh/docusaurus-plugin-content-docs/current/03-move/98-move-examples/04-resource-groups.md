# 资源组 (Resource Groups)

本章节介绍如何在 Starcoin 区块链上测试和部署 `resource-groups` 示例工程，用以测试 VM2 下的资源组功能。该合约分为两部分：`primary` 模块用于测试资源组的基本功能，`secondary` 模块用于测试跨模块的资源组引用。

## 前提条件

该工程位于 [resource-group](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/resource_groups) 仓库中。请先将 Starcoin 仓库克隆到本地，并编译以下工具：

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

### Primary 模块

```shell
# 部署 Primary 模块
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work_dir>/starcoin/vm2/move-examples/resource_groups/primary/release/ResourceGroupsPrimary.v0.0.1.blob

# 初始化资源组，设置初始值 10000
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u64 -b

# 检查值，预期返回 10000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# 设置值为 20000
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::set_value --arg 20000u64 -b

# 检查值，预期返回 20000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}

# 移除值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::remove -b

# 检查资源是否存在，预期返回 false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    false
  ]
}
```

### Secondary 模块

```shell
# 部署 Secondary 模块
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work_dir>/starcoin/vm2/move-examples/resource_groups/secondary/release/ResourceGroupsSecondary.v0.0.1.blob

# 初始化资源组，设置初始值 10000
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u32 -b

# 检查值，预期返回 10000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# 设置值为 20000
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::set_value --arg 20000u32 -b

# 检查值，预期返回 20000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}

# 移除值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::remove -b

# 检查资源是否存在，预期返回 false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    false
  ]
}
```