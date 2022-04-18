--- 
sidebar_position: 2
---

# Sparse Merkle Tree


稀疏默克尔树
要了解为什么用稀疏默克尔树，先介绍下默克尔树

## 默克尔树
默克尔树又被称为二叉哈希树，主要用在文件系统或者P2P系统中

下面画个图说明下


![merkle tree drawio](https://user-images.githubusercontent.com/2979052/163526058-498ac17e-d4cf-47f4-9ed7-4a180c03fd9e.png)


这里有A, B, C, D四个交易这个虚线框内，在merkle tree属于datablock， 这部分叫做leaf node,

上面的虚线框属于hash pointer,

Hash 1的值是交易A的Hash值和交易B的Hash值拼接后计算的hash值(也可以有其他算法)

Hash 2的值是C和D的Hash值拼接后计算的

Hash 3是Hash 1和Hash 2拼接计算的

Hash 3也叫做top_hash

### 校验交易
这个树的作用可以检验交易是否有效

比如校验交易A是否存在将交易A的hash值，然后给你Hash(B), Hash(CD), top_hash

校验下是否top_hash = hash(hash(hash(A,B), Hash(CD)))

这个过程叫做merkle proof
(TODO添加个wiki)

### 快速定位修改
如果交易A被修改后，Hash 1也会被修改,top_hash也会被修改


## 稀疏默克树
介绍下为啥需要用稀疏默克树

starcoin中需要用到账号地址(AccountAddress)是128 bits的，也就是32个16进制的数(一个16进制的数是4bits)

不同于以太坊外部账号和合约账号是分开的，在starcoin中合约相关都在账号(AccountAddress)对应的状态里面(State)

在合约中包含代码(code)和存储(storage), 这里有点类似C程序中的代码段和数据段

对于用户合约可以认为是AccountAddree -> State之间的映射

直观上来这个映射就是key -> value之间映射，处理这个可以使用HashMap

系统中维护一个全局的HashMap,每次有新的账户创建就插入一对key, value

需要查询账户余额就在HashMap中使用key来查询

不考虑hash碰撞，查询基本是常数时间完成(O(1)),更新也是如此

这种设计最大问题是不能提供merkel proof, 比如证明某个时间点某人余额大于多少

如果基于HashMap这种结构，可能每次有新的区块交易发布，需要将HashMap构建merkel tree再将对应的top_hash发布到区块头中

这样效率是低下的

这里使用了一种基于trie前缀压缩思想的数据结构jellyfish-merkle-tree (JMT)

## 项目中用到的稀疏默克树用到的API
### new
```rust
pub fn new(TreeReader: &'a) -> Self {
    
}
```
这里TreeReader是一个trait(可以认为是类似Java中inteface)， 在starcoin中可以认为是提供key value操作的数据结构

在starcoin中就是对应的KVStore这里值RocksDB, mock中使用的是HashMap + BTeeSet

可以简单认为JMT内存中是一颗trie树，持久化在RocksDB上


### updates
```rust
pub fn updates(&self,
    state_root_hash: Option<HashValue>,
    blob_set: Vec<(KEY, Vec<u8>)>
    ) -> Result<(HashValue, TreeUpdateBatch<KEY>)>;

pub struct StaleNodeIndex {
    pub stale_since_version: HashValue,
    pub node_key: HashValue,
}

pub struct TreeUpdateBatch<KEY> {
    pub node_batch: BTreeMap<HashValue, Node<KEY>>,
    pub stale_node_index_batch: BTreeSet<StaleNodeIndex>,
    pub num_new_leaves: usize,
    pub num_stale_leaves: usize,
}
```
这里HashValue可以认为是一个[u8;32]的数组
这里说明下各个参数

state_root_hash是某个JMT树的hash值，通过hash值唯一确定了这颗JMT树，

blob_set是key, value列表，

这里这么设计是为了一个Block执行交易后满足幂等性 这里state_root_hash等于前一个BlockHeader中的state_root

返回值Result<(HashValue, TreeUpdateBatch<KEY>) HashValue代表新的JMT的Hash值, 这个新的HashValue存在

Block中Header的state_root

返回值中TreeUpdateBatch 里面的 node_batch, 这里的比如我们blob_set是(key1, value1), 插入的是
key是hash(key1 + value1), value是(key1, value1)

### get_proof_with
```rust
pub fn get_with_proof(&self, key: &K) -> Result<(Option<Vec<u8>>, SparseMerkleProof)>
```
获取key对应的value的值，如果存在并返回对应的merkel proof证明

## 稀疏默克尔树的设计原理

## 稀疏默克尔树的代码分析
