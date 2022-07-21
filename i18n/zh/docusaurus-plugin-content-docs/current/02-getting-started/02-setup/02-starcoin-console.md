# 如何与 Starcoin 控制台交互

## 如何启动控制台

### 方式一

在节点启动的时候进入控制台。

注意：如果不指定存放数据的目录，以这种方式直接进入交互式控制台，会在 `/tmp` 目录下随机生成一个用于存放当前进程的数据目录。
退出交互式控制台，进程结束，存放数据的目录也会立即被删除。

```shell
starcoin -n dev console
```

在启动交互式控制台时通过 `-d` 选项指定数据目录，则不会在进程结束后将其删除：

```shell
starcoin -n dev -d . console
```

`.` 表示当前目录，也可以使用一个绝对路径来指定存放数据的目录。

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

看到如上的输出，表示成功进入了交互式控制台。

### 方式二

在一个终端启动节点后，再开启另一个终端接入节点来启动控制台。

```shell
# 终端1
starcoin -n dev -d ~
```

此时会在用户目录下生成一个 `dev` 的目录，目录中的 `.ipc` 文件可以用来接入控制台。

```shell
# 终端2
cd ~/dev
starcoin -c starcoin.ipc console
```

更多接入方式及细节见下文。

## 控制台连接节点

本地节点默认会开放4种 JSON-PRC 接入方式，可以在启动节点时的控制台输出种找到。
- IPC 文件
- WebSocket
- HTTP
- TCP

`starcoin console` 可以通过 `IPC 文件` 和 `WebSocket` 这两种方式连接到节点。

### 通过 IPC 文件

```shell
starcoin -c /path/to/starcoin.ipc console

# 在 Windows 中，IPC 文件所在路径不同。用 dev 节点举例 
starcoin.exe -c \\.\pipe\starcoin\dev\starcoin.ipc console
```

此时，`starcoin console` 连接到了 IPC 文件对应节点的网络。
可以是 dev、主网、测试网等，取决于启动的节点加入的网络。

### 通过 WebSocket

```shell
starcoin -c ws://0.0.0.0:9870 console
```

还可以通过 WebSocket 连接主网或 Barnard 等测试网的种子节点

```shell
starcoin -c ws://main.seed.starcoin.org:9870 console
```

:::info Info
其他网络的种子节点地址可以在 [主网种子节点 JSON-RPC 地址](06-main-network.md#种子节点地址) 和 [测试网种子节点 JSON-RPC 地址](04-test-network.md#种子节点地址) 中找到。
:::

## 使用本地账户

连接到主网络种子节点后，使用本地帐户数据库来使用与帐户相关的命令。

```shell
starcoin --connect ws://main.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/main/account_vaults console
```

## 通过 Docker 接入控制台

```shell
docker run --rm -it -v  ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin --connect /root/.starcoin/main/starcoin.ipc console
```
