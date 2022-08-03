# Manage accounts by CLI

The Starcoin node has a built-in decentralized wallet that allows users to manage their accounts through account api and commands.

When the node starts, a default account is automatically created with an empty password. The default account can be changed via account commands.
The following commands require a connection to the console, see [How working with the Starcoin console](../02-setup/02-starcoin-console.md).

1. Create account

```bash
starcoin% account create -p <MY-PASSWORD>
{
  "ok": {
    "address": "0xf096a2a61d3042774187a462a5394537",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x96734ea5015c3e1901b1af3e9c16f42df074c92749988d0563be3f5df65c2da6",
    "receipt_identifier": "stc1p7zt29fsaxpp8wsv853322w29xu02slxc"
  }
}
```

2. Show account

```bash
starcoin% account show 0xf096a2a61d3042774187a462a5394537
{
  "ok": {
    "account": {
      "address": "0xf096a2a61d3042774187a462a5394537",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x96734ea5015c3e1901b1af3e9c16f42df074c92749988d0563be3f5df65c2da6",
      "receipt_identifier": "stc1p7zt29fsaxpp8wsv853322w29xu02slxc"
    },
    "auth_key": "0x4c9c5a86f958a1a02286e46807df916ff096a2a61d3042774187a462a5394537",
    "balances": {},
    "sequence_number": null
  }
}
```

- `address` is the address of the account.
- `is_default` indicates whether the account is the default account. Many commands that require an account address parameter, if user not passed it, the command will use the default account address. If the node has enable the miner client, the default account will also be used for miner client.
- `is_readonly` indicates whether the account is the read-only account. The private key of the read-only account is not hosted in the node wallet.
- `public_key` is the public key corresponding to the address of the account.
- `receipt_identifier` is receipt identifier.
- `auth_key` is the authentication key.

> Note that creating an account only creates a pair of keys in the starcoin node, and does not update the state of the chain. So `balance` and `sequence_number` are still empty at this point. All the above information is public information.

3. List account

```bash
starcoin% account list
```

4. View or change the default account

To view the default account address:

```bash
starcoin% account default
```

Set `0xf096a2a61d3042774187a462a5394537` to the default address:

```bash
starcoin% account default 0xf096a2a61d3042774187a462a5394537
```

5. Export and import account

In order to avoid losing your assets due to disk corruption and other reasons, it is important to backup your private key.

Execute the following command:

```bash
starcoin% account export 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD>
```

To export the private key of `0xf096a2a61d3042774187a462a5394537`.

Execute the following command:

```bash
starcoin% account import -i <PRIVATE-KEY> -p <MY-PASSWORD> 0xf096a2a61d3042774187a462a5394537
```

This will import the `0xf096a2a61d3042774187a462a5394537` account. This command can also be used to import the account to a different node and used to do node migration.

6. Import read-only account

If you do not want to host the private key in the node wallet, but just want to view the account, or use the account as a mining account, you can import the read-only account with the public key:

```bash
starcoin% account import-readonly -i <PUBLIC-KEY>
```

Then set the account as the default account.

7. Remove account

```bash
starcoin% account remove 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD>
```

If it is a read-only account, you do not need to pass the `-p` option. Deleting an account only deletes the account from the node wallet and does not affect the account on the chain.

8. Lock and unlock account

- Lock


```bash
starcoin% account lock 0xf096a2a61d3042774187a462a5394537
```

- Unlock

Opion `-d` can specify the time when the account is kept unlocked, and the default value is 300 seconds.

```bash
starcoin% account unlock 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD> -d 300
```
