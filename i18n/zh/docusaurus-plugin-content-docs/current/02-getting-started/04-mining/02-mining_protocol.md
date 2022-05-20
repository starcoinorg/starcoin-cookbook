本文介绍 Starcoin 挖矿的 stratum 协议以及实现矿池时相关的 API 使用
### POW
Starcoin pow hash 算法为 cryptonight-rs
* [C library](https://github.com/starcoinorg/starcoin/tree/master/consensus/cryptonight-rs/ext)
* [Python library](https://pypi.org/project/py-cryptonight/)
* 或参考 [xmrig](https://github.com/xmrig/xmrig)
#### 计算 hash
[rust reference](https://github.com/starcoinorg/starcoin/blob/master/consensus/src/cn.rs#L29-L39)


minting_blob 为76字节的数组。 (35..39] 4个字节为可修改的扩展字段, (39..43] 4个字节为 nonce 。
``` rust
fn calculate_pow_hash(minting_blob: [u8;76], nonce: u32, extra: [u8;4]) -> Hash{
    minting_blob[35..39]=extra; 
    minting_blob[39..43].write_u32::<LittleEndian>(nonce); //(39..43) 为 u32 的 nonce 的小端编码
    let pow_hash = cryptonight_r(input=minting_blob,variant=4,height=0);
    return pow_hash
}
``` 
#### 难度校验
[rust reference](https://github.com/starcoinorg/starcoin/blob/master/consensus/src/consensus.rs#L85-#L117)

### 获取出块任务
#### Pubsub json rpc
支持 websocket or tcp
``` bash
# wsc is a WebSocket client for the terminal
$wsc ws://localhost:9870
> {"jsonrpc": "2.0", "method": "starcoin_subscribe", "params": [{"type_name":"newMintBlock"}], "id": 1}
```

``` json
{
  "jsonrpc": "2.0",
  "method": "starcoin_subscription",
  "params": {
    "subscription": 1,
    "result": {
      "parent_hash": "0xd401460f95556f2983815b5e00a56f36be289e3c5b61ce62af616fe83874f6ae",
      "strategy": {
        "type": "CryptoNight"
      },
      "minting_blob": "e97c0eab7fdab0f4a053251062701a878800f52f016ffbd1331c7f79c3d895610000000000000000000000000000000000000000000000000000000000000000000000000000000000019cb4",
      "difficulty": "0x019cb4",
      "block_number": 446
    }
  }
}

```
#### JSON rpc
支持 tcp/websocket/http/ipc
``` bash
curl http://localhost:9850 -X POST \
-H 'Content-Type: application/json' \
-d '{
    "id":"curltest",
    "jsonrpc":"2.0",
    "method":"mining.get_job",
    "params":[]
}'
```
``` json
{
  "jsonrpc": "2.0",
  "result": {
    "parent_hash": "0xd401460f95556f2983815b5e00a56f36be289e3c5b61ce62af616fe83874f6ae",
    "strategy": {
      "type": "CryptoNight"
    },
    "minting_blob": "e97c0eab7fdab0f4a053251062701a878800f52f016ffbd1331c7f79c3d895610000000000000000000000000000000000000000000000000000000000000000000000000000000000019cb4",
    "difficulty": "0x019cb4",
    "block_number": 446
  },
  "id": "curltest"
}
```
### 提交 Seal

```bash
curl --data-binary '{\
  "jsonrpc": "2.0",\
  "id": "curltext",\
  "method": "mining.submit",\
  "params": [\
    "59756e812a060cf8bcedbf4cc37c25f30c479874d1dfa1cfa26f3ecac252e3dc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000ee",\
    1024,\
    "00000000"\
  ]\
}' -H 'Content-Type: application/json'  http://localhost:9850
```
params 中的三个参数分别为 minting_blob, nonce, extra

### stratum 协议
[starcoin stratum protocol](https://github.com/starcoinorg/starcoin/blob/master/stratum/stratum_mining_protocol.md)

注意: 
1. target 的计算
2. blob 中 extra 的填充

### 区块奖励
```bash
reward = coinbase + 0.1 * coinbase * uncle_number + gas_fee
```

[python reference](https://github.com/starcoinorg/starcoin-sdk-python/blob/master/starcoin/sdk/client.py#L192-L217)


### 转账,查询余额
1. 利用节点进行签名, http api封装进行交易发起，请参考 [example](https://github.com/fikgol/starcoin-py2-example/blob/master/p2p_transfer.py)
2. 使用 sdk 发起交易
   * [python3](https://github.com/starcoinorg/starcoin-sdk-python/blob/master/examples/p2p_transfer.py)
   * [starcoin.js](https://github.com/starcoinorg/starcoin.js)
3. 查询余额
   [python reference](https://github.com/starcoinorg/starcoin-sdk-python/blob/master/starcoin/sdk/client.py#L146-L155)

4. 默认挖矿地址为节点default address, 可倒入只读账号作为 default address
    ```bash
    starcoin% account import-readonly --help
    USAGE:
        account import-readonly -i <input> [account_address]
    OPTIONS:
        -i <input>        input of public key
    ARGS:
        <account_address>    if account_address is absent, generate address by public_key
    ```
