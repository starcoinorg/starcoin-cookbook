# 第一笔链上交易

这篇文章指导你如何在 Starcoin 区块链上执行自己的第一笔交易。
在这之前，建议你先阅读技术相关的文章，对 Starcoin 的基本概念有一定了解。

## 前提

假设你已经在本地跑起来一个 Starcoin 的 dev 节点。

## 提交交易的几个步骤

- 启动 Starcoin 控制台，并连接到 Starcoin 节点，详细步骤请查阅[如何与 Starcoin 控制台交互](../02-setup/starcoin-console.md)。
- 创建两个账户：Alice 和 Bob，详细步骤请查阅[账号管理](./01-account-manage.md)。
- 给 Alice 账户充钱。
- 提交转账交易：Alice 给 Bob 打钱。

### 创建账户

连接到节点后，我们先来创建两个账户。
这里我们假设两个账号已经创建成功，Alice 是默认账号，其地址是 `0xf096a2a61d3042774187a462a5394537`，Bob 的地址是 `0xbabb67fa74c24466c500e642c79437de`。

### 使用 Faucet 给账户充钱

Dev 环境下，可以利用 faucet 给账户充钱。Faucet 只在 `dev` 和 `test` 网络中存在，以便于开发者做开发和测试。
下面我们通过控制台给 Alice 充钱。

``` bash
starcoin% dev get-coin -v 100STC
```

`dev get-coin` 会往默认账户中充钱，如果链上不存在这个账户，它会先创建这个账户，然后再往该账户转入 `-v` 指定数量的 coin。
命令输出的是由 faucet 账户（地址是 `0000000000000000000000000a550c18`）发出的交易信息。

等待几秒钟，然后再查看账户信息。

```bash
starcoin% account show 0xf096a2a61d3042774187a462a5394537
{
  "ok": {
    "account": {
      "address": "0xf096a2a61d3042774187a462a5394537",
      "is_default": true,
      "is_readonly": false,
      "public_key": "0x96734ea5015c3e1901b1af3e9c16f42df074c92749988d0563be3f5df65c2da6",
      "receipt_identifier": "stc1p7zt29fsaxpp8wsv853322w29xu02slxc"
    },
    "auth_key": "0x4c9c5a86f958a1a02286e46807df916ff096a2a61d3042774187a462a5394537",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100000000000
    },
    "sequence_number": 0
  }
}
```

可以看到 `balances` 和 `sequence_number` 有数据了。

### 提交交易 - 转账

首先需要解锁 Alice 的账户，授权节点使用 Alice 的私钥对交易签名。

``` bash
account unlock -p <MY-PASSWORD> 0xf096a2a61d3042774187a462a5394537
```

其中 `-p` 选项指定的 `<MY-PASSWORD>` 是创建账户时传入的密码，初始的默认账号密码为空，可以不传递这个参数。

账户解锁后，执行以下命令：

```bash
starcoin% account transfer -s 0xf096a2a61d3042774187a462a5394537 -r 0xbabb67fa74c24466c500e642c79437de -v 10000 -b
```

其中：

- `-s 0xf096a2a61d3042774187a462a5394537`: 是 Alice 的账户地址。
- `-r 0xbabb67fa74c24466c500e642c79437de`：是 Bob 的帐户地址。

> 如果，Bob 的账户在链上还不存在，转账交易会自动在链上创建 Bob 的账户。


此时，交易已经被提交到链上。还需要等待几秒（在 `dev` 环境出块时间比较短，在 `test` 环境中可能更长），让交易上链。然后再查看 Bob 的账户信息：


``` bash
starcoin% account show 0xbabb67fa74c24466c500e642c79437de
{
  "ok": {
    "account": {
      "address": "0xbabb67fa74c24466c500e642c79437de",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x6b1adad8156edba7d24efa5bb216e8e8f927a3866c875e95a636e6399ae4ed46",
      "receipt_identifier": "stc1ph2ak07n5cfzxd3gquepv09phmc0crcec"
    },
    "auth_key": "0x282d7d31aa5c7daac4fab02c084f896dbabb67fa74c24466c500e642c79437de",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 10000
    },
    "sequence_number": 0
  }
}
```

可以发现：Bob 账户已经有钱了。

至此，你已经成功完成了一笔链上转账！
