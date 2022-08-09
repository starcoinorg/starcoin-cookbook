# 如何调用函数

在[快速开始](./02-quick-start.md)这一节教程中，我们尝试了如何调用脚本函数。
那么普通函数改如何调用呢？

接下来将通过一个小例子来展示如何调用普通函数。

## 程序源码

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

> 注意更换 `MyAddr` 字段为你实际部署合约的地址。

## 编译并部署合约

1. 打包模块

```shell
$ mpm release

Packaging Modules:
         0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier
Release done: release/test.v0.0.0.blob, package hash: 0x7cf72e1b608844086ad90bd703173fafe0bdc917d8374c078fbd4408a4074312
```

2. 解锁账户

```shell
starcoin% account unlock 0x68a0e9bab71d6493456432a676a4a915 -p <MY-PASSWORD>
```

3. 在 Starcoin 控制台部署模块

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

## 调用函数

```shell
starcoin% dev call --function 0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier::verify_eth_sig --arg x"90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c" --arg x"29c76e6ad8f28bb1004902578fb108c507be341b" --arg x"b453bd4e271eed985cbab8231da609c4ce0a9cf1f763b6c1594e76315510e0f1"

{
  "ok": [
    true
  ]
}
```

## 通过 RPC 调用函数

在发布到链上后，我们可以通过 API 接口或者 SDK 来调用。

使用 curl 命令来远程调用函数：

```shell
$ curl 'http://localhost:9850/' -H 'content-type: application/json' --data-raw '{"jsonrpc":"2.0","method":"contract.call_v2","params":[{"function_id":"0x68a0e9bab71d6493456432a676a4a915::EthSigVerifier::verify_eth_sig","args":["x\"90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c\"","x\"29c76e6ad8f28bb1004902578fb108c507be341b\"","x\"b453bd4e271eed985cbab8231da609c4ce0a9cf1f763b6c1594e76315510e0f1\""],"type_args":[]}],"id":0}'

{"jsonrpc":"2.0","result":[true],"id":0}
```

## 总结

调用*普通函数*使用的 Starcoin 控制台命令是 `dev call --function`，而调用*脚本函数*的 Starcoin 控制台命令则是 `account execute-function --function`。
