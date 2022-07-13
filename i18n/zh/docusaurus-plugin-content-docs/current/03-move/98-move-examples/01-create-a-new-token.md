# 创建一种新的代币

这一章节主要介绍用户如何自定义一种代币（Token）。

接下来将演示如何在 Starcoin 区块链上定义用户自定义代币。

## 前提

首先，按照 [如何设置本地开发网络](https://starcoinorg.github.io/starcoin-cookbook/zh/docs/getting-started/setup/dev-network) 中的描述启动一个开发网络，并获得一些硬币，比如"1000000000"。

在本文档中，我将使用我的开发网络的默认帐户地址`0xb19b07b76f00a8df445368a91c0547cc`来代表发行和发送新Token的人。
我还创建了另一个帐户`0x831d51f0087596e6aa4e7b3b9c85f945`并将一些 STC 转移给它。 
该帐户将用于接收Token。

源文件位于[my-token](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-token)

## 编译模块

修改模块地址：
- 编辑`Move.toml`
- MyToken = "0xABCDE" 改为 MyToken = "0xb19b07b76f00a8df445368a91c0547cc"

在控制台中运行：

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyToken
Release done: release/my_token.v0.0.1.blob, package hash: 0xc3b9cf32499f4bdf0a38d57f7c7c66a6f4df69881a8980bcda2106782dce88ba
```

它将编译模块，您将获得二进制包

## 导入

导入 `0xb19b07b76f00a8df445368a91c0547cc` 账号.

```bash
starcoin% account import -i 0x05c9d09cd06a49e99efd0308c64bfdfb57409e10bc9e2a57cb4330cd946b4e83 -p my-pass 
{
  "ok": {
    "address": "0xb19b07b76f00a8df445368a91c0547cc",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x7932502fa3f8c9bc9c9bb994f718b9bd90e58a6cdb145e24769560d3c96254d2",
    "receipt_identifier": "stc1pkxds0dm0qz5d73zndz53cp28esyfj4ue"
  }
}
```
  
然后，解锁帐户并部署 MyToken 模块。  

## 获取测试币

获得 devnet 测试币  

```bash
dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## 解锁帐户  

```bash
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p my-pass
```
```bash
starcoin% dev deploy /guide-to-move-package-manager/my-token/release/my_token.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b
txn 0x686964d6a4212f1e32e8626132e14dabffb034d6f3aec921e80a2e54726391b1 submitted.
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
                  "value": 25031
                }
              },
              "raw": "0xc7610000000000000000000000000000"
            }
          }
        },
  .....
  ....
}
```

## 执行脚本功能

首先，使用 `0xb19b07b76f00a8df445368a91c0547cc` 账户初始化模块。

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyToken::init -s 0xb19b07b76f00a8df445368a91c0547cc --blocking
```

其次，使用 `0xb19b07b76f00a8df445368a91c0547cc` 账户铸币一些 MyToken。

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyToken::mint --blocking --arg 1000000u128 -s 0xb19b07b76f00a8df445368a91c0547cc
```

然后，让默认账户接受新的 Token。   
一个账户只有在已经采用了 Token 的情况下才能接受 Token。

```bash
starcoin% account accept_token -s 0x831d51f0087596e6aa4e7b3b9c85f945 0xb19b07b76f00a8df445368a91c0547cc::MyToken::MyToken --blocking
```

随后，`0xb19b07b76f00a8df445368a91c0547cc` 账户转账1000个 MyToken 给默认用户

```bash
starcoin%  account execute-function --function 0x1::TransferScripts::peer_to_peer_v2 -t 0xb19b07b76f00a8df445368a91c0547cc::MyToken::MyToken --arg 0x831d51f0087596e6aa4e7b3b9c85f945 --arg 10000u128 -s 0xb19b07b76f00a8df445368a91c0547cc
```

最后，显示默认用户的余额。

```bash
starcoin% account show 0x831d51f0087596e6aa4e7b3b9c85f945
{
  "ok": {
    "account": {
      "address": "0x831d51f0087596e6aa4e7b3b9c85f945",
      "is_default": true,
      "is_readonly": false,
      "public_key": "0x29894dafe73616f807ed48aef1978974122d790a62be767d115f396b422cbb75",
      "receipt_identifier": "stc1psvw4ruqgwktwd2jw0vaeep0eg5eac86k"
    },
    "auth_key": "0xedf8fad3eb73ab981793ca5b29b9f660831d51f0087596e6aa4e7b3b9c85f945",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100000533341,
      "0xb19b07b76f00a8df445368a91c0547cc::MyToken::MyToken": 10000
    },
    "sequence_number": 3
  }
}
```
