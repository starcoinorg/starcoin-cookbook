# How to call a function

In the [Quick Start](./02-quick-start.md) tutorial, we experimented with how to call script functions. So how to call ordinary functions?

Next, a small example will show how to call ordinary functions.

## Program source code

```move
module MyAddr::EthSigVerifier {
   use StarcoinFramework::Signature;
   use StarcoinFramework::EVMAddress::{Self, EVMAddress};
   use StarcoinFramework::Option::{Self, Option};


   public fun verify_eth_sig(signature: vector<u8>, addr: vector<u8>, message: vector<u8>) : bool{
      let receover_address_opt:Option<EVMAddress>  = Signature::ecrecover(message, signature);
      let expect_address =  EVMAddress::new(addr);
      &Option::destroy_some<EVMAddress>(receover_address_opt) == &expect_address
   }

   #[test]
   public fun verify_eth_sig_test(){
      let signature = x"90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c";
      let msg_hash = x"b453bd4e271eed985cbab8231da609c4ce0a9cf1f763b6c1594e76315510e0f1";
      let address_bytes = x"29c76e6ad8f28bb1004902578fb108c507be341b";
      assert!(verify_eth_sig(signature, address_bytes, msg_hash), 101);
   }
}
```

```toml title="test/Move.toml" {7}
[package]
name = "did"
version = "0.0.1"

[addresses]
StarcoinFramework = "0x1"
MyAddr = "0x68a0e9bab71d6493456432a676a4a915"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
```

> Note that replace the `MyAddr` field with the address where you actually deployed the contract.

## Compile and deploy the contract

1. Packaging modules

```shell
$ mpm release

Packaging Modules:
         0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier
Release done: release/test.v0.0.0.blob, package hash: 0x7cf72e1b608844086ad90bd703173fafe0bdc917d8374c078fbd4408a4074312
```

2. Unlock account

```shell
starcoin% account unlock 0x68a0e9bab71d6493456432a676a4a915 -p <MY-PASSWORD>
```

3. Deploy the module in the Starcoin console

```shell
starcoin% dev deploy /home/ubuntu/i/m-pra/test/release/test.v0.0.0.blob -s 0x68a0e9bab71d6493456432a676a4a915 -b

txn 0xfd4775eaecd962dcfa3197bd5ba954226243fdf97a112116630c58935ea970e1 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "7800",
      "status": "Executed",
      "write_set": [
        {
......
```

## Call function

```shell
starcoin% dev call --function 0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier::verify_eth_sig --arg x"90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c" --arg x"29c76e6ad8f28bb1004902578fb108c507be341b" --arg x"b453bd4e271eed985cbab8231da609c4ce0a9cf1f763b6c1594e76315510e0f1"

{
  "ok": [
    true
  ]
}
```


## Call functions via RPC

After publishing to the chain, we can call it through the API interface or SDK.

Use the curl command to call the function remotely:

```shell
$ curl 'http://localhost:9850/' -H 'content-type: application/json' --data-raw '{"jsonrpc":"2.0","method":"contract.call_v2","params":[{"function_id":"0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier::verify_eth_sig","args":["x\"90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c\"","x\"29c76e6ad8f28bb1004902578fb108c507be341b\"","x\"b453bd4e271eed985cbab8231da609c4ce0a9cf1f763b6c1594e76315510e0f1\""],"type_args":[]}],"id":0}'

{"jsonrpc":"2.0","result":[true],"id":0}
```

## Summary

The Starcoin console command used to call a normal function is `dev call --function`, and the Starcoin console command to call a script function is `account execute-function --function`.
