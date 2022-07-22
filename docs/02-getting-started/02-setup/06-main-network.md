# How to participate in the main network

## Introduction

On May 18, 2021, Starcoin held a global press conference, and under the spotlight, announced the launch of the main network.
This is a milestone moment, which means that the ship Starcoin has officially set sail in the blue ocean of blockchain.

## Windows joins main network

**1. Start**

```shell
starcoin.exe --net main ^
    --disable-metrics true ^
    --node-name starcoin-main ^
    --data-dir D:\starcoin\data ^
    --logger-disable-file true ^
    --stratum-address 0.0.0.0 --stratum-port 9880
```

- `--net`: Specifies the network.
- `--disable-metrics`: Whether to disable the metrics monitoring service, `true` to disable, `false` not to disable.
- `--node-name`: The node name is only used for display. You can choose a unique name according to your own preferences. If not specified, it will be randomly generated.
- `--data-dir`: The data storage directory, it is recommended to choose a path that is easy to find.
- `--logger-disable-file`: Whether to disable the file log collector, `true` to disable, `false` not to disable.
- `--stratum-address`: Specify the address of the mining pool, the default is `0.0.0.0`.
- `--stratum-port`: Specify the port number of the mining pool, the default is `9880`.

After entering the above command in the cmd window of Windows, press Enter, and the node will start to synchronize the block data, just wait for the synchronization to complete.

**2. View the IPC file path**

Drag the sidebar to the top with the mouse, and you can see that the output shows the storage path of the IPC file:

```shell
2022-05-23T16:40:06.642907500+08:00 INFO - Ipc file path: "\\\\.\\pipe\\starcoin\\main\\starcoin.ipc

# IPC file path is:
\\\\.\\pipe\\starcoin\\main\\starcoin.ipc
```

**3. View node synchronization progress**

If you want to know the progress of the node synchronization data, you can open a new cmd window at this time and use the IPC file to connect to the Starcoin console:

```shell
starcoin.exe -c \\.\pipe\starcoin\main\starcoin.ipc console
```

In the Starcoin console enter:

```shell
node sync status
```

Some key information can be found in the output JSON data.
The synchronization is completed when `chain_status.head.number` and `state.Synchronizing.target.number` are equal.

**4. View default account**

Each newly started node is initialized with a default account with an empty password.

```shell
# View the default account and find the account address
account default
```

**5. Export the private key of the default account**

```shell
account export <ADDRESS>
```

Note: Please keep the private key safe!

**6. Exit the console**

```shell
exit
```

## Linux joins main network (recommendation)

**1. Start**

```shell
starcoin
```

The `starcoin` command uses the `main` network by default, the mining client is disabled by default, the mining pool is not listened by default, and the data directory defaults to `.starcoin/main` under the main directory.

```shell
# Data directory, ubuntu is the username of the demo, please change it according to your actual situation
2022-05-24T10:07:29.069207121+08:00 INFO - Final data-dir is : "/home/ubuntu/.starcoin/main"

# IPC file path
2022-05-24T10:07:29.061062410+08:00 INFO - Ipc file path: "/home/ubuntu/.starcoin/main/starcoin.ipc"
```

**2. View node synchronization progress**

Open a new command line window and enter:

```shell
starcoin -c ~/.starcoin/main/starcoin.ipc console
```

In the Starcoin console enter:

```shell
node sync status
```

Some key information can be found in the output JSON data.
The synchronization is completed when `chain_status.head.number` and `state.Synchronizing.target.number` are equal.

**3. View default account**

Each newly started node is initialized with a default account with an empty password.

```shell
# View the default account and find the account address
account default
```

**4. Export the private key of the default account**

```shell
account export <ADDRESS>
```

Note: Please keep the private key safe!

**5. Exit the console**

```shell
exit
```

## Docker joins main network

**1. Pull the [Docker image](https://hub.docker.com/r/starcoin/starcoin/)**

```shell
docker pull starcoin/starcoin:latest
```

If you want to use a specific version, you can change the pull tag, such as `v1.11.9`:

```shell
docker pull starcoin/starcoin:v1.11.9
```

**2. Start**

The `starcoin` binaries are in the `/starcoin` directory in the mirror.

```shell
docker run --name starcoin -v ~/.starcoin/:/root/.starcoin/ --network host starcoin/starcoin:latest /starcoin/starcoin
```

- `--name`: Specifies the container name.
- `-v`: Bind mounted volume for persisting data in Docker.
- `--network`: Let the network of the Docker container be attached to the host, and the two can communicate with each other.

**3. Connect to the Starcoin console via Docker**

Open a new command line window and enter:

```shell
docker run --rm -it -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -c /root/.starcoin/main/starcoin.ipc console
```

- `--rm`: Automatically remove the container when exiting the Starcoin console.
- `-it`: Enter the container interactively, assigning a pseudo terminal.

If you don't want to start a new container, you can directly access the container that started Starcoin:

```shell
docker container exec -it starcoin bash

/starcoin/starcoin -c /root/.starcoin/main/starcoin.ipc console
```

**4. View node synchronization progress**

Open a new command line window and enter:

```shell
starcoin -c ~/.starcoin/main/starcoin.ipc console
```

In the Starcoin console enter:

```shell
node sync status
```

Some key information can be found in the output JSON data.
The synchronization is completed when `chain_status.head.number` and `state.Synchronizing.target.number` are equal.

**5. View default account**

Each newly started node is initialized with a default account with an empty password.

```shell
# View the default account and find the account address
account default
```

**6. Export the private key of the default account**

```shell
account export <ADDRESS>
```

Note: Please keep the private key safe!

**7. Exit the console**

```shell
exit
```

## Seed Node JSON-RPC

- HTTP: http://main.seed.starcoin.org
- HTTPS: https://main-seed.starcoin.org
- WebSocket: ws://main.seed.starcoin.org:9870
