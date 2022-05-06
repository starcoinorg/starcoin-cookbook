# Merkle Tree
Merkle Tree又被称为二叉哈希树，主要用在文件系统或者P2P系统中。下面这个图说明，
有 A, B, C, D 四个交易在虚线框内，在 Merkle Tree中属于 Data Blocks， 这部分叫做 LeafNode, 上面的虚线框属于Hash Pointers。
Hash 1的值是交易A的Hash值和交易B的Hash值拼接后计算的Hash值(也可以有其他算法)，在图中是H(A) H(B),
其中Hash(1) = Hash(H(A) + H(B))， 这里 + 表示字符串拼接，
Hash 2的值是交易C和交易D的Hash值拼接后计算的Hash值，在图中是H(C) H(D), 其中Hash(2) = Hash(H(C) + H(D))，
Hash 3是Hash 1和Hash 2拼接计算的Hash值，在图中是H(AB) H(CD), 其中Hash(3) = Hash(Hash(1) + Hash(2))，
Hash 3也叫做Root_Hash
![merkle tree](../../../../../static/img/merkle_tree/merkle_tree.png)

Merkle Tree有以下作用

## 快速定位修改
如果交易 A 被修改后，Hash 1 也会被修改,Root_Hash 也会被修改，
所以可以认为记住 Root_Hash 就记住了整个 Merkle Tree

## 校验交易
Merkle Tree的作用可以检验交易是否有效，在区块链 Light Node不会记录所有交易数据, 只会记录Merkle Tree的Root_Hash值，
如果校验交易A是否存在， 这时候是把交易 A 的Hash值这里记为Hash(A)发送给校验方, 校验方发送一个Hash值列表[Hash(B), Hash(CD)]。
如果保存的Root_Hash和Hash(Hash(Hash(A) + Hash(B)) + Hash(CD))相等， 证明交易A是存在的。 这个过程叫做Merkle Proof