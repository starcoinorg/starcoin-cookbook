--- 
sidebar_position: 2
---

# Accumulator

介绍Accumulator之前，先了解下什么是[Merkle Tree](merkle_tree.md)。
在starcoin中，Accumulator可以认为是Merkle Tree存储在KvStore上。

## 用途
这颗树的作用主要是提供Block，Transaction的Merkle Proof，以及通过指序列号获取对应的Block(Transaction类似)。
下面介绍下在starcoin中Accumulator的一些信息。

##节点类型介绍
节点分为三种类型Leaf， Internal， Empty。
这里以存储Block为例子(存储Transaction类似)。
图1显示了偶数个Block组成一个Accumlator的情况(这里只有Leaf和Internal)
![even_accumulator.png](../../../../../static/img/accumulator/even_accumulator.png)

最下面Leaf那层的Hash0代表Block0的Hash值， Hash1代表Block1的值， Hash2， Hash3类似。
这里Internal01的左子树是Hash0，右子树是Hash1。
Internal 01的Hash01 = Hash(Hash0 + Hash1)， +代表拼接字符串。
在Accumlator中Internal节点的Hash值计算方法是左子树Hash值和右子树Hash值拼接后再Hash计算下，Hash计算的函数是sha3_256。
这里从Block0开始是因为在区块链中有创世块(Genesis Block)，最上面的根节点叫做Root_Hash。

![odd_accumulator_origin.png](../../../../../static/img/accumulator/odd_accumulator_origin.png)
图2显示了奇数个Block组成一个Accumulator的情况，在图1上面增加了Block4， 由于Block4构建Internal需要Empty节点来配对，这里Empty节点就是PlaceHolder。
这种情况下要补充多个PlaceHolder，这里做了些优化，空子树用PlaceHolder表示来减少计算， 这里PlaceHolder有固定的Hash值ACCUMULATOR_PLACEHOLDER_HASH，如图3。

![odd_accumulator.png](../../../../../static/img/accumulator/odd_accumulator.png)

上面这些图中，(Hash(Block), Block)会按照KV对的形式存在KvStore中。 

#节点的frozen
Merkle Tree是在内存中的形式, Accumulator需要把Merkle Tree保存在KvStore中。
一种直观的想法就是把把所有的Leaf节点保存下来，比如图3中，保存Hash0，Hash1， Hash2， Hash3， Hash4，还需要保存这些顺序关系，
第一次用的时候计算就可以构建Merkle Tree，图3中需要计算6次，也挺快的。
当Leaf数量比较大的时候，比如2^23个Leaf(大概800万个Block,)，就需要需要2^23次sha3_256计算，这个数量级是O(N)的有点慢。
需要加速下计算的过程，这里注意到Merkle Tree是只添加不会出现删除和更新的情况，
比如在图3中，Hash0，Hash1，Hash2，Hash3构建成的子Accumulator是Hash(Hash01 + Hash23)， 再添加新的Leaf，不会被修改它。
可以基于这些已经固定的子Accumulator进行加速计算。这里引入了frozen的概念。
PlaceHolder是not frozen的, Leaf都是frozen的,  Internal的frozen是递归定义，是指左子树和右子树中不含有PlaceHolder节点。
一个Accumlator中节点数目指所有frozen的节点,在图1中是7个，图3中是9个。
一个Accumulator可以通过Root_Hash和frozen_subtree_roots快速确定下来。
这里就引入了AccumulatorInfo, 这部分数据结构如下
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
在图1中frozen_subtree_roots元素只有一个就是Root_Hash(accumulator_root)。
图3中有2个都标出来了,他们和Root_Hash不同。
这里我们可以证明frozen_subtree_roots最多只有64个。
证明如下，假设有n个节点，假设 2^k <= n < 2^(k + 1), 最大的那颗frozen_subtree用的节点数是2^k，第二大的frozen_subtree用的子节点数是2^k1，
由于1 + 2^1 + .... + 2^63 = 2^64 - 1最多有64个节点数。
由于HashValue使用sha3_256计算占8个字节，一个AccumulatorInfo占的内存最大是(1 + 64 + 2) * 8个字节。
在Merkle Tree中提到记住Root_Hash就可以认为是记住了整棵树, 在starcoin中，需要保证Accumulator是幂等的，


## Accumulator中API说明
下面Leaf和Internal在代码中的定义
```rust

```


在[Merkle Tree](merkle_tree.md)中可以提到可以认为有Root_Hash就是有了Accumulator，
但是只有Accumulator对整棵树还是缺失信息，这里AccumulatorInfo添加了一些其他信息。




