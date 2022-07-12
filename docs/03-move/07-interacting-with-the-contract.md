# Interacting with the contract by CLI

This article guides you on how to interact with the contract. 

In this article, you will learn:

- read to contract
- write to contract
- view resource

First deploy the `MyCounter` module as described in [Deploy your first Move contract](06-deploy-first-move-contract.md) .

1. Call init_counter script function to init resource.

```
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::init_counter -s 0xb19b07b76f00a8df445368a91c0547cc -b
txn 0x0f67bab5ee5ceeb9c2fe4ffeed9ab6b79f2869e922862ec40dba8aa7787709b1 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "11667",
      "status": "Executed",
      "write_set": [
        {
          "access_path": "0x00000000000000000000000000000001/1/0x00000000000000000000000000000001::TransactionFee::TransactionFee<0x00000000000000000000000000000001::STC::STC>",
          "action": "Value",
          "value": {
            "Resource": {
              "json": {
                "fee": {
                  "value": 23334
                }
              },
              "raw": "0x265b0000000000000000000000000000"
            }
          }
        },
  .....
  .....
}
```

2. Show resource.

```
starcoin% state get resource 0xb19b07b76f00a8df445368a91c0547cc 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::Counter
{
  "ok": {
    "json": {
      "value": 0
    },
    "raw": "0x0000000000000000"
  }
}
```

3. Call incr_counter to increment counter.

```
starcoin% account execute-function --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::incr_counter -s 0xb19b07b76f00a8df445368a91c0547cc -b
txn 0x7e8d6189c144c7640cbd79617247c0e242f52df6d60c74c29250492077b1b690 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "17231",
      "status": "Executed",
      "write_set": [
        {
          "access_path": "0x00000000000000000000000000000001/1/0x00000000000000000000000000000001::TransactionFee::TransactionFee<0x00000000000000000000000000000001::STC::STC>",
          "action": "Value",
          "value": {
            "Resource": {
              "json": {
                "fee": {
                  "value": 34462
                }
              },
              "raw": "0x9e860000000000000000000000000000"
            }
          }
        },
    ......
    ......
}
```

4. Show resource again.

```
starcoin% state get resource 0xb19b07b76f00a8df445368a91c0547cc 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::Counter
{
  "ok": {
    "json": {
      "value": 1
    },
    "raw": "0x0100000000000000"
  }
}
```

You can see the counter’s value is 1 now.

5. Use another account to init and incr counter again.

Say the new account address is 0x0da41daaa9dbd912647c765025a12e5a .

```
starcoin% account execute-function -s 0x0da41daaa9dbd912647c765025a12e5a  --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::init_counter -b
starcoin% contract get resource 0x0da41daaa9dbd912647c765025a12e5a 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::Counter
starcoin% account execute-function -s 0x0da41daaa9dbd912647c765025a12e5a  --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::incr_counter -b
starcoin% contract get resource 0x0da41daaa9dbd912647c765025a12e5a 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::Counter
```

:::note

TODO

- watch events

:::