# How to deploy Move smart contracts

In the [quick start](./02-quick-start.md), I believe you have understood the whole process of writing, compiling and deploying smart contracts.

In this article, the deployment of smart contracts will be explained in more detail.

## Background

Move language is a *domain-specific language (DSL)* developed by Meta (formerly Facebook) for the *Libra* project (later renamed *Diem*).
As a smart contract programming language for *resource-oriented programming*, the Move language undoubtedly injects new vitality into blockchain technology.
*Starcoin blockchain* is **the first public chain to use the Move language**.
As a contributor and beneficiary of the Move language, Starcoin has been working hard to build the *Move ecology*.

Although Diem ended up due to some irresistible factors, a batch of advanced technologies born in the process have undoubtedly injected new vitality into the Web3 world. Many technicians who are enthusiastic about blockchain technology and look forward to the beautiful world of Web3 have rushed to a new voyage.
Using the open source technology left by *Diem blockchain*, they have built two new public chains *Aptos* and *Sui* based on Move language to write smart contracts (It is currently in the test network stage.).

*Starcoin*, *Aptos* and *Sui*, the three major public chains in the Move ecology, are emitting and heating the Move ecology with the momentum that the spark can start a prairie fire.

## The importance of deploying smart contracts

The development of blockchain technology has gone through two stages.
Bitcoin (BTC) has opened the *blockchain 1.0* era, and Ethereum (ETH) has opened the *blockchain 2.0* era.
The emergence of Ethereum has brought the key technology of *smart contracts* to blockchain, so that blockchain not only stays at the purpose of bookkeeping, but also brings more application expansion.
Unfortunately, smart contracts are like a double-edged sword, which not only brings many rich functional expansions, but also makes it easy for smart contract developers to inadvertently introduce unsafe code and threaten the assets of the chain.

I think writing simple, safe and deployable smart contracts should be the focus of the *blockchain 3.0* era.
The Move language for *resource-oriented programming* undoubtedly provides a good solution to this problem.

Deploying *smart contracts* is almost the most basic function of every *smart chain*.
Next, we will introduce in detail how to deploy contracts in the Starcoin blockchain.

## Preparations

Through this article, you will learn:

- How to set up working directories and configuration files for Move project development;
- How to package (compile) a Move module;
- How to deploy compiled binaries to the Starcoin blockchain.

First of all, start a *dev* network node according to the description of [How to set up a local dev network](../02-getting-started/02-setup/03-dev-network.md).
And get some test tokens of the *dev* network for the account and unlock the account.
The address `0xb19b07b76f00a8df445368a91c0547cc` is used as the account address for deploying smart contracts.

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
```

## Contract Codes

This is a [counter contract](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter) with functions such as creating counters and incremental counters.
For details, please refer to the introduction in [Quick Start](./02-quick-start.md).

Project structure:

```
.
├── Move.toml
└── sources
    └── MyCounter.move
```

```move title="my-counter/sources/MyCounter.move"
module MyCounterAddr::MyCounter {
     use StarcoinFramework::Signer;

     struct Counter has key, store {
        value:u64,
     }
     public fun init(account: &signer){
        move_to(account, Counter{value:0});
     }
     public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1;
     }

     public(script) fun init_counter(account: signer){
        Self::init(&account)
     }

     public(script) fun incr_counter(account: signer)  acquires Counter {
        Self::incr(&account)
     }
}
```

```toml title="my-counter/Move.toml" {7}
[package]
name = "my_counter"
version = "0.0.1"

[addresses]
StarcoinFramework = "0x1"
MyCounterAddr = "0xb19b07b76f00a8df445368a91c0547cc"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
```

The *Move.toml* file and *sources* directory is the basic structure of the Move project directory.

## Deployment process

All right, let's get started now!

1. Modify the contract address

Smart contracts are deployed under an account, so the value of `MyCounterAddr` in the *Move.toml* file needs to be modified to your actual account address.
Take *0xb19b07b76f00a8df445368a91c0547cc* as an example.

2. Compilation module

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyCounter
Release done: release/my-counter.v0.0.0.blob, package hash: 0x3be68089a746a7a3d1aaf2e0282a7c73f3724e07d19dbdd5d5514f01ace9a662
```

The command will compile the module and generate a binary package *release/my-counter.v0.0.1.blob*.

> Tip: Use the `pwd` command to determine the *absolute path* of the contract, which is convenient for deployment in the *Starcoin console*.

3. Unlock the account

```shell
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p <MY-PASSWORD>
```

4. Deploy to blockchain

At present, there are two command-line tools that can deploy Move binaries to the blockchain:

It is `mpm deploy` and `starcoin% dev deploy` respectively.

- mpm deploy

The deployment module requires an account signature, and the `mpm deploy` command supports three account modes:
1) local wallet; 2) private key files; and 3) environment variables.

The corresponding commands of the three account modes are as follows:

```
$ mpm deploy --rpc ws://127.0.0.1:9871 --local-account-dir /your/local/account/dir --password xxxxx /your/dev/path/my-counter/release/my-counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --secret-file /your/secret/file /your/dev/path/my-counter/release/my-counter.v0.0.1.blob

$ mpm deploy --rpc ws://127.0.0.1:9871 --from-env /your/dev/path/my-counter/release/my-counter.v0.0.1.blob
```

If you want to deploy the module to the *Barnard* test network or the *Main* network, just specify the `--rpc` option as the corresponding RPC address.

**`secret-file`** is a local file that stores the private key, which contains only one line of private keys, no other prefixes and suffixes.

The key value of the environment variable is `STARCOIN_PRIVATE_KEY`

- starcoin% dev deploy

In Starcoin console mode, run the command:

```bash
starcoin% dev deploy /your/dev/path/my-counter/release/my-counter.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b

txn 0xeb055894f0c4440608246825c238a36683a8a0ad57144e905a12398a02ce806b submitted.
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
                  "value": 292331
                }
              },
              "raw": "0xeb750400000000000000000000000000"
            }
          }
        },
  .....
  ....
}
```

Whether to deploy directly on the command line with the `mpm deploy` command or with the Starcoin console, it is mainly selected according to personal preferences or convenience.
