# `starcoin_db_exporter` 帮助信息

```shell
USAGE:
    db-exporter [SUBCOMMAND]

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    apply-block               apply block range
    apply-snapshot            apply snapshot
    checkkey                  starcoin db check key
    export-block-range        export block range
    export-snapshot           export snapshot
    exporter                  starcoin db exporter
    gen-block-transactions    gen block transactions
    help                      Print this message or the help of the given subcommand(s)
    startup-info-back         startup info back
```

### `starcoin_db_exporter apply-block` 详述

**用法：**

```shell
# starcoin_db_exporter apply-block 选项 检验器
starcoin_db_exporter apply-block [OPTIONS] --net <NET> --to-path <TO_PATH> --input-path <INPUT_PATH> [VERIFIER]
```

**选项：**

```shell
# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `-i, --input-path <INPUT_PATH>`
  - input file, like accounts.csv
  - 指定导入区块数据的 CSV 文件路径，例如：`block_1_10000.csv`。

- `-n, --net <NET>`
  - Chain Network
  - 指定网络，例如：`main`。

- `-o, --to-path <TO_PATH>`
  - starcoin node db path. like ~/.starcoin/main
  - 指定节点的数据目录路径，例如：`~/.starcoin/main`。

- `-w, --watch`
  - Watch metrics logs
  - 查看监控日志信息。

- 校验器（可选）
  - `<VERIFIER>    Verify type:  Basic, Consensus, Full, None, eg [possible values: basic, consensus, full, none]`

注意：`-i`, `-n`, `-o` 是必选选项，其余的是可选选项，检验器也是可选的，有4种类型校验器，分别是 `basic`，`consensus`，`full`，`none`。

### `starcoin_db_exporter apply-snapshot` 详述

**用法：**

```shell
starcoin_db_exporter apply-snapshot --net <NET> --to-path <TO_PATH> --input-path <INPUT_PATH>
```

**选项：**

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `-i, --input-path <INPUT_PATH>`
  - input_path, manifest.csv in this dir
  - 指定快照的存储路径。

- `-n, --net <NET>`
  - Chain Network
  - 指定网络，例如：`main`。

- `-o, --to-path <TO_PATH>`
  - starcoin node db path. like ~/.starcoin/main
  - 指定节点的数据目录路径，例如：`~/.starcoin/main`。

### `starcoin_db_exporter export-block-range` 详述

**用法：**

```shell
starcoin_db_exporter export-block-range --net <NET> --output <OUTPUT> --db-path <DB_PATH> --start <START> --end <END>
```

**选项：**

- `-e, --end <END>`
  - 指定导出区块数据的起始高度。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `-i, --db-path <DB_PATH>`
  - starcoin node db path. like ~/.starcoin/main
  - 指定节点的数据目录路径，例如：`~/.starcoin/main`。

- `-n, --net <NET>`
  - Chain Network, like main, proxima
  - 指定网络，例如：`main`。

- `-o, --output <OUTPUT>`
  - output dir, like ~/, output filename like ~/block_start_end.csv
  - 指定区块数据的导出目录或文件，如果指定一个目录，文件名会根据高度参数自动生成，如：`~/block_start_end.csv`。

- `-s, --start <START>`
  - 指定导出区块数据的结束高度。

注：`-n`，`-i`，`-o`，`-s`，`-e` 为必选选项。

### `starcoin_db_exporter export-snapshot` 详述

**用法：**

```shell
starcoin_db_exporter export-snapshot [OPTIONS] --net <NET> --output <OUTPUT> --db-path <DB_PATH>
```

**选项：**

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `-i, --db-path <DB_PATH>`
  - starcoin node db path. like ~/.starcoin/main
  - 指定节点的数据目录路径，例如：`~/.starcoin/main`。

- `-n, --net <NET>`
  - Chain Network, like main, proxima
  - 指定网络，例如：`main`。

- `-o, --output <OUTPUT>`
  - output dir, like ~/, manifest.csv will write in output dir
  - 指定导出快照的存储目录。

- `-t, --increment <INCREMENT>`
  - enable increment export snapshot
  - 指定是否启用增量导出，`true` 启用，`false` 禁用。

注：`-n`，`-o`，`-i` 是必选选项。
