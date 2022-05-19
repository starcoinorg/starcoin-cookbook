# How to set up a local dev network

## Run the local dev network

The following commands can start a new dev node:

```shell
starcoin -n dev
```

Or start a new node through Docker:

```shell
docker run --name starcoin -d --network host -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n dev
```

## Set up a cluster

After starting a node, you can find the address of the node in the log or standard output. It may be shown below:

```shell
Self address is: /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb
```

Then, you can start another new node through the following command:

```shell
starcoin -n dev --seed /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb
```

`--seed` option specifies the seed node to form the network.

Repeat these steps, you can get multi-node local development network.

## Get STC on dev network

You can find the following information in the first few lines out of the command line:

```shell
2022-05-18T02:06:31.882468352+00:00 INFO - Ipc file path: "/tmp/.tmpORwKTS/dev/starcoin.ipc"
```

This message indicates the storage location of the IPC file of the current dev node.

```shell
# Open a new terminal and switch to the data directory of the node
cd /tmp/.tmpORwKTS/dev/

# Get STC
starcoin -c starcoin.ipc dev get-coin -v 100STC
```

## Way of working

The block generation mode of the `dev` network is different from that of the main network and the test network.
The `dev` network generates blocks on demand, and no blocks are generated without transactions.
The time on the `dev` network does not automatically pass, and the time needs to be changed by generating blocks.
If you want to quickly skip time and test, you can use the `sleep` command.

## Tips

If the operation is related to the account, it is recommended to connect to the Starcoin console to simplify the operation:

```shell
cd /tmp/.tmpORwKTS/dev/
starcoin -c starcoin.ipc console
```

### Get the STC of the dev network in the console

```shell
starcoin% dev get-coin -v 100STC
```

Compared with obtaining STC directly from the CLI, it is more convenient to operate on the console.
