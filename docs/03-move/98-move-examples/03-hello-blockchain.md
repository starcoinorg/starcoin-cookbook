# Hello Blockchain

This section mainly introduces how developers can test and deploy a sample project on the Starcoin blockchain to verify
the blockchain's availability.

## Prerequisites

The sample project is located in
the [hello-blockchain](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/hello_blockchain)
repository. Please clone the Starcoin repository to your local machine and compile the following tools:

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin): Used for connecting to
   nodes.
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager): Used
   for packaging Move modules.

Assuming the Starcoin binary has been compiled successfully, execute the following commands to connect to the Starcoin
console and package the project:

```shell
# Connect to the Starcoin console, where <network> is the network name (e.g., dev, barnard, etc.)
starcoin -n <network> console

# View the node's sync progress; ensure the local node is fully synced before submitting test transactions
starcoin% node sync progress
```

## Test Command Set

First, use `mpm2` to build the Blob binary package. Note that before packaging, you need to modify the module target
address in `Move.toml` to the deployment address, for example, `0x143e9f2175f92f51d9adaeee2b3d8bf0`.

```shell
# Switch to the project directory
cd <work_dir>/starcoin/vm2/move-examples/hello-blockchain

# Execute the packaging command
mpm2 release

INCLUDING DEPENDENCY MoveStdlib
INCLUDING DEPENDENCY StarcoinFramework
INCLUDING DEPENDENCY StarcoinStdlib
BUILDING hello-blockchain

Packaging Modules:
	 0x143e9f2175f92f51d9adaeee2b3d8bf0::message
Release done: release/hello-blockchain.v0.0.1.blob, package hash: 0x4c3ba39b4e716aa4d80b3697721107e39e8d6d9244a5ece3de4670335749b030
```

Deploy and test the contract in the Starcoin console:

```shell
# Deploy the contract; if the result shows "Executed", it indicates successful deployment
starcoin% dev deploy -s <work_dir>/starcoin/vm2/move-examples/hello-blockchain/release/hello-blockchain.v0.0.1.blob
txn 0x12481f66a05a56d93cb51d34e05c1815919ba6cea40ee073621f1d05a66341ac submitted.
{
  "ok": {
    ...
    "dry_run_output": {
      "explained_status": "Executed",
      "status": "Executed",
     }
     ...
  }
}

# Set the message
starcoin% account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::set_message --arg b"abcdefg" -b

# View the message; the result is the BCS encoding of "abcdefg"
starcoin% dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::message::get_message --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    {
      "bytes": "0x61626364656667"
    }
  ]
}
```