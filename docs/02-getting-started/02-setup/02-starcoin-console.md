# How working with the Starcoin console

## How to start the console

### Method one

Enter the console when the node starts.

Note: If you do not specify a directory for storing data, and directly enter the interactive console in this way, a data directory for storing the current process will be randomly generated in the `/tmp` directory.
Exit the interactive console, the process ends, and the directory where the data is stored is immediately deleted.

```shell
starcoin -n dev console
```

Specifying the data directory via the `-d` option when starting the interactive console will not delete it after the process ends:

```shell
starcoin -n dev -d . console
```

`.` indicates the current directory, and an absolute path can also be used to specify the directory where the data is stored.

```shell

                                                      ::::::::███████::
                                                :::::███████████████████:
                                  :█████████:  :████████:::        :██████
                                  █████:█████:  █::                  █████:
                                 █████: :█████:                     :█████
                                :█████   :████:                    :█████:
                               :█████:    :████:                  :█████:
                              :█████:      █████:               :██████
               :███████████████████:       :███████████████:   ██████:
              :████████████████████         :████████████:   :█████:
              █████:                                      :██████:
             ::███████::                                :██████:
          :█::  ::████████:                          :███████:
        :████:::    :████████:                    ::██████:
      :█████::         ::█████:                  :█████::
    :██████:            :████:                   :█████:
   :█████:             :█████           :         :█████:
  :████:              :█████:        :█████::      :█████:
 :████:              :█████:     :█████████████:    :█████
:█████               █████: :██████████: :████████:  :████:
:████:               :████████████::        ::████████████:
 :█████::::::::::::██   ::███::                 :██████:
  :█████████████████::
      :::█████::::

         ██████╗████████╗  ███╗  ██████╗  █████╗  █████╗ ██╗███╗  ██╗
        ██╔════╝╚══██╔══╝ ██ ██╗ ╚════██╗██╔══██╗██╔══██╗██║████╗ ██║
        ╚█████╗    ██║   ██   ██║██████╔╝██║  ╚═╝██║  ██║██║██╔██╗██║
         ╚═══██╗   ██║   ██╔══██║██╔══██╗██║  ██╗██║  ██║██║██║╚████║
        ██████╔╝   ██║   ██║  ██║██║  ██║╚█████╔╝╚█████╔╝██║██║ ╚███║
        ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝  ╚════╝ ╚═╝╚═╝  ╚══╝

starcoin%
```

If you see the above output, it means you have successfully entered the interactive console.

### Method two

After one terminal starts the node, start another termnal to attach the node to start the console.

```shell
# Terminal 1
starcoin -n dev -d ~
```

At this point, a `dev` directory will be generated in the user directory, and the `.ipc` file in the directory can be used to attach the console.

```shell
# Terminal 2
cd ~/dev
starcoin -c starcoin.ipc console
```

More details see below.

## How to connect nodes through a console

Local Node provides four JSON-PRC ways to connect to.

- IPC file
- WebSocket
- HTTP
- TCP

`starcoin console` can connect node using `IPC file` and `WebSocket`.

### via IPC file

```shell
starcoin -c /path/to/starcoin.ipc console

# In Windows, the path to the IPC file is different.
# Attach to dev node for example.
starcoin.exe -c \\.\pipe\starcoin\dev\starcoin.ipc console
```

Now, `starcoin console` attached to the network which IPC file corresponding to.

### via WebSocket

```shell
starcoin -c ws://0.0.0.0:9870 console
```

You can also attach to seed node of main network or Barnard test network.

```shell
starcoin -c ws://main.seed.starcoin.org:9870 console
```

:::info Info
Seed node address can be find out in [Main Network JSON-RPC address](06-main-network.md#seed-node-json-rpc) and [Test Network JSON-RPC address](04-test-network.md#seed-node-json-rpc)
:::

### Use local account

Once connected to the main network seed node, use the local account database to use account-related commands.

```shell
starcoin --connect ws://main.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/main/account_vaults console
```

### Attach to console by Docker

```shell
docker run --rm -it -v  ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin --connect /root/.starcoin/main/starcoin.ipc console
```
