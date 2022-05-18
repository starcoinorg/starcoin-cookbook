# 如何设置本地开发网络

## 运行本地 dev 网络

下面的命令可以启动新的 dev 节点：

```shell
starcoin -n dev
```

或者通过 Docker 启动新节点：

```shell
docker run --name starcoin -d --network host -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n dev
```

## 组建集群

在启动了一个节点后，你可以在日志或标准输出中找到节点的地址，它可能如下所示：

```shell
Self address is: /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb
```

然后，你可以通过以下命令启动另一个新节点：

```shell
starcoin -n dev --seed /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb
```

`--seed` 选项指定种子节点来组建网络。

重复这些步骤，你可以获得多节点本地开发网络。

## 在 dev 网络获取 STC

在命令行输出的前几行可以找到如下信息：

```shell
2022-05-18T02:06:31.882468352+00:00 INFO - Ipc file path: "/tmp/.tmpORwKTS/dev/starcoin.ipc"
```

这条信息指明了当前 dev 节点的 IPC 文件的存储位置。

```shell
# 打开一个新的终端，切换到节点的数据目录
cd /tmp/.tmpORwKTS/dev/

# 获取 STC
starcoin -c starcoin.ipc dev get-coin -v 100STC
```

## 技巧

如果操作与账户相关的命令，建议连接到 Starcoin 控制台来简化操作：

```shell
cd /tmp/.tmpORwKTS/dev/
starcoin -c starcoin.ipc console
```
