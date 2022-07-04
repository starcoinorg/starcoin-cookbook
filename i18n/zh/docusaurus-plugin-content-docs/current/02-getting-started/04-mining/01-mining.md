# 挖矿客户端

## starcoin miner

`starcoin_miner` 为 Starcoin 提供的挖矿客户端。
`starcoin_miner` 命令行工具用于远程连接到 Starcoin 节点，并提供 CPU 挖矿，连接 stc-mini 矿机挖矿的能力。

### 使用方法

```shell
`starcoin_miner` [OPTIONS]

USAGE:
    starcoin_miner [OPTIONS] --user <user>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -p, --plugin-path <plugin-path>
    -a, --server <server>               [default: 127.0.0.1:9870]
    -n, --thread-num <thread-num>       [default: 1]
    -u, --user <user>
```

### 连接到节点利用 CPU 进行挖矿

当本地启动 Starcoin 节点时，我们可以运行如下命令来指定挖矿用户 alice 启动 4 个线程连接到本地节点进行挖矿。

```shell
starcoin_miner --user alice -n 4
```

启动后可以看到 console 中有如下信息:

```shell
Miner client Total seals found:  3
starcoin-miner-cpu-worker-0 ⠦ [00:00:00] Hash rate:      20 Seals found:  17
starcoin-miner-cpu-worker-1 ⠦ [00:00:00] Hash rate:      21 Seals found:  17
starcoin-miner-cpu-worker-2 ⠤ [00:00:00] Hash rate:      20 Seals found:  16
starcoin-miner-cpu-worker-3 ⠤ [00:00:00] Hash rate:      20 Seals found:  16
2020-10-28T09:09:53.006852+08:00 INFO - Seal found 16718533681172480617
```

日志中可以看到挖到的 seals 总数，每个线程的算力，以及新计算得出的 seal 等信息。

## stc-box

stc-box 为 Starcoin 目前主流矿机。不需要安装额外的客户端或软件，可通过矿机网页进行设置。
配置方式可参考 [配置矿池可参考](https://www.yuque.com/bixinkelekuangchi/stoxms/knlyf3)

## stc-mini

### windows 环境使用步骤

1. 安装驱动
2. 安装软件：[Starcoin 挖矿客户端](https://github.com/starcoinorg/starcoin_mini_miner/releases/)
3. 将矿机与电脑相连。
4. 更新固件: 软件识别出矿机后，点击更新固件。将 [Starcoin mini 矿机固件](https://github.com/starcoinorg/starcoin_mini_miner/releases/download/v0.0.2/starcoin_mini_miner_recovery_v0.0.2.bin) 下载后上传。
5. 设置矿池：打开 Starcoin Miner 软件，点击设置矿池图标，输入矿池名，端口号，用户名，矿工密码，点击确认。
6. 开始挖矿：点击启动矿机，等待片刻后能够看到有算力生成证明设备已开始工作。
7. 切换矿池：选择机器停止挖矿，设置矿池，开始挖矿。

### 注意事项

* 使用前请尽量避免将矿机放置在空气流通性差和温度过高的环境下运行，否则可能导致工作异常甚至造成设备损坏。
* 使用前请保证网络通畅，否则会造成拒绝率上升影响机器算力。
* 使用时请勿私自超频，否则会导致芯片损坏，后果自负。
* 该客户端软件暂时仅支持 windows 系统, 非 windows 系统用户使用此矿机请参考：[starcoin mint usb solver](https://github.com/fikgol/usbsolver)

# 矿池相关

starcoin 的矿池协议参考 [starcoin stratum protocol](https://github.com/starcoinorg/starcoin/blob/master/stratum/stratum_mining_protocol.md)。

## 加入矿池

* 设置 [可乐矿池(推荐)](https://www.yuque.com/docs/share/5c5ae94a-3ed4-4dab-98ca-62baf17891e0)
* 连接 [币印矿池 (推荐)](https://help.poolin.com/hc/zh-cn/articles/360060982092)
* 连接 [ViaBTC 矿池](https://support.viabtc.com/hc/zh-cn/articles/900005939326)
* 连接 [大象矿池](https://www.dxpool.com/help/zh/starcoin-mining-toturial)
* 连接 [鱼池矿池](https://blog.f2pool.com/zh/mining-tutorial/stc)

## 自建矿池

Starcoin 节点内部实现了一个 stratum server，用户可以通过其实现自建矿池进行挖矿。
启动 Starcoin 节点时，stratum server 将会默认监听本机地址 0.0.0.0:9880，通过连接支持 starcoin stratum 的挖矿客户端进行挖矿。
启动 Starcoin 节点时，可以通过参数 `--stratum-address` 以及 `--stratum-port` 来设置 stratum server 的地址和端口。
如：

``` shell
./starcoin -n main --stratum-port 9880 --stratum-address 127.0.0.1
```
