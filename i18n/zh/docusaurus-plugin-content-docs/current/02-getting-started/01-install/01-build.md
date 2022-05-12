# 从源码构建 Starcoin

## 快速开始

1. 克隆源代码到本地

```shell
git clone https://github.com/starcoinorg/starcoin.git
cd starcoin
```

2. 设置构建环境

```shell
./scripts/dev_setup.sh
```

3. 使用 Cargo 构建

注意：这里提供两个版本（debug、release）的构建方法，debug 版本用于开发环境，release 版本用于生产环境。

如果要正式使用，请使用 release 版本，debug 版本和 release 版本之间的性能有数量级差异。

（1）构建 debug 版本

```shell
cargo build
```

（2）构建 release 版本

```shell
cargo build --release
```

4. 目标文件

编译结束后，可在 target 目录下找到相应的 starcoin 程序。

- debug 版本在 `target/debug/starcoin` 目录下
- release 版本在 `target/release/starcoin` 目录下

## 问题排查

### WSL

#### Q1:

使用 WSL2 进行编译可能会出现下面的报错信息：

```shell
error: linking with `cc` failed: exit status: 1
```

这是因为 WSL2 的交换内存（swap）未设置，或者小于 WSL2 的最大内存。

**解决方案**：

- 打开 Windows 资源管理器，在地址栏输入 `%UserProfile%` 回车。
- 在该目录下创建一个文件，名字为 `.wslconfig`
- 写入内容示例如下：（根据自己电脑实际分配，务必使 swap 大于等于 memory）
    ```config
    [wsl2]
    memory=2GB
    swap=4GB
    ```
- 在 cmd 执行 wsl --shutdown 关闭 WSL2，再重新打开即可。

#### Q2:

**为什么我的编译时间这么久？**

这种情况通常会在电脑配置比较低的用户身上出现，下面提供两个可行的建议：

1. 升级电脑配置。

2. 控制 Cargo 编译时的 job 数量。

对于低配置机器来说，控制核心数是大幅提高编译效率的关键。例如：

```shell
cargo build -j 1
```

具体的测试案例，请参见 [[bug] Excessive swap may result in slower builds #70](https://github.com/starcoinorg/starcoin-cookbook/issues/70) 中的讨论。

### CentOS

如果操作系统是 CentOS，则需要使用如下命令，单独安装相关开发工具：

```shell
yum install -y openssl-devel                    # 安装openssl
yum install -y centos-release-scl               # 安装centos-release-scl
yum install -y devtoolset-7                     # 安装开发工具
scl enable devtoolset-7 bash                    # 激活开发工具

# 下面的这两步，会删除错误链接的 llvm-private 包，但同样会导致 GUI 登录不了，
# 如果使用命令行，则不影响。
# 慎重，如果要使用 GUI 系统，则这下面的操作很危险！
rpm -qa | grep "llvm-private"                   # 查找包含 llvm-private 的包
rpm -e --nodeps llvm-private-6.0.1-2.el7.x86_64 # 卸载查找到的包，实际找到的可能和示例不同
```

### 常见问题排查

#### Q1:

使用 Cargo 编译时出现如下错误信息：

```shell
error: linker cc not found | = note: No such file or directory (os error 2)
```

这是因为 Cargo 找不到 `cc` 编译器程序（连接器）来编译给定的应用程序。

由于 Rust 还没有包含它自己的链接器，通常我们需要安装一个 C 编译器，如：`gcc` 和 `cmake` 等编译工具。

**解决方案**：

- 要在 Ubuntu 上安装 gcc，只需运行，`build-essential` 包含了编译开发所需的基本工具集：

```shell
sudo apt install build-essential
```

- 要在 Arch Linux 上安装 Cmake，请启用 `[Extra]` 存储库并运行：

```shell
sudo pacman -S gcc cmake
```

- 在 Fedora、RHEL、CentOS：

```shell
sudo dnf install gcc cmake
```

#### Q2:

- 若出现 `Could not find directory of OpenSSL installation` 的报错信息，则需要安装 OpenSSL 库。
- 若出现 ```Unable to find libclang: "the `libclang` shared library at /usr/lib64/clang-private/libclang.so.6.0"``` 字样错误，则可能是 `llvm-private` 的原因，解决方法是卸载它：
    ```shell
    rpm -qa | grep "llvm-private" # 查找包含 llvm-private 的包
    rpm -e --nodeps llvm-private-6.0.1-2.el7.x86_64 # 卸载查找到的包
    ```
- 每次编译出错后，解决后，需要 cargo clean，清除之前已编译的目标文件，再重新编译。
