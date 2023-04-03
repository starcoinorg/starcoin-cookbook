# 预言机协议

Starcoin 标准Oracle协议介绍

## 为什么需要Oracle？

区块链发展至今，遇到过很多困难，这些困难的背后往往催生出更多的创新。链上如何获取真实世界的数据？合约如何捕捉市场的价格波动？链游如何保证不可预测性？类似的很多疑问困扰着我们，Oracle(预言机)应运而生。Oracle不仅打通了链上与链下，也在公链之间开了一扇门，极大的拓展了区块链的应用场景。所以Oracle就像一座桥梁，让不同地方的数据相互之间建立起联系。

Oracle已成为公链生态中必备的一个基础组件。Starcoin也定义了一套标准的Oracle协议，它就像卫星一样，将星球上的数据收集起来，再通过Move合约分发到其他的地方，创造丰富的价值。

## Starcoin的标准Oracle协议

Starcoin通过智能合约语言Move，在Stdlib中设计了一套标准的Oracle协议，拥有以下特点：

* 可扩展
* 开放的数据源
* 安全可靠
* 简洁高效

该协议功能非常完备，设计上也很精炼和巧妙，我们通过源码来深入地了解一下：

1. 灵活的OracleInfo

```
struct OracleInfo<OracleT: copy+store+drop, Info: copy+store+drop> has key {
    ///The datasource counter
    counter: u64,
    ///Ext info
    info: Info,
}

public fun register_oracle<OracleT: copy+store+drop, Info: copy+store+drop>(_sender: &signer, info: Info) acquires GenesisSignerCapability
```

* OracleInfo是面向泛型编程的，通过泛型参数支持任意类型的Info，有非常良好的扩展性。
* OracleInfo只有key的ability，既不能copy产生重复类型的OracleInfo实例，也不能让已有的OracleInfo实例凭空drop，安全可靠。
* 没有使用数组存储，并且任何账号都能够通过register_oracle函数注册OracleInfo。

2. 丰富的DataSource

```
struct DataSource<OracleT: copy+store+drop, ValueT: copy+store+drop> has key {
    /// the id of data source of ValueT
    id: u64,
    /// the data version counter.
    counter: u64,
    update_events: Event::EventHandle<OracleUpdateEvent<OracleT, ValueT>>,
}

public fun init_data_source<OracleT:  copy+store+drop, Info: copy+store+drop, ValueT: copy+store+drop>(sender: &signer, init_value: ValueT) acquires OracleInfo
```

* 任何账号都可以调用init_data_source函数成为DataSource。
* 更新凭证UpdateCapability等数据存储在当前账号下，拥有明确的所有权。

3. 合理的权限管理

```
struct UpdateCapability<OracleT: copy+store+drop> has store, key {
    account: address,
}

struct GenesisSignerCapability has key{
    cap: Account::SignerCapability,
}
```

* 定义了两种不同的权限：OracleInfo注册的权限GenesisSignerCapability、OracleFeed更新的权限UpdateCapability。
* 只有GENESIS_ADDRESS拥有GenesisSignerCapability，通过外借的方式，让所有人都能注册OracleInfo。
* 任何账号都可以有UpdateCapability，任何有UpdateCapability的账号都能更新对应类型的OracleFeed数据。

4. 安全的OracleFeed

```
struct DataRecord<ValueT: copy+store+drop> has copy, store, drop {
    ///The data version
    version: u64,
    ///The record value
    value: ValueT,
    ///Update timestamp millisecond
    updated_at: u64,
}

struct OracleFeed<OracleT: copy+store+drop, ValueT: copy+store+drop> has key {
    record: DataRecord<ValueT>,
}

public fun update<OracleT: copy+store+drop, ValueT: copy+store+drop>(sender: &signer, value: ValueT) acquires UpdateCapability, DataSource, OracleFeed

public fun update_with_cap<OracleT: copy+store+drop, ValueT: copy+store+drop>(cap: &mut UpdateCapability<OracleT>, value: ValueT) acquires DataSource,OracleFeed
```

* DataRecord存储真实数据，有严格的version版本控制和updated_at链上时间戳。
* OracleFeed只有key的ability，不能copy和drop，安全可靠。
* OracleFeed<OracleT: copy+store+drop, ValueT: copy+store+drop>的当前账号下唯一，只保留最新的数据，避免读到过期的数据。
* OracleFeed通过update函数和update_with_cap函数更新，不管是哪个函数，都需要UpdateCapability，避免被别人误更新，保障数据安全。

Starcoin的标准Oracle协议在结构上保持简洁高效，很好地应用了Move的优势，拥有非常好的安全性和可扩展能力。

## Starcoin的Oracle场景讨论

前面我们重点介绍了标准Oracle协议的实现细节，接下来抛砖引玉，探讨一下Starcoin的Oracle可能的应用场景。

### 1. 实时价格

用户可以从不同的数据源采集加密货币的时间和价格数据，通过Oracle以接近实时的方式提交到链上。其他合约可以通过筛选数据源，直接使用这些数据，或者聚合处理之后使用这些数据，非常的方便和灵活。

### 2. 随机数和链游

我们都知道在输入确定的情况下，智能合约必须保证所有人的执行结果是一致的，所以链上很难提供类似随机数的机制。而通过Oracle，用户可以将 VRF 随机数据提交到链上，这样既能验证随机数的正确性，又能让合约拥有随机的能力而增加更丰富的场景。

以游戏为例，不可预测性是游戏具有吸引力的重要的因素之一。游戏通过Oracle获取随机数，可以保障游戏的不可预测性。

当然，随机数还有更多的应用场景，比如红包、模拟不确定的环境等等。

### 3. 链下复杂计算

由于Gas、单线程等限制，智能合约中不能有复杂的计算逻辑，这会让智能合约的场景非常受限。如果通过某种类似Proof的方案，让复杂的计算在链下执行，然后把结果和Proof提交到链上的Oracle中，提供给其他合约使用，会大大降低智能合约的设计难度，同时，能够丰富智能合约的应用场景。

### 4. 保险理赔

保险是一个重要的金融场景，但是也一直存在各种不规范的现象，比如骗保等等。智能合约即法律，如果使用Oracle将事件上链，再通过合约来鉴定和执行，将是一个很好的结合。例如，常见的航班延误险、教育金保险等等，都能通过这种方式，规范市场，提升效率。

### 5. 预测市场

市场是瞬息万变的，任何链下的事件产生，都可以通过Oracle快速映射到链上。智能合约通过获取Oracle提供的数据，触发预测市场执行结算等操作。例如，体育竞技结果、黄金价格变化、电竞等等。

## Starcoin的PriceOracle实现

我们深入了解了Starcoin标准Oracle协议的设计，然后探讨了其丰富的应用场景。接下来，我们以市场价格的场景为例，了解一下如何在标准的Oracle协议之上，将特定场景的业务逻辑添加进去，实现一个完整的Oracle应用。

Starcoin在标准的Oracle协议之上封装了一个PriceOracle模块，针对价格场景做了官方的实现。PriceOracle也是一个通用的合约，能够注册任意类型的数字资产。然后，Starcoin在PriceOracle之上，实现了一个STCUSDOracle合约，注册了一对货币组合STC和USDT。再通过PriceOracleScript合约，将STC对应USD的价格注册到链上的Oracle中。最后，任何人可以通过PriceOracleAggregator聚合器对价格进行筛选、过滤，将聚合得到的价格应用到自己的产品中。接下来，我们来深入的分析一下PriceOracle、STCUSDOracle以及PriceOracleAggregator的源码。

1. PriceOracle

PriceOracle建立在标准的Oracle协议之上，是针对价格场景实现的一个通用合约。也就是说，任何Price形态的数据，都可以通过PriceOracle上链。

```
struct PriceOracleInfo has copy,store,drop{
    scaling_factor: u128,
}
```

在标准的Oracle协议中，OracleInfo有一个泛型参数是Info: copy+store+drop。在PriceOracle中，Info对应的具体实现是PriceOracleInfo，里面只包含了计算因子scaling_factor，所以PriceOracleInfo必须有copy、store、drop这3种ability，这是Info这个泛型参数的要求。

在明确了PriceOracleInfo的数据定义之后，可以调用Oracle合约的register_oracle函数注册PriceOracleInfo，还可以调用Oracle的init_data_source和update将数据上链。

PriceOracle是标准Oracle协议上面的一个应用，所以继承了Oracle协议所有的特性，使用非常便捷。

2. STCUSDTOracle

如果说PriceOracle是价格的通用合约，那么STCUSDTOracle合约是价格场景具体实现的一个产品。

```
struct STCUSD has copy,store,drop {}
```

我们看到，在标准的Oracle协议中，OracleInfo除了Info，还有另外一个泛型参数OracleT: copy+store+drop，OracleT表示一对货币组合，Info表示信息。PriceOracle只实现了PriceOracleInfo，OracleT在PriceOracle也是泛型参数，而STCUSDTOracle合约的最大作用就是确定OracleT的类型为STCUSD。当然，任何人可以实现属于自己的一对货币组合合约，定义自己的产品。

3. PriceOracleScript

PriceOracleScript是为交易定义的一些脚本，这是一个重要的用户入口，主要用于更新Oracle数据，包括：

* 注册任意一对货币组合OracleT的PriceOracleInfo
* 更新任意一对货币组合OracleT的最新数据

4. PriceOracleAggregator

PriceOracleAggregator合约是一个聚合器，对Oracle中的数据进行筛选、过滤，然后将聚合之后的价格返回给用户，将链上实时价格应用到任何需要的地方。

## 总结

Starcoin不仅仅实现了一个标准的Oracle协议，而是实现了一套非常完整的Oracle工具链。

从技术的角度分析，从最基础的标准Oracle协议，到针对价格场景设计的PriceOracle，最后到用户的交易入口，任何环节都做到了可快速扩展，并且安全可靠。

从应用场景的角度分析，Starcoin的Oracle拥有广阔的应用场景，例如实时价格、比赛结果、游戏、保险理赔、复杂链下计算结果等等，包括任何场景的有价值的数据。

从产品落地的角度分析，协议上简洁高效，数据源和数据都完全开放。任何人都可以提交自己的数据。任何人只需要通过聚合器就能得到实时的链上数据，使用非常的方便。

我们有理由相信Starcoin的Oracle非常的想象力和竞争力。
