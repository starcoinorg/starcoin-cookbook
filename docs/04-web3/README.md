# How to Dapp

We’ll show you how to build your first decentralized application, or Dapps in this document. We’ll also guide you through Dapp development process instructions.

## Dapp Development Process Instructions

Any Dapp on public blockchain from frontend to smart contracts, has mian steps as we show in figure 1.

![dapp_1](../../static/img/dapp/dapp_1.png)

The decentralized network we use in this document is Startcoin. Key components that have been used in figure 1:

1. Frontend user interface

2. SDK tools are used to interact with the Starcoin blockchain

3. Browser extension Starmask is an alternative way to interact with the Starcoin blockchain

4. Nodes on Starcoin blockchain

5. Smart contracts on Starcoin blockchain

Some programming tools we used in key components we mentioned in figure1 are shown in figure2:

![dapp_2](../../static/img/dapp/dapp_2.png)

First, We will explain some concepts that developers may concern, Then we will cover more details about each programming tool.

1. Practical Dapp: You will get intuitive knowledge of what a decentralized application is. For a front-end developer, this will be a good choice to explore Dapp.
2. StarMask API: In some Dapp development scenarios, such as digital signatures, the Starmask API will be called to complete interactions with users and blockchain. StarMask is a software cryptocurrency wallet used to interact with the Starcoin blockchain.
3. SDK is one way to interact with Starcoin blockchain. Developers can choose one SDK which suits your needs. SDKs for Starcoin are:
   - JS SDK
   - Java SDK
   - Python SDK
   - Go SDK
   - Dart SDK
4. RPC API and Starcoin Nodes : You can access all services and interfaces of Nodes via RPC interface, it’s the fastest way to interact with Starcoin for developers or SDK.
5. Smart Contracts: Move is used to implement and deploy smart contracts on Starcoin, all users on Starcoin can reuse these smart contracts.

Next, we’ll explore further about each concept we have learned in figure 2. If there is a certain part that you're interested in, you can skip to it.

## Practical Dapp

It’s an easy decentralized application, it’s designed for you to get started. You will get a quick feel of what Dapp is and how it interacts with Starcoin. For a developer, you can build your own Dapp or check the code structure through viewing its source code.

- Test Dapp Link: https://starmask-test-dapp.starcoin.org/Github
- Github Link: https://github.com/starcoinorg/starmask-test-dapp

## StarMask

Starmask is not only used to manage your digital assets, but another way to interact with Starcoin blockchain. Here is one example, users create digital signature for each transaction in Dapp, then submit this transaction to Txpool which in remote nodes.

- Installation Link: https://github.com/starcoinorg/starmask-extension/blob/main/docs/how-to-install.md
- User Guides Link:https://github.com/starcoinorg/starmask-extension/blob/main/docs/en/how-to-use.md

## SDK

Another way to interact with Starcoin is SDK. Starcoin now supports multi-language SDKs. SDK provides a programming interaction with nodes on Starcoin.

1. JS SDK

- Developer Documentation Link: https://starcoin.org/zh/developer/sdk/javascript/
- Source Code Link: https://github.com/starcoinorg/starcoin.js

2. Java SDK

- Developer Documentation Link: https://github.com/starcoinorg/starcoin-java#readme
- Source Code Link: https://github.com/starcoinorg/starcoin-java

3. Python SDK

- Developer Documentation Link: https://starcoin-sdk-python.readthedocs.io
- Source Code Link: https://github.com/starcoinorg/starcoin-sdk-python

4. Go SDK

- Developer Documentation Link: https://github.com/starcoinorg/starcoin-go/blob/main/README.md
- Source Code Link: https://github.com/starcoinorg/starcoin-go

5. Dart SDK

- Source Code Link: https://github.com/starcoinorg/starcoin.dart

## Starcoin Nodes and RPC API

You can interact with Starcoin nodes using StarMask or SDK on Starcoin blockchain. The stability of nodes is essential to add Dapp transactions on Starcoin blockchain. Starcoin nodes include necessary APIs which you’ll use on Starcoin blockchain.

1. Networks
   Starcoin has appropriate networks to satisfy the needs in various stages of development. We have five networks: Dev, Test, Halley, Proxima,Barnard,Main.

- Dev: It’s used for local Dapp development
- Test: It’s used for unit and integrated test
- Halley: Always use the latest version of Stdlib, Genesis Block will be reset immediately and data will be cleaned up whenever there is a update for Stdlib
- Proxima: It’s used to run tests before Dapp launch, data will be cleaned up periodically
- Barnard: It’s also used to run tests before Dapp launch, but it’s different from Proxima, we do not remove data, it’s your responsibility to ensure smart contracts are still compatible.
- Main: Main Starcoin network

2. Nodes Installation Methods
   To install on Windows,Mac, and Linux, download pre-compiled binary from [downloads](https://github.com/starcoinorg/starcoin/releases) pages.

- Build Starcoin with source code, [Guides](https://starcoin.org/zh/developer/setup/build/)
- Run inside Docker container, [Guides](https://starcoin.org/zh/developer/setup/run_by_docker/)

3. Run Starcoin
   The approach is a little bit different due to different node installation methods.

- Run inside Docker container, [Guides](https://starcoin.org/zh/developer/setup/run_by_docker/)
- Pre-compiled binary, [Guides](https://starcoin.org/zh/developer/setup/runnetwork/)
  You need to change the `-n` parameter to use different networks.

4. Console
   Starcoin console is a command line interface for running Starcoin nodes. You can view nodes’ state using a simple command.[Guides](https://starcoin.org/zh/developer/cli/console/)
5. Command Line Document
   Starcoin has lots of commands, some useful commands are:

- account: account-related command
- chain: chain-related command
- node: node-related command
- state: state-related command
  Check [here](https://starcoin.org/zh/developer/cli/) to view more commands.

6. RPC Protocol
   You also can connect to Starcoin nodes via the RPC interface. It’s a great programming way to access nodes on a chain, SDK is one example. Check [RPC protocol document](https://starcoin.org/zh/developer/rpc/rpc_document/) to get more information.
7. More about Starcoin
   If you are a developer and want to get more details about Starcoin. We recommend you check these links:

- Key concept: https://starcoin.org/zh/developer/key_concepts/
- SIPs: https://starcoin.org/zh/developer/sips/
- Source code: https://github.com/starcoinorg/starcoin

## Move

Currently, Starcoin is the first one public blockchain that can run Move smart contracts.

1. [Move Book](https://move-book.com/).Check [Move introduction](https://developers.diem.com/docs/move/move-start-here/move-introduction) to learn more about Move.
2. IDE

- Starcoin IDE: https://marketplace.visualstudio.com/items?itemName=starcoinorg.starcoin-ide
- Move-Package-Manager: It’s a lightweight tool to test, deploy Move smart contracts.[Download](https://github.com/starcoinorg/guide-to-move-package-manager)

3. Test
   You can test your Move smart contracts with different test types.

- Unit test: [Guides](https://github.com/diem/diem/blob/main/language/changes/4-unit-testing.md)
- Functional Test: To run a functional test, make sure to initialize Starcoin first.
- [Guides](https://starcoin.org/zh/developer/functional_test/functional_test/)
  - [Examples](https://github.com/starcoinorg/starcoin/tree/master/vm/functional-tests/tests/testsuite)

4. Compile and Deploy
   There are multiple ways to compile and deploy Move smart contracts on Starcoin blockchain. Make sure that you have chosen appropriate networks!

- Console: [Guides](https://starcoin.org/en/developer/tutorials/deploy_move_contract/)
- Starmask-test-dapp: Contract blob hex functionality. [Guides](https://starmask-test-dapp.starcoin.org/)
- Move-Package-Manager: [Guides](https://github.com/starcoinorg/guide-to-move-package-manager)

5. More [example](https://starcoin.org/zh/developer/move/example/) about Move

## Stdlib and Protocols

Starcoin has been created using Move language, it also has Stdlib features. Please check our [source code](https://github.com/starcoinorg/starcoin/tree/master/vm/stdlib/modules).Starcoin has defined variety protocols in Stdlib, some protocols will be shown in figure 3.
![](../../static/img/dapp/pb.jpg)

1. DAO protocolDAO
   protocol is a basic protocol in Stdlib, you can govern blockchain well via DAO protocol. Here is a [governable contract upgrade](https://starcoin.org/zh/developer/blog/starcoin_stdlib_upgrade) example.
2. NFT Protocol

- [NFT protocol introduction](https://starcoin.org/zh/developer/protocols/starcoin_nft/)
- [SIP22](https://github.com/starcoinorg/sips/blob/master/sip-22/index.zh.md)
- Source Code
  - https://github.com/starcoinorg/starcoin-framework/tree/main/sources/NFT.move
  - https://github.com/starcoinorg/starcoin-framework/tree/main/sources/MerkleNFT.move
    3: Stdlib [Guides](https://starcoin.org/zh/developer/stdlib/stdlib/)

## Other Develop Tools

1. Official website
   Visit [our website](https://starcoin.org) to get more information, such as white paper, developer documents and tools, toolchain,latest news about Starcoin.
2. Faucet
   You will need STC(native cryptocurrency of this platform) when you run tests, such as paying gas fees. As a developer, you can apply for STC in Barnad network.

- Barnad: https://faucet.starcoin.org/barnard

3. Explorer
   Explorer is a complementary tool to chain. We suggest that you use [stcscan](https://stcscan.io/) as blockchain explorer.

4. Voting DappVoting Dapp is another developer tool,it’s used to manage Starcoin blockchain. A developer can create a proposal, we will take a public,equal and formal vote in our community on the Voting Dapp. Your proposal will be approved with more votes in favour.

5. Starcoin logos and icons
   Download Link: https://starcoin.org/downloads/logo.zip⁣
