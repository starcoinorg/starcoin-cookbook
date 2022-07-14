# 与合约交互

这篇文章指导你如何与合约交互。通过这篇文章，你将学习到：

- 读取合约
- 写入合约
- 查看资源（Resource）

首先按照[部署你的第一个智能合约](07-deploy-first-move-contract.md)将 `MyCounter` 模块部署到区块链上。

1. 调用 init_counter 脚本函数来初始化资源。

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

2. 查看资源。

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

3. 调用 incr_counter 递增计数器。

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

4. 再次查看资源。

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

你现在可以看到计数器的值是 1。

5. 使用另一个帐户再次初始化和增加计数器。

假设新账户地址为 0x0da41daaa9dbd912647c765025a12e5a .

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
