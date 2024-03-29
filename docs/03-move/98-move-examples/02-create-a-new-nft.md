# Create a new NFT

In this chapter, we will focus on how to create a custom non-fungible token on the Starcoin blockchain. Let's get started.

## Required

First, start a dev network described in [How to set up a local dev network](../../02-getting-started/02-setup/03-dev-network.md) and get some coins, say `1000000000`.

In this document, I will use `0xb19b07b76f00a8df445368a91c0547cc`, the default account address of my dev network, to represent the person who issues and send the new token.

The source file can be found at [simple-nft](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/simple-nft).

## Compile the module

Clone the code from github and enter the `simple-nft` folder:

```bash
git clone https://github.com/starcoinorg/starcoin-cookbook.git
cd starcoin-cookbook/examples/simple-nft
```

Replace the SNFT address with your default address in the `Move.toml` file.

```toml
[addresses]
StarcoinFramework = "0x1"
SNFT = "0xb19b07b76f00a8df445368a91c0547cc"
```

Run mpm release in another shell console for release package:

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::SimpleNFT
         0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts
Release done: release/simple-nft.v0.0.1.blob, package hash: 0x39bf53490461a9ccf07804312561280e7dafa4ba8ea102913c022de5c9a80555
```

It will compile the module, and then you will get the binary package `simple-nft.v0.0.1.blob` in `release` folder. We will use it then.

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

Get some STC coin from `dev` net, and it will send `1000000000` STC to the account by default.

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## Deploy module

Then, unlock the account and deploy `SimpleNFT` module and `SimpleNFTScripts` module.

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

You can see that the transation is submitted and the result status is `Executed`. That means the module has been deployed.

## Execute script function

First，execute the initialize transaction in starcoin console:

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts::initialize -b
```

Then, mint a test nft:

```bash
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::SimpleNFTScripts::test_mint_with_image_data -b
```

Last, run `account nft list` to check the NFT in the account:

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

We can now see a NFT witd `id` 1 in your account.
