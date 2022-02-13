# How to deploy

1. Install `starcoin` and `mpm` command

2. Start a starcoin dev node

```bash
starcoin -n dev console
```

and run `dev get-coin` and `account show` command in the starcoin console, for got some test coin and show default address. 


3. Replace the SNFT address with your default address in the `Move.toml` file.

```toml
[addresses]
StarcoinFramework = "0x1"
SNFT = "0xABCDE"
```

4. Run `mpm release` in another shell console for release package

```bash
mpm release
Packaging Modules:
         0x000000000000000000000000000abcde::SimpleNFT
         0x000000000000000000000000000abcde::SimpleNFTScripts
Release done: release/simple-nft.v0.0.1.blob
```

5. Run `account unlock` and `dev deploy release/simple-nft.v0.0.1.blob -b` in starcoin console deploy the package.


6. Execute the initialize transaction in starcoin console

```bash
account execute-function --function 0xabcde::SimpleNFTScripts::initialize -b
```

> Note: Please replace the `0xabcde` with your address.

7. Mint a test nft

```bash
account execute-function --function 0xabcde::SimpleNFTScripts::test_mint_with_image_data -b
```

8. Show the nft

```bash
account nft list
```