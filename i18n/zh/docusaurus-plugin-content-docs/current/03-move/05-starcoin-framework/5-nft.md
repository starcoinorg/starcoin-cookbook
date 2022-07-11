# NFT 标准

NFT（non-fungible token）即非同质化代币，也称为不可替代性代币或契约代币。

非同质化代币用于追踪一个特定事物的所有权，这个事物可以是一个数字资产，例如一个电子游戏道具、数字藏品；
也可以对应现实中的资产，比如一辆车、一栋房子、遗嘱、土地权等等。
这些特定的事物可以与契约唯一绑定，通过 NFT 追踪契约的拥有者。

Starcoin 使用 Move 作为智能合约语言，并且巧妙地运用 Move 语言的优点，定义了一套安全的、可扩展的标准 NFT 协议，开箱即用，简洁高效。
跟以太坊的NFT协议对比，Starcoin 的标准NFT协议有更加丰富的特性。

## 作用

在智能合约中，代币（token）用来表达可拆分的数字资源，而要表达不可拆分的资源，就需要 NFT。
在 Move 中，任何一个不可 copy 和 drop 的类型实例，都可以认为是一个不可拆分的资源，是一个 NFT。
但 NFT 需要一种统一展示的标准，以及 NFT 的收集和转移方法，所以设计本标准。

## 目标

提供一种通用的，可扩展的标准，同时提供 NFT 相关的基本操作实现。

## 类型定义

```rust
struct NFT<NFTMeta: copy + store + drop, NFTBody: store> has store {
        /// The creator of NFT
        creator: address,
        /// The unique id of NFT under NFTMeta type
        id: u64,
        /// The metadata of NFT
        base_meta: Metadata,
        /// The extension metadata of NFT
        type_meta: NFTMeta,
        /// The body of NFT, NFT is a box for NFTBody
        body: NFTBody,
}
```

NFT 是 Move 中的一种类型，它支持 store ability，但不可 copy 以及 drop，包含一些基本的元信息：

1. `creator`：NFT 创建者的 address。
2. `id`：该 NFT 类型下的唯一 id。
3. `base_meta`：基础的通用 metadata 信息，主要用来表达如何展示 NFT。
4. `type_meta`：开发者自定义的 metadata，同时用来标记 NFT 的类型。Metadata 不是资源，它表达信息，所以支持 copy + store + drop。
5. `body`：NFT 包含的资源，可以用来嵌入其他的资源。

如果把 NFT 视为一个箱子，NFT 本身定义了这个箱子的归属，唯一编号，以及展示方式，而 NFTBody 就是箱子中封装的珠宝。
展示方式通过 Metadata 来定义。

```rust
struct Metadata has copy, store, drop {
        /// NFT name's utf8 bytes.
        name: vector<u8>,
        /// Image link, such as ipfs://xxxx
        image: vector<u8>,
        /// Image bytes data, image or image_data can not empty for both.
        image_data: vector<u8>,
        /// NFT description utf8 bytes.
        description: vector<u8>,
}
```

Metadata 定义了 NFT 展示所需要的基本信息，名称，图片，描述。
如果有其他需要扩展的信息，可以定义在 `type_meta` 中。图片有两个字段表达，`image` 表示图片地址，`image_data` 可以直接保存图片的二进制数据，客户端展示的时候，使用 `image` 和 `image_data` 中不为空的那个字段。

另外，有的 NFT 的所有实例会使用同一个图片，这种情况下，NFT metadata 中的 `image` 和 `image_data` 可以都为空，客户端展示的时候使用 NFTTypeInfoV2 中的 metadata。

```rust
 /// The info of NFT type
struct NFTTypeInfoV2<NFTMeta: copy + store + drop> has key, store {
        counter: u64,
        meta: Metadata,
        mint_events: Event::EventHandle<MintEvent<NFTMeta>>,
        burn_events: Event::EventHandle<BurnEvent<NFTMeta>>,
}
```

NFTTypeInfoV2 用于维护 NFT id 的计数器，以及该 NFT 类型的全局 metata，每一种 NFT 类型需要先在注册中心注册。
所有的 NFT 类型都注册在 `0x1` 这个账号下。

> 注: NFTTypeInfo 在 stdlibv7 中变为 NFTTypeInfoV2

## 方法定义

每种 NFT 的类型需要先注册，注册时需要 NFT 的标记类型 NFTMeta 以及该类型的全局 metadata。

```rust
public fun register<NFTMeta: copy + store + drop, NFTTypeInfoExt: copy + store + drop>(sender: &signer, info: NFTTypeInfoExt, meta: Metadata)
```

注册后 `sender`  账号下会被写入三个权限：

1. `MintCapability`：用于铸造该类型的 NFT
2. `BurnCapability`：用于烧毁该类型的 NFT
3. `UpdateCapability`：用于更新该类型的 NFT metadata

这三个权限对应三个方法：

```rust
/// 铸造 NFT，返回 NFT 的实例
public fun mint_with_cap<NFTMeta: copy + store + drop, NFTBody: store, Info: copy + store + drop>(creator: address, cap: &mut MintCapability<NFTMeta>, base_meta: Metadata, type_meta: NFTMeta, body: NFTBody): NFT<NFTMeta, NFTBody>

///烧毁 NFT，返回 NFT 内部嵌套的 NFTBody
public fun burn_with_cap<NFTMeta: copy + store + drop, NFTBody: store>(cap: &mut BurnCapability<NFTMeta>, nft: NFT<NFTMeta, NFTBody>): NFTBody 

///更新 NFT 的 metadata
public fun update_meta_with_cap<NFTMeta: copy + store + drop, NFTBody: store>(cap: &mut UpdateCapability<NFTMeta>, nft: &mut NFT<NFTMeta, NFTBody>, base_meta: Metadata, type_meta: NFTMeta)
```

上面列举了 NFT 相关的基本方法，而 NFT 如何存储，如何转让，这个不是 NFT 模块本身关心的事情，是 NFTGallery 的功能。

## NFT 陈列室（NFTGallery） 

NFTGallery 模块提供了用户用来收集和存储 NFT 的基本功能。主要包含以下方法：

```rust
/// 初始化一个 NFTGallery 去接受类型为 NFT<NFTMeta, NFTBody> 的 NFT，用户每接受一种新的 NFT，都需要调用这个方法初始化。
public fun accept<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer)

/// 将 id 为参数 `id` 的 NFT 从 `sender` 转给 `receiver`
public fun transfer<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, id: u64, receiver: address)

/// 获取 `ownder` 的类型为 NFTMeta 的所有 NFT info, 返回 NFTInfo 列表
public fun get_nft_infos<NFTMeta: copy + store + drop, NFTBody: store>(owner: address):vector<NFT::NFTInfo<NFTMeta>>
   
/// 将 `nft` 存放到 `sender` 的 NFTGallery 中
public fun deposit<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, nft: NFT<NFTMeta, NFTBody>)

/// 将 `nft` 存放到 `receiver` 的 NFTGallery
public fun deposit_to<NFTMeta: copy + store + drop, NFTBody: store>(receiver: address, nft: NFT<NFTMeta, NFTBody>)

/// 从 `sender` 的 NFTGallery 中取一个类型为 NFTMeta 的 NFT
public fun withdraw_one<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer): NFT<NFTMeta, NFTBody>

/// 从 `sender` 的 NFTGallery 中取一个类型为 NFTMeta，id 为参数 `id` 的 NFT
public fun withdraw<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, id: u64): Option<NFT<NFTMeta, NFTBody>>
```

NFTGallery 提供了一个通用的空间用来存储和查询 NFT，当然，开发者也可以自行设计 NFT 的存储模块。

## 扩展方式

### 自定义 Metadata

如果开发者需要增加新的 Metadata，可以在 NFTMeta 类型中定义，例如要定义一个视频类的 NFT，需要增加一个视频地址：

```rust
struct VideoNFT has copy, store, drop {
  video_url: vector<u8>,
}
struct VideoNFTBody has store{}
```

实际的 NFT 数据格式相当于：

```rust
struct NFT{
  creator: address,
  id: u64,
  base_meta: Metadata,
  type_meta: VideoNFT,
  body: VideoNFTBody,
}
```
### 嵌套 NFTBody

如果开发者想再 NFT 中嵌入其他的资源，可以通过自定义 Body 的方式进行，比如上面的 VideoNFTBody 中想嵌入一些 Token：

```rust
struct VideoNFTBody has store{
  token: Token<STC>,
}
```

### 自定义转让逻辑

有的 NFT 应用场景下，NFT 转让是受限的，比如作为会员凭证。
这种情况下，需要自定义一种 NFT 的存储机制，从而实现自定义转让机制。
储存在 NFTGallery 中的 NFT，完全受用户控制，NFT 的开发者不能限制它的使用和转让。

以 IdentifierNFT 为例， IdentifierNFT 是一种 NFT 容器，它保证每个用户只能拥有一个同一个类型的 NFT，NFT 开发者授予用户 NFT 后，用户无法转让，一般用在用户身份相关的 NFT 场景下，比如荣誉奖章等。

```rust
/// IdentifierNFT 中包含了一个 Option 的 NFT，默认是空的，相当于一个可以容纳 NFT 的箱子
struct IdentifierNFT<NFTMeta: copy + store + drop, NFTBody: store> has key {
        nft: Option<NFT<NFTMeta, NFTBody>>,
}

/// 用户通过 Accept 方法初始化一个空的 IdentifierNFT 在自己的账号下
public fun accept<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer) {
  move_to(sender, IdentifierNFT<NFTMeta, NFTBody> {
    nft: Option::none(),
  });
}

/// 开发者通过 MintCapability 给 receiver 授予该 nft，将 nft 嵌入到 IdentifierNFT 中
public fun grant_to<NFTMeta: copy + store + drop, NFTBody: store>(_cap: &mut MintCapability<NFTMeta>, receiver: address, nft: NFT<NFTMeta, NFTBody>) acquires IdentifierNFT {
     let id_nft = borrow_global_mut<IdentifierNFT<NFTMeta, NFTBody>>(receiver);
     Option::fill(&mut id_nft.nft, nft);
}

/// 开发者也可以通过 BurnCapability 将 `owner` IdentifierNFT 中的 NFT 取出来
public fun revoke<NFTMeta: copy + store + drop, NFTBody: store>(_cap: &mut BurnCapability<NFTMeta>, owner: address): NFT<NFTMeta, NFTBody>  acquires IdentifierNFT {
     let id_nft = move_from<IdentifierNFT<NFTMeta, NFTBody>>(owner);
     let IdentifierNFT { nft } = id_nft;
     Option::destroy_some(nft)
}
```

以上的方案中，NFTMeta 定义和注册的开发者可以通过程序来定义 NFT 的转让逻辑（当然，也可以不允许转让）。

## Starcoin NFT 标准与 ERC721/ERC1155 之间的差异

1. ERC721/ERC1155 是 Interface，并没有定义实现，可扩展性通过不同的实现来完成。而 Starcoin NFT 标准包含数据类型与基本操作的实现，可扩展性通过上层组合来实现。
2. 默认情况下，Starcoin NFT 和 ERC721 类似，是不可拆分的。但第三方可以自行扩展出拆分和合并逻辑，从而达到 ERC1155 的目的。
3. ERC721/ERC1155 的 NFT 都只能在合约内部移动，无法从合约移动到另外一个合约，所以 NFT 之上的协议组合非常困难。而得益于 Move 的类型特征，Starcoin 中的 NFT 可以在不同的合约之间移动，其他的合约可以定义新的类型来对 NFT 进行封装，扩展出新的转让逻辑（比如拍卖）。这给 NFT 之上的协议设计带来了极大的便利，可以组合出很多的玩法。
4. ERC721/ERC1155 是通过合约地址来区分 NFT 类型的，要想实现多种 NFT，需要部署多个合约，如果 NFT 类型很多的情况，会导致合约调用非常复杂。
5. Starcoin 的 NFT 存储在用户的状态空间里，可以通过列举用户状态空间的资源来展示用户所有的 NFT，包括嵌入到其他合约中的 NFT。这给周边生态工具，比如钱包以及区块浏览器中中展示 NFT，拍卖市场展示 NFT 等，都带来了极大的便利。

## 总结

Starcoin 的 NFT 协议是一套非常完善的工具，有良好的安全性和可扩展性，可以预见，未来会有非常大的发展空间。
MerkleNFT 和 GenesisNFT 巧妙地将 MerkleTree 与 NFT 协议结合，轻松解决了大数组等疑难问题，相信在 NFT 空投等场景下会有非常大的作用。
