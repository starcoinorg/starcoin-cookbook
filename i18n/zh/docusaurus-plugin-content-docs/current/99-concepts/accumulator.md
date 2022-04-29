--- 
sidebar_position: 2
---

# Accumulator

介绍Accumulator之前，先了解下什么是[Merkle Tree](merkle_tree.md)。
在starcoin中，Accumulator可以认为是MerKle Tree存储在KvStore上。

## 用途
这颗树的作用主要是提供Block，Transaction的Merkle Proof，以及通过指序列号获取对应的Block(Transaction类似)。
下面介绍下在starcoin中Accumulator的一些信息。

##节点类型介绍
节点分为三种类型Leaf, Internal, Empty。
这里以存储Block为例子(存储Transaction类似)。
图1显示了偶数个Block组成一个Accumlator的情况(这里只有Leaf和Internal)
![even_accumulator.png](../../../../../static/img/accumulator/even_accumulator.png)

最下面Leaf那层的Hash0代表Block 0的Hash值, Hash1代表Block 1的值, Hash2, Hash3类似。
这里Internal01的左子树是Block 0的Hash值，右子树是Block 1的Hash值。
Internal 01的Hash01 = Hash(Hash0 + Hash1), +代表拼接字符串。
在Accumlator中Internal节点的Hash值计算方法是左子树Hash值和右子树Hash值拼接后再Hash计算下，Hash计算的函数是sha3_256。
这里从Block 0开始是因为在区块链中有创世块(Genesis Block)。最上面的根节点叫做Root_Hash,

![odd_accumulator_origin.png](../../../../../static/img/accumulator/odd_accumulator_origin.png)
图2显示了奇数个Block组成一个Accumulator的情况,在图1上面增加了Block 4, 由于Block 4生成Internal需要Empty节点来配对,这里Empty就是PlaceHolder
这种情况下要补充多个PlaceHolder,这里做了些优化，空子树用PlaceHolder表示来减少计算， 如图3

![odd_accumulator.png](../../../../../static/img/accumulator/odd_accumulator.png)


上面这些图中，按照(Hash(Block), Block)KV对的形式存在KvStore中。 Merkle Tree是在内存中的形式, Accumulator需要把Merkle Tree保存在KvStore中。


#Accumulator的信息
在[Merkle Tree](merkle_tree.md)中可以提到可以认为有Root_Hash就是有了Accumulator，
但是只有Accumulator对整棵树还是确实些信息，这里AccumulatorInfo添加了一些其他信息。
首先是frozen子树，这里先解释下节点的frozen。
PlaceHolder是not frozen的, Leaf都是frozen的,  Internal的frozen是递归定义，是指左子树和右子树中都是frozen的。
一个Accumlator中节点数目指所有frozen的节点,在图1中是7个，图3中是9个
对应了整棵树的信息
这部分对应数据结构是
```rust
pub struct AccumulatorInfo {
    /// Accumulator root hash
    pub accumulator_root: HashValue,
    /// Frozen subtree roots of this accumulator.
    pub frozen_subtree_roots: Vec<HashValue>,
    /// The total number of leaves in this accumulator.
    pub num_leaves: u64,
    /// The total number of nodes in this accumulator.
    pub num_nodes: u64,
}
```
在图1中frozen_subtree_roots只有一个就是Root_Hash(accumulator_root)。
图3中有2个都标出来了,他们好Root_Hash不同。

在Merkle Tree中提到记住Root_Hash就可以认为是记住了整棵树, 在starcoin中，需要保证Accumulator是幂等的，


## Accumulator中API说明
下面Leaf和Internal在代码中的定义
```rust

```







