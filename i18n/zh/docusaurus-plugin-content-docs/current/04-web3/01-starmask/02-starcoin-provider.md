# Starcoin Provider API

:::tip 推荐阅读
我们建议所有 web3 站点开发人员阅读[基本用法](#basic-usage)部分。
:::

StarMask 将一个全局 API 注入到其用户在 `window.starcoin` 访问的网站中。
该 API 允许网站请求用户的 Starcoin 账户，从用户连接的区块链中读取数据，并建议用户签署消息和交易。
提供程序对象（provider object）的存在表示 Starcoin 用户。

我们建议在任何平台或浏览器上使用 [`@starcoin/starmask-onboarding`](https://npmjs.com/package/@starcoin/starmask-onboarding) 来检测我们在 `window.starcoin` 中注入的提供程序。

```javascript
// This function detects most providers injected at window.starcoin
import StarMaskOnboarding from "@starcoin/starmask-onboarding";

const { isStarMaskInstalled } = StarMaskOnboarding;

if (!isStarMaskInstalled()) {
  console.log("Please install StarMask!");
}
```

Starcoin JavaScript 提供程序 API 由 [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) 指定。

## 基本用法

对于任何重要的 Starcoin 网络应用程序 —— 也就是 DApp、Web3 站点等 —— 要工作，你必须：

- 检测 Starcoin 提供程序（window.starcoin）
- 检测用户连接到哪个 Starcoin 网络
- 获取用户的 Starcoin 账户

此页面顶部的代码段足以检测提供程序。
你可以通过查看[使用提供程序](#using-the-provider)部分中的代码段来了解如何完成其他两个。

提供程序 API 是你创建功能齐全的 Web3 应用程序所需的一切。

## 链 ID

这些是 StarMask 默认支持的 Starcoin 链的 ID。

| Hex  | Decimal | Network                         |
| ---- | ------- | ------------------------------- |
| 0x1  | 1       | Starcoin Main Network (Mainnet) |
| 0xfb | 251     | Barnard Test Network            |
| 0xfc | 252     | Proxima Test Network            |
| 0xfd | 253     | Halley Test Network             |
| 0xfe | 254     | Starcoin Dev Network            |

## 属性

### `starcoin.isStarMask`

:::warning 注意
这个属性是非标准的。非 StarMask 提供程序也可以将此属性设置为 `true`。
:::

如果用户安装了 StarMask，则为 `true`。

## 方法

### `starcoin.isConnected()`

:::tip 提示
请注意，此方法与用户的帐户无关。
Note that this method has nothing to do with the user's accounts.

您可能经常会遇到“已连接”这个词，指的是 Web3 站点是否可以访问用户的帐户。
然而，在提供程序接口中，“已连接”和“已断开”是指提供程序是否可以向当前链发出 RPC 请求。
:::

```typescript
starcoin.isConnected(): boolean;
```

Returns `true` if the provider is connected to the current chain, and `false` otherwise.

If the provider is not connected, the page will have to be reloaded in order for connection to be re-established.
Please see the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

如果提供程序连接到当前链，则返回 `true`，否则返回 `false`。

如果提供程序未连接，则必须重新加载页面才能重新建立连接。
请参阅 [`connect`](#connect) 和 [`disconnect`](#disconnect) 事件以获取更多信息。

### `starcoin.request(args)`

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

starcoin.request(args: RequestArguments): Promise<unknown>;
```

使用 `request` 通过 `StarMask` 向 Starcoin 提交 RPC 请求。
它返回一个解析为 RPC 方法调用结果的 Promise。

参数和返回值会因 RPC 方法而异。
在实践中，如果一个方法有任何参数，它们几乎总是 `Array<any>` 类型。

如果请求因任何原因失败，Promise 将拒绝并返回 [Starcoin RPC Error](#错误)。

StarMask 支持大多数标准化的 Starcoin RPC 方法，此外还有一些其他钱包可能不支持的方法。
<!-- 有关详细信息，请参阅 StarMask [RPC API documentation](./03-rpc-api.md)。 -->

#### 例子

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

## 事件

StarMask 提供程序实现了 [Node.js `EventEmitter`](https://nodejs.org/api/events.html) API。
本节详细介绍了通过该 API 发出的事件。其他地方有无数的 `EventEmitter` 指南，但您可以监听如下事件：

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

另外，一旦你听完监听器，不要忘记删除它们（例如在 React 中卸载组件时）：

```javascript
function handleAccountsChanged(accounts) {
  // ...
}

starcoin.on("accountsChanged", handleAccountsChanged);

// Later

starcoin.removeListener("accountsChanged", handleAccountsChanged);
```

`starcoin.removeListener` 的第一个参数是事件名称，第二个参数是对第一个参数中提到的事件名称传递给 `starcoin.on` 的同一函数的引用。

### `connect`

```typescript
interface ConnectInfo {
  chainId: string;
}

starcoin.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

当 StarMask 提供程序第一次能够向链提交 RPC 请求时，它会发出此事件。
我们建议使用 `connect` 事件处理程序和 [`starcoin.isConnected()` method](#starcoin-isconnected) 方法来确定何时/是否连接了提供程序。

### `disconnect`

```typescript
starcoin.on('disconnect', handler: (error: ProviderRpcError) => void);
```

如果 StarMask 提供程序无法向任何链提交 RPC 请求，它会发出此事件。
通常，这只会由于网络连接问题或某些不可预见的错误而发生。

一旦发出断开连接（`disconnect`），提供程序将不会接受任何新请求，直到重新建立与链的连接，这需要重新加载页面。
您还可以使用 [`starcoin.isConnected()`](#starcoin-isconnected) 方法来确定提供程序是否已断开连接。

### `accountsChanged`

```typescript
starcoin.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

每当 `stc_accounts` RPC 方法的返回值发生更改时，StarMask 提供程序都会发出此事件。
`stc_accounts` 返回一个为空或包含单个帐户地址的数组。
返回的地址（如果有）是允许调用者访问的最近使用的帐户的地址。
调用者由其 URL 来源标识，这意味着具有相同来源的所有站点共享相同的权限。

这意味着只要用户暴露的帐户地址发生更改，就会发出 `accountsChanged`。

### `chainChanged`

:::tip 提示
有关 StarMask 的默认链及其链 ID，请参阅[链 ID](#链-id) 部分。
:::

```typescript
starcoin.on('chainChanged', handler: (chainId: string) => void);
```

当当前连接的链发生变化时，StarMask 提供程序会发出此事件。

所有的 RPC 请求都提交到当前连接的链上。
因此，通过侦听此事件来跟踪当前链 ID 至关重要。

我们_强烈_建议在链更改时重新加载页面，除非您有充分的理由不这样做。

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

## 错误

StarMask 提供程序抛出或返回的所有错误都遵循此接口：

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

[`starcoin.request(args)`](#starcoin-request-args) 方法会急切地抛出错误。
您通常可以使用错误`代码`属性来确定请求失败的原因。


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

## 使用提供程序（Provider）

这段代码解释了如何完成 Web3 网站的三个最常见的要求：

- 检测 Starcoin 提供者（`window.starcoin`）
- 检测用户连接到哪个 Starcoin 网络
- 获取用户的 Starcoin 账户

<!-- <<< @/docs/snippets/handleProvider.js -->

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
