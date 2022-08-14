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

## DApp - FrontEnd

Let's start with the front end, and use JS to get accounts, balances, signatures, etc.

### Init Project

Use JS to call wallet basic functions

`yarn create react-app starcoin-dapp --template typescript `

Will CRA with webpack 5 build in now，some polyfill have removed from webpack 5 ，so we need inject with `react-app-rewired` ， Specific visible warehouse in `package.json`。



To be continue...