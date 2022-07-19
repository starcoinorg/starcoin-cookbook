# 如何参与主网络

## 简介

2021年5月18日，Starcoin 举行全球发布会，在聚光灯的照耀下，宣布启动主网。
这是一个里程碑时刻，意味着 Starcoin 这艘船舶，在区块链的蓝海里，正式扬帆起航。

## Windows 加入主网络

**1. 启动**

```shell
starcoin.exe --net main ^
    --disable-metrics true ^
    --node-name starcoin-main ^
    --data-dir D:\starcoin\data ^
    --logger-disable-file true ^
    --stratum-address 0.0.0.0 --stratum-port 9880
```

- `--net`：指定网络。
- `--disable-metrics`：是否要禁用指标监控服务，`true` 禁用，`false` 不禁用。
- `--node-name`：节点名称，仅用于显示，可根据自己的喜好取个有特色的名字。若不指定，则随机生成。
- `--data-dir`：数据存放目录，建议选择一个容易查找的路径。
- `--logger-disable-file`：是否要禁用文件日志采集器，`true` 禁用，`false` 不禁用。
- `--stratum-address`：指定矿池地址，默认为 `0.0.0.0`。
- `--stratum-port`：指定矿池端口号，默认为 `9880`。

在 Windows 的 cmd 窗口输入上述命令后，回车，节点就开始同步区块数据了，等待同步完成即可。

**2. 查看 IPC 文件路径**

用鼠标拖拽侧边栏到顶部，可以看到输出中显示有 IPC 文件的存放路径：

```shell
2022-05-23T16:40:06.642907500+08:00 INFO - Ipc file path: "\\\\.\\pipe\\starcoin\\main\\starcoin.ipc

# IPC 文件路径为：
\\\\.\\pipe\\starcoin\\main\\starcoin.ipc
```

**3. 查看节点同步进度**

如果想知道节点同步数据的进度，此时可以再打开一个新的 cmd 窗口，用 IPC 文件来连接到 Starcoin 控制台：

```shell
starcoin.exe -c \\.\pipe\starcoin\main\starcoin.ipc console
```

在 Starcoin 控制台中输入：

```shell
node sync status
```

在输出的 JSON 数据中可以找到一些关键信息，`chain_status.head.number` 和 `state.Synchronizing.target.number` 相等时，同步才完成。

**4. 查看默认账号**

每个新启动的节点，都初始化有一个默认账户，密码为空。

```shell
# 查看默认账户，找到账户地址
account default
```

**5. 导出默认账户的私钥**

```shell
account export <ADDRESS>
```

注意：请妥善保管好私钥！

**6. 退出控制台**

```shell
exit
```

## Linux 加入主网络（推荐）

**1. 启动**

```shell
starcoin
```

`starcoin` 命令，默认使用 `main` 网络，默认禁用挖矿客户端，默认不监听矿池，数据目录默认为主目录下的 `.starcoin/main`。

```shell
# 数据目录，ubuntu 是演示的用户名，请根据你的实际情况变更
2022-05-24T10:07:29.069207121+08:00 INFO - Final data-dir is : "/home/ubuntu/.starcoin/main"

# IPC 文件路径
2022-05-24T10:07:29.061062410+08:00 INFO - Ipc file path: "/home/ubuntu/.starcoin/main/starcoin.ipc"
```

**2. 查看节点同步进度**

打开一个新的命令行窗口，输入：

```shell
starcoin -c ~/.starcoin/main/starcoin.ipc console
```

在 Starcoin 控制台中输入：

```shell
node sync status
```

在输出的 JSON 数据中可以找到一些关键信息，`chain_status.head.number` 和 `state.Synchronizing.target.number` 相等时，同步才完成。

**3. 查看默认账号**

每个新启动的节点，都初始化有一个默认账户，密码为空。

```shell
# 查看默认账户，找到账户地址
account default
```

**4. 导出默认账户的私钥**

```shell
account export <ADDRESS>
```

注意：请妥善保管好私钥！

**5. 退出控制台**

```shell
exit
```

## Docker 加入主网络

**1. 拉取 [Docker 镜像](https://hub.docker.com/r/starcoin/starcoin/)**

```shell
docker pull starcoin/starcoin:latest
```

如果你想使用指定版本，可以更改拉取的标签，比如 `v1.11.9`：

```shell
docker pull starcoin/starcoin:v1.11.9
```

**2. 启动**

`starcoin` 的二进制文件在镜像中的 `/starcoin` 目录下。

```shell
docker run --name starcoin -v ~/.starcoin/:/root/.starcoin/ --network host starcoin/starcoin:latest /starcoin/starcoin
```

- `--name`：指定容器名称。
- `-v`：绑定挂载卷，用于持久化 Docker 中的数据。
- `--network`：让 Docker 容器的网络附属在主机上，两者互通。

**3. 通过 Docker 连接到 Starcoin 控制台**

打开一个新的命令行窗口，输入：

```shell
docker run --rm -it -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -c /root/.starcoin/main/starcoin.ipc console
```

- `--rm`：退出 Starcoin 控制台时，自动移除容器。
- `-it`：交互式进入容器，分配虚拟终端。

如果不想启用新的容器，可以直接接入启动 Starcoin 的容器：

```shell
docker container exec -it starcoin bash

/starcoin/starcoin -c /root/.starcoin/main/starcoin.ipc console
```

**4. 查看节点同步进度**

在 Starcoin 控制台中输入：

```shell
node sync status
```

在输出的 JSON 数据中可以找到一些关键信息，`chain_status.head.number` 和 `state.Synchronizing.target.number` 相等时，同步才完成。

**5. 查看默认账号**

每个新启动的节点，都初始化有一个默认账户，密码为空。

```shell
# 查看默认账户，找到账户地址
account default
```

**6. 导出默认账户的私钥**

```shell
account export <ADDRESS>
```

注意：请妥善保管好私钥！

**7. 退出控制台**

```shell
exit
```

## 种子节点地址
- JSON-RPC: https://main-seed.starcoin.org
- WebSocket: ws://main.seed.starcoin.org:9870
