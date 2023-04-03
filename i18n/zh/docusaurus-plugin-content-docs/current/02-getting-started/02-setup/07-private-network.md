# 如何创建自定义的 Starcoin 网络

`starcoin` 支持运行一个用户自定义区块链网络，方便用户搭建私有链进行测试或者二次开发。

## 简介

`starcoin` 内置有六种网络，分别是：`test, dev, halley, proxima, barnard, main`。

`test` 和 `dev` 用于本地开发，`halley`、`proxima` 和 `barnard` 是测试网络，`main` 网络是正式网络。

接下来将介绍如何搭建 Starcoin 私有网络。

## 初始化自定义网络

`starcoin_generator` 命令用于生成创世（genesis）配置文件和创世区块。

### 生成创世配置文件

```shell
starcoin_generator -n <CHAIN_NAME>:<CHAIN_ID> --genesis-config <GENESIS_CONFIG> genesis_config
```

- `genesis_config` 子命令用于生成创世配置文件。
- 初始化和运行自定义区块链网络，都需要使用 `-n, --net` 选项指定链的名称和链的 id，参数由 `:` 拼接而成。
  - `CHAIN_NAME` 表示链的名字，这个名字会用作数据目录的名称。
  - `CHAIN_ID` 表示链的 id，类型为 `u8`。
- `--genesis_config` 指定生成创世块所使用的配置文件，参数可以使用内置的区块链网络名称，表示复用该网络配置，比如 `halley`；也可以是配置文件的路径。

例如要生成一个名为 `my_chain`，id 为 `123` 的自定义网络：

```shell
starcoin_generator -n my_chain:123 --genesis-config halley genesis_config
```

该命令将内置的 `halley` 网络配置作为模板，生成一个名为 `genesis_config.json` 配置文件在 `~/.starcoin/my_chain` 目录下。可以用编辑器修改 `~/.starcoin/my_chain/genesis_config.json` 文件中的参数。

注：如果不想配置文件生成在默认的 `~/.starcoin/<CHAIN_NAME>` 目录下，也可以通过 `-d` 选项指定目录。

### 生成创世区块

`genesis` 子命令用于生成创世区块。

```shell
starcoin_generator -n my_chain:123 genesis
```

该命令根据前面生成的创世配置文件来生成创世区块。

上面例子中的创世配置文件是 `~/.starcoin/my_chain/genesis_config.json`。当然，也可以将 `genesis_config.json` 文件放置在其他位置，然后通过绝对路径指定，比如：

```shell
starcoin_generator -n my_chain:123 --genesis-config /data/conf/my_chain/genesis_config.json genesis
```

## 运行自定义网络节点

使用如下命令即可启动自定义网络节点:

```shell
starcoin -n my_chain:123 console
```

## 组建自定义网络集群

在启动了一个节点后，你可以在日志或标准输出中找到节点的地址，记录本机的 IP 地址，接下来组网要用到，它可能如下所示：

```shell
2022-05-25T11:27:10.201604911+00:00 INFO - Self address is: /ip4/127.0.0.1/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp
```

通过 `--seed` 指定第一个节点作为种子节点，然后再启动其他节点，即可组成一个网络。

注意：多个节点必须使用同一套创世配置文件来生成创世区块，才能组成一个网络。

在其他机器上，您可以启动一个新节点并使用 `--seed` 选项指定创世节点的 IP 地址，以此来添加到您的私有网络：

```shell
starcoin -n my_chain:123 --seed /ip4/创世seed节点的IP地址/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp console
```

### 如果只是想测试一下，在一台机器上起多个节点来组网

第一步，启动一个节点作为创世种子节点，如果跟着上面的步骤来，那它已经启动了，这时候检查您的本地 IP 地址，第三步会用到

第二步，把创世的种子节点（seed node）的 *genesis_config.json* 配置文件 `cp` 到新的目录下

```shell
cp ~/.starcoin/my_chain/genesis_config.json ~/.starcoin1/my_chain/
```

第三步，用 docker 来启动其他节点，命令如下：

```shell
docker run --name starcoin-p1 -d -v ~/.starcoin1/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n my_chain:123 --seed /ip4/创世seed节点的IP地址/tcp/9840/p2p/12D3KooWR1p3uxnWZ2rv5mZ3Sw2i8z3gabxNEHjgkPDC2pkk19Vp
```
