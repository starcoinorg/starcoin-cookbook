# 区块

一个区块包含了一批有序的交易，和一些其他的关键数据：

- **父区块哈希** —— 通过引用父区块哈希的方式，把所有区块链起来
- **区块高度** —— 在父区块的高度上递增
- **状态根哈希** —— 区块执行后的最终状态树的根哈希
- **交易累加器根哈希** —— 区块执行后的所有交易累加器的根哈希
- **区块累加器根哈希** —— 区块执行后的所有区块ID累加器的根哈希

## 区块体

区块 Block 包含了一批有序的交易，并且也包括了这些交易按顺序执行之后的状态。
区块是 Starcoin 区块链的核心概念，如图所示：

![Block](../../../../../static/img/key_words/Block.png)

Block 包含了 BlockHeader 和 BlockBody。其中 BlockBody 包含了两部分：

- **uncles** —— 叔块 BlockHeader 数组，可选，参看[区块头](#区块头)
- **transactions** —— 交易数组，参看[交易](02-transaction.md)

## 区块头

区块头（BlockHeader）表示了当前区块包含的所有交易执行完之后，链所处的状态。
BlockHeader 是 Starcoin 区块链的核心概念，包含了重要的数据。

![BlockHeader](../../../../../static/img/key_words/BlockHeader.png)

图中各字段表示的意思如下：

- `parent_hash` —— **父区块哈希**， 32字节，通过引用父区块哈希的方式，把所有区块链起来
- `timestamp` —— **时间戳**，8字节
- `number` —— **区块高度**，8字节，在父区块的高度上递增（目前已废弃）
- `author` —— **矿工签名**，16字节（目前已废弃）
- `author_auth_key` —— **矿工的 auth_key**，32字节，可选，用于第一次创建矿工的链上账号（目前已废弃）
- `txn_accumulator_root` —— 当前区块的所有交易执行完之后，交易的 Merkle 累加器 root，32字节，参看[默克尔累加器](06-accumulator.md)
- `block_accumulator_root` —— 父区块的 Merkle 累加器 root，32字节，参看[默克尔累加器](06-accumulator.md)
- `state_root` —— 当前区块的所有交易执行完之后，全局状态树 root，32字节，参看[全局状态树](09-gst.md)
- `difficulty` —— **当前区块的最小难度**，32字节
- `body_hash` —— **当前区块的 BlockBody 的哈希**，32字节
- `gas_used` —— **当前 Block 的所有交易消耗的总 Gas**，8字节
- `chain_id` —— **网络标识**，1字节，区分不同网络
- `nonce` —— 计算出来的 nonce，4字节，nonce 是一个用于计算难度的随机数。
- `extra` —— 区块头的扩展数据，4字节

