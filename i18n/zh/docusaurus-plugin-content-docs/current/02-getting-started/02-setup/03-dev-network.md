# 如何设置本地开发网络

TODO
1. local dev node set up.
2. How to get STC in dev node.
3. How to set up a local cluster
4. Some useful tips for local dev node
    * How to skip time in local dev?

## 运行本地网络

下面的命令可以启动新的 dev 节点：

```shell
starcoin -n dev
```

在此命令之后，你可以在日志或 std 输出中找到节点地址，它可能如下所示：

```shell
Self address is: /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb
```

然后，你可以通过以下命令设置另一个节点：

```shell
starcoin -n dev --seed /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb

```

你可以使用子命令控制台来启动 cli 控制台：

```shell
starcoin -n dev console
```

重复这些步骤，你可以获得多节点本地开发网络。

通过 docker 运行节点：

```shell
docker run --name starcoin -d --network host -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n dev
```