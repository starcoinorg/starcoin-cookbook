# How to sync the block and state faster

Usually, starting a new main network node will automatically synchronize block data, and this process is very long.

Next, we will introduce how to use the data export tool provided by the Starcoin toolchains to speed up the speed of new nodes synchronizing block data, and how to synchronize the state of the chain.

## Download and install

Download the corresponding precompiled [Starcoin toolchains](https://github.com/starcoinorg/starcoin/releases) according to the system you are using.
If you have already [downloaded and installed](https://starcoinorg.github.io/starcoin-cookbook/docs/getting-started/install/) `starcoin`, you can skip this step.

```shell
# Take Ubuntu as an example
wget https://github.com/starcoinorg/starcoin/releases/download/v1.11.10/starcoin-ubuntu-latest.zip

# Unzip
unzip starcoin-ubuntu-latest.zip

# Enter the decompression directory and check
cd starcoin-artifacts/
./starcoin_db_exporter -h
```

Tip: If you use it frequently, it is recommended to add it to the PATH environment variable.

## Sync block data

If a new full node is started, it is usually to download the main network block data of other nodes to the new node, and start the node with the downloaded block data.
Downloaded (exported) block data is stored on a CSV file for easy data exchange and storage.


### Export block

The `export-block-range` subcommand is used to export block data.

```shell
# Create a directory to store the block data exported from the node
mkdir ~/bak

# export block
./starcoin_db_exporter export-block-range -i ~/.starcoin/main/ -s 1 -e 10000 -n main -o ~/bak
```

- `-i` Specifies the data directory for the node.
- `-s` Specifies the starting height of block data.
- `-e` Specifies the end height of the block data.
- `-n` Specifies the network.
- `-o` Specifies the directory to store the exported data.

After the export, you can see that the export file is `~/bak/block_1_10000.csv` in the `~/bak` directory.

### Import block

The `apply-block` subcommand is used to import block data.

```shell
./starcoin_db_exporter apply-block -i block_1_10000.csv -n main -o ~/.starcoin/main/
```

- `-i` Specifies the path to the CSV file to import block data.
- `-n` Specifies the network.
- `-o` Specifies the data directory for the node.

### Import block data using script (recommended)

The `import_block.sh` script is provided in the `starcoin` repository, and the precompiled version is also packaged with the corresponding script.
It is more convenient to import block data using a script instead of having to export and import manually.

```shell
./import_block.sh main ~/.starcoin/main
```

This script accepts two parameters, parameter 1 specifies the network name, such as `main`, `barnard`, `proxima` or `halley`, and parameter 2 specifies the directory where the data is stored, such as `~/.starcoin/main` or any custom path.
This script will skip the existing blocks, and each time a block is acquired, the progress will be automatically updated.
After the script is interrupted and executed, the import will continue at the original height.

After executing the script, the mainnet block data will be automatically downloaded to the `~/.starcoin/main` directory and imported.
Wait for the download and import to complete, then you can run a new node with these block data.

Note: To use this script, make sure `starcoin_db_exporter` and `import_block.sh` are in the same path.

## Status of the sync chain

The `starcoin_db_exporter` command provides a snapshot function of offline export and import of `main`, `barnard`, `proxima`, `halley` networks, which is convenient to quickly build a blockchain network.

### Export snapshot

The `export-snapshot` subcommand is used to export snapshots.

**Normal export:**

```shell
# Create a directory for storing snapshot data exported from the node
mkdir ~/snapshot

# Export snapshot
./starcoin_db_exporter export-snapshot -i ~/.starcoin/main -n main -o ~/snapshot
```

- `-i` Specifies the data directory for the node.
- `-n` Specifies the network.
- `-o` Specifies the directory where the exported snapshots are stored.

**Incremental export:**

```shell
./starcoin_db_exporter export-snapshot -i ~/.starcoin/main -n main -o ~/snapshot -t true
```

Use the `-t` option to specify whether to use incremental export, `true` to enable, `false` to disable.
If you want to use incremental export, you need to ensure that there are old snapshots in the `~/snapshot` directory.
For example, the original snapshot height in the `~/snapshot` directory is `1-400w`, and now you need to export snapshots with a height of `1-500w`.
If incremental export is used, the subsequent `400w-500w` snapshots will be exported first, and then merged with the original snapshots to save time.

### Import snapshot

The `apply-snapshot` subcommand is used to import snapshots.

```shell
./starcoin_db_exporter apply-snapshot -i ~/snapshot -n main -o ~/.starcoin/main
```

- `-i` Specifies the directory where snapshots are stored.
- `-n` Specifies the network.
- `-o` Specifies the data directory for the node.

### Import snapshots using a script

The `import_snapshot.sh` script is provided in the [`starcoin`](https://github.com/starcoinorg/starcoin/blob/master/scripts/import_snapshot.sh) repository, and the precompiled version is also packaged with the corresponding script.

```shell
./import_snapshot.sh main ~/snapshot/ ~/.starcoin/main
```

This script needs to pass 3 parameters, parameter 1 specifies the name of the network, parameter 2 specifies the storage path of the snapshot, and parameter 3 specifies the data directory of the node.

Note: To use this script, make sure `starcoin_db_exporter` and `import_snapshot.sh` are in the same path.
