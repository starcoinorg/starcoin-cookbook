# resource-groups

这一章节主要介绍开发者如何在 Starcoin
区块链上测试部署resource-groups测试工程，用以测试vm2下面的资源组，该合约有两部分，其主要测试资源组，secondary主要负责测试跨模块的资源组引用

## 前提

该工程在 [resource-group](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/resource_groups)
处， 需要预先将starcoin仓库下载到本地，编译以下工程

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin),该二进制负责与peer进行连接
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager)
   ,该二进制负责进行打包
3. 执行以下执行令进行编译连接（假设starcoin二进制已经编译成功），并且打包工程

```shell

# 连接到starcoin控制台
➜ starcoin -n <network> console 

# 查看节点的同步进度，需要等待本地节点同步完成才能提交下面的测试交易
➜ starcoin% node sync progress
There are no running sync tasks.

```

## 测试指令集

### primary 部分

```shell
# 代码部署
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work_dir>/starcoin/vm2/move-examples/resource_groups/primary/release/ResourceGroupsPrimary.v0.0.1.blob


# 初始化
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u64 -b

# 检查值，预期1000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# 设置值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::set_value --arg 20000u64 -b

# 检查值，预期2000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}


# 移除值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::remove -b

# 检查存在性, 预期 false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0

```


### Secondary 部分

```shell
# 部署
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work-dir>/starcoin/vm2/move-examples/resource_groups/secondary/release/ResourceGroupsSecondary.v0.0.1.blob

# 初始化
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u32 -b

# 检查值，预期1000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# 设置值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::set_value --arg 20000u32 -b

# 检查值，预期2000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}

# 移除值
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::remove -b

# 检查存在性, 预期 false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    false
  ]
}
```