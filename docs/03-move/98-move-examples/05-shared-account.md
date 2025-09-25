# Shared Account

This section explains how to test and deploy the `shared-account` sample project on the Starcoin blockchain. The project
simulates an NFT commission distribution scenario: a derived account is created from a main account, a portion of tokens
is deposited into the derived account, and accounts participating in commission distribution are added. When
distribution is required, tokens are disbursed directly from the derived account.

## Prerequisites

The project is located in
the [shared-account](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/shared_account)
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
There are no running sync tasks.
```

## Test Command Set

The following steps demonstrate how to deploy and test the `shared-account` contract in the Starcoin console:

```shell
# Deploy the contract
dev deploy -s 0x82cbfefb8076f2da3339b782fb074438 /home/bob/starcoin/vm2/move-examples/shared_account/release/shared_account.v0.0.1.blob

# Query the derived account address
dev call --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::get_derive_account --arg 0x82cbfefb8076f2da3339b782fb074438 --arg b"1"
{
  "ok": [
    "0x711f9777700a13eaf73b173aa2664216"
  ]
}

# Transfer tokens to the derived account to ensure sufficient balance for distribution
account transfer -r 0x711f9777700a13eaf73b173aa2664216 -v 10000000000

# Initialize the derived account
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::initialize_with_resource_account --arg b"1" -b

# Add participant account R1 for distribution
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100u64 -b

# Add participant account R2 for distribution
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::add_address --arg b"1" --arg 0x7111c56355d63f3434aa7de8b3c94aff --arg 100u64 -b

# Execute commission distribution
account execute-function --function 0x82cbfefb8076f2da3339b782fb074438::SharedAccount::disperse -t 0x1::starcoin_coin::STC --arg 0x711f9777700a13eaf73b173aa2664216 -b
```