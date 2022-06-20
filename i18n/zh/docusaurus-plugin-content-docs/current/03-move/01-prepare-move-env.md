# 设置 Move 开发环境

## 安装 mpm

Move Package Manager（mpm）是一个命令行工具，用于开发 Move 项目。可以类比 Rust 的 Cargo，或 NodeJS 的 npm。

选择下面的一种方法安装

### 通过安装脚本安装

运行 starcoin-framework 下的 [`scripts/dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)（自动化安装脚本），它包含了 mpm、Rust、环境变量配置以及 Move Prover 工具的依赖安装：
```
curl -s https://raw.githubusercontent.com/starcoinorg/starcoin-framework/main/scripts/dev_setup.sh | bash /dev/stdin -b -t -p
```

上面的给定的参数会在默认位置安装 mpm、Rust的安装，并配置环境变量。更多参数可以打开脚本文件查看。

### 通过预编译二进制包安装

从 [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin) 的发布页面下载 `mpm-[your_os]-latest.zip` 并解压，然后手动添加到 PATH。

### 从源码编译安装

可以从本地源码
```
$ git clone https://github.com/starcoinorg/starcoin.git
$ cd starcoin
$ cargo install --path vm/move-package-manager
```

也可以从git仓库源码
```
$ cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

这将在 Cargo 的 bin 目录中安装 `mpm` 二进制文件。在 macOS 和 Linux 上，这个目录通常是 *~/.Cargo/bin/*。你需要确保该位置在你的 `PATH` 环境变量中。

### 小结

现在，你应该能够运行 `mpm`：
```
$ mpm
move-package-manager 1.11.11
Starcoin Core Dev <dev@starcoin.org>
CLI frontend for the Move compiler and VM

USAGE:
    mpm [OPTIONS] <SUBCOMMAND>
  ...
```

## 安装 IDE 插件

### VS Code

在插件市场中搜索 starcoin-ide。点击安装即可。


## 设置 Move Prover 环境

1. 运行 starcoin-framework 下的 dev_setup.sh（自动化安装脚本）

```
./scripts/dev_setup.sh -ypt
```
当上面的命令执行完毕时，输入 `boogie /version`，如果输出类似 "Boogie program verifier version X.X.X"，那么安装已经成功。

注意，目前 Move Prover 只能在类 UNIX 操作系统下运行（例如 Linux、macOS）。 Windows 用户可以通过安装 WSL 来运行。
