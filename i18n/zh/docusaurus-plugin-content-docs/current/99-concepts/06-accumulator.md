# Accumulator

介绍 Accumulator 之前，先了解下什么是 [Merkle Tree](00-merkletree.md)。
在 Starcoin 中，Accumulator 可以认为是 Merkle Tree 存储在 KvStore 上。

## 用途

这颗树的作用主要是提供 Block，Transaction 的 Merkle Proof，以及通过指序列号获取对应的 Block（Transaction类似）。
下面介绍下在 Starcoin 中 Accumulator 的一些信息。

## 节点类型介绍

节点分为三种类型 Leaf，Internal，Empty。
这里以存储 Block 为例子（存储 Transaction类似）。
图1显示了偶数个 Block 组成一个 Accumlator 的情况（这里只有 Leaf 和 Internal）
![even_accumulator.png](../../../../../static/img/accumulator/even_accumulator.png)

最下面 Leaf 那层的 Hash0 代表 Block0 的 Hash 值，Hash1 代表 Block1 的值， Hash2，Hash3 类似。
这里 Internal01 的左子树是 Hash0，右子树是 Hash1。
Internal 01 的 Hash01 = Hash(Hash0 + Hash1)，+ 代表拼接字符串。
在 Accumlator 中 Internal 节点的 Hash 值计算方法是左子树 Hash 值和右子树 Hash 值拼接后再 Hash 计算下，Hash 计算的函数是 sha3_256。
这里从 Block0 开始是因为在区块链中有创世块（Genesis Block），最上面的根节点叫做 Root_Hash。

![odd_accumulator_origin.png](../../../../../static/img/accumulator/odd_accumulator_origin.png)
图2显示了奇数个 Block 组成一个 Accumulator 的情况，在图1基础上添加了 Block4，由于 Block4 构建 Internal 需要 Empty 节点来配对，这里 Empty 节点就是 PlaceHolder。
这种情况下要补充多个 PlaceHolder，这里做了些优化，空子树用 PlaceHolder 表示来减少计算， 这里 PlaceHolder 有固定的 Hash 值ACCUMULATOR_PLACEHOLDER_HASH，如图3。

![odd_accumulator.png](../../../../../static/img/accumulator/odd_accumulator.png)

图3中，`(Hash(Block), Block)` 会按照 Key Value 键值对的形式存在 KvStore 中。
这里给出代码中 Leaf 和 Internal 的定义
```rust
pub enum AccumulatorNode {
    Internal(InternalNode),
    Leaf(LeafNode),
    Empty,
}
pub struct InternalNode {
    index: NodeIndex,
    left: HashValue,
    right: HashValue,
    is_frozen: bool,
}
pub struct LeafNode {
    index: NodeIndex,
    hash: HashValue,
}
