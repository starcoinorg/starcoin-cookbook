# 去中心化金融 (defi)

本章节介绍如何在 Starcoin 区块链上测试和部署 `defi` 示例工程。该工程的主要功能是测试由发起者（Sponsor，简称 S）授权给接收者（Recipient，简称 R）一定数量的锁仓代币，接收者可在指定的锁仓时间后领取解锁的代币。

## 前提条件

该工程位于 [defi](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/defi) 仓库中。请先将 Starcoin 仓库克隆到本地，并编译以下工具：

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin)：用于与节点连接。
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager)：用于打包 Move 模块。

假设 Starcoin 二进制文件已编译成功，并导入以下账户信息：

- 发起者（S）账户：`0x82cbfefb8076f2da3339b782fb074438`
- 接收者（R1）账户：`0x95cb8c2ef522014bd03f633bd6c8dee6`
- 接收者（R2）账户：`0x7111c56355d63f3434aa7de8b3c94aff`

账户导入数据（JSON 格式）：

```json
[
  {
    "ok": {
      "account": "0x82cbfefb8076f2da3339b782fb074438",
      "private_key": "0x01f747e8476fe3727ca29ae87fd44dd8d222609b42517274908c9ef24023169a"
    }
  },
  {
    "ok": {
      "account": "0x95cb8c2ef522014bd03f633bd6c8dee6",
      "private_key": "0x37528fbbace04e2b3609de312bdcfeb4704cd83a3488b9fc836118d02835c36e"
    }
  },
  {
    "ok": {
      "account": "0x7111c56355d63f3434aa7de8b3c94aff",
      "private_key": "0xb1a0d666adaae36d103631a182f8742717c7a650f374912804a1f5e740f4b1b7"
    }
  }
]
```

执行以下命令连接到 Starcoin 控制台并打包工程：

```shell
# 连接到 Starcoin 控制台，<network> 为网络名称（如 dev、barnard 等）
starcoin -n <network> console

# 查看节点的同步进度，确保本地节点同步完成后再提交测试交易
starcoin% node sync progress
There are no running sync tasks.
```

## 测试指令集

### 正常流程

发起者 S 授权接收者 R1 100 个 STC，锁仓 60 秒，R1 在 60 秒后可领取 100 个 STC。

```shell
# 初始化：确保 S 账户有 STC 余额，使用 S 账户发起授权，将 R1 作为接收者地址
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::initialize_sponsor -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b

# 添加锁仓：授权 100 个 STC（STC 精度为 9，实际传入 100 * 1e9），锁仓时间 60 秒
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# 查看 S 的锁仓总数
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::total_locks -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# 查看 S 为 R1 锁仓的额度
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::locked_amount -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# 查看 S 为 R1 锁仓的时间
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# 查看锁仓可提取的账户地址
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::withdrawal_address -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# R1 提取 S 的锁仓代币（若在 60 秒内提取会报错）
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 -b
```

### 错误提取流程

```shell
# 错误提取：R1 尝试从错误的账户提取锁仓代币
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```

### 更新锁仓

```shell
# 更新锁仓时间为 600 秒
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::update_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 600u64 -b

# 检查锁仓时间是否更新
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6
```

### 取消锁仓

```shell
# 重新添加锁仓：授权 100 个 STC，锁仓时间 60 秒
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# 取消锁仓
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::cancel_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```