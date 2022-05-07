# Deploy your first Move contract

This article guides you on how to compile and deploy a Move contract to the starcoin blockchain.

Move is a new programming language developed to provide a safe and programmable foundation for the Diem Blockchain. Starcoin Blockchain also support Move language to write smart contract.

In this article, you will learn:  

- How to setup Move develop folder and config.
- How to package(or compile) a Move module.
- How to deploy the compiled binary to the starcoin blockchain.

First start a dev network as described in [How to set up a local dev network](../02-getting-started/02-setup/03-dev-network.md), get some coins, and unlock your account. Here assume your account address is 0xb19b07b76f00a8df445368a91c0547cc .

```bash
starcoin% dev get-coin 0xb19b07b76f00a8df445368a91c0547cc
starcoin% account unlock 0xb19b07b76f00a8df445368a91c0547cc -p my-pass
```

Then, let's get started!

1. Assume you are working under folder `/your/dev/path/my-counter/`, setup your develop folder with the tree below. 

```
.
├── Move.toml
└── sources
    └── MyCounter.move
```

The file `Move.toml` and folder `sources` are required by the mpm package tool, which should not be modified. All the Move modules are putting under `sources/` folder. Here say a simple module: MyCounter.

2. Code your Move module. The source file is at [my-counter](https://github.com/starcoinorg/starcoin-cookbook/blob/main/examples/my-counter/sources/MyCounter.move).

```
module MyCounter::MyCounter {
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

3. Compile the module.  

Change the address of the module:

- edit [Move.toml](https://github.com/starcoinorg/starcoin-cookbook/blob/main/examples/my-counter/Move.toml)
- MyCounter = “0xABCDE” to MyCounter = “0xb19b07b76f00a8df445368a91c0547cc”

> A Move module should be declared with `module <Account>::<ModuleName> {`, and you must assign the variable `Account` you account address in the `Move.toml` file. In this example, it's the first `MyCounter` in the first line.

Then, in console, run:

```bash
$ mpm release

Packaging Modules:
         0xb19b07b76f00a8df445368a91c0547cc::MyCounter
Release done: release/my_counter.v0.0.1.blob, package hash: 0xa7e3c02c102c85708c6fa8c9f84064d09cf530b9581278aa92568d67131c3b6d
```

It will compile the module, you will get the binary package at `release/my_counter.v0.0.1.blob`.

4. deploy to blockchain

```bash
starcoin% dev deploy /your/dev/path/my-counter/release/my_counter.v0.0.1.blob -s 0xb19b07b76f00a8df445368a91c0547cc -b
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

:::note

More docs: 

* https://starcoin.org/en/developer/tutorials/deploy_move_contract/
* https://starcoin.org/zh/developer/tutorials/deploy_move_contract/

:::