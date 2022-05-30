# 如何更快地同步块和状态。

通常，启动一个新的 `main` 网络节点，就会自动同步区块数据，而这个过程是非常漫长的。

接下来将介绍如何通过 Starcoin 工具链提供的数据导出工具来加快新节点同步区块数据的速度，以及如何同步链的状态。

## 下载和安装

根据你所使用的系统下载相应预编译的 [Starcoin 工具链](https://github.com/starcoinorg/starcoin/releases)，如果你已经完成了 `starcoin` 的[下载和安装](https://starcoinorg.github.io/starcoin-cookbook/docs/getting-started/install/)，那么可以跳过这一步。

```shell
# 以 Ubuntu 为例
wget https://github.com/starcoinorg/starcoin/releases/download/v1.11.10/starcoin-ubuntu-latest.zip

# 解压
unzip starcoin-ubuntu-latest.zip

# 进入解压目录，检查
cd starcoin-artifacts/
./starcoin_db_exporter -h
```

提示：如果经常使用，推荐添加到 `PATH` 环境变量中。

## 同步区块数据

如果启动一个新的全节点，通常是下载其他节点的主网区块数据到新节点，并以下载的区块数据启动节点。
下载（导出）的区块数据存储在 CSV 文件上，方便数据交换和存储。

### 导出块

`export-block-range` 子命令用于导出区块数据。

```shell
# 创建一个目录用于存放从节点导出的区块数据
mkdir ~/bak

# 导出区块
./starcoin_db_exporter export-block-range -i ~/.starcoin/main/ -s 1 -e 10000 -n main -o ~/bak
```

- `-i` 指定节点的数据目录。
- `-s` 指定区块数据的起始高度。
- `-e` 指定区块数据的结束高度。
- `-n` 指定网络。
- `-o` 指定存放导出数据的目录。

导出结束后，在 `~/bak` 目录下可以看到导出文件为 `~/bak/block_1_10000.csv`。


### 导入块

`apply-block` 子命令用于导入区块数据。

```shell
./starcoin_db_exporter apply-block -i block_1_10000.csv -n main -o ~/.starcoin/main/
```

- `-i` 指定导入区块数据的 CSV 文件路径。
- `-n` 指定网络。
- `-o` 指定节点的数据目录。

## 同步链的状态

`starcoin_db_exporter` 命令提供了离线导出导入 `main, barnard, proxima, halley` 网络的快照功能，便于快速的搭建区块链网络。

### 导出快照

`export-snapshot` 子命令用于导出快照。

**正常导出：**

```shell
# 创建一个目录用于存放从节点导出的快照数据
mkdir ~/snapshot

# 导出快照
./starcoin_db_exporter export-snapshot -i ~/.starcoin/main -n main -o ~/snapshot
```

- `-i` 指定节点的数据目录。
- `-n` 指定网络。
- `-o` 指定存放导出快照的目录。

**增量导出：**

```shell
./starcoin_db_exporter export-snapshot -i ~/.starcoin/main -n main -o ~/snapshot -t true
```

通过 `-t` 选项指定是否使用增量导出，`true` 启用，`false` 禁用。
如果要使用增量导出，需要保证 `~/snapshot` 目录下有旧的快照，比如原来 `~/snapshot` 目录下的快照高度为 `1-400w`，现在需要导 `1-500w` 高度的快照。
如果使用了增量导出，则先会把后面 `400w-500w` 高度的快照导出，再与原来的快照合并，以此来节省时间。

### 导入快照

`apply-snapshot` 子命令用于导入快照。

```shell
./starcoin_db_exporter apply-snapshot -i ~/snapshot -n main -o ~/.starcoin/main
```

- `-i` 指定存放快照的目录。
- `-n` 指定网络。
- `-o` 指定节点的数据目录。
