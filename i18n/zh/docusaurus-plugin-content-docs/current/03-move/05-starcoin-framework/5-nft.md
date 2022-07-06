# NFT 标准

## 概念

### Starcoin 的标准 NFT 协议

Starcoin使用Move作为智能合约语言，并且巧妙地运用Move语言的优点，定义了一套安全的、可扩展的标准NFT协议，开箱即用，简洁高效。
跟以太坊的NFT协议对比，Starcoin的标准NFT协议有更加丰富的特性。
Starcoin的标准NFT协议正在一些场景逐步落地，例如CyberRare、IdentifierNFT等，这里介绍另一个应用场景。

![cyber_rare](https://tva1.sinaimg.cn/large/008i3skNly1gvnvu7qelyj613k0boaay02.jpg)

我们想象一下这样的场景。比如某NFT平台周年庆祝活动，回馈老用户，一批老用户能领取到纪念版NFT。这种情况通常的做法是将这批老用户的Address提交到链上。但是如果Address很多，这么处理会面临一些问题：

* 受到单个交易大小的限制；
* 容易出现大数组相关的问题，遍历大数组查找Address，可能导致Gas费激增，如果Gas超出最大限制，数组后面的Address就领不到NFT；

类似的场景还很多，比如空投活动等等。Starcoin针对这种场景，在标准的NFT协议之上，巧妙地设计了一个MerkleNFT模块，能够非常轻松地解决了上面遇到的问题。
我们一起深入到源码了解一下MerkleNFT模块。


### MerkleNFT原理分析

MerkleNFT是基于Starcoin标准NFT协议设计的一个有意思的应用，巧用了MerkleTree和标准NFT协议。

1. MerkleTree

我们先来简单了解一下MerkleTree：

![starcoin_nft_merkle](https://tva1.sinaimg.cn/large/008i3skNly1gvo5f6rsthj609q06xglu02.jpg)

上图是一个典型的MerkleTree的例子。了解比特币区块结构的应该知道，区块头有一个Merkle Root，记录了区块交易的Root。如果要验证一个交易是否在区块中，只需要使用交易和交易的Proof构造出MerkleRoot，如果跟区块的MerkleRoot相同，则证明交易存在区块中。

2. MerkleNFT

MerkleNFT也是使用了这样一个MerkleTree。如上图所示，叶子节点换成账户的Address，MerkleRoot是Hash12345678。如果要证明Address3在MerkleTree上，Proof是(Address4、Hash12、Hash5678)。

在前面假设的某NFT平台周年庆中，NFT的领取流程如下：

1). 链下先生成一个MerkleTree，叶子节点是所有老用户的Address；

2). 然后只需要把MerkleTree的Merkle Root以及NFT信息提交到链上，保存到MerkleNFT合约中；

3). 链下把每个Address对应的Proof分发到用户手上；

4). 用户拿着Proof调用MerkleNFT合约领取属于自己的纪念版NFT；

以上是MerkleNFT合约的原理和整体流程，这么做只需要提交MerkleRoot到链上，既不会受到交易大小的限制，也不容易出现大数组问题，非常的便捷。

### MerkleNFT源码分析

前面我们了解了MerkleNFT的核心原理和巧妙设计，我们继续深入到MerkleNFT的源代码，来了解一下MerkleNFT合约的Move实现。

```
public fun verify(proof: &vector<vector<u8>>, root: &vector<u8>, leaf: vector<u8>): bool
```

以上是MerkleProof模块中，校验Proof的verify函数。MerkleProof的功能很明确，主要逻辑是组装用户提交的proof和leaf节点，然后判断跟提交的root是否相等。

跟NFT相关的逻辑在MerkleNFTDistributor模块中。

```
    struct MerkleNFTDistribution<NFTMeta: copy + store + drop> has key {
        merkle_root: vector<u8>,
        claimed_bitmap: vector<u128>,
    }
    public fun register<NFTMeta: copy + store + drop, Info: copy + store + drop>(signer: &signer, merkle_root: vector<u8>, leafs: u64, info: Info, meta: Metadata): MintCapability<NFTMeta>
    public fun mint_with_cap<NFTMeta: copy + store + drop, NFTBody: store, Info: copy + store + drop>(sender: &signer, cap:&mut MintCapability<NFTMeta>, creator: address, index: u64, base_meta: Metadata, type_meta: NFTMeta, body: NFTBody, merkle_proof:vector<vector<u8>>): NFT<NFTMeta, NFTBody>
        acquires MerkleNFTDistribution
```

MerkleNFTDistributor逻辑也比较简洁，在标准NFT协议实现NFT注册和mint功能：

* MerkleNFTDistribution没有copy和drop的ability，有良好的安全性，最重要的作用是存储Merkle Root等数据；
* register函数调用了NFT协议的register注册NFT的元数据；
* mint_with_cap函数的作用是mint用户需要的NFT，也是调用了NFT协议的函数，这里需要格外注意的是，用户需要传递merkle_proof等MerkleTree相关的参数，会调用MerkleProof模块的verify进行校验，只有校验通过，才能mint成功；

MerkleProof模块和MerkleNFTDistributor模块是MerkleNFT的核心实现，整个逻辑很清晰、简洁，设计上巧用了MerkleTree，降低了逻辑复杂度，是NFT协议很有意思的一个应用场景。感兴趣的可以查看[完整源码](https://github.com/starcoinorg/starcoin-framework/tree/main/sources/MerkleNFT.move)。

### **GenesisNFT**源码分析

MerkleNFT是面向泛型编程的通用应用，Starcoin在Stdlib的GenesisNFT模块中用到了。

GenesisNFT模块是Starcoin反馈主网上线前在Proxima挖矿的老用户而设计的合约。
任何在 Proxima 高度为 310000，hash 为 `0x0f2fdd39d11dc3d25f21d05078783d476ff98ca4035320e5932bb3938af0e827`（这是 Starcoin 主网启动的父hash）前挖过块的老用户，都可以通过 GenesisNFT 获取自己的 Starcoin 纪念版 NFT。

```
public(script) fun mint(sender: signer, index: u64, merkle_proof:vector<vector<u8>>)
```

以上是GenesisNFTScripts模块中的mint函数，是script可见性，任何用户都可以发起这个交易，但是只有MerkleProof合法的用户才能拿到属于自己的纪念版NFT。感兴趣的可以查看[完整源码](https://github.com/starcoinorg/starcoin-framework/tree/main/sources/GenesisNFT.move)。


### 总结

Starcoin的NFT协议是一套非常完善的工具，有良好的安全性和可扩展性，可以预见，未来会有非常大的发展空间。
MerkleNFT和GenesisNFT巧妙地将MerkleTree与NFT协议结合，轻松解决了大数组等疑难问题，相信在NFT空投等场景下会有非常大的作用。


## Starcoin标准NFT协议的场景分析及落地实践

前面我们了解了NFT协议的发展历程，NFT的特性已经由「独一无二」和「不可分割」逐渐的演变成了「稀缺性」和「可组合」。
对比以太坊的NFT协议，Starcoin充分发挥Move在NFT场景的优势，设计了兼具安全性和可扩展等特性的标准NFT协议。
通过深入剖析IdentifierNFT和MerkleNFT两个模块的巧妙设计，对Starcoin标准NFT协议的应用场景进行了初步讨论。

NFT的价值正在很多领域凸显出来，常见的比如游戏、社交、音视频、电商等等，业内已经有很多的实践：

* 艺术类，例如艺术品、收藏品等
* 版权类，例如音乐、影视等
* 游戏，例如卡牌类游戏、游戏道具等
* 电商类，例如潮玩、盲盒、手办等
* 元宇宙
* 金融，例如NFT流动性、拍卖、DNFT等
* 粉丝经济，例如NBA等
* 身份标识，例如朋克头像、虚拟身份、DID、NameService等

接下来，我们从上面的场景中，选择有代表性的NFT场景，进一步探讨Starcoin标准NFT协议在这些场景的应用。

### NFT游戏道具

讨论NFT的应用场景，就不得不说NFT与游戏。NFT在链游中应用很广泛。链游甚至在很大程度上促进了底层NFT协议的发展。游戏道具跟NFT有很多相似之处，例如彰显个性、价值承载，还有一个非常重要的原因，游戏道具完全由二进制表达出来，是NFT的一个最典型、最完美的应用场景。所以，我们通过一个简单的卡牌游戏，介绍Starcoin标准NFT协议在游戏方面的应用。

![staarcoin_nft_cards](https://tva1.sinaimg.cn/large/008i3skNly1gw32r19jlsj30ey0b4jrg.jpg)

下面的Card模块对L1Card和L2Card的定义：

```
    struct L1CardMeta has copy, store, drop{
        gene: u64,
    }
    struct L2CardMeta has copy, store, drop{
        gene: u64,
    }

    struct L1Card has store {}
    struct L2Card has store {
        first: L1Card,
        second: L1Card,
    }

    public fun init(sender: &signer)

    public fun mint_l1(_sender: &signer): NFT<L1CardMeta, L1Card> acquires L1CardMintCapability

    public fun mint_l2(_sender: &signer, first: NFT<L1CardMeta, L1Card>, second: NFT<L1CardMeta, L1Card>): NFT<L2CardMeta,L2Card> acquires L1CardBurnCapability, L2CardMintCapability
```

这里我们不讨论L1Card和L2Card代表什么样的卡牌，也不讨论卡牌的游戏逻辑，而是分析作为NFT卡牌，设计上的优点：

* L1CardMeta和L2CardMeta保存元数据，不需要严格保证安全，可以复制、丢弃
* L1Card类型是一个最简单的NFT
* L2Card类型是包含2个组合L1Card的组合型NFT
* 作为NFT，L1Card和L2Card都只能存储、不能复制、不能凭空丢弃（这是虚拟机保证的，并不需要额外开发）
* 灵活的权限控制，将Mint权限和Brun权限分开
* init函数调用了Starcoin标准NFT协议中的NFT::register_v2函数注册L1Card和L2Card这两种类型的NFT
* mint_l1函数和mint_l2函数都调用了Starcoin标准NFT协议中的NFT::mint_with_cap_v2函数mint真正的NFT

Starcoin标准NFT协议设计非常简洁高效，开箱即用。例子中，NFT的卡牌游戏，只调用了协议的NFT::register_v2和NFT::mint_with_cap_v2两个函数，非常轻松地把NFT和游戏结合起来了。整个合约不到100行代码，在保障NFT安全的基础上，实现了NFT的灵活组合。感兴趣的可以查看[完整代码](https://github.com/starcoinorg/starcoin-framework/blob/main/spectests/nft/nft_card.move)。

Starcoin标准NFT协议通过Move的泛型，拥有了灵活的可堆叠性，也支持批量操作，可以非常轻松地应用在游戏场景。

### NFT作为会员身份

NFT作为虚拟身份的标识，在社交等领域也有非常广泛的应用，例如非常火爆的加密朋克和ENS等等。实际上，Starcoin在标准NFT协议之上，针对身份标识场景专门封装了一套通用的IdentifierNFT协议。我们在介绍Starcoin标准NFT协议的时候也介绍过IdentifierNFT模块。IdentifierNFT协议能应用在任何唯一标识的场景，包括但不限于NameService场景（ENS），这里我们介绍另一个IdentifierNFT作为NFT会员身份的应用案例。

```
		struct XMembership has copy, store, drop{
    		join_time: u64,
    		end_time: u64,
		}

		struct XMembershipBody has store{
        fee: Token<STC>,
    }

    public fun init(sender: &signer)

    public fun join(sender: &signer, fee: u128) acquires XMembershipMintCapability, XMembershipInfo

    public fun quit(sender: &signer) acquires XMembershipBurnCapability

    public fun do_membership_action(sender: &signer) acquires XMembershipBurnCapability
```

这里聚焦NFT作为会员身份的逻辑：

* XMembership作为NFT的元数据，保存了会员的开始时间以及结束时间，不需要严格保证安全，可以复制和丢弃
* XMembershipBody是真正的会员凭证，里面包含了会员费，必须严格保障安全，不可以复制，也不会凭空消失，是一个典型的NFT
* init函数调用NFT::register_v2注册NFT类型
* join函数用于申请会员，并且调用了NFT::mint_with_cap_v2铸造会员NFT凭证，再调用IdentifierNFT::grant将会员NFT凭证发放给sender
* quit函数调用IdentifierNFT::revoke收回会员NFT凭证，并通过NFT::burn_with_cap销毁NFT
* do_membership_action调用IdentifierNFT::is_owns判断用户的会员身份

以上是使用NFT作为会员标识的例子，里面既使用了Starcoin的标准NFT协议，也运用了IdentifierNFT模块。虽然只有大概100行代码，从初始化NFT开始，到铸造、使用以及销毁NFT，覆盖了整个NFT的生命周期。合约逻辑简单清晰，更重要的是保障了NFT和Token的安全，感兴趣的可以查看[完整合约代码](https://github.com/starcoinorg/starcoin-framework/blob/main/spectests/nft/identifier_nft.move)。

NFT作为虚拟身份的场景还有很多，Starcoin未来会推出更多的应用。

![starcoin_nft_vip](https://tva1.sinaimg.cn/large/008i3skNly1gwb9k9ju6lj30ma0diq3i.jpg)

### NFT作为购物凭证

NFT在电商场景也被广泛应用，例如盲盒、潮玩等等。我们从另一个电商角度，将NFT作为购物凭证，来介绍Starcoin标准NFT协议在电商场景的应用案例。我们想想一下预售、购买电子券、门票等场景，用户线上使用Token购买商品的NFT，然后用NFT去消费或者兑换实物。

```
    struct BoxMiner has copy, store, drop{
        price: u128,
    }

    struct BoxMinerBody has store{}

		public fun init(sender: &signer, total_supply:u64, price: u128)
		
		public fun mint(sender: &signer): NFT<BoxMiner, BoxMinerBody> acquires BoxMinerMintCapability, NFTInfo
```

以上是BoxMiner模块的主要逻辑：

* BoxMiner是商品的元数据，不需要严格保障安全
* BoxMinerBody是给用户的凭证，必须保障安全，不能复制和丢弃
* init函数是初始化函数，调用NFT::register_v2注册BoxMiner的NFT类型
* mint函数用于用户购买NFT，调用NFT::mint_with_cap_v2铸造NFT

整个合约大概50行，既实现了完整的业务逻辑，又保障了NFT的安全可靠，感兴趣的可以查看[完整合约代码](https://github.com/starcoinorg/starcoin-framework/blob/main/spectests/nft/nft_boxminer.move)。

电商场景对资产安全的要求更严格。Move正是为金融场景打造的高安全性的智能合约语言。Starcoin标准NFT协议正是通过Move实现，这种得天独厚的安全性，让Starcoin标准NFT协议特别适合电商场景。


### 总结

Move在NFT场景具有天生的优势，Resource类型跟NFT非常地接近，同时，泛型编程让NFT可随意组合。Starcoin标准NFT协议灵活运用了Move的优势，拥有比以太坊的NFT协议更强大的功能和安全性，更加适合NFT的各种场景。
