# defi

这一章节主要介绍开发者如何在 Starcoin 区块链上测试部署测试defi工程，
该工程的主要功能是用来测试sponsor（下称S）授权Coin给recipient（下称R）一些锁仓的Token，R可以在指定的锁仓时间之后来领取解锁的代币

## 前提

该工程在 [defi](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/defi)
处， 需要预先将starcoin仓库下载到本地，编译以下工程

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin),该二进制负责与peer进行连接
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager)
   ,该二进制负责进行打包
3. 执行以下执行令进行编译连接（假设starcoin二进制已经编译成功），并且打包工程
4. 假设S为`0x82cbfefb8076f2da3339b782fb074438` ，R1为 `0x95cb8c2ef522014bd03f633bd6c8dee6`
   ，R2账户为：`0x7111c56355d63f3434aa7de8b3c94aff`， 需要执行导入操作

```json lines
[
  // S账户
  {
    "ok": {
      "account": "0x82cbfefb8076f2da3339b782fb074438",
      "private_key": "0x01f747e8476fe3727ca29ae87fd44dd8d222609b42517274908c9ef24023169a"
    }
  },
  // R1账户
  {
    "ok": {
      "account": "0x95cb8c2ef522014bd03f633bd6c8dee6",
      "private_key": "0x37528fbbace04e2b3609de312bdcfeb4704cd83a3488b9fc836118d02835c36e"
    }
  },
  // R2账户
  {
    "ok": {
      "account": "0x7111c56355d63f3434aa7de8b3c94aff",
      "private_key": "0xb1a0d666adaae36d103631a182f8742717c7a650f374912804a1f5e740f4b1b7"
    }
  }
]
```

```shell

# 连接到starcoin控制台
➜ starcoin -n <network> console 

# 查看节点的同步进度，需要等待本地节点同步完成才能提交下面的测试交易
➜ starcoin% node sync progress
There are no running sync tasks.

```

## 测试指令集

### 正常基本流程

S授权R1，100个STC 锁仓60秒， R1在60秒后取到100个STC

```shell
# 初始化：需要要求S账户有STC余额，使用S账户发起初始授权，将R作为initialize_sponsor的接收地址参数
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::initialize_sponsor -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b

# 添加锁仓，假设为100个STC（STC精度为9，则传入100*1e9）
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# 查看S的锁仓数量
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::total_locks -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# 查看S锁仓的额度
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::locked_amount -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# 查看S锁仓的时间
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# 查看锁仓可取账户的地址
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::withdrawal_address -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# R1声明取出S的锁仓 （在60秒内claim会报错）
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 -b
```

### 错误取出流程

```shell
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```

### 更新锁仓

```shell
# 更新锁仓
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::update_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 600u64 -b

# 查看锁仓时间是否有变化
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6
```

### 取消锁仓

```shell
# 重新添加锁仓，假设为100个STC（STC精度为9，则传入100*1e9）
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# 取消锁仓
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::cancel_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```