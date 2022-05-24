# 状态

需要先理解 [smt](05-smt.md) 的原理。

## 状态的实现

在 Starcoin 中，区块 ( `Block` ) 由一些交易 （ `Transaction` ) 组成，对一个区块的执行就是对区块内交易的执行。
交易执行的结果由状态表示。这里采用的全局状态，包含链上所有账户的最新状态和历史状态。
状态实际上就是账户地址 ( `AccountAddress` ) 到账户状态 ( `AccountState` ) 的映射。
Starcoin 中状态是一颗2级的 SMT 树，如下图所示。

![two_level_state.png](../../../../../static/img/state/two_level_state.png)

状态是 `AccountAddress` 到 `AccountState` 的映射，随着新的 `Block` 的执行 ， `AccountState` 会变化，由于需要保留历史状态相关的证明，这里使用了 SMT 这一数据结构。
为了方便这里把 `AccountAddress` 到 `AccountState` 的状态称为 `Account SMT`。如图中显示这里 `(AccountAddress, AccountState)` 存储在 `Account SMT` 的 `Leaf` 节点上。
在图中就是 `Account SMT` 的根节点是 `Root_Hash`，这里对应 `BlockHeader` 中的 `state_root`。
在 Starcoin 中 `AccountAddress` 不同于以太坊个人账户和合约账户是分开的，合约是部署在个人账户下。`AccountState` 分为两部分，分别是合约代码 ( `Code` ) 和 资源 ( `Resource`  )。
`Code` 就是账号下合约代码， `Resource` 就是类似有哪些 Token (比如 STC )。
新 `Block` 执行， `Code` 状态和 `Resource` 状态都可能会改变。
这样 `Code` 状态用了一颗 SMT 记为 `Code SMT`, `Resource` 状态用了一棵 SMT 记为 `Resource SMT`。
`AccountState` 状态分为 `Code SMT` 和 `Rescoure SMT`，这样每次执行新 `Block` 后，先存储 `Code SMT` 和 `Resource SMT`， `AccountState` 只用存储 `Code SMT` 和 `Resource SMT` 的根节点。
在图中分别为 `Code_Root_Hash1` 和 `Res_Root_Hash1`。
当然这应该是一个事务的过程。

## 状态在 Starcoin 中对应代码

在 Starcoin 中 `Account SMT` 定义为 `ChainStateDB`
```rust
pub struct ChainStateDB {
    store: Arc<dyn StateNodeStore>,
    ///global state tree.
    state_tree: StateTree<AccountAddress>,
}

pub struct StateTree<K: RawKey> {
    storage: Arc<dyn StateNodeStore>,
    storage_root_hash: RwLock<HashValue>,
}

pub enum DataType {
    CODE,
    RESOURCE,
}

pub struct AccountState {
    storage_roots: Vec<Option<HashValue>>,
}

struct AccountStateObject {
    code_tree: Mutex<Option<StateTree<ModuleName>>>,
    resource_tree: Mutex<StateTree<StructTag>>,
    store: Arc<dyn StateNodeStore>,
}
```
这里 `store` 对应存储的 `KvStore`， `ChainStateDB` 的成员 `state_tree` 对应 `AccountAddreee` -> `AccountState` 的 `Account SMT` 树。
`StateTree` 的成员 `storage_root_hash` 对应 `SMT` 的根节点。
`AccountState` 有2个 `HashValue` 元素，对应图中 `Code_Root_Hash1` 和 `Res_Root_Hash1`，也就是 `AccountStateObject` 中的 `code_tree` 和 `resource_tree` 的根节点。
`AccountStateObject` 的成员 `code_tree` 对应 `ModuleName` -> `Vec<u8>` 的 `Code SMT` 。。
`AccountStateObject` 的成员 `resource_tree` 对应 `StructTag` -> `Vec<u8>` 的 `Resource SMT` 。
`ModuleName` 类似于 `Account1` (对应 starcoin-framework 里面的模块 https://github.com/starcoinorg/starcoin-framework/tree/v11/sources)。
`struct_tag` 类似于 `0x00000000000000000000000000000001::Account::Account`。

可见 Starcoin 中状态是一个2级的 SMT 结构，`ChainStateDB` 对应一级 SMT ， `AccountStateObject` 对应两个二级 SMT 。

## StateTree API 说明

### new
```rust
pub fn new(state_storage: Arc<dyn StateNodeStore>, state_root_hash: Option<HashValue>) -> Self;
```
创建 `StateTree`， 这里 `state_storage` 对应 `KvStore`，`state_root_hash` 对应 `SMT` 的根节点， 后面的更新查找都是基于这个根节点的 SMT 。

### put
```rust
pub fn put(&self, key: K, value: Vec<u8>);
pub struct StateTree<K: RawKey> {
    storage: Arc<dyn StateNodeStore>,
    storage_root_hash: RwLock<HashValue>,
    updates: RwLock<BTreeMap<K, Option<Blob>>>,
    cache: Mutex<StateCache<K>>,
}
```
将要更新的 `（key, value)` 缓存在 `StateTree` 的成员 `updates` ，这里并没有参与 `SMT` 的计算

### remove
```rust
pub fn remove(&self, key: &K);
```
一种 `value` 为 `NONE` 的特殊的 `put` 操作。

### commit
```rust
 pub fn commit(&self) -> Result<HashValue>;
```
将缓存于 `updates` 的 `(key, value)` 取出，参与到 SMT 更新中，并计算新的根节点。
这里会将新产生的 `SMT Node`, 生成的 `(Hash(Node), Encode(Node))` 缓存在 `StateTree` 的
成员 `cache` 中。

### flush
```rust
 pub fn flush(&self) -> Result<()>;
```
将 `StateTree` 成员 `cache` 中的 `(Hash(Node), Encode(Node))` 写到 `KvStore` 中。

### get
```rust
pub fn get(&self, key: &K) -> Result<Option<Vec<u8>>>;
```
查找 `StateTree` 中 `key` 对应 `value`。 先检查 `StateTree` 成员 `update` 缓存中是否有，有直接返回。
没有按照 `SMT` 中 `get_with_proof` 流程。

### get_with_proof
```rust
pub fn get_with_proof(&self, key: &K) -> Result<(Option<Vec<u8>>, SparseMerkleProof)>;
```
获取 `proof`[proof](07-proof.md) 待补充

## ChainStateDB API 说明

### new
```rust
pub fn new(store: Arc<dyn StateNodeStore>, root_hash: Option<HashValue>) -> Self;
```
类似 `StateTree new` 生成根节点为 `root_hash` 的 `SMT`。

### get_account_state_object
```rust
 fn get_account_state_object(
    &self,
    account_address: &AccountAddress,
    create: bool,
) -> Result<Arc<AccountStateObject>>;
```
获取 `account_address` 对应的 `Code SMT` 和 `Resource SMT`。
先根据 `Account SMT` 获取 `account_address` 对应的 `AccountState`，
再根据 `AccountState` 的 `Code_Root_Hash` 和 `Res_Root_Hash` 生成对应的 `Code SMT` 和 `Resource SMT`。

### get_with_proof
```rust
fn get_with_proof(&self, access_path: &AccessPath) -> Result<StateWithProof>;
```
获取 `proof`, [proof](07-proof.md) 待补充

## StateView 相关

```rust
pub enum DataPath {
    Code(#[schemars(with = "String")] ModuleName),
    Resource(#[schemars(with = "String")] StructTag),
}

pub struct AccessPath {
    pub address: AccountAddress,
    pub path: DataPath,
}
fn get(&self, access_path: &AccessPath) -> Result<Option<Vec<u8>>>;
```
给 `vm` 提供状态信息查询相关接口，  `AccountAddress` 查找对应的 `AccountStateObject`，再生成
`Code Tree` 和 `Resource Tree`, `AccessPath` 成员 `path` 对应为 `ModuleName` 由 `Code Tree` 提供查找，
否则 `Resource Tree` 提供查找。

## 幂等性相关
`StateTree` 幂等性由 `SMT` 保证， `ChainStateDB` 幂等性由 `StateTree` 保证。


## 资源

[draw.io](../../../../../static/state.drawio)