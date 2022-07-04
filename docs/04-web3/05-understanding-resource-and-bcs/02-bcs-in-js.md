# BCS in JS SDK

JS SDK Repo: [starcoin.js](https://github.com/starcoinorg/starcoin.js)

## Type Inheritance Diagram

| types            | directory                               |
| ---------------- | --------------------------------------- |
| js(client level) | src/types/index.ts                      |
| starcoin_types   | src/lib/runtime/starcoin_types/index.ts |
| onchain_events   | src/lib/runtime/onchain_events/index.ts |
| bcs              | src/lib/runtime/bcs/index.ts            |
| serde            | src/lib/runtime/serde/index.ts          |

## Examples

### `Bytes`

```js
import { bcs } from "@starcoin/starcoin";

const token = "0x00000000000000000000000000000001::STC::STC";
console.log(token);
/*
0x00000000000000000000000000000001::STC::STC
*/
const tokenUint8Array = new Uint8Array(Buffer.from(token));
console.log(tokenUint8Array);
/*
Uint8Array(44) [
      48, 120, 48, 48, 48, 48, 48, 48, 48, 48,
      48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48,  48, 48, 49, 58, 58, 83, 84, 67, 58,
      58,  83, 84, 67
    ]
*/
console.log(toHexString(tokenUint8Array));
/*
0x307830303030303030303030303030303030303030303030303030303030303030313a3a5354433a3a535443
*/
const se = new BcsSerializer();
se.serializeBytes(tokenUint8Array);
console.log(se.getBytes());
/*
Uint8Array(45) [
      44, 48, 120, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 49,  58, 58, 83, 84, 67, 58, 58, 83, 84,
      67
    ]
*/
const tokenHex = toHexString(se.getBytes());
console.log(tokenHex);
/*
0x2c307830303030303030303030303030303030303030303030303030303030303030313a3a5354433a3a535443
*/
```

the Uint8Array of `se.getBytes()` has one element `44` at first position more than the Uint8Array of `tokenUint8Array`(length=44), and the hex of `44` is `2c`.

### `string`

```js
import { bcs } from "@starcoin/starcoin";
import { hexlify } from "@ethersproject/bytes";

const token = "0x00000000000000000000000000000001::STC::STC";
console.log(token);
/*
0x00000000000000000000000000000001::STC::STC
*/
const se = new BcsSerializer();
se.serializeStr(token);
console.log(se.getBytes());
/*
Uint8Array(45) [
      44, 48, 120, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 48,  48, 48, 48, 48, 48, 48, 48, 48, 48,
      48, 49,  58, 58, 83, 84, 67, 58, 58, 83, 84,
      67
    ]
*/
const tokenHex = hexlify(se.getBytes());
console.log(tokenHex);
/*
0x2c307830303030303030303030303030303030303030303030303030303030303030313a3a5354433a3a535443
*/
```

In fact, `se.serializeStr` transfer parameter's type from `string` to `Uint8Array` and calls `se.serializeBytes` internally.

### `U64`

```js
import { bcs } from "@starcoin/starcoin";
import { hexlify } from "@ethersproject/bytes";

const toChainId = 251;
console.log(toChainId);
/*
251
*/
const se = new BcsSerializer();
se.serializeU64(toChainId);
console.log(se.getBytes());
/*
Uint8Array(8) [
      251, 0, 0, 0,
        0, 0, 0, 0
    ]
*/
const toChainIdHex = hexlify(se.getBytes());
console.log(toChainIdHex);
/*
0xfb00000000000000
*/
```

### `U128`

```js
import { bcs } from "@starcoin/starcoin";
import { hexlify } from "@ethersproject/bytes";

const toChainId = 251;
console.log(toChainId);
/*
251
*/
const se = new BcsSerializer();
se.serializeU128(toChainId);
console.log(se.getBytes());
/*
Uint8Array(16) [
      251, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0
    ]
*/
const toChainIdHex = hexlify(se.getBytes());
console.log(toChainIdHex);
/*
0xfb000000000000000000000000000000
*/
```

### `Bool`

```js
import { bcs } from "@starcoin/starcoin";
import { hexlify } from "@ethersproject/bytes";

const vote = true;
console.log(vote);
/*
true
*/
const se = new BcsSerializer();
se.serializeBool(vote);
console.log(se.getBytes());
/*
Uint8Array(1) [ 1 ]
*/
const voteHex = hexlify(se.getBytes());
console.log(voteHex);
/*
0x01
*/
```

### `Vector<U8>`

```js
import { starcoin_types, utils } from "@starcoin/starcoin";
import { hexlify, isHexString } from "@ethersproject/bytes";

const value = "çå∞≠¢õß∂ƒ∫";
const valueBytes = new Uint8Array(Buffer.from(value));
console.log(valueBytes);
/*
Uint8Array(24) [
      195, 167, 195, 165, 226,
      136, 158, 226, 137, 160,
      194, 162, 195, 181, 195,
      159, 226, 136, 130, 198,
      146, 226, 136, 171
    ]
*/
const { length } = valueBytes;
const list: Seq<uint8> = [];
for (let i = 0; i < length; i++) {
  list.push(valueBytes[i]);
}
console.log(list);
/*
[
      195, 167, 195, 165, 226,
      136, 158, 226, 137, 160,
      194, 162, 195, 181, 195,
      159, 226, 136, 130, 198,
      146, 226, 136, 171
    ]
*/
const se = new BcsSerializer();

starcoin_types.Helpers.serializeVectorU8(list, se);
console.log(se.getBytes());
/*
Uint8Array(25) [
       24, 195, 167, 195, 165, 226,
      136, 158, 226, 137, 160, 194,
      162, 195, 181, 195, 159, 226,
      136, 130, 198, 146, 226, 136,
      171
    ]
*/
const hex = hexlify(se.getBytes());
console.log(hex);
/*
0x18c3a7c3a5e2889ee289a0c2a2c3b5c39fe28882c692e288ab
*/
```

### `Vector<Vector<U8>>`

Array of strings.

```js
import { starcoin_types, utils } from "@starcoin/starcoin";
import { hexlify, isHexString } from "@ethersproject/bytes";

const proofs = [
  "0x8e942cfc78768a015a18657d8da260ce16744136cea62a9dd17159a9f0dc5110",
];
const se = new BcsSerializer();
se.serializeLen(proofs.length);
proofs.forEach((proof) => {
  se.serializeBytes(utls.hex.fromHexString(proof));
});
console.log(se.getBytes());
/*
Uint8Array(34) [
        1,  32, 142, 148,  44, 252, 120, 118,
      138,   1,  90,  24, 101, 125, 141, 162,
       96, 206,  22, 116,  65,  54, 206, 166,
       42, 157, 209, 113,  89, 169, 240, 220,
       81,  16
    ]
*/
const hex = hexlify(se.getBytes());
console.log(hex);
/*
0x01208e942cfc78768a015a18657d8da260ce16744136cea62a9dd17159a9f0dc5110
*/
```

we can split the hex string into 3 part:

- `01`: the hex string of number 1, the length of array `proofs`
- `20`: the hex string of number 32, the length of string proofs[0]
- `8e942cfc78768a015a18657d8da260ce16744136cea62a9dd17159a9f0dc5110`: the hex string of proofs[0], in this case, is proofs[0] itself.

### `Vector<U128>`

Array of U128.

```js
import { starcoin_types, utils } from "@starcoin/starcoin";
import { hexlify, isHexString } from "@ethersproject/bytes";

const amountArray = [100000000];
const se = new BcsSerializer();
se.serializeLen(amountArray.length);
amountArray.forEach((amount) => {
  se.serializeU128(amount);
});
console.log(se.getBytes());
/*
Uint8Array(17) [
      1, 0, 225, 245, 5, 0, 0,
      0, 0,   0,   0, 0, 0, 0,
      0, 0,   0
    ]
*/
const hex = hexlify(se.getBytes());
console.log(hex);
/*
0x0100e1f505000000000000000000000000
*/
```

we can split the hex string into 2 part:

- `01`: the hex string of number 1, the length of array `amountArray`
- `00e1f505000000000000000000000000`: the hex string of amount 100000000, which type is U128
