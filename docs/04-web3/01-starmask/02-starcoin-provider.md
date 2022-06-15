# Starcoin Provider API

::: tip Recommended Reading
We recommend that all web3 site developers read the [Basic Usage](#basic-usage) section.
:::

StarMask injects a global API into websites visited by its users at `window.starcoin`.
This API allows websites to request users' Starcoin accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.
The presence of the provider object indicates an Starcoin user.

We recommend using [`@starcoin/starmask-onboarding`](https://npmjs.com/package/@starcoin/starmask-onboarding) to detect our provider injected at`window.starcoin`, on any platform or browser.

```javascript
// This function detects most providers injected at window.starcoin
import StarMaskOnboarding from "@starcoin/starmask-onboarding";

const { isStarMaskInstalled } = StarMaskOnboarding;

if (!isStarMaskInstalled()) {
  console.log("Please install StarMask!");
}
```

The Starcoin JavaScript provider API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

## Basic Usage

For any non-trivial Starcoin web application — a.k.a. dapp, web3 site etc. — to work, you will have to:

- Detect the Starcoin provider (`window.starcoin`)
- Detect which Starcoin network the user is connected to
- Get the user's Starcoin account(s)

The snippet at the top of this page is sufficient for detecting the provider.
You can learn how to accomplish the other two by reviewing the snippet in the [Using the Provider section](#using-the-provider).

The provider API is all you need to create a full-featured web3 application.

## Chain IDs

These are the IDs of the Starcoin chains that StarMask supports by default.

| Hex  | Decimal | Network                         |
| ---- | ------- | ------------------------------- |
| 0x1  | 1       | Starcoin Main Network (Mainnet) |
| 0xfb | 251     | Barnard Test Network            |
| 0xfc | 252     | Proxima Test Network            |
| 0xfd | 253     | Halley Test Network             |

## Properties

### starcoin.isStarMask

::: warning Note
This property is non-standard. Non-StarMask providers may also set this property to `true`.
:::

`true` if the user has StarMask installed.

## Methods

### starcoin.isConnected()

::: tip Tip
Note that this method has nothing to do with the user's accounts.

You may often encounter the word "connected" in reference to whether a web3 site can access the user's accounts.
In the provider interface, however, "connected" and "disconnected" refer to whether the provider can make RPC requests to the current chain.
:::

```typescript
starcoin.isConnected(): boolean;
```

Returns `true` if the provider is connected to the current chain, and `false` otherwise.

If the provider is not connected, the page will have to be reloaded in order for connection to be re-established.
Please see the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

### starcoin.request(args)

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

starcoin.request(args: RequestArguments): Promise<unknown>;
```

Use `request` to submit RPC requests to Starcoin via StarMask.
It returns a `Promise` that resolves to the result of the RPC method call.

The `params` and return value will vary by RPC method.
In practice, if a method has any `params`, they are almost always of type `Array<any>`.

If the request fails for any reason, the Promise will reject with an [Starcoin RPC Error](#errors).

StarMask supports most standardized Starcoin RPC methods, in addition to a number of methods that may not be supported by other wallets.
See the StarMask [RPC API documentation](./03-rpc-api.md) for details.

#### Example

```javascript
params: [
  "0xeb9a0d1628fddba79b932ced2623b1a415000000000000000218351d311d32201149a4df2a9fc2db8a1043726f7373436861696e536372697074116c6f636b5f776974685f7374635f66656500062f2e307831383335316433313164333232303131343961346466326139666332646238613a3a584554483a3a584554480802000000000000001514208d1ae5bb7fd323ce6386c443473ed660825d4610c05e9de71a000000000000000000000010404b4c000000000000000000000000001001000000000000000000000000000000809698000000000001000000000000000d3078313a3a5354433a3a5354434eb90f6200000000fb0020a972a04aefbace3686e1889c47976ca664ad9f9384293c6b291811fc2870e2ba40b7d36db7f70149c7614cb9535a5d56ff052bcd74dfc3578f1b3586d80913fdc5ca4785a78b5d11c7bfecb86c0a0c56c3945d39b8c759115a2be61f5d82ba1e08",
];

starcoin
  .request({
    method: "txpool.submit_hex_transaction",
    params,
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.
  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.
  });
```

## Events

The StarMask provider implements the [Node.js `EventEmitter`](https://nodejs.org/api/events.html) API.
This sections details the events emitted via that API.
There are innumerable `EventEmitter` guides elsewhere, but you can listen for events like this:

```javascript
starcoin.on("accountsChanged", (accounts) => {
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.
});

starcoin.on("chainChanged", (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have good reason not to.
  window.location.reload();
});
```

Also, don't forget to remove listeners once you are done listening to them (for example on component unmount in React):

```javascript
function handleAccountsChanged(accounts) {
  // ...
}

starcoin.on("accountsChanged", handleAccountsChanged);

// Later

starcoin.removeListener("accountsChanged", handleAccountsChanged);
```

The first argument of the `starcoin.removeListener` is the event name and the second argument is the reference to the same function which has passed to `starcoin.on` for the event name mentioned in the first argument.

### connect

```typescript
interface ConnectInfo {
  chainId: string;
}

starcoin.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

The StarMask provider emits this event when it first becomes able to submit RPC requests to a chain.
We recommend using a `connect` event handler and the [`starcoin.isConnected()` method](#starcoin-isconnected) in order to determine when/if the provider is connected.

### disconnect

```typescript
starcoin.on('disconnect', handler: (error: ProviderRpcError) => void);
```

The StarMask provider emits this event if it becomes unable to submit RPC requests to any chain.
In general, this will only happen due to network connectivity issues or some unforeseen error.

Once `disconnect` has been emitted, the provider will not accept any new requests until the connection to the chain has been re-restablished, which requires reloading the page.
You can also use the [`starcoin.isConnected()` method](#starcoin-isconnected) to determine if the provider is disconnected.

### accountsChanged

```typescript
starcoin.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The StarMask provider emits this event whenever the return value of the `stc_accounts` RPC method changes.
`stc_accounts` returns an array that is either empty or contains a single account address.
The returned address, if any, is the address of the most recently used account that the caller is permitted to access.
Callers are identified by their URL _origin_, which means that all sites with the same origin share the same permissions.

This means that `accountsChanged` will be emitted whenever the user's exposed account address changes.

### chainChanged

::: tip Tip
See the [Chain IDs section](#chain-ids) for StarMask's default chains and their chain IDs.
:::

```typescript
starcoin.on('chainChanged', handler: (chainId: string) => void);
```

The StarMask provider emits this event when the currently connected chain changes.

All RPC requests are submitted to the currently connected chain.
Therefore, it's critical to keep track of the current chain ID by listening for this event.

We _strongly_ recommend reloading the page on chain changes, unless you have good reason not to.

```javascript
starcoin.on("chainChanged", (_chainId) => window.location.reload());
```

<!--
### message

```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

starcoin.on('message', handler: (message: ProviderMessage) => void);
```

The StarMask provider emits this event when it receives some message that the consumer should be notified of.
The kind of message is identified by the `type` string.

RPC subscription updates are a common use case for the `message` event.
For example, if you create a subscription using `eth_subscribe`, each subscription update will be emitted as a `message` event with a `type` of `eth_subscription`. -->

## Errors

All errors thrown or returned by the StarMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

The [`starcoin.request(args)` method](#starcoin-request-args) throws errors eagerly.
You can often use the error `code` property to determine why the request failed.

<!--
Common codes and their meaning include:

- `4001`
  - The request was rejected by the user
- `-32602`
  - The parameters were invalid
- `-32603`
  - Internal error

For the complete list of errors, please see [EIP-1193](https://eips.starcoin.org/EIPS/eip-1193#provider-errors) and [EIP-1474](https://eips.starcoin.org/EIPS/eip-1474#error-codes).

::: tip Tip
The [`eth-rpc-errors`](https://npmjs.com/package/eth-rpc-errors) package implements all RPC errors thrown by the StarMask provider, and can help you identify their meaning.
:::
-->

## Using the Provider

This snippet explains how to accomplish the three most common requirements for web3 sites:

- Detect the Starcoin provider (`window.starcoin`)
- Detect which Starcoin network the user is connected to
- Get the user's Starcoin account(s)

<<< @/docs/snippets/handleProvider.js

<!--
## Experimental API

::: warning
There is no guarantee that the methods and properties defined in this section will remain stable.
Use it at your own risk.
:::

We expose some experimental, StarMask-specific methods under the `starcoin._metamask` property.

## Experimental Methods

### starcoin.\_metamask.isUnlocked()

```typescript
starcoin._metamask.isUnlocked(): Promise<boolean>;
```

This method returns a `Promise` that resolves to a `boolean` indicating if StarMask is unlocked by the user.
StarMask must be unlocked in order to perform any operation involving user accounts.
Note that this method does not indicate if the user has exposed any accounts to the caller.
-->
