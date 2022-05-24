# Proof

All of the data in the Starcoin Blockchain is stored in a single-versioned distributed database. Proof is used to determine whether a transaction or block or state is included in the blockchain.


In a blockchain, the client does not need to trust the entity from which it is receiving data. A client could query for the state of an account, ask whether a specific transaction or a specific block was processed, and so on. As with other Merkle trees, the ledger history can provide an O(log n)-sized proof of a specific transaction object, where _n_ is the total number of transactions processed.

:::node

* Block Accumulator Proof
* Transaction Accumulator Proof
* State Proof
* Event Proof

:::