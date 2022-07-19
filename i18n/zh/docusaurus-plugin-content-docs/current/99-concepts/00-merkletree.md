# Merkle Tree

Merkle Tree 又被称为二叉哈希树，主要用在文件系统或者 P2P 系统中。
下面这个图说明，有 A，B，C，D 四个交易在虚线框内，在 Merkle Tree 中属于 Data Blocks，这部分叫作叶子节点（LeafNode），上面的虚线框属于 Hash Pointers。
Hash 1 的值是交易 A 的 Hash 值和交易 B 的 Hash 值拼接后计算的 Hash 值(也可以有其他算法)。
在图中是 H(A) H(B)，其中 Hash(1) = Hash(H(A) + H(B))， 这里 + 表示字符串拼接。
Hash 2 的值是交易 C 和交易 D 的 Hash 值拼接后计算的 Hash 值，在图中是 H(C) H(D)，其中 Hash(2) = Hash(H(C) + H(D))。
Hash 3 是 Hash 1 和 Hash 2 拼接计算的 Hash 值，在图中是 H(AB) H(CD)，其中 Hash(3) = Hash(Hash(1) + Hash(2))，Hash 3 也叫做 `Root_Hash`。

![merkle tree](../../../../../static/img/merkle_tree/merkle_tree.png)

Merkle Tree 有以下作用：

## 快速定位修改

如果交易 A 被修改后，Hash 1 也会被修改，`Root_Hash` 也会被修改，
所以可以认为记住 `Root_Hash` 就记住了整个 Merkle Tree

## 校验交易

Merkle Tree 的作用可以检验交易是否有效，在区块链轻节点（Light Node）不会记录所有交易数据，只会记录 Merkle Tree 的 `Root_Hash` 值。
如果校验交易 A 是否存在，这时候是把交易 A 的 Hash 值这里记为 Hash(A) 发送给校验方，校验方发送一个 Hash 值列表 `[Hash(B), Hash(CD)]`。
如果保存的 `Root_Hash` 和 `Hash(Hash(Hash(A) + Hash(B)) + Hash(CD))` 相等，证明交易 A 是存在的。这个过程叫做 Merkle Proof。
