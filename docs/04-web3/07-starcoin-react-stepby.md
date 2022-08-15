# StarcoinReact Fastest Guild

**Take you from entry to advanced in one hour**

## Prepared

If you have programming experience is enough, if you have React, Rust, Move experience will be better. Programming is a hands-on craft, the key is action.

## First Step - The Basic

### Download starmask-wallet

https://starcoin.org/en/individual/#wallets

Now the wallet is the key to enter the blockchain, so preparing a wallet is a must. We want to use starcoin, then we need to use starcoin wallet. According to the wallet wizard, use the mnemonic to enter the wallet. Then switch the network to the barnard test network. Under the test network, we can receive tokens for free.

### Get test tokens

https://faucet.starcoin.org/barnard

After the wallet is downloaded, go to this address to receive test coins. After receiving, the received STC will be displayed in the wallet in about 5 seconds. Now you can add an account to your wallet and transfer money between your two accounts. Make a perceptual understanding of the blockchain.

## Second step - The FrontEnd of Dapp

Let's start with the front end, and use JS to get accounts, balances, signatures, etc.

### Init Project

Use JS to call wallet basic functions

`yarn create react-app starcoin-dapp --template typescript `

Will CRA with webpack 5 build in now，some polyfill have removed from webpack 5 ，so we need inject with `react-app-rewired` ， Specific visible warehouse in `package.json`。

After copying the official code, it feels very similar to eth, so the code has been modified.

1. init starcoinProvider

```js
// App.tsx
...
let starcoinProvider = new providers.Web3Provider(
    (window as any).starcoin,
    "any"
  );
  starcoinProvider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    console.log({ newNetwork, oldNetwork });
    if (oldNetwork) {
      console.log("reload");
      window.location.reload();
    }
  });
```

This starcoinProvider is actually a wrapper for `(window as any).starcoin`, for the convenience of writing programs.

2. Use `starcoinProvider` to get the public information of the wallet account:

```js
// App.tsx
...
  const onClickConnect = async () => {
    try {
      // const newAccounts = await (window as any).starcoin.request({
      //   method: "stc_requestAccounts",
      // });
      // console.log(newAccounts);
      // handleNewAccounts(newAccounts)
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      const result = await starcoinProvider.send("stc_requestAccounts", []);
      console.log(result);
      console.log(BigInt(10 ** 9));
      let balance = await starcoinProvider.getBalance(result[0]);
      if (balance)
        console.log(
          { balance },
          (BigInt(balance.valueOf()) / BigInt(10 ** 9)).toString()
        );
      const blockNumber = await starcoinProvider.getBlockNumber();
      console.log({ blockNumber });
    } catch (error) {
      console.error(error);
    }
  };
```

In this way, the address of the wallet and the balance of the wallet are obtained.

3. msg signing using `starcoinProvider`

Nowadays, many web3 websites use wallet signatures to log in users, and they mainly use the msg signature signature function.

```js
// App.tsx
...
  const personalSign = async () => {
    const exampleMessage = "Example `personal_sign` message 中文";
    try {
      // personalSignResult.innerHTML = ''
      // personalSignVerify.disabled = false
      // personalSignRecoverResult.innerHTML = ''
      const result = await starcoinProvider.send("stc_requestAccounts", []);
      const from = result[0];
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
      // console.log({ msg })
      // const networkId = networkDiv.innerHTML
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      const extraParams = { networkId: network.chainId };
      const sign = await (window as any).starcoin.request({
        method: "personal_sign",
        // params: [msg, from, 'Example password'],
        // extraParams = params[2] || {}; means it should be an object:
        // params: [msg, from, { pwd: 'Example password' }],
        params: [msg, from, extraParams],
      });
      console.log(sign);
      // personalSignResult.innerHTML = sign
    } catch (err) {
      console.error(err);
      // personalSign.innerHTML = `Error: ${ err.message }`
    }
  };
  ...
    const personalSignVerify = async () => {
    try {
      const accounts = await starcoinProvider.send("stc_requestAccounts", []);
      const from = accounts[0];
      const sign = "换成上面的签名结果";
      const recoveredAddr =
        await utils.signedMessage.recoverSignedMessageAddress(sign);
      console.log({ recoveredAddr, from });

      // if (recoveredAddr === from) {
      //   console.log(
      //     `@starcoin/starcoin Successfully verified signer as ${recoveredAddr}`
      //   );
      //   personalSignRecoverResult.innerHTML = recoveredAddr;
      // } else {
      //   console.log("@starcoin/starcoin Failed to verify signer");
      // }
    } catch (err) {
      console.error(err);
      // personalSignRecoverResult.innerHTML = `Error: ${err.message}`;
    }
  };
```

These are the basic functions that wallets often use.

## Third step - communication with contract

call contract use javascript.

### NFT

To play the hottest NFT at the moment, prepare the description information of the NFT first

```js
...
const nft = { 
    name: "test_nft",
    imageUrl: "https://arweave.net/QeSUFwff9xDbl4SCXlOmEn0TuS4vPg11r2_ETPPu_nk",
    description: "test nft desc",
  }
...
```

The image address can be any address that can be accessed on the network. Then call the contract. Here is the official SimpleNFT

```js
...
const nft = { 
    name: "test_nft",
    imageUrl: "https://arweave.net/QeSUFwff9xDbl4SCXlOmEn0TuS4vPg11r2_ETPPu_nk",
    description: "test nft desc",
  }
...
```
图片地址可以是网络上任意一张可以访问到的地址。然后调取合约。这里选用官方的 SimpleNFT

```js
// App.tsx
  const mintWithImageUrl = async () => {
    // nftResult.innerHTML = 'Calling mintWithImage'
    // mintWithImage.disabled = true
    try {
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      // const extraParams = { networkId: network.chainId };

      const functionId =
        "0x2c5bd5fb513108d4557107e09c51656c::SimpleNFTScripts::mint_with_image";
      const tyArgs: any[] = [];
      const args = [nft.name, nft.imageUrl, nft.description];

      const chainId = `${network.chainId}` as keyof typeof nodeUrlMap;
      if (!nodeUrlMap[chainId]) return;

      const nodeUrl = nodeUrlMap[chainId];
      console.log({ functionId, tyArgs, args, nodeUrl });

      const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
        functionId,
        tyArgs,
        args,
        nodeUrl
      );

      const payloadInHex = (function () {
        const se = new bcs.BcsSerializer();
        scriptFunction.serialize(se);
        return hexlify(se.getBytes());
      })();
      console.log({ payloadInHex });

      const txParams = {
        data: payloadInHex,
      };

      const transactionHash = await starcoinProvider
        .getSigner()
        .sendUncheckedTransaction(txParams);
      console.log({ transactionHash });
      // nftResult.innerHTML = 'Call mintWithImage Completed'
      // mintWithImage.disabled = false
    } catch (error) {
      // nftResult.innerHTML = 'Call mintWithImage Failed'
      // mintWithImage.disabled = false
      throw error;
    }
  };
```

Later, you will be able to see your NFT in your starcoin wallet.

If you've used HTTP to get backend interfaces, this code will feel familiar. Yes, discarding a contract is like discarding an interface. In a way they are the same, but the backend is decentralized.

## Fourth step - The Move Contract

First connect to the Barnard test network. *Many follow the tutorial to open the node locally, which is only suitable for understanding some commands. If you want to play, you still have to go to the test network*.

```bash
> starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults console
```

more about RPC info can be found here： https://starcoinorg.github.io/starcoin-cookbook/docs/getting-started/setup/test-network/

Then create an account, you can add the -p parameter to set the password.

```bash
> starcoin% account create 

> starcoin% account list
{
  "ok": [
    {
        ...
```

After the account is complete, you can go to https://faucet.starcoin.org/barnard to receive some test coins, which is required for deploy contracts.

### Move Contract Project

Prepare the command line tools first. https://github.com/starcoinorg/starcoin/releases/tag/v1.11.13 Download the appropriate command line tool here.

create new move project

```bash
> mpm package new starcoin-contract
```

you can copy the counter demo code here: https://starcoinorg.github.io/starcoin-cookbook/docs/move/deploy-first-move-contract/

build the project

```bash
> mpm release
```


deploy the project

```bash
> mpm deploy --rpc ws://barnard.seed.starcoin.org:9870 --local-account-dir  ~/.starcoin/barnard/account_vaults ~/HelloWorld/starcoin-contract/release/my_counter.v0.0.1.blob        
Use package address (0xb80660f71e0d5ac2b5d5c43f2246403f) as transaction sender
No password given, use empty String.
txn 0x1d9b69f5fe765897875689b52df7f4807ca663b073bfcea9a763c3948ebeddb4 submitted.
The deployment is successful.
```

This makes the deployment successful. Then you can communicate with the contract. Just like the previous NFT.

### Call Contract



To be continue...