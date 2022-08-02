# 创建一种新的 NFT

这一章节主要介绍用户如何在 Starcoin 区块链上自定义一种 NFT（Non-Fungible Token）。

## 前提

首先，按照[如何设置本地开发网络](../../02-getting-started/02-setup/03-dev-network.md)中的描述启动一个开发网络，并获得一些 STC 代币用于创建NFT，比如 `1000000000 STC`。

在本文档中，我将使用我的开发网络的默认帐户地址 `0xb19b07b76f00a8df445368a91c0547cc` 来代表**发行**和**铸造**新 NFT 的人。

创建自定义 NFT 的代码源文件位于 [simple-nft](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/simple-nft)。

## 编译模块

下载代码并进入 `simple-nft` 目录：

```bash
git clone https://github.com/starcoinorg/starcoin-cookbook.git
cd starcoin-cookbook/examples/simple-nft
```

修改 `Move.toml` 文件中 `SNFT` 地址为默认账户地址：

```toml
[addresses]
StarcoinFramework = "0x1"
SNFT = "0xb19b07b76f00a8df445368a91c0547cc"
```

在 shell 控制台中运行 `mpm release` 以获取发布模块：

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT
         0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts
Release done: release/simple-nft.v0.0.1.blob, package hash: 0x39bf53490461a9ccf07804312561280e7dafa4ba8ea102913c022de5c9a80555
```

它将编译自定义 NFT 的合约代码，在项目的 `release` 目录下生成二进制文件 `simple-nft.v0.0.1.blob`，此二进制文件将用于之后的部署。

## 导入账户

我们需要先导入 `0xb19b07b76f00a8df445368a91c0547cc` 账号。

```bash
starcoin% account import -i 0x05c9d09cd06a49e99efd0308c64bfdfb57409e10bc9e2a57cb4330cd946b4e83 -p <MY-PASSWORD>

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

## 获取代币

获得 `dev` 网络的 STC 代币用户支付合约部署过程中的花费，这个命令将默认发送 `1000000000` STC 到账户中。

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## 部署模块

解锁帐户并部署 SimpleNFT 模块和 SimpleNFTScripts 模块。

```bash
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p <MY-PASSWORD>
```

```bash
starcoin% dev deploy /path/to/simple-nft/release/simple-nft.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b

txn 0x60e31b4e4fe974f66b80c3e69c659a573b4022754430bf030576292e1358d7b0 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "37536",
      "status": "Executed",
      "write_set": [
        {
          "access_path": "0x00000000000000000000000000000001/1/0x00000000000000000000000000000001::TransactionFee::TransactionFee<0x00000000000000000000000000000001::STC::STC>",
          "action": "Value",
          "value": {
            "Resource": {
              "json": {
                "fee": {
                  "value": 322067
                }
              },
              "raw": "0x13ea0400000000000000000000000000"
            }
          }
        },
  .....
  ....
}
```

可以看到交易已经提交，结果状态为 `Executed`。这意味着该模块已部署。

## 执行脚本功能

首先，在 starcoin 控制台执行初始化交易：

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts::initialize -b
```

然后，铸造一个测试 NFT：

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts::test_mint_with_image_data -b
```

最后，通过 `account nft list` 命令可以查看已经铸造的 NFT：

```bash
starcoin% account nft list
{
  "ok": {
    "list": [
      {
        "base_meta": {
          "description": "test description",
          "image": "",
          "image_data": "<省略 image_data>",
          "name": "test nft"
        },
        "body": {
          "dummy_field": false
        },
        "creator": "0xb19b07b76f00a8df445368a91c0547cc",
        "id": 1,
        "nft_type": "0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT::SimpleNFT/0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT::SimpleNFTBody",
        "type_meta": {
          "dummy_field": false
        },
        "uuid": "0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT::SimpleNFT/0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT::SimpleNFTBody/1"
      }
    ]
  }
}
```

我们可以看到我们的账户中已经有了 `id` 为 1 的一个 NFT。
