# `starcoin` help message

## 用法

```shell
starcoin [OPTIONS] [SUBCOMMAND]
```

## 选项

```shell
# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `--auth-password <auth-password>`
  - Metrics push server auth password
  - 指标推送服务器身份验证密码。

- `--auth-username <auth-username>`
  - Metrics push server auth username
  - 指标推送服务器授权用户名。

- `-c, --connect <CONNECT>`
  - Connect and attach to a node
  - 连接并接入到一个节点。

- `--cache-sizes <cache-sizes>`
  - cache sizes
  - 指定缓存大小。

- `-d, --data-dir <BASE_DATA_DIR>`
  - Path to data dir, this dir is base dir, the final data_dir is `base_dir/chain_network_name`
  - 指定数据存放的目录，这个目录是指基本目录（`base_dir`），最终的数据目录根据所选择的区块链网络来决定，即 `base_dir/chain_network_name`。

- `--disable-http-rpc`
  - disable http jsonrpc endpoint
  - 禁用 http jsonrpc 端点。

- `--disable-ipc-rpc`
  - disable ipc jsonrpc endpoint
  - 禁用 ipc jsonrpc 端点。

- `--disable-metrics <disable-metrics>`
  - disable metrics
  - 禁用指标（监控）服务。

- `--disable-miner-client <DISABLE_MINER_CLIENT>`
  - Don't start a miner client in node. The main network miner client is disable in default. This flag support both cli and config file
  - 禁止在节点中启动矿工客户端。默认情况下，主网络矿工客户端被禁用。这个选项（标志）支持 `cli` 和 `config` 文件。

- `--disable-mint-empty-block <DISABLE_MINT_EMPTY_BLOCK>`
  - Do not mint empty block, default is true in Dev network, only support cli
  - 禁止铸造空块，在 `dev` 网络中默认为真，仅支持 `cli`。

- `--disable-seed`
  - Do not connect to seed node, include builtin and config seed. This option is skip for config file, only support cli option
  - 不要连接到种子节点，包括内置的和配置的种子，此选项会跳过配置文件，仅支持 `cli` 选项。

- `--disable-stratum`
  - disable stratum
  - 禁用矿池功能。

- `--disable-tcp-rpc`
  - disable tcp jsonrpc endpoint
  - 禁用 tcp jsonrpc 端点。

- `--disable-websocket-rpc`
  - disable websocket jsonrpc endpoint
  - 禁用 websocket jsonrpc 端点。

- `--discover-local <DISCOVER_LOCAL>`
  - Enable peer discovery on local networks. By default this option is `false`. only support cli option
  - 在本地网络上启用对等发现。默认情况下，此选项为 `false`，仅支持 `cli` 选项。

- `--event-query-max-block-range <BLOCK_QUERY_MAX_RANGE>`

- `--genesis-config <GENESIS_CONFIG>`
  - Init chain by a custom genesis config. if want to reuse builtin network config, just pass a builtin network name. This option only work for node init start
  - 通过自定义创世块配置来初始链。如果要重复使用内置网络配置，只需传递内置网络名称即可。此选项仅适用于初始化启动节点。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `--http-apis <http-apis>`
  - rpc apiset to serve
  - rpc apiset 服务。

- `--http-ip-headers <http-ip-headers>`
  - list of http header which identify a ip, Default: `X-Real-IP,X-Forwarded-For`
  - 识别 IP 的 http 标头列表，默认值：`X-Real-IP,X-Forwarded-For`。

- `--http-max-request-body <http-max-request-body>`
  - max request body in bytes
  - 最大请求正文（以字节为单位）。

- `--http-port <http-port>`
  - Default http port is `9850`
  - 默认 http 端口为 `9850`。

- `--http-threads <http-threads>`
  - How many thread to use for http service
  - 指定用于 http 服务的线程数。

- `--ipc-apis <ipc-apis>`
  - rpc apiset to serve
  - rpc apiset 服务。

- `--jsonrpc-custom-global-api-quota <jsonrpc-custom-global-api-quota>`
  - customize api quota, eg: node.info=100/s
  - 自定义 api 配额，例如：`node.info=100/s`。

- `--jsonrpc-custom-user-api-quota <jsonrpc-custom-user-api-quota>`
  - customize api quota of user, eg: node.info=100/s
  - 自定义用户的 api 配额，例如：`node.info=100/s`。

- `--jsonrpc-default-global-api-quota <jsonrpc-default-global-api-quota>`
  - default api quota, eg: 1000/s
  - 指定默认的 api 配额，例如：`1000/s`。

- `--jsonrpc-default-user-api-quota <jsonrpc-default-user-api-quota>`
  - default api quota of user, eg: 1000/s
  - 指定用户的默认 api 配额，例如：`eg: 1000/s`。

- `--listen <LISTEN>`
  - p2p network listen address, Default is /ip4/0.0.0.0/tcp/9840
  - 指定点对点网络监听地址，默认是 `/ip4/0.0.0.0/tcp/9840`。

- `--local-account-dir <ACCOUNT_DIR>`
  - Path to the local account provider dir, load the accounts from local dir path
  - 指定通往本地账户提供者的目录，从本地路径加载账户。

- `--logger-disable-file <logger-disable-file>`
  - disable file logger
  - 禁用文件日志采集器。

- `--logger-disable-stderr <logger-disable-stderr>`
  - disable stderr logger
  - 禁用标准错误日志采集器。

- `--logger-max-backup <logger-max-backup>`

- `--logger-max-file-size <logger-max-file-size>`

- `--max-incoming-peers <MAX_INCOMING_PEERS>`
  - max count for incoming peers. Default 25
  - 指定传入端的最大计数，默认值为 `25`。

- `--max-outgoing-peers <MAX_OUTGOING_PEERS>`
  - max count for outgoing connected peers. Default 75. max peers = max_incoming_peers + max_outgoing_peers
  - 指定传出端的最大计数，默认值为 `75`。`max peers = max_incoming_peers + max_outgoing_peers`。

- `--max-peers-to-propagate <MAX_PEERS_TO_PROPAGATE>`
  - max peers to propagate new block and new transactions. Default 128
  - 指定最大端数来传输新块和新事务，默认值为 `128`。

- `--max-retry-times <max-retry-times>`
  - max retry times once sync block failed, default 15.
  - 指定同步块失败后的最大重试次数，默认值为 `15`。

- `--metrics-address <metrics-address>`
  - Metrics server listen address, default is `0.0.0.0`
  - 指标服务器监听地址，默认值为 `0.0.0.0`。

- `--metrics-port <metrics-port>`
  - Metrics server port, default is 9101
  - 指标服务器监听端口，默认值为 `9101`。

- `--min-peers-to-propagate <MIN_PEERS_TO_PROPAGATE>`
  - min peers to propagate new block and new transactions. Default 8
  - 指定最小端数来传输新块和新事务，默认值为 `128`。

- `--miner-block-gas-limit <BLOCK_GAS_LIMIT>`
  - Node local block_gas_limit, use min(config.block_gas_limit, onchain.block_gas_limit)
  - 指定本地节点块的油费，使用 `config.block_gas_limit` 和 `onchain.block_gas_limit` 的最小值。

- `--miner-thread <MINER_THREAD>`
  - Miner client thread number, not work for dev network, default is 1
  - 指定矿工客户端线程号，不适用于开发网络，默认值为 `1`。

- `-n, --net <NET>`
  - Chain Network
    - Builtin network: test,dev,halley,proxima,barnard,main
    - Custom network format: chain_name:chain_id
    - Such as:
    - my_chain:123 will init a new chain with id `123`.
    - Custom network first start should also set the `genesis-config` option.
    - Use starcoin_generator command to generate a genesis config.
  - 中国网络
    - Starcoin 内置有 `test`, `dev`, `halley`, `proxima`, `barnard`, `main` 等六种网络。
    - 自定义网络格式：`chain_name:chain_id`。
    - 例如：`my_chain:123` 会使用 `123` 这个链 id 来初始化一个新链。
    - 使用 `starcoin_generator` 命令生成创世块配置。

- `--node-key <NODE_KEY>`
  - Node network private key string. This option is skip for config file, only support cli option, after init will write the key to node_key_file
  - 节点网络私钥字符串，此选项跳过配置文件，仅支持客户端选项。初始化后将密钥写入 `node_key_file`。

- `--node-key-file <NODE_KEY_FILE>`
  - Node network private key file, default is network_key under the data dir
  - 节点网络私钥文件，默认是数据目录下的 `network_key`。

--node-name <NODE_NAME>
  - Node network name, just for display, if absent will generate a random name
  - 节点网络名称，仅用于显示，如果没有，将生成一个随机名称。

- `-o <output-format>`
  - set output-format, support `[json|table] [default: json]`
  - 设置输出格式，支持 `json` 和 `table`，默认使用 `json` 格式。

- `--p2prpc-custom-global-api-quota <p2prpc-custom-global-api-quota>`
  - - customize global p2p rpc quota, eg: get_block=100/s number_of_values = 1 forces the user to repeat the -D option for each key-value pair: my_program -D a=1 -D b=2
  - 自定义全局端对端 rpc 配额，例如：`get_block=100/s number_of_values = 1` 强制用户为每个键值对重复 `-D` 选项：`my_program -D a=1 -D b=2`。

- `--p2prpc-custom-user-api-quota <p2prpc-custom-user-api-quota>`
  - customize p2p rpc quota of a peer, eg: get_block=10/s
  - 自定义端的 p2p rpc 配额，例如：`get_block=10/s`。

- `--p2prpc-default-global-api-quota <p2prpc-default-global-api-quota>`
  - default global p2p rpc quota, eg: 1000/s
  - 默认全局 p2p rpc 配额，例如：`1000/s`。

- `--p2prpc-default-user-api-quota <p2prpc-default-user-api-quota>`
  - default p2p rpc quota of a peer, eg: 1000/s
  - 默认 p2p rpc 配额，例如：`1000/s`。

- `--peer-select-strategy <peer-select-strategy>`
  - peer select strategy, default random.
  - 对等策略选择，默认随机。

- `--push-interval <push-interval>`
  - `[default: 5]`

- `--push-server-url <push-server-url>`
  - Metrics push server url
  - 指标（监控）推送服务器网址。

- `--query-max-txn-info-range <TXN_INFO_QUERY_MAX_RANGE>`

- `--rocksdb-bytes-per-sync <rocksdb-bytes-per-sync>`
  - rocksdb bytes per sync
  - 指定每次同步 `rocksdb` 的字节大小。

- `--rocksdb-max-open-files <rocksdb-max-open-files>`
  - rocksdb max open files
  - 指定 `rocksdb` 的最大文件数。

- `--rocksdb-max-total-wal-sizes <rocksdb-max-total-wal-sizes>`
  - rocksdb max total WAL sizes
  - 指定 `rocksdb` 的 WAL 的最大总量。

- `--rocksdb-wal-bytes-per-sync <rocksdb-wal-bytes-per-sync>`
  - rocksdb wal bytes per sync
  - 指定每次同步 `rocksdb wal` 的字节大小。

- `--rpc-address <RPC_ADDRESS>`
  - Rpc address, default is 0.0.0.0
  - 指定 RPC 地址，默认为：`0.0.0.0`。

- `--seed <SEEDS>`
  - P2P network seed, multi seed should use ',' as delimiter [default: ]
  - 端对端网络种子，多种子应使用 `,` 作为分隔符。默认：`[default: ]`

- `--stratum-address <ADDRESS>`
  - Stratum address, default is 0.0.0.0
  - 指定矿池地址，默认为 `0.0.0.0`。

- `--stratum-port <stratum-port>`
  - Default tcp port is 9880
  - 指定 tcp 端口，默认值为 `9880`。

- `--tcp-apis <tcp-apis>`
  - rpc apiset to serve
  - rpc apiset 服务。

- `--tcp-port <tcp-port>`
  - Default tcp port is 9860
  - 指定 tcp 端口，默认值是 `9860`。

- `--txpool-max-count <txpool-max-count>`
  - Maximal number of transactions in the pool. default to 4096
  - 池中的最大交易数量，默认为 `4096`。

- `--txpool-max-mem-usage <txpool-max-mem-usage>`
  - Maximal memory usage. Default to half of current free mem of system
  - 指定最大内存使用量。默认为系统当前空闲内存的一半。

- `--txpool-max-per-sender <txpool-max-per-sender>`
  - Maximal number of transactions from single sender. default to 128
  - 来自单个发件人的交易最大数量。默认为 `128`。

- `--txpool-min-gas-price <txpool-min-gas-price>`
  - reject transaction whose gas_price is less than the min_gas_price. default to 1
  - 拒绝 `gas_price` 小于 `min_gas_price` 的交易，默认值为 `1`。

- `--txpool-tx-propagate-interval <txpool-tx-propagate-interval>`
  - interval(s) of tx propagation timer. default to 2
  - `tx` 广播计时器的时间间隔，默认值为 `2`。

- `--unsupported-protocols <unsupported-protocols>`

- `--unsupported-rpc-protocols <unsupported-rpc-protocols>`

- `-V, --version`
  - Print version information
  - 打印版本信息。

- `--vault-dir <DIR>`
  - Account vault dir config. Default: account_vaults in data_dir
  - 账户保险库目录配置，默认为 `data_dir` 中的 `account_vaults`。

- `--watch-timeout <WATCH_TIMEOUT>`
  - Watch timeout in seconds
  - 观看超时的秒数。

- `--websocket-apis <websocket-apis>`
  - rpc apiset to serve
  - rpc apiset 服务。

- `--websocket-max-request-body <websocket-max-request-body>`
  - Max request body in bytes, Default is 10M
  - 最大请求主体，默认为 `10M`。

- `--websocket-port <websocket-port>`
  - Default websocket port is 9870
  - 指定 websocket 端口号，默认值为 `9870`。

## 子命令

- account
- state
- node
- chain
- txpool
- dev
- contract
- console
- help        Print this message or the help of the given subcommand(s)

## 当前版本

```shell
starcoin 1.11.7-rc
```
