# 账号

账户、地址、认证密钥


* 账号：账户代表了 Starcoin 上的一个可以发送交易的资源。一个账户是一组 Move 资源的集合。其由 16 字节的地址唯一标识。
* 认证密钥(authentication_key)：每个账户都会在链上存储了一个认证密钥, 用于认证交易的签名。
* 地址：一个账户的地址来自于它的**初始认证密钥**。Starcoin 支持在不改变其地址的情况下修改账户的认证密钥。
* 收款识别码：一种编码后的地址，包含的校验机制，避免复制的时候被篡改。


### 生成认证密钥和加密密钥

* 生成一个新的密钥对 (public_key, private_key). starcoin 密钥使用 Ed25519 curve 及 PureEdDSA scheme 生成，见 RFC 8032
* 生成认证密钥 authentication_key = sha3-256(public_key | 0x00)，其中 | 为连接。0x00 是一个 1bytes 的标识符，表示单签。
* 生成帐户地址 account_address = authentication_key[-16:] 即 authentication_key 的后16字节。
* 收款识别码 receipt_identifier = "stc" + 1 + bech32(account_address) 。详情参看 sip-21。

因此，对比, Ethereum/Bitcoin, Starcoin 地址不仅更短，为 16 bytes, 同时，在不改变地址的情况下，还支持用户修改密钥对。更加灵活和安全。


1. [sip-21 receipt_identifier](https://developer.starcoin.org/zh/sips/sip-21/)
2. [rotate key 例子](https://github.com/starcoinorg/starcoin-sdk-python/blob/master/examples/rotate_auth_key.py)

### 序列号

- 一个账户的序列号表示从该账户提交到区块链上的交易的数量。每次从该账户发送的交易被执行或回滚时，它都会被递增，并存储在区块链中。
- 只有当交易与发送者账户的当前序列号相匹配时才会被执行。这有助于对来自同一发件人的多个交易进行排序，并防止重放攻击。
- 如果一个账户A的当前序列号是X，那么账户A上的交易T只有在T的序列号是X时才会被执行。
- 序列号大于账户序列号的交易将被保存在mempool中，直到它们的账户序列号增加到与交易序列号匹配（或直到它们过期）。
- 当交易被执行时，该账户的序列号将变成X+1。账户的序列号是严格增加的。