# 二进制规范序列化（BCS）

BCS（以前称为“Libra Canonical Serialization”或 LCS）是在 [Diem](https://diem.com) 区块链的背景下开发的一种序列化格式。

BCS 的设计考虑了以下主要目标：

* 提供良好的性能和简洁的（二进制）表示；
* 支持丰富的 Rust 常用数据类型；
* 强制规范序列化，这意味着给定类型的每个值都应该有一个有效的表示。

BCS 还旨在通过在（反）序列化期间对大型或嵌套容器实施明确定义的限制来减轻恶意输入的后果。

## Rust 实现

这个 crate 提供了 BCS 的 Rust 实现作为 [Serde 库](https://serde.rs)的编码格式。
因此，此实现涵盖了 Serde 支持的大多数数据类型——包括用户定义的结构、标记变体（Rust 枚举）、元组和映射——不包括浮点数、单个 Unicode 字符（char）和集合。

由于单独的项目 [serde-reflection](https://github.com/novifinancial/serde-reflection)，BCS 也可用于其他编程语言。

## 应用于密码学

BCS 格式保证规范的序列化，这意味着对于任何给定的数据类型，内存中的值和有效的字节表示之间存在一对一的对应关系。

在加密应用程序的上下文中，规范序列化有几个好处：

* 它提供了一种自然而可靠的方法来将内存中的值与加密哈希相关联。
* 它允许将消息的签名等效地定义为序列化字节的签名或内存中值的签名。

请注意，BCS 分别确保每种数据类型的规范序列化。
序列化值的数据类型必须由应用程序本身强制执行。
通常使用每种数据类型的唯一哈希种子来满足此要求。
<!-- （有关示例，请参见 [Diem 的密码库](https://github.com/diem/diem/blob/master/crypto/crypto/src/hash.rs)。） -->

## 向后兼容性

根据设计，BCS 不提供隐式版本控制或向后/向前兼容性，因此应用程序必须提前仔细计划临时扩展点：

* 枚举可用于显式版本控制和向后兼容性（例如可扩展查询接口）。
* 在某些情况下，还可以添加 `Vec<u8>` 类型的数据字段以允许（未来）序列化形式的未知有效负载。

## 详细规格

BCS 支持以下数据类型：

* 布尔值（Booleans）
* 有符号 8 位（Signed 8-bit）、16 位、32 位、64 位和 128 位整数（integers）
* 无符号 8 位（Unsigned 8-bit）、16 位、32 位、64 位和 128 位整数（integers）
* 选项（Option）
* 单位（Unit）（空值）
* 固定和可变长度序列（Fixed and variable length sequences）
* UTF-8 编码字符串
* 元组（Tuples）
* 结构（Structures）（又名“structs”）
* 外部标记的枚举（Externally tagged enumerations）（又名“enums”）
* 映射（Maps）

BCS 不是一种自我描述的格式。

因此，为了反序列化消息，必须提前知道消息类型和布局。

除非指定，否则所有数字都以 little endian、二进制补码格式存储。

### BCS 数据的递归和深度

允许使用递归数据结构（例如树）。
但是，由于（反）序列化过程中可能发生堆栈溢出，任何有效 BCS 数据的容器深度都不能超过常量 `MAX_CONTAINER_DEPTH`。
形式上，我们将容器深度定义为（反）序列化期间遍历的结构和枚举的数量。

此定义旨在最小化操作数量，同时确保已知 BCS 格式的（反）序列化不会导致任意大的堆栈分配。

例如，如果 `v1` 和 `v2` 是深度 `n1` 和 `n2` 的值，

* 结构值 `Foo { v1, v2 }` 的深度为 `1 + max(n1, n2)`;
* 枚举值 `E::Foo { v1, v2 }` 的深度为 `1 + max(n1, n2)`;
* 一对 `(v1, v2)` 的深度为 `max(n1, n2)`；
* `Some(v1)` 的值具有深度 `n1`。

所有字符串和整数值的深度都为 `0`。

### 布尔值和整数

|Type                       |Original data          |Hex representation |Serialized bytes        |
|---                        |---                    |---                |---                     |
|Boolean                    |True / False           |0x01 / 0x00        |01 / 00                 |
|8-bit signed integer       |-1                     |0xFF               |FF                      |
|8-bit unsigned integer     |1                      |0x01               |01                      |
|16-bit signed integer      |-4660                  |0xEDCC             |CC ED                   |
|16-bit unsigned integer    |4660                   |0x1234             |34 12                   |
|32-bit signed integer      |-305419896             |0xEDCBA988         |88 A9 CB ED             |
|32-bit unsigned integer    |305419896              |0x12345678         |78 56 34 12             |
|64-bit signed integer      |-1311768467750121216   |0xEDCBA98754321100 |00 11 32 54 87 A9 CB ED |
|64-bit unsigned integer    |1311768467750121216    |0x12345678ABCDEF00 |00 EF CD AB 78 56 34 12 |

### ULEB128 编码整数

BCS 格式还在内部使用 [ULEB128 编码](https://en.wikipedia.org/wiki/LEB128)来表示无符号 32 位整数，这两种情况通常需要小值：(1) 可变长度序列的长度和 (2) 枚举值的标记（请参阅下面的相应部分）。

|Type                       |Original data          |Hex representation |Serialized bytes   |
|---                        |---                    |---                |---                |
|ULEB128-encoded u32-integer|2^0 = 1                |0x00000001         |01                 |
|                           |2^7 = 128              |0x00000080         |80 01              |
|                           |2^14 = 16384           |0x00004000         |80 80 01           |
|                           |2^21 = 2097152         |0x00200000         |80 80 80 01        |
|                           |2^28 = 268435456       |0x10000000         |80 80 80 80 01     |
|                           |9487                   |0x0000250f         |8f 4a              |

通常，ULEB128 编码由基本128（7位）数字的小序列组成。
每个数字都通过将最高位设置为1来完成为一个字节，除了最后一个（最高）数字的数字将最高位设置为0。

在BCS中，需要解码 ULEB128 字节的结果才能适合32位无符号整数并处于规范形式。例如，以下值被拒绝：

* 80 80 80 80 80 01 (2^36) 太大。
* 80 80 80 80 10 (2^33) 太大。
* 80 00 不是 0 的最小编码。

### 可选数据

可选或可为空的数据要么以其完整表示形式存在，要么不存在。
BCS 将其表示为单个字节，表示数据的存在 `0x01` 或不存在 `0x00`。如果数据存在，则该数据的序列化形式如下。例如：

```rust
let some_data: Option<u8> = Some(8);
assert_eq!(to_bytes(&some_data)?, vec![1, 8]);

let no_data: Option<u8> = None;
assert_eq!(to_bytes(&no_data)?, vec![0]);
```

### 固定和可变长度序列

序列可以由任何 BCS 支持的类型（甚至是复杂结构）组成，但序列中的所有元素必须属于同一类型。
如果序列的长度是固定的并且众所周知，那么 BCS 将其表示为序列中每个单独元素的序列化形式的串联。
如果序列的长度是可变的，则序列化序列的长度以 ULEB128 编码的无符号整数为前缀，指示序列中元素的数量。
所有可变长度序列的长度必须为 `MAX_SEQUENCE_LENGTH` 个元素或更少。

```rust
let fixed: [u16; 3] = [1, 2, 3];
assert_eq!(to_bytes(&fixed)?, vec![1, 0, 2, 0, 3, 0]);

let variable: Vec<u16> = vec![1, 2];
assert_eq!(to_bytes(&variable)?, vec![2, 1, 0, 2, 0]);

let large_variable_length: Vec<()> = vec![(); 9_487];
assert_eq!(to_bytes(&large_variable_length)?, vec![0x8f, 0x4a]);
```

### 字符串

仅支持有效的 UTF-8 字符串。
BCS 将此类字符串序列化为可变长度字节序列，即长度以 ULEB128 编码的无符号整数为前缀，后跟字符串的字节表示。

```rust
// Note that this string has 10 characters but has a byte length of 24
let utf8_str = "çå∞≠¢õß∂ƒ∫";
let expecting = vec![
    24, 0xc3, 0xa7, 0xc3, 0xa5, 0xe2, 0x88, 0x9e, 0xe2, 0x89, 0xa0, 0xc2,
    0xa2, 0xc3, 0xb5, 0xc3, 0x9f, 0xe2, 0x88, 0x82, 0xc6, 0x92, 0xe2, 0x88, 0xab,
];
assert_eq!(to_bytes(&utf8_str)?, expecting);
```

### 元组

元组是对象的类型组合：`(Type0，Type1)`

元组被认为是一个固定长度的序列，其中序列中的每个元素都可以是 BCS 支持的不同类型。
元组的每个元素都按照它在元组中定义的顺序进行序列化，即 [tuple.0, tuple.2]。

```rust
let tuple = (-1i8, "diem");
let expecting = vec![0xFF, 4, b'd', b'i', b'e', b'm'];
assert_eq!(to_bytes(&tuple)?, expecting);
```

### 结构

结构是由可能具有不同类型的字段组成的固定长度序列。
结构中的每个字段都按照规范结构定义指定的顺序进行序列化。
结构可以存在于其他结构中，因此，BCS 递归到每个结构中并按顺序序列化它们。
序列化格式中没有标签，结构排序定义了序列化流中的组织。

```rust
#[derive(Serialize)]
struct MyStruct {
    boolean: bool,
    bytes: Vec<u8>,
    label: String,
}

#[derive(Serialize)]
struct Wrapper {
    inner: MyStruct,
    name: String,
}

let s = MyStruct {
    boolean: true,
    bytes: vec![0xC0, 0xDE],
    label: "a".to_owned(),
};
let s_bytes = to_bytes(&s)?;
let mut expecting = vec![1, 2, 0xC0, 0xDE, 1, b'a'];
assert_eq!(s_bytes, expecting);

let w = Wrapper {
    inner: s,
    name: "b".to_owned(),
};
let w_bytes = to_bytes(&w)?;
assert!(w_bytes.starts_with(&s_bytes));

expecting.append(&mut vec![1, b'b']);
assert_eq!(w_bytes, expecting);
```

### 外部标记的枚举

枚举通常表示为可以采用许多不同变体之一的类型。
在 BCS 中，每个变体都映射到变体索引，即 ULEB128 编码的 32 位无符号整数，如果类型具有关联值，则后跟序列化数据。
关联类型可以是任何 BCS 支持的类型。
变体索引是根据规范枚举定义中变体的顺序确定的，其中第一个变体的索引为 `0`，第二个变体的索引为 `1`，依此类推。

```rust
#[derive(Serialize)]
enum E {
    Variant0(u16),
    Variant1(u8),
    Variant2(String),
}

let v0 = E::Variant0(8000);
let v1 = E::Variant1(255);
let v2 = E::Variant2("e".to_owned());

assert_eq!(to_bytes(&v0)?, vec![0, 0x40, 0x1F]);
assert_eq!(to_bytes(&v1)?, vec![1, 0xFF]);
assert_eq!(to_bytes(&v2)?, vec![2, 1, b'e']);
```

如果您需要序列化 C 风格的枚举，您应该使用原始整数类型。

### 映射（键/值存储）

映射表示为 `(键, 值)` 元组的可变长度、排序序列。
键必须是唯一的，并且元组按每个键的 BCS 字节的字典顺序递增排序。
该表示在其他方面类似于可变长度序列的表示。特别是，它前面是元组的数量，用 ULEB128 编码。

```rust
let mut map = HashMap::new();
map.insert(b'e', b'f');
map.insert(b'a', b'b');
map.insert(b'c', b'd');

let expecting = vec![(b'a', b'b'), (b'c', b'd'), (b'e', b'f')];

assert_eq!(to_bytes(&map)?, to_bytes(&expecting)?);
```
