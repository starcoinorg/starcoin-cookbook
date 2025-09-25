# Decentralized Finance (DeFi)

This section explains how to test and deploy the `defi` sample project on the Starcoin blockchain. The project’s main
functionality is to test a scenario where a sponsor (S) authorizes a recipient (R) to receive a certain amount of locked
tokens, which the recipient can claim after a specified lockup period.

## Prerequisites

The project is located in the [defi](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-examples/defi)
repository. Please clone the Starcoin repository to your local machine and compile the following tools:

1. [starcoin-cmd](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/cmd/starcoin): Used for connecting to
   nodes.
2. [move-package-manager2](https://github.com/starcoinorg/starcoin/tree/dual-verse-dag/vm2/move-package-manager): Used
   for packaging Move modules.

Assuming the Starcoin binary has been compiled successfully, import the following account information:

- Sponsor (S) account: `0x82cbfefb8076f2da3339b782fb074438`
- Recipient (R1) account: `0x95cb8c2ef522014bd03f633bd6c8dee6`
- Recipient (R2) account: `0x7111c56355d63f3434aa7de8b3c94aff`

Account import data (JSON format):

```json
[
  {
    "ok": {
      "account": "0x82cbfefb8076f2da3339b782fb074438",
      "private_key": "0x01f747e8476fe3727ca29ae87fd44dd8d222609b42517274908c9ef24023169a"
    }
  },
  {
    "ok": {
      "account": "0x95cb8c2ef522014bd03f633bd6c8dee6",
      "private_key": "0x37528fbbace04e2b3609de312bdcfeb4704cd83a3488b9fc836118d02835c36e"
    }
  },
  {
    "ok": {
      "account": "0x7111c56355d63f3434aa7de8b3c94aff",
      "private_key": "0xb1a0d666adaae36d103631a182f8742717c7a650f374912804a1f5e740f4b1b7"
    }
  }
]
```

Execute the following commands to connect to the Starcoin console and package the project:

```shell
# Connect to the Starcoin console, where <network> is the network name (e.g., dev, barnard, etc.)
starcoin -n <network> console

# View the node's sync progress; ensure the local node is fully synced before submitting test transactions
starcoin% node sync progress
There are no running sync tasks.
```

## Test Command Set

### Standard Workflow

Sponsor S authorizes Recipient R1 with 100 STC, locked for 60 seconds. R1 can claim the 100 STC after the 60-second
lockup period.

```shell
# Initialize: Ensure the S account has an STC balance, and use S to authorize R1 as the recipient
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::initialize_sponsor -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b

# Add locked coins: Authorize 100 STC (STC has 9 decimals, so pass 100 * 1e9), locked for 60 seconds
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# View the total number of locks for S
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::total_locks -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# View the locked amount for R1 by S
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::locked_amount -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# View the lockup time for R1 by S
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6

# View the withdrawal address for the lock
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::withdrawal_address -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438

# R1 claims the locked tokens from S (claiming within 60 seconds will result in an error)
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 -b
```

### Error Claim Workflow

```shell
# Error claim: R1 attempts to claim locked tokens from an incorrect account
account execute-function -s 0x95cb8c2ef522014bd03f633bd6c8dee6 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```

### Update Lockup

```shell
# Update the lockup time to 600 seconds
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::update_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 600u64 -b

# Verify if the lockup time has been updated
dev call --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::claim_time_secs -t 0x1::starcoin_coin::STC --arg 0x82cbfefb8076f2da3339b782fb074438 --arg 0x95cb8c2ef522014bd03f633bd6c8dee6
```

### Cancel Lockup

```shell
# Re-add locked coins: Authorize 100 STC, locked for 60 seconds
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::add_locked_coins -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 --arg 100000000000u64 --arg 60u64 -b

# Cancel the lockup
account execute-function -s 0x82cbfefb8076f2da3339b782fb074438 --function 0x82cbfefb8076f2da3339b782fb074438::locked_coins::cancel_lockup -t 0x1::starcoin_coin::STC --arg 0x95cb8c2ef522014bd03f633bd6c8dee6 -b
```