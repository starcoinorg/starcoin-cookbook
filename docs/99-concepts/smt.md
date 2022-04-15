--- 
sidebar_position: 2
---

# Sparse Merkle Tree


稀疏默克尔树
要了解为什么用稀疏默克尔树，先介绍下默克尔树
## 默克尔树
默克尔树又被称为二叉哈希树，主要用在文件系统或者P2P系统中<br>
下面画个图说明下<br>

![merkle tree drawio](https://user-images.githubusercontent.com/2979052/163526058-498ac17e-d4cf-47f4-9ed7-4a180c03fd9e.png)


这里有A, B, C, D四个交易这个虚线框内，在merkle tree属于datablock， 这部分叫做leaf node<br>,
上面的虚线框属于hash pointer, Hash 1的值是交易A的Hash值和交易B的Hash值拼接后计算的hash值(也可以有其他算法), Hash 2的值是C和D的
Hash 3是Hash 1和Hash 2拼接计算的
Hash 3也叫做top hash,

这个树的作用可以检验交易是否生效
比如校验交易A是否存在将交易A的hash值，然后给你Hash(B), Hash(CD), top hash
交易下是否top_root_hash = hash(hash(hash(A,B), Hash(CD)))
这个叫做merkle proof


