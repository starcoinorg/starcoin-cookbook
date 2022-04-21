--- 
sidebar_position: 2
---

# Sparse Merkle Tree


Sparse Merkle Tree
要了解为什么用Sparse Merkle Tree(下面简称SMT)，先介绍下Merkle Tree

## Merkle Tree
Merkle Tree又被称为二叉哈希树，主要用在文件系统或者P2P系统中

下面这个图说明下


![merkle tree drawio](../../../../../static/img/merkle_tree.png)


这里有A, B, C, D四个交易这个虚线框内，在Merkle Tree属于data blocks， 这部分叫做leaf node,

上面的虚线框属于hash pointer,

Hash 1的值是交易A的hash值和交易B的hash值拼接后计算的hash值(也可以有其他算法)，在图中是H(A) H(B) hash(1) = hash(H(A) + H(B)) 这里 + 表示字符串拼接

Hash 2的值是交易C和交易D的hash值拼接后计算的hash值，在图中是H(C) H(D) hash(2) = hash(H(C) + H(D))

Hash 3是Hash 1和Hash 2拼接计算的hash值，在图中是H(AB) H(CD), hash(3) = hash(hash(1) + hash(2)),  Hash 3也叫做top_hash

Merkle Tree有以下作用

### 快速定位修改
如果交易A被修改后，Hash 1也会被修改,top_hash也会被修改，所以可以认为记住top_hash就记住了整个Merkle Tree

### 校验交易
这个树的作用可以检验交易是否有效

在区块链light node不会记录所有交易数据，只会记录Merkle Tree的top_hash值

如果校验交易A是否存在, 这时候是把交易A的hash值这里记为H(A)发送给校验放, 校验方发送一个hash值列表[Hash(B), Hash(CD)]

如果保存的top_hash和hash(hash(H(A) + H(B)) + Hash(CD))相等, 证明交易A是存在的

这个过程叫做Merkle Proof


## SMT
介绍下为啥需要用SMT

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

在starcoin中就是对应的KVStore这里值RocksDB, MockTreeStore中使用的是HashMap + BTeeSet

有TreeReader就有TreeWriter，分别对应JMT的读写,在starcoin的实现当中MockTreeStore使用了TreeWriter,

持久层并没有实现TreeWriter trait

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

### 路径压缩
上面提到账号是128 bits, 基于trie的实现，那实际上账号的数量是2的128次方,实际上的账号没有这么多，
，是一个稀疏trie,这里处理会使用路径压缩
路径压缩的图 （TODO FIXME 论文中的图)

这样做的目前减少内存的访问次数

由于是压缩的字典树，节点分为三种类型分别为Null, Internal, Leaf这里对应
代码中的
```rust
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Node<K: RawKey> {
    /// Represents `null`.
    Null,
    /// A wrapper of [`InternalNode`].
    Internal(InternalNode),
    /// A wrapper of [`LeafNode`].
    Leaf(LeafNode<K>),
}
```
数据只存储在Leaf节点上, Internal节点可以有16个子节点
这里压缩引入了一个nibble的概念，nibble可以表示0-15的整数,也就是四个bit,
一个byte可以表示8个bit，这样可以存储两个nibble

```rust
fn put(key: K, blob: Option<Blob>, tree_cache: &mut TreeCache<R, K>) -> Result<()>
```
这里是存储key，value的写入接口,其中Blob就是vec<u8>,

写入的时候先根据key计算出key对应的HashValue key_hash, 这里HashValue是一个[u8;32]数组,
然后将key_hash转成一个含有64个nibble的元素集合

tree_cache是JMT在内存中缓存的信息，缓存了JMT的root的HashValue值,叫做root_node_key

这里root_node_key可能是NONE,也可能是Block对应的header对应的state_root,

然后读取root_node_key作为key，对应的value值，这里获取可能是从缓存也可能从rocksdb,

这里给个例子
JMT可以支持各种类型的key写入, value就是vec<u8> (被序列化的数据),只需要实现 RawKey
这里假设我们写入key是Hello, value是World,整个JMT是空树
```rust
#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Hash)]
pub struct StringKey(pub Vec<u8>);

impl RawKey for StringKey {
    fn encode_key(&self) -> Result<Vec<u8>> {
        Ok(self.0.clone())
    }

    fn decode_key(bytes: &[u8]) -> Result<Self> {
        Ok(StringKey(bytes.to_vec()))
    }
}
let db = MockTreeStringStore::default();
let tree = JellyfishMerkleTree::new(&db);

// Tree is initially empty. Root is a null node. We'll insert a key-value pair which creates a
// leaf node.
let key = StringKey("Hello".as_bytes().to_vec());
let value = Blob::from("World".as_bytes().to_vec());

let (_new_root_hash, batch) = tree.updates(None, vec![(key.into(), Some(value))])?;
assert!(batch.stale_node_index_batch.is_empty());
db.write_tree_update_batch(batch).unwrap();
```

画图LeafNode key, blob, blob_hash, cache_hash() (XXX FIXME)
画图InternalNode hash如何计算(XXX FIXME)

### 空数据插入数据流程 (XXX FIXME)

每次updates会生存一个TreeCache 这个TreeCache记录 root_key， leaf_node的hash值(XXX FIXME) 和 leaf_node

这里先计算key对应的sha3_256 key_hash这个值对应的是0x8ca66ee6b2fe4bb928a8e3cd2f508de4119c0895f22e011117e22cf9b13de7ef

然后将key_hash生成一个64位的nibble

获取JMT树的root_key, 由于是空树,root_key值是个默认值*SPARSE_MERKLE_PLACEHOLDER_HASH,

删掉这个root_key, 创建新的叶子节点leaf_node, 插入新产生的(leaf_node_hash, leaf_node)

这里leaf_node_hash是key的hash和blob的hash拼接后计算的hash值

new_root_key设置为等于leaf_node_hash tree_cache把root_key更新为new_root_key


### put的流程
先生成tree_cache,

从tree_cache中获得root_node_key (XXX FIXME各种情形说明)

获取插入key的hash值，并转换成nibble_iter集合


如果root_node_key是空 走空数据插入流程

如果root_node_key是LeafNode, 通过tree_cache获取root_node_key对应的existing_leaf_node,
比较共同部分,如果是LeafNode直接更新
如果不是Leaf
创建InternalNode，持续创建InternalNode


如果是InternalNode






如果root_node_key是Internal


stale_node_index_cache 相关说明在
```rust
pub fn freeze()代码中说明
```




## 稀疏默克尔树的代码分析
