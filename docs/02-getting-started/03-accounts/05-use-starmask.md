# StarMask Introduction

StarMask is a wallet extension that runs in a web browser (Chrome, Firefox or Edge).
It is a wallet for interacting with the Starcoin blockchain. It is easy to use and test, and can connect to multiple Starcoin nodes.
StarMask can be used to store and manage Starcoin's on-chain assets, and users can participate in Starcoin's on-chain governance directly through StarMask, including voting, IDO, SWAP, and more.

## Download and Installation

### Online Installation

You can install StarMask from Chrome App Store, currently only Chrome is supported, if you are using other browsers, please refer to [Offline Installation](#offline-installation).

1. Installation

  Search for `StarMask` in the [Chrome App Store](https://chrome.google.com/webstore/search/StarMask), and click `Add to Chrome` to finish the installation.

2. How to update your wallet manually

  Type `chrome://extensions/` in the Chrome address bar, and turn on the `Developer mode` in the upper right corner of the page.
  The `Update` button will appear at the top left of the page, click the button to update.

3. Detailed Installation Guide

  For more detailed installation guide, please follow this [Installation Guide - Chrome](https://github.com/starcoinorg/starmask-extension/blob/main/docs/en/how-to-install.md).

### Offline Installation

This section describes how to get StarMask wallet in major browsers (Chrome, Firefox and Edge) via offline installation.

#### Download

Visit StarMask's [GitHub repository](https://github.com/starcoinorg/starmask-extension) and download the [latest release](https://github.com/starcoinorg/starmask-extension/releases/latest) for the corresponding browser.

:::note

The current releases are Chrome version and Firefox version, for Microsoft Edge, you can use Chrome version for now.

:::

#### Installation - Chrome

Open Chrome, type `chrome://extensions/` in the address bar, and turn on `Developer mode` in the upper right corner of the page.
Drag and drop the downloaded zip file into Chrome to complete the installation.

After installation, click the `Extensions` icon in the top right corner of Chrome and click `Pin` icon to add StarMask to the `Toolbar` for easy access.

#### Installation - Firefox

Open Firefox browser, click the `Menu` button in the upper right corner, select `Add-ons and themes`, click the little gear at the top of the current page (`Tools for all add-ons`), select `Debug Add-ons`, click `Load Temporary Add-on...`, select the StarMask zip file you just downloaded, then you finish the installation.

You can also type `about:debugging#/runtime/this-firefox` in the Firefox browser address bar, click `Load Temporary Add-on...`, select the StarMask package to finish the installation.

For more detailed installation guide, please refer to [Installation Guide - Firefox Browser](https://github.com/starcoinorg/starmask-extension/blob/main/docs/en/how-to-install-firefox.md).

#### Installation - Edge

Open Edge browser, type `edge://extensions/` in the address bar, turn on the `Developer mode` on the left side, drag and drop the downloaded StarMask zip file into Edge, and you will have the StarMask installed in Edge.

## Create Wallet

After StarMask is installed, the welcome page will open automatically. If the welcome page is not shown, you can also open it by clicking on the StatMask icon on the toolbar.
You will need to read and accept the User Agreement and then enter **Password** to create a new Starcoin wallet.

Click on `Get Started`, click on `Create a Wallet`, click on `I Agree` and enter your password.

:::tip

This password is used to control the access of StarMask, for example, when others use your computer, they need to know the password in order to access to StarMask.

:::

After setting the password, StarMask will generate a wallet for you and lead you to secret backup phrase page, click `Lock` icon to display a mnemonic of 12 words.
These secret backup phrases can be used on all compatible wallets for recovery.
If you forget your wallet password or have problems with your computer, simply use these 12 words to reset your wallet password or recover your wallet from another device.

:::caution

It is recommended to backup these 12 mnemonics on multiple pieces of paper and keep them in 2 to 3 separate places.
e.g., a safe, locked drawer, or other place where you can keep these papers secure.
The value of the paper is equal to the value of the digital assets you hold on the Starcoin blockchain.
If someone else has access to these 12 mnemonics, they can steal your digital assets, so be sure to keep them safe!
In general, it is not recommended to upload screenshots or text files of the secret backup phrase to a network drive or other online device.
If you want to save them on an offline encrypted device, you can click `Download this Secret Backup` on the right side of the page, then move the file to an encrypted storage and make sure there is no backup on your current computer!

:::

After you are sure that you have saved the secret backup phrase (mnemonics) correctly, click `Next`, click words according to the order you just saved, and click `Confirm`.
Once you've verified, you've completed the wallet creation process and enjoy your journey on the Starcoin blockchain!

## Using the Wallet

Once you have created your wallet, you will be taken to your account page, where StarMask will display an overview of your Starcoin account.

The Starcoin icon is displayed on the top row of the account page, which shows the Starcoin network to which your wallet is currently connected (by default, the "Starcoin Main" is displayed) and a colorful icon (to distinguish between multiple accounts).

Clicking on the StarMask icon in the browser toolbar at this point brings up a page that is basically the same as the StarMask extension page.
The only difference is that the StarMask wallet popup page will have a Web3 connection status icon on the left side of the second row.
If your wallet is connected to a Web3 page, it will display `Connected` and you can click on it to see the details.

In the middle of the second row is the account name (default is `Account1`) and the Starcoin address of the account (e.g. `0xeD49...683e`).
`Account Options` is shown on the right side of second row.

The middle of the third row shows the number of STC tokens currently held by the account, and a `Send` button for sending tokens.
At the bottom, there are three tabs for `Assets`, `NFTs` and `Activity`.
