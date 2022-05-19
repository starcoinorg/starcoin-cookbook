# Account


Account, Addresses, Authentication keys


## Account
An account represents a resource on the Starcoin that can send transactions. An account is a collection of Move resources stored at a particular 16-byte account address.

### Addresses, authentication keys

A Starcoin account is uniquely identified by its 16-byte account address. Each account stores an authentication key used to authenticate the signer of a transaction. An account’s address is derived from its initial authentication key, but the Diem Payment Network supports rotating the authentication key of an account without changing its address.

the authentication key is not a private key,it is public to others.

To generate an authentication key and account address:

Generate a fresh key-pair (pubkey_A, privkey_A). The Starcoin uses the PureEdDSA scheme over the Ed25519 curve, as defined in RFC 8032.
Derive a 32-byte authentication key auth_key = sha3-256(pubkey | 0x00), where | denotes concatenation. The 0x00 is a 1-byte signature scheme identifier where 0x00 means single-signature.
The account address is the last 16 bytes of auth_key.

### Sequence Number

- The **sequence number** for an account indicates the number of transactions that have been submitted and committed on chain from that account. It is incremented every time a transaction sent from that account is executed or aborted and stored in the blockchain.
- A transaction is executed only if it matches the current sequence number for the sender account. This helps sequence multiple transactions from the same sender and prevents replay attacks.
- If the current sequence number of an account A is X, then a transaction T on account A will only be executed if T's sequence number is X.
- Transactions with a sequence number greater than the account sequence number will be stored in mempool until their account sequence number is added to match the transaction sequence number (or until they expire).
- When the transaction is applied, the sequence number of the account will become X+1. The account has a strictly increasing sequence number.



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

