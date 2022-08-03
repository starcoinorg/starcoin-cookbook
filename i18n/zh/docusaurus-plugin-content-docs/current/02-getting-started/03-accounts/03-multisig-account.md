# 多签账户和多签交易

本节介绍多签账户的使用，包括如何通过 CLI 在链上创建多签账户，以及如何发起多签交易。
关于多签账户的原理和实现请参看[账户](../../99-concepts/01-account.md)概念的多签账户部分。

## 前置准备

多签交易涉及到多个参与者。这里我们用 alice，bob 和 tom 三个参与者来说明多签交易的流程。

1. 首先你需要在本地启动三个 Starcoin 的 `dev` 节点，分别对应到 alice, bob 和 tom，同时连接到控制台中。
`--discover-local` 选项可以让节点发现本地局域网内的其他节点，然后连接成一个网络。

```bash
% starcoin -n dev -d alice --discover-local true console
% starcoin -n dev -d bob --discover-local true console
% starcoin -n dev -d tom --discover-local true console
```

我们将三个节点提供的默认账户分别作为 alice，bob 和 tom 的个人账户。

alice，bob 和 tom 三个人的个人账户地址：

```text
alice: 0x31515d36fa0b9e01bbdb1638d7c79e51
bob: 0x991c2f856a1e32985d9793b449c0f9d3
tom: 0x17183867a6142e821ee8a2dc6bb4d69d
```

2. 通过以下命令各自生成一个新的公私钥对：

```bash
starcoin% account generate-keypair

# 如下：
{
  "ok": [
    {
      "address": "0xb6b67729f9ed83f3cf542952fbded752",
      "auth_key": "0x459381118ed14d42097b977aae5fe1d4b6b67729f9ed83f3cf542952fbded752",
      "private_key": "0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d",
      "public_key": "0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5",
      "receipt_identifier": "stc1pk6m8w20eakpl8n6599f0hhkh2gg3czy9"
    }
  ]
}
```

生成的密钥对有5个字段信息：

```text
address -> 生成地址（这个演示中，没有用处）
auth_key -> 认证密钥
private_key -> 私钥
public_key -> 公钥
receipt_identifier -> 收款识别码
```

**注意：**不要把`个人账户地址`和 `generate-keypair 生成的地址`混淆！

这里假设他们三者生成对密钥信息（只用于举例，请勿使用在正式网络中）分别是：

- alice:
  - pubkey: 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5
  - prikey: 0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d

- bob:
  - pubkey: 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0
  - prikey: 0x163e272560e53b75c087bc424fc7ff8cdbc0608ce4695f9bf69c8bd430a2bfeb

- tom:
  - pubkey: 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301
  - prikey: 0xe38bfd1510a24c54d966dcbe13a4d06a798606f4b557823845156857b4dfb0b1

3. 每个控制台都通过 `dev get-coin -v 10000STC` 命令，给默认账户获取 10000 个 STC。

做完上述准备后，下面开始我们的多签交易流程。主要步骤如下：

1. 首先我们在本地创建一个多签账户。
2. 然后让 alice 向这个多签账户转一笔 STC。
3. 最后以这个多签账户的名义发起一笔多签交易：从多签账户给 bob 转账。

## 生成多签账户

这里假设读者了解多签账户的基本概念。

这一小节里，我们会创建由一个由**三个**参与者共同维护的多签账户，交易只需要其中**两个**参与者的签名即可（`threshold=2`）。
我们使用上面生成的公私密钥对和 `threshold=2` 来生成多签账户。

首先分别在 alice，bob，tom 的节点中生成三人共同维护的多签账户。

在 alice 的控制台中执行：

```bash
# --pubkey 指定 bob 和 tom 的生成公钥，--prikey 指定 alice 的生成私钥
starcoin% account import-multisig --pubkey 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0 --pubkey 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301 --prikey 0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d -t 2
```

在 bob 的控制台中执行：

```bash
# --pubkey 指定 alice 和 tom 的生成公钥，--prikey 指定 bob 的生成私钥
starcoin% account import-multisig --pubkey 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5 --pubkey 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301 --prikey 0x163e272560e53b75c087bc424fc7ff8cdbc0608ce4695f9bf69c8bd430a2bfeb -t 2
```

在 tom 的 console 中执行：

```bash
# --pubkey 指定 alice 和 bob 的生成公钥，--prikey 指定 tom 的生成私钥
starcoin% account import-multisig --pubkey 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5 --pubkey 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0 --prikey 0xe38bfd1510a24c54d966dcbe13a4d06a798606f4b557823845156857b4dfb0b1 -t 2
```

`--pubkey` 选项指定 `generate-keypair` 生成公钥而不是个人账户的公钥，`--prikey` 选项指定 `generate-keypair` 生成的私钥而不是个人账户的私钥，`-t` 选项指定所需的签名数，即 `threshold`。

分别在三个控制台执行完上述命令后，你会发现，三个命令都生成了相同的**多签账户**信息（注意：私钥不同，见下文说明）：

```bash
{
  "ok": {
    "address": "0x8afd731146fbc206d56265adedb4b50a",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",
    "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"
  }
}
```

**理解多签账户的公钥和私钥：**

公钥：可以看到这个多签账户的公钥非常长，是由多个单签私钥生成的公钥拼接而成。多签公钥是公开的，每个人都持有相同的多签公钥。

私钥：多签账户的私钥是由多个单签私钥拼接而成，每个人掌握 `1/n`。可以分别在三个console中执行 `account export 0x8afd731146fbc206d56265adedb4b50a` 查看每个人掌握的私钥并进行对比。


查看多签账户：

```bash
starcoin% account show 0x8afd731146fbc206d56265adedb4b50a
{
  "ok": {
    "account": {
      "address": "0x8afd731146fbc206d56265adedb4b50a",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",
      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"
    },
    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",
    "balances": {},
    "sequence_number": null
  }
}
```

## 给多签账户转账

在这一小节，我们从 tom 账户给这个多签账户转 1000 个 STC。

在 tom 的 Starcoin 控制台中执行：

```bash
starcoin% account transfer -r 0x8afd731146fbc206d56265adedb4b50a -v 1000000000000 -b
```

再查看多签账户的信息：

```bash
starcoin% account show 0x8afd731146fbc206d56265adedb4b50a
{
  "ok": {
    "account": {
      "address": "0x8afd731146fbc206d56265adedb4b50a",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",
      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"
    },
    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 1000000000000
    },
    "sequence_number": 0
  }
}
```

注意 `balances` 字段：此时多签账户已经拥有了 1000 STC。

## 发起多签交易

现在多签账户有了 1000 STC。

我们来发起一个多签交易：从多签账户给 bob 转账 1 个 STC。

在 tom 的 Starcoin 控制台中执行：

```bash
starcoin% account sign-multisig-txn -s 0x8afd731146fbc206d56265adedb4b50a --function 0x1::TransferScripts::peer_to_peer_v2 -t 0x1::STC::STC --arg 0x991c2f856a1e32985d9793b449c0f9d3 --arg 1000000000u128
```

其中 `peer_to_peer_v2` 脚本参数：

- `0x991c2f856a1e32985d9793b449c0f9d3` 是 bob 个人账户地址。
- `1000000000u128` 是要发送的 token 数量。

等待一会儿，会看到最后几行的输出：

```bash
mutlisig txn(address: 0x8afd731146fbc206d56265adedb4b50a, threshold: 2): 1 signatures collected
still require 1 signatures
{
  "ok": "/94713c208ff452d4d02c5446eb18f5ab538b72976e08a84cada4b08be68583ab.multisig-txn"
}
```

该命令会生成原始交易，并用 tom 的**多签账户私钥**签名，生成的交易会以文件形式保存在当前目录下，文件名是交易的哈希。

注意：文件路径根据不同的操作系统以及使用方式会略有差异。

命令行提示：该多签交易已经收集了一个签名，还需要另一个签名。
此时需要将生成的交易文件分发给该多签账户的其他参与者去签名。

## 其他参与者签名

alice 拿到上述的交易文件后，在自己的 Starcoin 控制台中签名：

```bash
starcoin% account sign-multisig-txn /94713c208ff452d4d02c5446eb18f5ab538b72976e08a84cada4b08be68583ab.multisig-txn
```

等待一会儿，会看到最后几行的输出：

```bash
mutlisig txn(address: 0x8afd731146fbc206d56265adedb4b50a, threshold: 2): 2 signatures collected
enough signatures collected for the multisig txn, txn can be submitted now
{
  "ok": "/root/f93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837.multisig-txn"
}
```

该命令会生成另一个多签交易签名文件，包含有 **tom 的多签私钥**和 **alice 的多签私钥**的签名。
返回信息提示用户，该多签交易已经收集到足够多的签名，可以提交到链上执行了。

## 提交多签交易

多签交易完整生成后，**任何人**都可以将其提交到链上。
这里我们从 bob 的 Starcoin 控制台中提交该多签交易。

```bash
starcoin% account submit-multisig-txn f93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837.multisig-txn
```

```bash
txn 0xf93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837 submitted.
{
  "ok": {
    "events": null,
    "txn_hash": "0xf93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837",
    "txn_info": null
  }
}
```

等待执行结束后，再查看多签账户的信息，会发现多签账户的余额已经减少了（gas 费用和转出去的 1 STC），账号的 `sequence_number` 也变成了 1，说明交易已经执行成功了。

```bash
starcoin% account show 0x8afd731146fbc206d56265adedb4b50a
{
  "ok": {
    "account": {
      "address": "0x8afd731146fbc206d56265adedb4b50a",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",
      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"
    },
    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 998999894453
    },
    "sequence_number": 1
  }
}
```

至此，你已经完成了一个多签账户的创建以及多签交易的生成和链上执行。

## 其他的多签管理办法

* [通过 StarMask 管理多签（Youtube）](https://www.youtube.com/watch?v=a9nwRZunwwg)
* [WenWen 提供的基于 NodeJs 的一个多签管理工具](https://github.com/wenwenprotocol/wen-multi-sign)
