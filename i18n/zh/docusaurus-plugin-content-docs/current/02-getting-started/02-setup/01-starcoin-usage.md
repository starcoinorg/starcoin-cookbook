# 如何使用 Starcoin CLI

`starcoin` 命令可以用来启动节点，运行本地网络，加入测试网络或者主网络，也可以直接连接到远程节点的接口上，纯粹作为命令行客户端工具使用。
运行本地网络或者加入测试网络可以方便地测试用户的智能合约代码，`starcoin` 的子命令 `dev` 可以编译，执行和发布智能合约。

当你按照前面的教程安装好 `starcoin` 后，可以运行 `starcoin -h` 查看帮助。

## 使用方法

`starcoin [OPTIONS] [SUBCOMMAND]`

### 加入主网络

在命令行中直接运行 `starcoin` 命令，默认会在前台启动一个节点并尝试加入主网。

```bash
$ starcoin
```

### 启动本地网络节点

如果你想加入其他的网络，可以用 `-n` 或 `--net` 选项来指定，比如启动一个本地的 `dev` 网络节点。

```
$ starcoin -n dev
.....
2022-03-31T21:45:53.852430+08:00 INFO - Ipc rpc server start at :"/var/folders/_4/1ghtd3z15qjcw8yj905dcql40000gn/T/.tmph3EJ8S/dev/starcoin.ipc"
2022-03-31T21:45:53.855938+08:00 INFO - Rpc: http server start at :0.0.0.0:9850
2022-03-31T21:45:53.856575+08:00 INFO - Rpc: tcp server start at: 0.0.0.0:9860
2022-03-31T21:45:53.857295+08:00 INFO - Listening for new connections on 0.0.0.0:9870.
2022-03-31T21:45:53.857405+08:00 INFO - Rpc: websocket server start at: 0.0.0.0:9870
2022-03-31T21:45:53.857479+08:00 INFO - Service starcoin_rpc_server::service::RpcService start.
2022-03-31T21:45:53.857537+08:00 INFO - starcoin_rpc_server::service::RpcService service actor started
Waiting SIGINT or SIGTERM ...
```

### 查看链的信息

本地的 dev 模式默认使用一个临时目录，每次重启都会重置数据。
dev 节点启动后，会在日志中打印 IPC 文件路径，我们通过 IPC（进程间通信）文件可以连接到节点执行命令，比如：

```bash
$ starcoin -c /var/folders/_4/1ghtd3z15qjcw8yj905dcql40000gn/T/.tmph3EJ8S/dev/starcoin.ipc chain info
```

注：Windows 下的 IPC 文件路径不一样，需要通过以下方式（中间的 dev 需要根据连接的网络改变）：

``` shell
$ starcoin.exe --connect \\.\pipe\dev\starcoin.ipc console
```

或者通过 WebSocket RPC 接口进行连接：

```bash
$ starcoin -c ws://127.0.0.1:9870 chain info
```

或者直接连接到远程种子节点的 RPC 接口进行操作：

```shell
# 查看主链的信息
$ starcoin -c ws://main.seed.starcoin.org:9870 chain info
```

## 控制台的使用

`starcoin` 有一个特殊的子命令 `console`，执行这个命令后，会进入一个交互式的控制台。

```bash
$ starcoin -n dev console

......
                                                (%&&&&(%&%(  &#
                                        ,#%%%&%%%#/        (%&&%
                                %#%#%%%%#&&%                 %&
                                / %%%                          #&
                            &#%%%#%%%%#                        *&%
                        (#%%%#/ %%%%%%#                      #&%
                    #%#%%#&&   #%%%%%%%(                   &%%&
                (#%%##      #%%%%%%%%%/                *%%
            #%%%&#%%##&&&&%%%(%%%%%%%%%%%&&&&&&&& &%  (&#/#
            ((##%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&%%  ####
        ###%#(& &#%%%%%%%%%%%%%%%%%%%%%&&&&%##&(%&%
        (#%##       (#%%%%%%%%%%%%%%%%%%&%#(#%%#
        (###(%           &&#%%%%%%%%%%%%%%&%%#&&
    ####                %%%%%%%%%%%%(    %%
    /###/                #%%%%%%%%#%%#     %%#
    /###(                (%%%%%%#%%%##%%%(  *%%#
    ###(                (%%%%###&#     %&#%%&(%%%
    (##(&              &#%#(#               %%&&%
    (###%#       (%%%#((&                    &&%#
        (#%%%%%%#(

     ██████╗████████╗ █████╗ ██████╗  █████╗  █████╗ ██╗███╗  ██╗
    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║████╗ ██║
    ╚█████╗    ██║   ███████║██████╔╝██║  ╚═╝██║  ██║██║██╔██╗██║
     ╚═══██╗   ██║   ██╔══██║██╔══██╗██║  ██╗██║  ██║██║██║╚████║
    ██████╔╝   ██║   ██║  ██║██║  ██║╚█████╔╝╚█████╔╝██║██║ ╚███║
    ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝  ╚════╝ ╚═╝╚═╝  ╚══╝

starcoin%
```

此时可以直接在控制台执行命令，比如：

```bash
starcoin% chain info
{
  "ok": {
    "block_info": {
      "block_accumulator_info": {
        "accumulator_root": "0x155fff75365299de34f6c17a941936f4873ff6a6ce263a38d51cc49bcdd05002",
        "frozen_subtree_roots": [
          "0x155fff75365299de34f6c17a941936f4873ff6a6ce263a38d51cc49bcdd05002"
        ],
        "num_leaves": "1",
        "num_nodes": "1"
      },
      "block_hash": "0x155fff75365299de34f6c17a941936f4873ff6a6ce263a38d51cc49bcdd05002",
      "total_difficulty": "0x01",
      "txn_accumulator_info": {
        "accumulator_root": "0xd9d8bfad3b1d05486ff3b0831c4cbd94c6ede35598cd76a69c0e3879aaf12090",
        "frozen_subtree_roots": [
          "0xd9d8bfad3b1d05486ff3b0831c4cbd94c6ede35598cd76a69c0e3879aaf12090"
        ],
        "num_leaves": "1",
        "num_nodes": "1"
      }
    },
    "chain_id": 254,
    "genesis_hash": "0x155fff75365299de34f6c17a941936f4873ff6a6ce263a38d51cc49bcdd05002",
    "head": {
      "author": "0x00000000000000000000000000000001",
      "author_auth_key": null,
      "block_accumulator_root": "0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000",
      "block_hash": "0x155fff75365299de34f6c17a941936f4873ff6a6ce263a38d51cc49bcdd05002",
      "body_hash": "0xd54136a5c1455409ef22392f2b2451e730222fd2ff8297ab3e47db8dc6d7afab",
      "chain_id": 254,
      "difficulty": "0x01",
      "extra": "0x00000000",
      "gas_used": "0",
      "nonce": 0,
      "number": "0",
      "parent_hash": "0x3a9c4141b1893c28c96eda9dd937145fe3cee63c0160b91a391b9afe789c5fd5",
      "state_root": "0x1ee14fb341b111b6fcd822f97a6b718b88e6dcd930d69e7b7620e1f4f31a2afc",
      "timestamp": "0",
      "txn_accumulator_root": "0xd9d8bfad3b1d05486ff3b0831c4cbd94c6ede35598cd76a69c0e3879aaf12090"
    }
  }
}
```

像上面这样进入控制台，如果发现当前尚未启动 Starcoin 节点，则会自动在后台启动一个节点，控制台和节点在进程内通信。
这样的节点生命周期和控制台的生命周期绑定，从控制台退出后，节点也会自动退出。

当然也可以通过 IPC 或者 WebSocket RPC 的方式连接，然后进入控制台。

```bash
$ starcoin -c ws://127.0.0.1:9870 console
$ starcoin -c ~/.starcoin/main/starcoin.ipc console
$ starcoin -c ws://main.seed.starcoin.org:9870 console
```

但如果是通过远程方式连接的 RPC 接口，默认情况下，账号相关的接口不对远程开放，所以账号相关的命令（account）也无法使用。这种情况下，可以通过本地的账号数据库和远程接口接合的方式来使用控制台。例如：

```bash
$ starcoin --connect ws://main.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/main/account_vaults console
```

## 常见问题

### 如何配合管道使用命令行工具？

`starcoin` 命令输出的日志部分在 stderr，结果在 stdout，所以可以直接通过管道来将结果重定向给其他命令处理，比如以下命令通过 `jq` 来获取最新的区块高度：

```bash
starcoin -c ws://main.seed.starcoin.org:9870 chain info|jq '.ok.head.number'
```

## 选项说明

### 区块链链相关的选项

```text
 -n, --net <net>
            Chain Network
                Builtin network: test,dev,halley,proxima,barnard,main
                Custom network format: chain_name:chain_id
                Such as:
                my_chain:123 will init a new chain with id `123`.
                Custom network first start should also set the `genesis-config` option.
                Use starcoin_generator command to generate a genesis config.

--genesis-config <genesis-config>
    Init chain by a custom genesis config. if want to reuse builtin network config, just pass a builtin network
    name. This option only work for node init start

--disable-seed             Do not connect to seed node, include builtin and config seed. This option is skip for
                            config file, only support cli option

--seed <seeds>
    P2P network seed, multi seed should use ',' as delimiter [default: ]
```

* disable-seed：默认情况下，节点会自动连接到 p2p 网络的种子节点，并通过种子节点发现其他节点。通过这个选项禁止连接到种子节点，用于排查问题等场景。

### 节点相关的选项

```text

-d, --data-dir <base-data-dir>
            Path to data dir, this dir is base dir, the final data_dir is base_dir/chain_network_name

--local-account-dir <account-dir>
            Path to the local account provider dir, load the accounts from local dir path

--vault-dir <dir>
            Account vault dir config. Default: account_vaults in data_dir

--cache-sizes <cache-sizes>                                               cache sizes

--node-key <node-key>
    Node network private key string This option is skip for config file, only support cli option, after init
    will write the key to node_key_file
--node-key-file <node-key-file>
    Node network private key file, default is network_key under the data dir

--node-name <node-name>
    Node network name, just for display, if absent will generate a random name


```

### RPC 相关的选项

```text
--disable-http-rpc         disable http jsonrpc endpoint
--disable-ipc-rpc          disable ipc jsonrpc endpoint
--disable-tcp-rpc          disable tcp jsonrpc endpoint
--disable-websocket-rpc    disable websocket jsonrpc endpoint


--event-query-max-block-range <block-query-max-range>


--http-apis <http-apis>                                                   rpc apiset to serve
--http-ip-headers <http-ip-headers>...
    list of http header which identify a ip, Default: X-Real-IP,X-Forwarded-For

--http-max-request-body <http-max-request-body>                           max request body in bytes
--http-port <http-port>                                                   Default http port is 9850
--http-threads <http-threads>
    How many thread to use for http service

--ipc-apis <ipc-apis>                                                     rpc apiset to serve
--jsonrpc-custom-global-api-quota <jsonrpc-custom-global-api-quota>...
    customize api quota, eg: node.info=100/s

--jsonrpc-custom-user-api-quota <jsonrpc-custom-user-api-quota>...
    customize api quota of user, eg: node.info=100/s

--jsonrpc-default-global-api-quota <jsonrpc-default-global-api-quota>     default api quota, eg: 1000/s
--jsonrpc-default-user-api-quota <jsonrpc-default-user-api-quota>         default api quota of user, eg: 1000/s
 

--websocket-apis <websocket-apis>                                         rpc apiset to serve
--websocket-max-request-body <websocket-max-request-body>
    Max request body in bytes, Default is 10M

 --rpc-address <rpc-address>                                               Rpc address, default is 0.0.0.0
--websocket-port <websocket-port>                                         Default websocket port is 9870


--tcp-apis <tcp-apis>                                                     rpc apiset to serve
--tcp-port <tcp-port>                                                     Default tcp port is 9860
--query-max-txn-info-range <txn-info-query-max-range>

```

* disable-http-rpc｜disable-ipc-rpc｜disable-tcp-rpc｜disable-tcp-rpc｜disable-websocket-rpc：默认情况下，节点会开启所有的端口，可以通过上面的 disable 相关的 flag 关闭不需要的协议端口。

### P2P 网络相关的选项

```text
--discover-local <discover-local>
    Enable peer discovery on local networks. By default this option is `false`. only support cli option

--listen <listen>
    p2p network listen address, Default is /ip4/0.0.0.0/tcp/9840

--max-incoming-peers <max-incoming-peers>
            max count for incoming peers. Default 25

--max-outgoing-peers <max-outgoing-peers>
    max count for outgoing connected peers. Default 75. max peers = max_incoming_peers + max_outgoing_peers

--max-peers-to-propagate <max-peers-to-propagate>
    max peers to propagate new block and new transactions. Default 128

--max-retry-times <max-retry-times>
    max retry times once sync block failed, default 15.


--min-peers-to-propagate <min-peers-to-propagate>
    min peers to propagate new block and new transactions. Default 8

--p2prpc-custom-global-api-quota <p2prpc-custom-global-api-quota>...
        customize global p2p rpc quota, eg: get_block=100/s number_of_values = 1 forces the user to repeat the -D
        option for each key-value pair: my_program -D a=1 -D b=2

--p2prpc-custom-user-api-quota <p2prpc-custom-user-api-quota>...
    customize p2p rpc quota of a peer, eg: get_block=10/s

--p2prpc-default-global-api-quota <p2prpc-default-global-api-quota>
    default global p2p rpc quota, eg: 1000/s

--p2prpc-default-user-api-quota <p2prpc-default-user-api-quota>
    default p2p rpc quota of a peer, eg: 1000/s

--unsupported-protocols <unsupported-protocols>...
--unsupported-rpc-protocols <unsupported-rpc-protocols>...

--peer-select-strategy <peer-select-strategy>                             peer select strategy, default random.
```

### 交易池相关的配置

```text
--txpool-max-count <txpool-max-count>
    Maximal number of transactions in the pool. default to 4096

--txpool-max-mem-usage <txpool-max-mem-usage>
    Maximal memory usage. Default to half of current free mem of system

--txpool-max-per-sender <txpool-max-per-sender>
    Maximal number of transactions from single sender. default to 128

--txpool-min-gas-price <txpool-min-gas-price>
    reject transaction whose gas_price is less than the min_gas_price. default to 1

--txpool-tx-propagate-interval <txpool-tx-propagate-interval>
    interval(s) of tx propagation timer. default to 2
```

### Miner 相关的选项

```text
--disable-stratum          disable stratum
--stratum-address <address>                                               Stratum address, default is 0.0.0.0
--stratum-port <stratum-port>                                             Default tcp port is 9880
--miner-block-gas-limit <block-gas-limit>
    Node local block_gas_limit, use min(config.block_gas_limit, onchain.block_gas_limit)

--disable-miner-client <disable-miner-client>
    Don't start a miner client in node. The main network miner client is disable in default. This flag support
    both cli and config file

--disable-mint-empty-block <disable-mint-empty-block>
            Do not mint empty block, default is true in Dev network, only support cli

--miner-thread <miner-thread>
            Miner client thread number, not work for dev network, default is 1

```

### Log 和 Metrics 相关的选项

```text
--disable-metrics <disable-metrics>                                       disable metrics
--metrics-address <metrics-address>
    Metrics server listen address, default is 0.0.0.0

--metrics-port <metrics-port>                                             Metrics server port, default is 9101

--logger-disable-file <logger-disable-file>                               disable file logger
--logger-disable-stderr <logger-disable-stderr>                           disable stderr logger
--logger-max-backup <logger-max-backup>
--logger-max-file-size <logger-max-file-size>

```

### rocksdb 相关的选项

```text
--rocksdb-bytes-per-sync <rocksdb-bytes-per-sync>                         rocksdb bytes per sync
--rocksdb-max-open-files <rocksdb-max-open-files>                         rocksdb max open files
--rocksdb-max-total-wal-sizes <rocksdb-max-total-wal-sizes>               rocksdb max total WAL sizes
--rocksdb-wal-bytes-per-sync <rocksdb-wal-bytes-per-sync>                 rocksdb wal bytes per sync
```


### CLI 选项

```text
-c, --connect <connect>                                                       Connect and attach to a node
--watch-timeout <watch-timeout>                                           Watch timeout in seconds
-o <output-format>
            set output-format, support [json|table] [default: json]
```

### 子命令

* account
*  state
* node
* chain
*  txpool
*  dev
* contract
* console

