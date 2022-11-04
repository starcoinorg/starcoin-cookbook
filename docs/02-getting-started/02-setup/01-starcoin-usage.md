# How to use Starcoin CLI

`starcoin` is used to start a local network or join a starcoin network. Running a local network or join test network makes it easier to test and debug your code changes. You can use the CLI command dev to compile, publish, and execute Move programs on your local network or test network. 

<!--more-->

## Usage

```
Starcoin

USAGE:
    starcoin [OPTIONS] [SUBCOMMAND]
```

Run `starcoin` to set up a node and join the main network.

```bash
$ starcoin
```

You can join to other netowrks using `-n|--net` options. For example, start a local dev network:

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

As shown above, there are four RPC ways we can interact with node.
* IPC file: .../dev/starcoin.ipc
* HTTP server: 0.0.0.0:9850
* TCP server: 0.0.0.0:9860
* WebSocket server: 0.0.0.0:9870

The local dev mode will use a temporary directory by default, all the data will be reset each time restart the network. Once the dev network is started, we can connect to the node through IPC (inter-process communication) file to execute commands, such as:

```bash
$ starcoin -c /var/folders/_4/1ghtd3z15qjcw8yj905dcql40000gn/T/.tmph3EJ8S/dev/starcoin.ipc chain info
```

> Note: The IPC file path is different on Windows, and you need to use the following command (dev in the middle needs to change according to the connected network):

``` shell
$ starcoin.exe --connect \\.\pipe\dev\starcoin.ipc console
```

Connect through the WebSocket RPC interface:

```bash
$ starcoin -c ws://127.0.0.1:9870 chain info
```

Or connect to a remote seed node through the RPC interface:

```
$ starcoin -c ws://main.seed.starcoin.org:9870 chain info
```


## Start CLI console

Get into an interactive console by running the subcommand `console`.

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

Then you can run command in the console directly:

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

Getting into the console in this way, a `starcoin` node will be set up if there's no other node exists. The console communicates with the node through IPC(inter-process communication).  In this way, the node's lifecycle is bound to the console's, and the node will exit automatically when the console exit.

Connect to a node through IPC or WebSocket RPC:

```bash
$ starcoin -c ws://127.0.0.1:9870 console
$ starcoin -c ~/.starcoin/main/starcoin.ipc console
$ starcoin -c ws://main.seed.starcoin.org:9870 console
```

If connected to a remote seed node through RPC, the methods related to the account is not availabel. You can set the `--local-account-dir` option and import an account to use the account methods.

```bash
$ starcoin --connect ws://main.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/main/account_vaults console
starcoin% account import -i <private-key> -p <your-password>
```

## FAQ

### How to use CLI with pipeline?

`starcoin` output log to stderr and result to stdout, so you can use the pipeline as other Linux shell commands. For example, you can use `jq` to get the latest block number.

```bash
starcoin -c ws://main.seed.starcoin.org:9870 chain info | jq '.ok.head.number'
```
### Node exit for an unexpected error: file limit the maximum number of open file descriptors is too small, got xxxx, expect greater or equal to 45056

The reason for this error is that the default maximum number of file descriptors that can be opened by the ubuntu is not enough.

this step will help you set the Max file descriptors to 65535

you just nedd add `DefaultLimitNOFILE=65536` to the end of `/etc/systemd/system.conf` and `/etc/systemd/user.conf`,then `reboot` the ubuntu

finally,you can use `ulimit -n` to check the max file descriptors limitation

## Options

### Chain-related options

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

* disable-seed: Node will connect to the seed node by default, and search other nodes through the seed node. With this option, the node will not connect to the seed node anymore.

### Node-related options

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

### RPC related options

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

* disable-http-rpc｜disable-ipc-rpc｜disable-tcp-rpc｜disable-tcp-rpc｜disable-websocket-rpc：By default, the node will open all the ports. You can disable some ports with the corresponding flag.

### P2P network related options

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

### Transaction pool related options

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

### Miner related options

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

### Log and Metrics related options

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

### Rocksdb related options

```text
--rocksdb-bytes-per-sync <rocksdb-bytes-per-sync>                         rocksdb bytes per sync
--rocksdb-max-open-files <rocksdb-max-open-files>                         rocksdb max open files
--rocksdb-max-total-wal-sizes <rocksdb-max-total-wal-sizes>               rocksdb max total WAL sizes
--rocksdb-wal-bytes-per-sync <rocksdb-wal-bytes-per-sync>                 rocksdb wal bytes per sync
```


### CLI related options

```text
-c, --connect <connect>                                                       Connect and attach to a node
--watch-timeout <watch-timeout>                                           Watch timeout in seconds
-o <output-format>
            set output-format, support [json|table] [default: json]
```

### Subcommand

* account
* state
* node
* chain
* txpool
* dev
* contract
* console

