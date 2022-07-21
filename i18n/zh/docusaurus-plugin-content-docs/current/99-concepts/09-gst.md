# 全局状态树

全局状态树 GlobalStateTree 存储了链上所有用户账号的状态。
Starcoin 区块链使用双层的稀疏默克尔树 SparseMerkleTree 作为状态树，如下图所示：

![SparseMerkleTree](../../../../../static/img/key_words/State.png)

上图红圈表示叶子节点，蓝圈表示中间节点，绿色正方块表示占位符（表示子树下没有任何数据）。

由于 Starcoin 账号既存储状态数据，也存储代码数据，所以通过两层三个稀疏默克尔树来存储所有状态：

* AccountTree：账号树，Root 是 BlockHeader 的 `state_root`
* StateTree：状态树
* CodeTree：代码树

如图中所示，如果要证明 b 账号的状态有效，Proof 是 acd。

关于状态的详细描述，请参见[状态](04-state.md)。
