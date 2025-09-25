# Resource Groups

This section explains how to test and deploy the `resource-groups` sample project on the Starcoin blockchain to test the
resource group functionality under VM2. The contract consists of two parts: the `primary` module tests the basic
functionality of resource groups, while the `secondary` module tests cross-module resource group references.

## Prerequisites

The project is located in
the [resource-groups](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/resource_groups)
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

### Primary Module

```shell
# Deploy the Primary module
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work_dir>/starcoin/vm2/move-examples/resource_groups/primary/release/ResourceGroupsPrimary.v0.0.1.blob

# Initialize the resource group with an initial value of 10000
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u64 -b

# Check the value, expected to return 10000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# Set the value to 20000
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::set_value --arg 20000u64 -b

# Check the value, expected to return 20000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}

# Remove the value
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::remove -b

# Check if the resource exists, expected to return false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::primary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    false
  ]
}
```

### Secondary Module

```shell
# Deploy the Secondary module
dev deploy -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 <work_dir>/starcoin/vm2/move-examples/resource_groups/secondary/release/ResourceGroupsSecondary.v0.0.1.blob

# Initialize the resource group with an initial value of 10000
account execute-function --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::init -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --arg 10000u32 -b

# Check the value, expected to return 10000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    10000
  ]
}

# Set the value to 20000
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::set_value --arg 20000u32 -b

# Check the value, expected to return 20000
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::read --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    20000
  ]
}

# Remove the value
account execute-function -s 0x143e9f2175f92f51d9adaeee2b3d8bf0 --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::remove -b

# Check if the resource exists, expected to return false
dev call --function 0x143e9f2175f92f51d9adaeee2b3d8bf0::secondary::exists_at --arg 0x143e9f2175f92f51d9adaeee2b3d8bf0
{
  "ok": [
    false
  ]
}
```