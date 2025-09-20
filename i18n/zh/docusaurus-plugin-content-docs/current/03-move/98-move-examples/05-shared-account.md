# shared_account

这一章节主要介绍开发者如何在 Starcoin
区块链上测试部署shared-account测试工程，该工程用以测试模拟NFT佣金的派发场景，即从主账户创建一个派生账户，将一部分Token放在并且在其中添加一些参与佣金派发的账户，当需要派发时，直接从派生账户中派发

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

# 给派生地址转账，否则在分发的时候报派生地址余额不足
account transfer -r 0x711f9777700a13eaf73b173aa2664216 -v 10000000000

# 初始化
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::initliaze_with_resource_account --arg b"1" -b


# 添加R1
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100u64 -b

# 添加R2
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x7111c56355d63f3434aa7de8b3c94aff --arg 100u64 -b

# 执行分发
account execute-function --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::disperse -t 0x1::starcoin_coin::STC --arg 0x711f9777700a13eaf73b173aa2664216 -b

```

