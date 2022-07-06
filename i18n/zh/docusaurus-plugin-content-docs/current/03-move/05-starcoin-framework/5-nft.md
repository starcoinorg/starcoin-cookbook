# NFT 标准

## Starcoin 的标准 NFT 协议

Starcoin 使用 Move 作为智能合约语言，并且巧妙地运用 Move 语言的优点，定义了一套安全的、可扩展的标准 NFT 协议，开箱即用，简洁高效。
跟以太坊的NFT协议对比，Starcoin 的标准NFT协议有更加丰富的特性。

## MerkleNFT 原理分析

MerkleNFT 是基于 Starcoin 标准 NFT 协议设计的一个有意思的应用，巧用了 MerkleTree 和标准 NFT 协议。

1. MerkleTree

我们先来简单了解一下 MerkleTree：

![starcoin_nft_merkle](https://tva1.sinaimg.cn/large/008i3skNly1gvo5f6rsthj609q06xglu02.jpg)

上图是一个典型的 MerkleTree 的例子。了解比特币区块结构的应该知道，区块头有一个 Merkle Root，记录了区块交易的 Root。如果要验证一个交易是否在区块中，只需要使用交易和交易的 Proof 构造出 MerkleRoot，如果跟区块的 MerkleRoot 相同，则证明交易存在区块中。

2. MerkleNFT

MerkleNFT 也是使用了这样一个 MerkleTree。
如上图所示，叶子节点换成账户的 Address，MerkleRoot 是 `Hash12345678`。如果要证明 Address3 在 MerkleTree 上，Proof是（Address4、Hash12、Hash5678）。

在前面假设的某 NFT 平台周年庆中，NFT 的领取流程如下：

1). 链下先生成一个 MerkleTree，叶子节点是所有老用户的 Address；

2). 然后只需要把 MerkleTree 的 Merkle Root 以及 NFT 信息提交到链上，保存到 MerkleNFT 合约中；

3). 链下把每个 Address 对应的 Proof 分发到用户手上；

4). 用户拿着 Proof 调用 MerkleNFT 合约领取属于自己的纪念版 NFT；

以上是 MerkleNFT 合约的原理和整体流程，这么做只需要提交 MerkleRoot 到链上，既不会受到交易大小的限制，也不容易出现大数组问题，非常的便捷。

## MerkleNFT源码分析

前面我们了解了 MerkleNFT 的核心原理和巧妙设计，我们继续深入到 MerkleNFT 的源代码，来了解一下 MerkleNFT 合约的 Move 实现。

```
public fun verify(proof: &vector<vector<u8>>, root: &vector<u8>, leaf: vector<u8>): bool
```

以上是 MerkleProof 模块中，校验 Proof 的 verify 函数。
MerkleProof 的功能很明确，主要逻辑是组装用户提交的 proof 和 leaf 节点，然后判断跟提交的 root 是否相等。

跟 NFT 相关的逻辑在 MerkleNFTDistributor 模块中。

```
    struct MerkleNFTDistribution<NFTMeta: copy + store + drop> has key {
        merkle_root: vector<u8>,
        claimed_bitmap: vector<u128>,
    }
    public fun register<NFTMeta: copy + store + drop, Info: copy + store + drop>(signer: &signer, merkle_root: vector<u8>, leafs: u64, info: Info, meta: Metadata): MintCapability<NFTMeta>
    public fun mint_with_cap<NFTMeta: copy + store + drop, NFTBody: store, Info: copy + store + drop>(sender: &signer, cap:&mut MintCapability<NFTMeta>, creator: address, index: u64, base_meta: Metadata, type_meta: NFTMeta, body: NFTBody, merkle_proof:vector<vector<u8>>): NFT<NFTMeta, NFTBody>
        acquires MerkleNFTDistribution
```

MerkleNFTDistributor 逻辑也比较简洁，在标准 NFT 协议实现 NFT 注册和 mint 功能：

* MerkleNFTDistribution 没有 copy 和 drop 的 ability，有良好的安全性，最重要的作用是存储 Merkle Root 等数据；
* register 函数调用了 NFT 协议的 register 注册 NFT 的元数据；
* `mint_with_cap` 函数的作用是 mint 用户需要的 NFT，也是调用了 NFT 协议的函数，这里需要格外注意的是，用户需要传递 `merkle_proof` 等 MerkleTree 相关的参数，会调用 MerkleProof 模块的 verify 进行校验，只有校验通过，才能 mint 成功；

MerkleProof 模块和 MerkleNFTDistributor 模块是 MerkleNFT 的核心实现，整个逻辑很清晰、简洁，设计上巧用了 MerkleTree，降低了逻辑复杂度，是NFT协议很有意思的一个应用场景。感兴趣的可以查看[完整源码](https://github.com/starcoinorg/starcoin-framework/tree/main/sources/MerkleNFT.move)。

## GenesisNFT 源码分析

MerkleNFT 是面向泛型编程的通用应用，Starcoin 在 Stdlib 的 GenesisNFT 模块中用到了。

GenesisNFT 模块是 Starcoin 反馈主网上线前在 Proxima 挖矿的老用户而设计的合约。
任何在 Proxima 高度为 310000，hash 为 `0x0f2fdd39d11dc3d25f21d05078783d476ff98ca4035320e5932bb3938af0e827`（这是 Starcoin 主网启动的父hash）前挖过块的老用户，都可以通过 GenesisNFT 获取自己的 Starcoin 纪念版 NFT。

```
public(script) fun mint(sender: signer, index: u64, merkle_proof:vector<vector<u8>>)
```

以上是 GenesisNFTScripts 模块中的 mint 函数，是 script 可见性，任何用户都可以发起这个交易，但是只有 MerkleProof 合法的用户才能拿到属于自己的纪念版NFT。
感兴趣的可以查看[完整源码](https://github.com/starcoinorg/starcoin-framework/tree/main/sources/GenesisNFT.move)。

## 总结

Starcoin 的 NFT 协议是一套非常完善的工具，有良好的安全性和可扩展性，可以预见，未来会有非常大的发展空间。
MerkleNFT 和 GenesisNFT 巧妙地将 MerkleTree 与 NFT 协议结合，轻松解决了大数组等疑难问题，相信在 NFT 空投等场景下会有非常大的作用。
