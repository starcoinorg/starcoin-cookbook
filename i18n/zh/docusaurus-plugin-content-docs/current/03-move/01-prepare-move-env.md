# 设置 Move 开发环境

## 下载

1. 运行 starcoin-framework 下的 [`dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)（自动化安装脚本），它包含了 mpm 的安装以及 move-prover 的依赖安装：
```
curl -s https://raw.githubusercontent.com/starcoinorg/starcoin-framework/main/scripts/dev_setup.sh | bash /dev/stdin -b -t
```

2. 从 [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin) 的发布页面下载

3.
```
$ git clone https://github.com/starcoinorg/starcoin.git
$ cargo install --path starcoin/vm/move-package-manager
```

4.
```
$ cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

这将在 Cargo 二进制目录中安装 `mpm` 二进制文件。在 macOS和 Linux 上，这个目录通常是 *~/.Cargo/bin*。你需要确保该位置在你的 `PATH` 环境变量中。

现在，你应该能够运行 `mpm`：
```
$ mpm
move-package-manager 1.11.7-rc
Starcoin Core Dev <dev@starcoin.org>
CLI frontend for the Move compiler and VM

USAGE:
    mpm [OPTIONS] <SUBCOMMAND>
  ...
```

TODO
- Set up env for move prover.