# Execute your first transaction on Starcoin

This article guides you on how to execute your first transaction on the Starcoin blockchain.
Before that, I recommend you read tech-related articles to get some idea of the basic concepts of Starcoin.

## Prerequisite

Let's say you've run up a Starcoin dev node locally.

## A few steps to submit a transaction

- Start the Starcoin CLI console and connect to the Starcoin node，detail document at [How working with the Starcoin console](../02-setup/02-starcoin-console.md).
- Create two accounts: Alice and Bob, detail step see [Manage account by CLI](./01-account-manage.md).
- Mint money into Alice's account.
- Submit transfer transaction: Alice send money to Bob.

### Create an account

After connecting to the node, let's first create two accounts. Here we assume that both accounts have been created successfully.
Alice is the default account with the address `0xf096a2a61d3042774187a462a5394537` and Bob's address is `0xbabb67fa74c24466c500e642c79437de`.

### Use Faucet to top up your account

In dev environment, faucet can be used to mint accounts.
Faucet only exists in `dev` and `test` net to make it easier for developers developing and testing dapps.

Let's do it!.

 ``` bash
starcoin% dev get-coin -v 100STC
```

`dev get-coin` will mint some coins the default account, and if the account does not exist on the chain, it will creates the account first and then transfers a specified (with `-v`) number of coins to the account.
The output of the command is the transaction data issued by the FAUCET account (address `0000000000000000000000000A550C18`).

Wait a few seconds and then check your account information again.

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

Now, `balances` and `sequence_number` is filled.

### Submit Transaction

First you need to unlock Alice's account and authorize node to sign the transaction using Alice's private key.

``` bash
starcoin% account unlock -p <MY-PASSWORD> 0xf096a2a61d3042774187a462a5394537
```

Where the `-p` option specifies `<MY-PASSWORD>` is the password that was needed when creating the account, if the default account's init password is empty.

Once the account is unlocked, execute the following command:

```bash
starcoin% account transfer -s 0xf096a2a61d3042774187a462a5394537 -r 0xbabb67fa74c24466c500e642c79437de -v 10000 -b
```

- `-s 0xf096a2a61d3042774187a462a5394537`: is Alice's account address.
- `-r 0xbabb67fa74c24466c500e642c79437de`: is Bob's account address.

> If, Bob's account does not yet exist on the chain, the transfer transaction will automatically create Bob's account on the chain.

At this point, the transaction has been submitted to the chain.
You still need to wait a few seconds (`dev` environment block time is relatively short, maybe longer in `test` environment) to let the transaction included the chain.
Then check Bob's account information again:

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

Bob has the money now!

At this point, you have successfully completed an on-chain transfer.
