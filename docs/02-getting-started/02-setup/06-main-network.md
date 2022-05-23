# How to participate in the main network

## Introduction

On May 18, 2021, Starcoin held a global press conference, and under the spotlight, announced the launch of the main network.
This is a milestone moment, which means that the ship Starcoin has officially set sail in the blue ocean of blockchain.

## Windows joins main network

**1. Start**

```shell
starcoin.exe --net main ^
    --disable-metrics true ^
    --miner-thread 2 ^
    --node-name starcoin-main ^
    --data-dir D:\starcoin\data ^
    --logger-disable-file true ^
    --stratum-address 0.0.0.0 --stratum-port 9880
```

- `--net`: Specifies the network.
- `--disable-metrics`: Whether to disable the metrics monitoring service, `true` to disable, `false` not to disable.
- `--miner-thread`: The number of mining threads, the default value is `1`. If not mining, it can be set to `0`, and the mining client is disabled by default on the main network.
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
