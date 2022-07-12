# Proof

Starcoin 区块链的所有数据都存储在一个单一版本的分布式数据库中， Proof 是用来确定一个交易或区块或状态是否包含在区块链中。

在区块链中，客户端不需要信任它所接收数据的实体。客户端可以查询一个账户的状态，询问一个特定的交易或一个特定的区块是否被处理，等等。与其他 Merkle trees 一样，账本历史可以提供一个时间复杂度为 O(log N) 大小的特定交易对象的证明，其中 N 是所处理交易的总数。


#### 节点证明类型

* Block Accumulator Proof
* Transaction Accumulator Proof
* State Proof
* Event Proof
