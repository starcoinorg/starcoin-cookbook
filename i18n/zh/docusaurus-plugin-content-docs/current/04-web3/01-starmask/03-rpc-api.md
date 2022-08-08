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

  0. `SwitchStarcoinChainParameter` - StarMask 将切换到的链的元数据。

```typescript
interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}
```

#### 返回值

`null` - 如果请求成功，该方法返回 `null`，否则返回错误。

如果错误码（`error.code`）为 `4902`，则说明请求的链没有被StarMask添加，需要通过 [`wallet_addStarcoinChain`](#wallet-addstarcoinchain) 请求添加。

#### 描述

:::tip Tip
有关如何将此方法与 `wallet_addStarcoinChain` 一起使用的信息，请参见[上文](#usage-with-wallet-switchstarcoinchain)。
:::

创建一个确认，要求用户切换到具有指定 `chainId` 的链。

与任何导致确认出现的方法一样，`wallet_switchStarcoinChain` 只能作为直接用户操作的结果调用，例如单击按钮。

StarMask 会在以下情况下自动拒绝该请求：

- 如果链 ID 格式错误
- 如果指定链 ID 的链尚未添加到 StarMask

### `wallet_registerOnboarding`

:::tip Tip
作为 API 使用者，您不太可能必须自己调用此方法。
更多信息请参阅 [入门库](./01-onboarding-library.md) 的文档。
:::

#### 返回值

`boolean` - 如果请求成功则为 `true`，否则为 `false`。

#### 描述

Registers the requesting site with StarMask as the initiator of onboarding.
Returns a Promise that resolves to `true`, or rejects if there's an error.

This method is intended to be called after StarMask has been installed, but before the StarMask onboarding has completed.
You can use this method to inform StarMask that you were the one that suggested installing StarMask.
This lets StarMask redirect the user back to your site after onboarding has completed.

Instead of calling this method directly, you should use the [`@starcoin/starmask-onboarding` library](https://github.com/starcoinorg/starmask-onboarding).
向 StarMask 注册请求站点作为入职的发起者。返回一个解析为 `true` 的 Promise，如果有错误则拒绝。

此方法旨在在安装 StarMask 之后，但在 StarMask 载入完成之前调用。
您可以使用此方法通知 StarMask，您是建议安装 StarMask 的人。
这允许 StarMask 在用户引导完成后将用户重定向回您的站点。

您应该使用 [`@starcoin/starmask-onboarding` library](https://github.com/starcoinorg/starmask-onboarding) 库，而不是直接调用此方法。

### `wallet_watchAsset`

:::tip EIP-747
此方法由 [EIP-747](https://eips.ethereum.org/EIPS/eip-747) 指定。
:::

#### 参数

- `WatchAssetParams` - 要观看的资产的元数据。

<<< @/docs/snippets/WatchAssetParams.ts

#### 返回值

`boolean` - 如果添加了令牌，则为 `true`，否则为 `false`。

#### 描述

请求用户在 StarMask 中跟踪令牌。返回一个布尔值，指示令牌是否已成功添加。

大多数 Starcoin 钱包支持一组代币，通常来自一个集中管理的代币注册表。
`wallet_watchAsset` 使 web3 应用程序开发人员能够在运行时要求他们的用户跟踪他们钱包中的代币。
添加后，令牌与通过传统方法（例如集中式注册表）添加的令牌无法区分。

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

## 移动特定的 RPC 方法

### `wallet_scanQRCode`

#### 参数

- `Array`

  0. `string` - （可选）匹配任意二维码字符串的正则表达式

#### 返回值

`string` - 扫描的二维码对应的字符串。

#### 描述

请求用户使用他们的设备摄像头扫描二维码。返回解析为字符串的 Promise，匹配以下任一：

- 正则表达式参数（如果提供）
- 星币地址，如果没有提供正则表达式参数

如果两个条件都不满足，Promise 将拒绝并返回错误。

StarMask 之前根据提议的 [EIP-945](https://github.com/ethereum/EIPs/issues/945) 引入了此功能。该功能在作为此 RPC 方法重新引入之前被暂时删除。

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
