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

## How to attach a console

### via IPC file

Refer to [the second method in the startup console](#method-two).

Note: In Windows, the path to the IPC file is different.

```shell
starcoin.exe -c \\.\pipe\starcoin\dev\starcoin.ipc console
```

### via WebSocket

```shell
starcoin -c ws://0.0.0.0:9870 console
```

## How to connect to a remote node via console

### Mainnet connection via IPC file

```shell
starcoin -c ~/.starcoin/main/starcoin.ipc console
```

### Connect to Mainnet via WebSocket

```shell
# Connect to the main network seed node
starcoin -c ws://main.seed.starcoin.org:9870 console
```

## Usea local account

Once connected to the main network seed node, use the local account database to use account-related commands.

```shell
starcoin --connect ws://main.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/main/account_vaults console
```

## Attach to console by Docker

```shell
docker run --rm -it -v  ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin --connect /root/.starcoin/main/starcoin.ipc console
```
