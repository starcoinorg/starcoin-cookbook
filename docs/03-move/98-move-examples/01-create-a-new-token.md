# Create a new Token

In this chapter, we will focus on how to create a custom non-fungible token on the Starcoin blockchain. Let's get started.

## Required

First, start a dev network described in [How to set up a local dev network](../../02-getting-started/02-setup/03-dev-network.md) and get some coins, say `1000000000`.

In this document, I will use `0xb19b07b76f00a8df445368a91c0547cc`, the default account address of my dev network, to represent the person who issues and send the new token. And I also created another account `0x831d51f0087596e6aa4e7b3b9c85f945` and transfer some STC to it. The account will be used to receive the token.

The source file can be found at [my-token](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-token).

## Compile the module

Change the address of the module:

- edit `Move.toml`
- change `MyToken = "0xABCDE"` to `MyToken = "0xb19b07b76f00a8df445368a91c0547cc"`

Then open a console and run the following command:

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyToken
Release done: release/my_token.v0.0.1.blob, package hash: 0xc3b9cf32499f4bdf0a38d57f7c7c66a6f4df69881a8980bcda2106782dce88ba
```

It will compile the module, and then you will get the binary package `my_token.v0.0.1.blob` in `release` folder. We will use it then.

## Import account

We will need to import `0xb19b07b76f00a8df445368a91c0547cc` account to deploy the module.

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

## Get devnet test coins

Get some STC coin from `dev` net. This command can only be used in dev net.

```bash
dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## Deploy module

Then, unlock the account and deploy `MyToken` module.

```bash
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p <MY-PASSWORD>
```

```bash
starcoin% dev deploy /path/to/my-token/release/my_token.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b

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

You can see that the transation is submitted and the result status is `Executed`. That means the module has been deployed.

## Execute script function

First，use the account `0xb19b07b76f00a8df445368a91c0547cc` to initial module via `init` function.

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyToken::init -s 0xb19b07b76f00a8df445368a91c0547cc --blocking
```

Second, use the account `0xb19b07b76f00a8df445368a91c0547cc` to mint some MyToken.

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyToken::mint --blocking --arg 1000000u128 -s 0xb19b07b76f00a8df445368a91c0547cc
```

Third, use the account `0xb19b07b76f00a8df445368a91c0547cc` to transfer 1000 MyToken to another user `0x831d51f0087596e6aa4e7b3b9c85f945`.

```bash
starcoin%  account execute-function --function 0x1::TransferScripts::peer_to_peer_v2 -t 0xb19b07b76f00a8df445368a91c0547cc::MyToken::MyToken --arg 0x831d51f0087596e6aa4e7b3b9c85f945 --arg 10000u128 -s 0xb19b07b76f00a8df445368a91c0547cc
```

Last, show balances of the second user.

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
      "0xb19b07b76f00a8df445368a91c0547cc::MyToken::MyToken": 10000    <- Note that MyToken has been successfully received
    },
    "sequence_number": 3
  }
}
```

