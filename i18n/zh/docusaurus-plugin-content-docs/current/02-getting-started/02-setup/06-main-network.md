# 如何参与主网络

## 简介

2021年5月18日，Starcoin 举行全球发布会，在聚光灯的照耀下，宣布启动主网。
这是一个里程碑时刻，意味着 Starcoin 这艘船舶，在区块链的蓝海里，正式扬帆起航。

## Windows 加入主网络

**1. 启动**

```shell
starcoin.exe --net main ^
    --disable-metrics true ^
    --miner-thread 0 ^
    --node-name starcoin-main ^
    --data-dir D:\starcoin\data ^
    --logger-disable-file true ^
    --stratum-address 0.0.0.0 --stratum-port 9880
```

- `--net`：指定网络。
- `--disable-metrics`：是否要禁用指标监控服务，`true` 禁用，`false` 不禁用。
- `--miner-thread`：挖矿线程数，默认值为 `1`。若不挖矿，可设置为 `0`。
- `--node-name`：节点名称，仅用于显示。若不指定，则随机生成。
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
