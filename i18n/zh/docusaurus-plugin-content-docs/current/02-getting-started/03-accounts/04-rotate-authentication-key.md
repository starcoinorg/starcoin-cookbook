# 重置账户私钥

这篇文章指导你如何在 Starcoin 区块链上完成对账户的私钥重置。

使用场景：

1. 用于重置账户私钥并保留地址
2. 将账户重置成多签账户并保留地址（使用多签账户私钥即可）

## 准备工作

1. 启动一个 `starcoin` dev 节点并连接。详细步骤请查阅[使用 starcoin 控制台](../setup/starcoin-usage)。

## 操作步骤

我们有两种方法实现重置账户 auth key：

1. 使用 `starcoin` 提供的操作命令逐步完成替换
2. 使用 `rotate-authentication-key` 命令直接完成替换

其中方案二对方案一各条命令进行了打包操作，更为便捷。方案一则更加清晰可控。

### 方案一：分步执行

- 准备新账户 A
- 执行 auth key 替换合约：使用账户 A 的 auth key 替换 B 的 auth key
- 删除账户 A ，B
- 使用 A 的私钥与 B 的地址倒入账户，完成 B 的私钥替换

#### 准备新账户

创建新账户 A：

```bash
starcoin% account create -p my-pass
{
  "ok": {
    "address": "0xc04c62b99fd053ac31d21d6e06619aed",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
    "receipt_identifier": "stc1pcpxx9wvl6pf6cvwjr4hqvcv6a5fwhx2t"
  }
}
```

获取账户 A 的 auth key：

```bash
starcoin% account show 0xc04c62b99fd053ac31d21d6e06619aed
{
  "ok": {
    "account": {
      "address": "0xc04c62b99fd053ac31d21d6e06619aed",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
      "receipt_identifier": "stc1pcpxx9wvl6pf6cvwjr4hqvcv6a5fwhx2t"
    },
    "auth_key": "0x39353fabc51eb1b472c2c5ef6e74c91bc04c62b99fd053ac31d21d6e06619aed",
    "balances": {},
    "sequence_number": null
  }
}
```

获取账户 A 的 private key:

```bash
starcoin% account export 0xc04c62b99fd053ac31d21d6e06619aed -p my-pass
{
  "ok": {
    "account": "0xc04c62b99fd053ac31d21d6e06619aed",
    "private_key": "0x92e13795c658f40ead01db2b3a7ed351b07d85d92bb0f03a9b04364f6de487c9"
  }
}
```

#### 执行 auth key 替换合约

查看账户 B （待替换账户）：

```bash
starcoin% account show 0xdaf8e186dc97ee9ba6971b08115d4dc2
{
  "ok": {
    "account": {
      "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x2a20e0bd8a26e6ed50a4dbba839ed1dbd99806d38c9c606646c9db6836ea0040",
      "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
    },
    "auth_key": "0x38992286a9a2256ae4a659d5c46bb877daf8e186dc97ee9ba6971b08115d4dc2",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 101000000
    },
    "sequence_number": 0
  }
}
```

执行 `rotate_authentication_key`：

```bash
starcoin% account execute-function -s 0xdaf8e186dc97ee9ba6971b08115d4dc2 --function 0x1::Account::rotate_authentication_key --arg x"39353fabc51eb1b472c2c5ef6e74c91bc04c62b99fd053ac31d21d6e06619aed" -b
```

执行后账户 B 的状态：

```bash
starcoin% account show 0xdaf8e186dc97ee9ba6971b08115d4dc2
{
  "ok": {
    "account": {
      "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x2a20e0bd8a26e6ed50a4dbba839ed1dbd99806d38c9c606646c9db6836ea0040",
      "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
    },
    "auth_key": "0x38992286a9a2256ae4a659d5c46bb877daf8e186dc97ee9ba6971b08115d4dc2",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100941419
    },
    "sequence_number": 1
  }
}
```

移除账户 A 与 B：

```bash
starcoin% account remove 0xc04c62b99fd053ac31d21d6e06619aed -p my-pass
{
  "ok": {
    "address": "0xc04c62b99fd053ac31d21d6e06619aed",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
    "receipt_identifier": "stc1pcpxx9wvl6pf6cvwjr4hqvcv6a5fwhx2t"
  }
}
starcoin% account remove 0xdaf8e186dc97ee9ba6971b08115d4dc2 -p my-pass
{
  "ok": {
    "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x2a20e0bd8a26e6ed50a4dbba839ed1dbd99806d38c9c606646c9db6836ea0040",
    "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
  }
}
```

根据 A 账户的私钥， B 账户的地址（原地址）导入账户：

```bash
starcoin% account import -i 0x92e13795c658f40ead01db2b3a7ed351b07d85d92bb0f03a9b04364f6de487c9 0xdaf8e186dc97ee9ba6971b08115d4dc2
{
  "ok": {
    "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
    "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
  }
}
```

查看 B 账户的最新状态，我们可以发现 B 账户已经完成了 auth key 的替换：

```bash
starcoin% account show 0xdaf8e186dc97ee9ba6971b08115d4dc2
{
  "ok": {
    "account": {
      "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
      "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
    },
    "auth_key": "0x39353fabc51eb1b472c2c5ef6e74c91bc04c62b99fd053ac31d21d6e06619aed",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100941419
    },
    "sequence_number": 1
  }
}
```

为了检验账户，我们从 B 账户发起一笔转账：

```bash
starcoin% account transfer -s 0xdaf8e186dc97ee9ba6971b08115d4dc2 -r 0xacff0c9a785004cdadec02ab76d44f32 -v 10000 -b
```

查看两个账户的最新情况：

```bash
starcoin% account show 0xdaf8e186dc97ee9ba6971b08115d4dc2
{
  "ok": {
    "account": {
      "address": "0xdaf8e186dc97ee9ba6971b08115d4dc2",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x58ede5ef970b9995268409e289a40ab0dc9e51e5c06a9e4934b5ef74d48795fe",
      "receipt_identifier": "stc1pmtuwrpkujlhfhf5hrvypzh2dcgyadtcw"
    },
    "auth_key": "0x39353fabc51eb1b472c2c5ef6e74c91bc04c62b99fd053ac31d21d6e06619aed",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100646888
    },
    "sequence_number": 2
  }
}
starcoin% account show 0xacff0c9a785004cdadec02ab76d44f32
{
  "ok": {
    "account": {
      "address": "0xacff0c9a785004cdadec02ab76d44f32",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0xfedc9c99956e25a66a5780922ada3fc8f70cff4f7f4ee87436fab64e727cd09b",
      "receipt_identifier": "stc1p4nlsexnc2qzvmt0vq24hd4z0xg0dqv6e"
    },
    "auth_key": "0x6c871cf1618930b492fcd4fc56d9b5d7acff0c9a785004cdadec02ab76d44f32",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 10000
    },
    "sequence_number": 0
  }
}
```

### 方案二：rotate-authentication-key 命令

待替换账户：

```bash
starcoin% account show 0x19b757b48a015ee035c03d01254d977d
{
  "ok": {
    "account": {
      "address": "0x19b757b48a015ee035c03d01254d977d",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0xf3ebe5f3b54f670d128b23ac48451ce4901b61c91a2fa3dffd42d36b8686f6b2",
      "receipt_identifier": "stc1prxm40dy2q90wqdwq85qj2nvh05t82esr"
    },
    "auth_key": "0x45dfd6aee42561ebef18f7efadea276319b757b48a015ee035c03d01254d977d",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 100000000
    },
    "sequence_number": 0
  }
}
```

创建新的密钥对：

```bash
starcoin% account generate-keypair
{
  "ok": [
    {
      "address": "0x1876d22b496bf344ab22b4f2fad63226",
      "auth_key": "0x6e90f703921b70d637e0c6ab4bf329da1876d22b496bf344ab22b4f2fad63226",
      "private_key": "0xe44035658755709e7567d1ee34c8563400fae6362efe4d8ea4dc1a6fa13f8a79",
      "public_key": "0xff23b3c540ac5040846ccd2664fec13d9470ebfb4cb42afd5f25be2c5e0c00d5",
      "receipt_identifier": "stc1prpmdy26fd0e5f2ezkne0443jychq0vzt"
    }
  ]
}
```

直接完成 auth key 的替换，原账户的重新导入。

```bash
starcoin% account rotate-authentication-key 0x19b757b48a015ee035c03d01254d977d -i 0xe44035658755709e7567d1ee34c8563400fae6362efe4d8ea4dc1a6fa13f8a79 --password my-pass
txn 0x1d97effb8f8e2b598bd67e70047c2b9862e6d0cb823e77f8173dcaa546733be8 submitted.
{
  "ok": {
    "address": "0x19b757b48a015ee035c03d01254d977d",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0xff23b3c540ac5040846ccd2664fec13d9470ebfb4cb42afd5f25be2c5e0c00d5",
    "receipt_identifier": "stc1prxm40dy2q90wqdwq85qj2nvh05t82esr"
  }
}

starcoin% account show 0x19b757b48a015ee035c03d01254d977d
{
  "ok": {
    "account": {
      "address": "0x19b757b48a015ee035c03d01254d977d",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0xff23b3c540ac5040846ccd2664fec13d9470ebfb4cb42afd5f25be2c5e0c00d5",
      "receipt_identifier": "stc1prxm40dy2q90wqdwq85qj2nvh05t82esr"
    },
    "auth_key": "0x6e90f703921b70d637e0c6ab4bf329da1876d22b496bf344ab22b4f2fad63226",
    "balances": {
      "0x00000000000000000000000000000001::STC::STC": 99941419
    },
    "sequence_number": 1
  }
}
```

#### 注意事项

考虑到本地状态与链上状态一致性可能会被意外故障打断，从而得不到命令的返回值，我们需要恢复手段。无返回值共有如下三种情况：

1. auth key 并未被替换：重新执行命令
2. `INVALID_AUTH_KEY` 错误：删除账户并使用新的密钥重新导入即可。这是由于 remove 账户时异常退出导致的。
3. `account not existed` 错误：使用新的密钥重新导入即可。这是由于 import 账户时异常退出导致的。

### 重置一般账户为多签账户

TODO [多签重构](https://github.com/starcoinorg/starcoin/issues/3411)完成后补充