# Rotate Authentication Key

This article guides you on how to complete a private key reset for your account on the Starcoin blockchain.

Usage scenarios.

1. for resetting the account private key and keeping the address
2. to reset an account to a multi-signature account and keep the address (just use the multi-signature account private key)

## Preparation

Start a `starcoin` dev node and connect it. See [Using the starcoin console](../02-setup/02-starcoin-console.md) for detailed steps.

## Steps

There are two ways to reset the account auth key.

1. replace it step by step using the commands provided by `starcoin`
2. use the `rotate-authentication-key` command to replace it directly

Option 2 is a more convenient way to package all the commands in Option 1. Option 1 is more clear and controllable.

### Option 1: Step-by-step execution

- Prepare new account A
- Execute the auth key replacement contract: use the auth key of account A to replace the auth key of account B
- Delete accounts A, B
- Use A's private key and B's address to dump into the account to complete B's private key replacement

#### Prepare a new account

Create a new account A.

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

Get account A's auth key:

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

Get account A's private key:

```bash
starcoin% account export 0xc04c62b99fd053ac31d21d6e06619aed -p my-pass
{
  "ok": {
    "account": "0xc04c62b99fd053ac31d21d6e06619aed",
    "private_key": "0x92e13795c658f40ead01db2b3a7ed351b07d85d92bb0f03a9b04364f6de487c9"
  }
}
```

#### Execute rotate authentication key script function

Get account B's info:

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

execute `rotate_authentication_key`：

```bash
starcoin% account execute-function -s 0xdaf8e186dc97ee9ba6971b08115d4dc2 --function 0x1::Account::rotate_authentication_key --arg x"39353fabc51eb1b472c2c5ef6e74c91bc04c62b99fd053ac31d21d6e06619aed" -b
```

After execution：

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

Remove account A and B：

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

Import account by account A's private key & account B's address:

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

In account B's latest info, we'll find auth key has been rotated:

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

To check the account, we initiate a transfer from account B:

```bash
starcoin% account transfer -s 0xdaf8e186dc97ee9ba6971b08115d4dc2 -r 0xacff0c9a785004cdadec02ab76d44f32 -v 10000 -b
```

The latest account info of A & B：

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

### Option 2：rotate-authentication-key cmd

Account waiting for rotation：

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

Generating new keypair：

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

Executing `rotate-authentication-key` cmd, please also change default account to any other address before execute.

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

#### Caution

Considering that the local state consistency with the on-chain state may be interrupted by unexpected failures, thus not getting the return value of the command, we need the means to recover. There are three cases of no return value as follows.

1. auth key has not been replaced: re-execute the command
2. `INVALID_AUTH_KEY` error: Remove the account and re-import it with a new key manually. This is caused by an abnormal exit when removing the account.
3. `account not existed` error: Re-import with a new key manually. This is caused by an abnormal exit when importing the account.

### Change an account to a multi-sign account by rotating the authentication key

TODO After [refactor multi-sign](https://github.com/starcoinorg/starcoin/issues/3411) done.
