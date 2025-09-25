# How to create a custom Starcoin network

`starcoin` supports running a user-defined blockchain network, which is convenient for users to build a private chain for testing or secondary development.

## Introduction

There are six built-in networks in `starcoin`, namely: `test, dev, halley, proxima, barnard, main`.

`test` and `dev` are for local development, `halley`, `proxima` and `barnard` are the test networks, and the `main` network is the official network.

Next, we will introduce how to build the Starcoin private network.

## Initialize custom network

The `starcoin_generator` command is used to generate genesis configuration files and genesis blocks.

### Generate genesis configuration file

```shell
starcoin_generator -n <CHAIN_NAME>:<CHAIN_ID> --genesis-config <GENESIS_CONFIG> genesis_config
```

- The `genesis_config` subcommand is used to generate the genesis configuration file.
- To initialize and run a custom blockchain network, you need to use the `-n, --net` option to specify the name of the chain and the id of the chain. The parameters are concatenated by `:`.
  - `CHAIN_NAME` represents the name of the chain, which will be used as the name of the data directory.
  - `CHAIN_ID` represents the id of the chain, of type `u8`.
- `--genesis_config` specifies the configuration file used to generate the genesis block. The parameter can use the built-in blockchain network name, indicating that the network configuration is reused, such as `halley`; it can also be the path of the configuration file.

For example, to generate a custom network named `my_chain` with id `123`:

```shell
starcoin_generator -n my_chain:123 --genesis-config halley genesis_config
```

This command uses the built-in `halley` network configuration as a template and generates configuration files named `genesis_config.json` and `genesis_config2.json` in the `~/.starcoin/my_chain` directory.
Parameters in the `~/.starcoin/my_chain/genesis_config.json` and `~/.starcoin/my_chain/genesis_config2.json` file can be modified with an editor.

Note: If you don't want the configuration file to be generated in the default `~/.starcoin/<CHAIN_NAME>` directory, you can also specify the directory with the `-d` option.

### Generate genesis block

The `genesis` subcommand is used to generate the genesis block.

```shell
starcoin_generator -n my_chain:123 genesis
```

This command generates the genesis block according to the genesis configuration file generated earlier.

The genesis configuration file in the above example is `~/.starcoin/my_chain/genesis_config2.json`. Of course, you can also place the `genesis_config2.json` file in another location and specify it with an absolute path, for example:

```shell
starcoin_generator -n my_chain:123 --genesis-config /data/conf/my_chain/genesis_config2.json genesis
```

## Running custom network nodes

Use the following command to start a custom network node:

```shell
starcoin -n my_chain:123 console
```

## Form a custom network cluster

After starting a node, you can find the address of the node in the log or standard output, record the IP address of the machine, and then use it for networking. It may look like this:

```shell
2022-05-25T11:27:10.201604911+00:00 INFO - Self address is: /ip4/127.0.0.1/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp
```

Specify the first node as the seed node by `--seed`, and then start other nodes to form a network.

Note: Multiple nodes must use the same genesis configuration file to generate genesis blocks in order to form a network.

On other machines, you can add to your private network by starting a new node and specifying the IP address of the genesis node using the `--seed` option:

```shell
starcoin -n my_chain:123 --seed /ip4/ip of genesis seed/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp console
```

### If you want run custom network in one local machine for test

First, start one node as the genesis seed, which is already started if you follow the steps, and check your local ip address.

Second, copy the *genesis_config.json* and *genesis_config2.json*configuration file of the genesis seed node to a new directory:

```shell
cp ~/.starcoin/my_chain/genesis_config.json ~/.starcoin1/my_chain/
cp ~/.starcoin/my_chain/genesis_config2.json ~/.starcoin1/my_chain/
```

Third, start other node using docker with following command:

```shell
docker run --name starcoin-p1 -d -v ~/.starcoin1/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n my_chain:123 --seed /ip4/ip of genesis seed/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp
```
