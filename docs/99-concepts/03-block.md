# Block

A block contains a batch of the ordered [transactions](./02-transaction.md) , as well as other key data:


- **Parent hash** — The parent block hash, which chains the blocks.
- **Block number** — Block number, parent block number plus one.
- **State root** — Hash of the final state after execution of the block.
- **Transaction accumulator root** — The transaction accumulator root hash after executing this block.
- **Block accumulator root** — The hash after accumulating the IDs of all the previous blocks in order.

:::note

TODO

1. Block Header
2. Block Struct
3. BlockInfo
4. Block Accumulator

:::