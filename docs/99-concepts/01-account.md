# Account


Account, Addresses, Authentication keys


## Account
An account represents a resource on the Starcoin that can send transactions. An account is a collection of Move resources stored at a particular 16-byte account address.

### Addresses, authentication keys

A Starcoin account is uniquely identified by its 16-byte account address. Each account stores an authentication key used to authenticate the signer of a transaction. An account’s address is derived from its initial authentication key, but the Diem Payment Network supports rotating the authentication key of an account without changing its address.

To generate an authentication key and account address:

Generate a fresh key-pair (pubkey_A, privkey_A). The Starcoin uses the PureEdDSA scheme over the Ed25519 curve, as defined in RFC 8032.
Derive a 32-byte authentication key auth_key = sha3-256(pubkey | 0x00), where | denotes concatenation. The 0x00 is a 1-byte signature scheme identifier where 0x00 means single-signature.
The account address is the last 16 bytes of auth_key.


:::note

TODO: this document needs to be improvement.

1. Private key, Public key, Auth key, Address
2. MultiKey account
3. Offchain account & Onchain account
4. Account Resource
5. Account Sequence Number
6. Account Storage

https://discord.com/channels/822159062475997194/892760287797714954/899142725251780608


Migrate and Rewrite:

* https://starcoin.org/zh/developer/key_concepts/account/
* https://starcoin.org/en/developer/key_concepts/account/
:::

