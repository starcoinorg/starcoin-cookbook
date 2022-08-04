# RPC API

StarMask 使用 [`starcoin.request(args)` method](./02-starcoin-provider.md#starcoin-request-args) 来封装 RPC API。

该 API 基于所有 Starcoin 客户端公开的界面，以及越来越多的其他钱包可能支持也可能不支持的方法。

:::tip Tip
所有 RPC 方法请求都可能返回错误。确保每次调用 `starcoin.request(args)` 时都处理错误。
:::

:::info Try
Starcoin 方法，请访问我们的 [API Playground](https://starcoin.org/en/developers/dapp/rpc/rpc_document/)。
:::

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

## 受限制的方法

StarMask 通过 EIP-2255 引入了 Web3 钱包权限。在此权限系统中，每个 RPC 方法要么受到限制，要么不受限制。
如果方法受到限制，调用者必须具有相应的权限才能调用它。与此同时，不受限制的方法没有相应的权限。
不过，其中一些仍然依赖权限才能成功（例如，签名方法要求您拥有签名人帐户的 `stc_accounts` 权限），另一些则需要用户确认（例如 `wallet_addStarcoinChain`）。

将来将添加更多权限。

在引擎盖下，权限是普通的、与 JSON 兼容的对象，其中许多字段主要由 StarMask 内部使用。以下界面列出了消费者可能感兴趣的字段：

```typescript
interface Web3WalletPermission {
  // The name of the method corresponding to the permission
  parentCapability: string;

  // The date the permission was granted, in UNIX epoch time
  date?: number;
}
```

如果您有兴趣了解有关此*功能*启发的权限系统背后的理论的更多信息，我们建议您查看 [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255)。

### `stc_requestAccounts`

:::tip EIP-1102
此方法由 [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102) 指定。

在引擎盖下，它调用 [`wallet_requestPermissions`](#wallet-requestpermissions) 以获得 `stc_accounts` 权限。
由于 `stc_accounts` 目前是唯一的权限，因此您目前只需要此方法。
:::

#### 返回值

`string[]` - 一个由单个十六进制 Starcoin 地址字符串组成。

#### 描述

请求用户提供要识别的 Starcoin 地址。返回一个 Promise，解析为单个 Starcoin 地址字符串的数组。
如果用户拒绝请求，Promise 将以 `4001` 错误拒绝。

请求导致出现 StarMask 弹出窗口。
您只能根据用户操作请求用户的帐户，例如单击按钮。
当请求仍在等待处理时，您应该始终禁用导致请求发送的按钮。

如果您无法检索用户的帐户，您应该鼓励用户发起帐户请求。

#### 例子

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

#### 返回值

`Web3WalletPermission[]` - 调用者权限数组。

#### 描述

获取来电者的当前权限。
返回解析为 `Web3WalletPermission` 对象数组的 Promise。如果调用者没有权限，数组将是空的。

### `wallet_requestPermissions`

#### 参数

- `Array`

`RequestedPermissions` - 请求的权限。

```typescript
interface RequestedPermissions {
  [methodName: string]: {}; // an empty object, for future extensibility
}
```

#### 返回值

`Web3WalletPermission[]` - 调用者权限数组。

#### 描述

向用户请求给定的权限。
返回一个 Promise，解析为 `Web3WalletPermission` 对象的非空数组，对应于调用者的当前权限。
如果用户拒绝请求，Promise 将以 `4001` 错误拒绝。

请求导致出现 StarMask 弹出窗口。您只能根据用户操作请求权限，例如单击按钮。

#### 例子

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

## 不受限制的方法

### `stc_decrypt`

#### 参数

- `Array`

  0. `string` - 不受限制的方法。
  1. `string` - 可以解密消息的 Starcoin 帐户的地址。

#### 返回值

`string` - 解密的消息。

#### 描述

请求 StarMask 解密给定的加密消息。
消息必须使用给定 Starcoin 地址的公共加密密钥进行加密。
返回解析解密消息的承诺，如果解密尝试失败，则拒绝。

有关更多信息，请参阅 [`stc_getEncryptionPublicKey`](#stc-getencryptionpublickey)。

#### 例子

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

#### 参数

- `Array`

  0. `string` - 应检索其加密密钥的 Starcoin 帐户的地址。

#### 返回值

`string` - 指定 Starcoin 帐户的公共加密密钥。

#### 描述

请求用户共享他们的公共加密密钥。
返回解析为公共加密密钥的承诺，如果用户拒绝了请求，则返回拒绝。

公钥使用 `X25519_XSalsa20_Poly1305` 算法的 [`nacl`](https://github.com/dchest/tweetnacl-js) 实现，从与指定用户帐户关联的熵计算。

#### 例子

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

#### 加密

当然，加密密钥的意义在于加密东西。
<!-- Here's an example of how to encrypt a message using [`eth-sig-util`](https://github.com/StarMask/eth-sig-util): -->

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

:::tip EIP-3085
此方法由 [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) 指定。
:::

#### 参数

- `Array`

  0. `AddStarcoinChainParameter` - 关于将添加到 StarMask 的链条的元数据。

对于 `rpcUrls` 和 `blockExplorerUrls` 数组，至少需要一个元素，并且只使用第一个元素。

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

#### 返回值

`null` - 如果请求成功，该方法返回 `null`，否则返回错误。

#### 描述

创建一个确认，要求用户将指定的链添加到 StarMask。添加链后，用户可以选择切换到链。

与任何导致确认出现的方法一样，`wallet_addStarcoinChain` 只能通过直接用户操作来调用，例如单击按钮。

StarMask 严格验证此方法的参数，如果任何参数格式错误，将拒绝请求。
此外，在以下情况下，StarMask 将自动拒绝请求：

- 如果 RPC 端点不响应 RPC 调用。
- 如果 RPC 端点在调用 `chain.id` 时返回不同的链ID。
- 如果链 ID 对应于任何默认的 StarMask 链。

StarMask 还不支持本地货币没有小数点后18的链，但将来可能会这样做。

#### `wallet_switchStarcoinChain` 的使用

我们建议将此方法与 [`wallet_addStarcoinChain`](#wallet-addStarcoinchain) 搭配使用：

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

:::tip EIP-3326
此方法由 [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain) 指定。
:::

#### 参数

- `Array`

  0. `SwitchStarcoinChainParameter` - Metadata about the chain that StarMask will switch to.

```typescript
interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}
```

#### Returns
#### 返回值

`null` - The method returns `null` if the request was successful, and an error otherwise.

If the error code (`error.code`) is `4902`, then the requested chain has not been added by StarMask, and you have to request to add it via [`wallet_addStarcoinChain`](#wallet-addstarcoinchain).

#### Description
#### 描述

:::tip Tip
See [above](#usage-with-wallet-switchstarcoinchain) for how to use this method with `wallet_addStarcoinChain`.
:::

Creates a confirmation asking the user to switch to the chain with the specified `chainId`.

As with any method that causes a confirmation to appear, `wallet_switchStarcoinChain`
should **only** be called as a result of direct user action, such as the click of a button.

StarMask will automatically reject the request under the following circumstances:

- If the chain ID is malformed
- If the chain with the specified chain ID has not been added to StarMask

### `wallet_registerOnboarding`

:::tip Tip
As an API consumer, you are unlikely to have to call this method yourself.
<!-- Please see the [Onboarding Library documentation](./01-onboarding-library.md) for more information. -->
TODO: fix some bugs, until translate zh
:::

#### Returns
#### 返回值

`boolean` - `true` if the request was successful, `false` otherwise.

#### Description
#### 描述

Registers the requesting site with StarMask as the initiator of onboarding.
Returns a Promise that resolves to `true`, or rejects if there's an error.

This method is intended to be called after StarMask has been installed, but before the StarMask onboarding has completed.
You can use this method to inform StarMask that you were the one that suggested installing StarMask.
This lets StarMask redirect the user back to your site after onboarding has completed.

Instead of calling this method directly, you should use the [`@starcoin/starmask-onboarding` library](https://github.com/starcoinorg/starmask-onboarding).

### `wallet_watchAsset`

:::tip EIP-747
This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747).
:::

#### Parameters
#### 参数

- `WatchAssetParams` - The metadata of the asset to watch.

<<< @/docs/snippets/WatchAssetParams.ts

#### Returns
#### 返回值

`boolean` - `true` if the the token was added, `false` otherwise.

#### Description
#### 描述

Requests that the user tracks the token in StarMask.
Returns a `boolean` indicating if the token was successfully added.

Most Starcoin wallets support some set of tokens, usually from a centrally curated registry of tokens.
`wallet_watchAsset` enables web3 application developers to ask their users to track tokens in their wallets, at runtime.
Once added, the token is indistinguishable from those added via legacy methods, such as a centralized registry.

#### Example
#### 例子

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
#### 参数

- `Array`

  0. `string` - (optional) A regular expression for matching arbitrary QR code strings

#### Returns
#### 返回值

`string` - The string corresponding to the scanned QR code.

#### Description
#### 描述

Requests that the user scans a QR code using their device camera.
Returns a Promise that resolves to a string, matching either:

1. The regex parameter, if provided
2. An starcoin address, if no regex parameter was provided

If neither condition is met, the Promise will reject with an error.

StarMask previously introduced this feature per the proposed [EIP-945](https://github.com/ethereum/EIPs/issues/945).
The functionality was temporarily removed before being reintroduced as this RPC method.

#### Example
#### 例子

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
