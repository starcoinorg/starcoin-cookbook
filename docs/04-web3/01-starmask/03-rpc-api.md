# RPC API

StarMask uses the [`starcoin.request(args)` method](./03-starcoin-provider.md#starcoin-request-args) to wrap an RPC API.

The API is based on an interface exposed by all Starcoin clients, along with a growing number of methods that may or may not be supported by other wallets.

::: tip Tip
All RPC method requests can return errors.
Make sure to handle errors for every call to `starcoin.request(args)`.
:::

::: tip Try
Starcoin Methods
Visit our [API Playground](https://starcoin.org/en/developers/dapp/rpc/rpc_document/)
:::

## Table of Contents

[[toc]]

<!--
## Starcoin JSON-RPC Methods

For the Starcoin JSON-RPC API, please see [the Starcoin wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

Important methods from this API include:

- [`eth_accounts`](https://eth.wiki/json-rpc/API#eth_accounts)
- [`eth_call`](https://eth.wiki/json-rpc/API#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getbalance)
- [`eth_sendTransaction`](https://eth.wiki/json-rpc/API#eth_sendtransaction)
- [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)
-->

## Restricted Methods

StarMask introduced Web3 Wallet Permissions via [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).
In this permissions system, each RPC method is either _restricted_ or _unrestricted_.
If a method is restricted, the caller must have the corresponding permission in order to call it.
Unrestricted methods, meanwhile, have no corresponding permission. Some of them still rely upon permissions to succeed though (e.g. the signing methods require that you have the `stc_accounts` permission for the signer account), and some require confirmation by the user (e.g. `wallet_addStarcoinChain`).

More permissions will be added in the future.

Under the hood, permissions are plain, JSON-compatible objects, with a number of fields that are mostly used internally by StarMask.
The following interface lists the fields that may be of interest to consumers:

```typescript
interface Web3WalletPermission {
  // The name of the method corresponding to the permission
  parentCapability: string;

  // The date the permission was granted, in UNIX epoch time
  date?: number;
}
```

If you're interested in learning more about the theory behind this _capability_-inspired permissions system, we encourage you to take a look at [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).

### `stc_requestAccounts`

::: tip EIP-1102
This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

Under the hood, it calls [`wallet_requestPermissions`](#wallet-requestpermissions) for the `stc_accounts` permission.
Since `stc_accounts` is currently the only permission, this method is all you need for now.
:::

#### Returns

`string[]` - An array of a single, hexadecimal Starcoin address string.

#### Description

Requests that the user provides an Starcoin address to be identified by.
Returns a Promise that resolves to an array of a single Starcoin address string.
If the user denies the request, the Promise will reject with a `4001` error.

The request causes a StarMask popup to appear.
You should only request the user's accounts in response to user action, such as a button click.
You should always disable the button that caused the request to be dispatched, while the request is still pending.

If you can't retrieve the user's account(s), you should encourage the user to initiate an account request.

#### Example

```javascript
document.getElementById("connectButton", connect);

function connect() {
  starcoin
    .request({ method: "stc_requestAccounts" })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Please connect to StarMask.");
      } else {
        console.error(error);
      }
    });
}
```

### `wallet_getPermissions`

#### Returns

`Web3WalletPermission[]` - An array of the caller's permissions.

#### Description

Gets the caller's current permissions.
Returns a Promise that resolves to an array of `Web3WalletPermission` objects.
If the caller has no permissions, the array will be empty.

### `wallet_requestPermissions`

#### Parameters

- `Array`

  0. `RequestedPermissions` - The requested permissions.

```typescript
interface RequestedPermissions {
  [methodName: string]: {}; // an empty object, for future extensibility
}
```

#### Returns

`Web3WalletPermission[]` - An array of the caller's permissions.

#### Description

Requests the given permissions from the user.
Returns a Promise that resolves to a non-empty array of `Web3WalletPermission` objects, corresponding to the caller's current permissions.
If the user denies the request, the Promise will reject with a `4001` error.

The request causes a StarMask popup to appear.
You should only request permissions in response to user action, such as a button click.

#### Example

```javascript
document.getElementById("requestPermissionsButton", requestPermissions);

function requestPermissions() {
  starcoin
    .request({
      method: "wallet_requestPermissions",
      params: [{ stc_accounts: {} }],
    })
    .then((permissions) => {
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === "stc_accounts"
      );
      if (accountsPermission) {
        console.log("stc_accounts permission successfully requested!");
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    });
}
```

## Unrestricted Methods

### `stc_decrypt`

#### Parameters

- `Array`

  0. `string` - An encrypted message.
  1. `string` - The address of the Starcoin account that can decrypt the message.

#### Returns

`string` - The decrypted message.

#### Description

Requests that StarMask decrypts the given encrypted message.
The message must have been encrypted using the public encryption key of the given Starcoin address.
Returns a Promise that resolves to the decrypted message, or rejects if the decryption attempt fails.

See [`stc_getEncryptionPublicKey`](#stc-getencryptionpublickey) for more information.

#### Example

```javascript
starcoin
  .request({
    method: "stc_decrypt",
    params: [encryptedMessage, accounts[0]],
  })
  .then((decryptedMessage) =>
    console.log("The decrypted message is:", decryptedMessage)
  )
  .catch((error) => console.log(error.message));
```

### `stc_getEncryptionPublicKey`

#### Parameters

- `Array`

  0. `string` - The address of the Starcoin account whose encryption key should be retrieved.

#### Returns

`string` - The public encryption key of the specified Starcoin account.

#### Description

Requests that the user shares their public encryption key.
Returns a Promise that resolve to the public encryption key, or rejects if the user denied the request.

The public key is computed from entropy associated with the specified user account, using the [`nacl`](https://github.com/dchest/tweetnacl-js) implementation of the `X25519_XSalsa20_Poly1305` algorithm.

#### Example

```javascript
let encryptionPublicKey;

starcoin
  .request({
    method: "stc_getEncryptionPublicKey",
    params: [accounts[0]], // you must have access to the specified account
  })
  .then((result) => {
    encryptionPublicKey = result;
  })
  .catch((error) => {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log("We can't encrypt anything without the key.");
    } else {
      console.error(error);
    }
  });
```

#### Encrypting

The point of the encryption key is of course to encrypt things.
Here's an example of how to encrypt a message using [`eth-sig-util`](https://github.com/StarMask/eth-sig-util):

```javascript
const stcUtil = require("@starcoin/stc-util");
const sigUtil = require("@metamask/eth-sig-util");

const encryptedMessage = stcUtil.bufferToHex(
  Buffer.from(
    JSON.stringify(
      sigUtil.encrypt({
        publicKey: encryptionPublicKey,
        data: "hello world!",
        version: "x25519-xsalsa20-poly1305",
      })
    ),
    "utf8"
  )
);
```

### `wallet_addStarcoinChain`

::: tip EIP-3085
This method is specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085).
:::

#### Parameters

- `Array`

  0. `AddStarcoinChainParameter` - Metadata about the chain that will be added to StarMask.

For the `rpcUrls` and `blockExplorerUrls` arrays, at least one element is required, and only the first element will be used.

```typescript
interface AddStarcoinChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}
```

#### Returns

`null` - The method returns `null` if the request was successful, and an error otherwise.

#### Description

Creates a confirmation asking the user to add the specified chain to StarMask.
The user may choose to switch to the chain once it has been added.

As with any method that causes a confirmation to appear, `wallet_addStarcoinChain`
should **only** be called as a result of direct user action, such as the click of a button.

StarMask stringently validates the parameters for this method, and will reject the request
if any parameter is incorrectly formatted.
In addition, StarMask will automatically reject the request under the following circumstances:

- If the RPC endpoint doesn't respond to RPC calls.
- If the RPC endpoint returns a different chain ID when `chain.id` is called.
- If the chain ID corresponds to any default StarMask chains.

StarMask does not yet support chains with native currencies that do not have 18 decimals,
but may do so in the future.

#### Usage with `wallet_switchStarcoinChain`

We recommend using this method with [`wallet_addStarcoinChain`](#wallet-addStarcoinchain):

```javascript
try {
  await starcoin.request({
    method: "wallet_switchStarcoinChain",
    params: [{ chainId: "0xf00" }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to StarMask.
  if (switchError.code === 4902) {
    try {
      await starcoin.request({
        method: "wallet_addStarcoinChain",
        params: [
          {
            chainId: "0xf00",
            chainName: "...",
            rpcUrls: ["https://..."] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}
```

### `wallet_switchStarcoinChain`

::: tip EIP-3326
This method is specified by [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain).
:::

#### Parameters

- `Array`

  0. `SwitchStarcoinChainParameter` - Metadata about the chain that StarMask will switch to.

```typescript
interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}
```

#### Returns

`null` - The method returns `null` if the request was successful, and an error otherwise.

If the error code (`error.code`) is `4902`, then the requested chain has not been added by StarMask, and you have to request to add it via [`wallet_addStarcoinChain`](#wallet-addstarcoinchain).

#### Description

::: tip Tip
See [above](#usage-with-wallet-switchstarcoinchain) for how to use this method with `wallet_addStarcoinChain`.
:::

Creates a confirmation asking the user to switch to the chain with the specified `chainId`.

As with any method that causes a confirmation to appear, `wallet_switchStarcoinChain`
should **only** be called as a result of direct user action, such as the click of a button.

StarMask will automatically reject the request under the following circumstances:

- If the chain ID is malformed
- If the chain with the specified chain ID has not been added to StarMask

### `wallet_registerOnboarding`

::: tip Tip
As an API consumer, you are unlikely to have to call this method yourself.
Please see the [Onboarding Library documentation](./01-onboarding-library.md) for more information.
:::

#### Returns

`boolean` - `true` if the request was successful, `false` otherwise.

#### Description

Registers the requesting site with StarMask as the initiator of onboarding.
Returns a Promise that resolves to `true`, or rejects if there's an error.

This method is intended to be called after StarMask has been installed, but before the StarMask onboarding has completed.
You can use this method to inform StarMask that you were the one that suggested installing StarMask.
This lets StarMask redirect the user back to your site after onboarding has completed.

Instead of calling this method directly, you should use the [`@starcoin/starmask-onboarding` library](https://github.com/starcoinorg/starmask-onboarding).

### `wallet_watchAsset`

::: tip EIP-747
This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747).
:::

#### Parameters

- `WatchAssetParams` - The metadata of the asset to watch.

<<< @/docs/snippets/WatchAssetParams.ts

#### Returns

`boolean` - `true` if the the token was added, `false` otherwise.

#### Description

Requests that the user tracks the token in StarMask.
Returns a `boolean` indicating if the token was successfully added.

Most Starcoin wallets support some set of tokens, usually from a centrally curated registry of tokens.
`wallet_watchAsset` enables web3 application developers to ask their users to track tokens in their wallets, at runtime.
Once added, the token is indistinguishable from those added via legacy methods, such as a centralized registry.

#### Example

```javascript
starcoin
  .request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        symbol: "FOO",
        decimals: 18,
        image: "https://foo.io/token-image.svg",
      },
    },
  })
  .then((success) => {
    if (success) {
      console.log("FOO successfully added to wallet!");
    } else {
      throw new Error("Something went wrong.");
    }
  })
  .catch(console.error);
```

## Mobile Specific RPC Methods

### `wallet_scanQRCode`

#### Parameters

- `Array`

  0. `string` - (optional) A regular expression for matching arbitrary QR code strings

#### Returns

`string` - The string corresponding to the scanned QR code.

#### Description

Requests that the user scans a QR code using their device camera.
Returns a Promise that resolves to a string, matching either:

1. The regex parameter, if provided
2. An starcoin address, if no regex parameter was provided

If neither condition is met, the Promise will reject with an error.

StarMask previously introduced this feature per the proposed [EIP-945](https://github.com/ethereum/EIPs/issues/945).
The functionality was temporarily removed before being reintroduced as this RPC method.

#### Example

```javascript
starcoin
  .request({
    method: "wallet_scanQRCode",
    // The regex string must be valid input to the RegExp constructor, if provided
    params: ["\\D"],
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
