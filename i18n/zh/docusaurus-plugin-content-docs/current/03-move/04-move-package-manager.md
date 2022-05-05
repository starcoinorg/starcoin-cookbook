# Move 包管理器用户指南

Move Package Manager（mpm）是一个命令行工具，用于开发移动项目，例如用于 Rust 的 Cargo，或用于 NodeJS 的 NPM。

它集成了 [move-language/move](https://github.com/move-language/move/tree/main/language/tools/move-package) 中引入的最新 move 包系统，并通过 diem 复用 [move-cli](https://github.com/move-language/move/tree/main/language/tools/move-cli) 的大部分功能。
在深入学习本教程之前，请先阅读 move book 的 [pacakge 部分](https://github.com/move-language/move/blob/main/language/documentation/book/src/packages.md)。
了解移动包的工作方式是一个先决条件。

## 安装

从 [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin) 的发布页面下载。

或使用：

```
cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

### 概览


``` shell
$ mpm
move-package-manager 1.11.7-rc
Starcoin Core Dev <dev@starcoin.org>
CLI frontend for the Move compiler and VM

USAGE:
    mpm [OPTIONS] <SUBCOMMAND>

OPTIONS:
        --abi                          Generate ABIs for packages
    -d, --dev                          Compile in 'dev' mode. The 'dev-addresses' and 'dev-
                                       dependencies' fields will be used if this flag is set. This
                                       flag is useful for development of packages that expose named
                                       addresses that are not set to a specific value
        --doc                          Generate documentation for packages
        --force                        Force recompilation of all packages
    -h, --help                         Print help information
        --install-dir <INSTALL_DIR>    Installation directory for compiled artifacts. Defaults to
                                       current directory
    -p, --path <PACKAGE_PATH>          Path to a package which the command should be run with
                                       respect to [default: .]
        --test                         Compile in 'test' mode. The 'dev-addresses' and 'dev-
                                       dependencies' fields will be used along with any code in the
                                       'test' directory
    -v                                 Print additional diagnostics if available
    -V, --version                      Print version information

SUBCOMMANDS:
    check-compatibility    Check compatibility of modules comparing with remote chain chate
    experimental           (Experimental) Run static analyses on Move source or bytecode
    help                   Print this message or the help of the given subcommand(s)
    integration-test       Run integration tests in tests dir
    package                Execute a package command. Executed in the current directory or the
                               closest containing Move package
    release                Release the package
    sandbox                Execute a sandbox command
```

mpm 一个方便的包装器和 [move-cli](https://github.com/move-language/move/tree/main/language/tools/move-cli) 的超集。

适用于 move-cli 的内容也适用于 mpm。

因此，我们建议您阅读 move-language 编写的[教程](https://github.com/move-language/move/tree/main/language/documentation/tutorial)。

在该教程中，您可以添加别名 `alias move='mpm'` 以便您可以按原样调用 move。

您可以通过运行以下命令来检查它是否正常工作：

```shell
move package -h

mpm-package 0.1.0
Execute a package command. Executed in the current directory or the closest containing Move package

USAGE:
    mpm package [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -d, --dev        Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag
                     is set. This flag is useful for development of packages that expose named addresses that are not
                     set to a specific value
        --force      Force recompilation of all packages
        --abi        Generate ABIs for packages
        --doc        Generate documentation for packages
    -h, --help       Prints help information
        --test       Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with
                     any code in the 'test' directory
    -V, --version    Prints version information
    -v               Print additional diagnostics if available

OPTIONS:
        --install-dir <install-dir>    Installation directory for compiled artifacts. Defaults to current directory
    -p, --path <package-path>          Path to a package which the command should be run with respect to [default: .]

SUBCOMMANDS:
    build          Build the package at `path`. If no path is provided defaults to current directory
    coverage       Inspect test coverage for this package. A previous test run with the `--coverage` flag must have
                   previously been run
    disassemble    Disassemble the Move bytecode pointed to
    errmap         Generate error map for the package and its dependencies at `path` for use by the Move explanation
                   tool
    help           Prints this message or the help of the given subcommand(s)
    info           Print address information
    new            Create a new Move package with name `name` at `path`. If `path` is not provided the package will
                   be created in the directory `name`
    prove          Run the Move Prover on the package at `path`. If no path is provided defaults to current
                   directory. Use `.. prove .. -- <options>` to pass on options to the prover
    test           Run Move unit tests in this package
```

### 集成测试

在 move-cli 的基础上，mpm 增加了集成测试的支持，可以对你的 move 项目进行整体测试。

它可以模拟：

- 账户初始化。
- 块生成。
- 模块发布。
- 执行脚本或脚本函数。

所有操作都包含在事务中。

所有规范测试文件都应该在包根路径下的 `integration-tests` 目录中。

集成测试文件包含由空换行符分隔的测试指令。

指令像命令行一样工作，您提供命令名称和命令参数，然后移动 pacakge 管理器执行指令，就像 OS 执行 cli 命令一样。

```shell
$ mpm integration-test --help
mpm-integration-test
Run integration tests in tests dir

USAGE:
    mpm integration-test [OPTIONS] [FILTER]

ARGS:
    <FILTER>    The FILTER string is tested against the name of all tests, and only those tests
                whose names contain the filter are run

OPTIONS:
        --abi
            Generate ABIs for packages

    -d, --dev
            Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if
            this flag is set. This flag is useful for development of packages that expose named
            addresses that are not set to a specific value

        --doc
            Generate documentation for packages

        --exact
            Exactly match filters rather than by substring

        --force
            Force recompilation of all packages

        --format <FORMAT>
            Configure formatting of output: pretty = Print verbose output; terse = Display one
            character per test; (json is unsupported, exists for compatibility with the default test
            harness) [default: pretty] [possible values: pretty, terse]

    -h, --help
            Print help information

        --install-dir <INSTALL_DIR>
            Installation directory for compiled artifacts. Defaults to current directory

        --list
            List all tests

    -p, --path <PACKAGE_PATH>
            Path to a package which the command should be run with respect to [default: .]

    -q, --quiet
            Output minimal information

        --test
            Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used
            along with any code in the 'test' directory

        --test-threads <TEST_THREADS>
            Number of threads used for running tests in parallel [env: RUST_TEST_THREADS=] [default:
            32]

        --ub
            update test baseline

    -v
            Print additional diagnostics if available
```

### 集成测试指令

#### 指令 - 初始化

``` shell
task-init 0.1.0

USAGE:
    task init [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --block-number <block-number>       block number to read state from. default to latest block number
        --addresses <named-addresses>...
    -n, --network <network>                 genesis with the network
        --public-keys <public-keys>...
        --rpc <rpc>                         use remote starcoin rpc as initial state
```

指令 `init` 可以声明规范测试的初始状态。
你可以通过提供参数 `-n test` 从新的区块链状态开始，或者从远程状态快照，如 `--rpc http://main.seed.starcoin.org:9850 --block-number 100000` 分叉。
`--address <named-addresses>` 可用于声明其他命名地址，稍后将在规范测试中使用。

例子：

```
//# init -n dev

//# init -n test --addresses alice=0xAA

//# init -n barnard

//# init --rpc http://main.seed.starcoin.org:9850 --block-number 100000
```

#### 指令 - block

```shell
task-block 0.1.0

USAGE:
    task block [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --author <author>
        --number <number>
        --timestamp <timestamp>
        --uncles <uncles>
```

指令 `block` 开始一个新的块。

此块指令和下一个块指令之间的每个指令都在此块中运行。
你可以通过自定义 `--author`、`--timestamp`、`--uncles` 来满足您的需要。

如果没有指定块指令，事务将在默认块上运行，其块号是初始状态的下一个块号。
如果你从一个区块编号为 `h` 的远程状态分叉，那么下一个区块的编号是 `h+1`。

例子：

```
//# block

//# block --author alice

//# block --timestamp 100000000

//# block --uncles 10
```

#### 指令 - faucet

```shell
task-faucet 0.1.0

USAGE:
    task faucet [OPTIONS] --addr <address>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --addr <address>
        --amount <initial-balance>     [default: 100000000000]
        --public-key <public-key>
```

指令 `faucet` 可以创建和点击一个地址（可以命名为 `alice`、`tom` 等地址或 `0x1`、`0x2` 等原始地址），其中包含一定数量的 STC。
如果地址是命名地址，它将自动生成一个原始地址（和公钥）并将其分配给命名地址。
如果您对 `public-key` 有一些特定要求，请使用 `--public-key` 来指定它。

例子：

```
//# faucet --addr bob

//# faucet --addr alice --amount 0

//# faucet --addr tom --amount 10000000000000

```

#### Directive - publish

```
task-publish 0.1.0
Starcoin-specific arguments for the publish command

USAGE:
    task publish [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --gas-budget <gas-budget>
    -k, --public-key <public-key>
        --syntax <syntax>
```

指令 `publish` 可以将模块发布到区块链。
模块代码必须遵循指令。

`--gas-budget` 指定交易的最大气体。
`--syntax` 现在可以输入。

示例：

```
//# publish
module alice::Holder {
    use StarcoinFramework::Signer;

    struct Hold<T> has key, store {
        x: T
    }

    public fun hold<T: store>(account: &signer, x: T) {
        move_to(account, Hold<T>{x})
    }

    public fun get<T: store>(account: &signer): T
    acquires Hold {
        let Hold {x} = move_from<Hold<T>>(Signer::address_of(account));
        x
    }
}

//# publish
module Dummy::DummyModule {}
```

#### Directive - run

```
task-run 0.1.0
Starcoin-specifc arguments for the run command,

USAGE:
    task run [FLAGS] [OPTIONS] [--] [NAME]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information
    -v, --verbose    print detailed outputs

OPTIONS:
        --args <args>...
        --gas-budget <gas-budget>
    -k, --public-key <public-key>
        --signers <signers>...
        --syntax <syntax>
        --type-args <type-args>...

ARGS:
    <NAME>
```

指令 `run` 可以执行脚本函数的脚本。
如果是脚本，则脚本代码必须遵循指令。
如果是脚本函数，则应提供 `<NAME>`。

`--signers` 声明交易发送者。
`--type-args` 和 `--args` 声明类型参数和脚本函数脚本的参数。

例子：

```
//# run --signers alice
script {
use StarcoinFramework::STC::{STC};
use StarcoinFramework::Token;
use StarcoinFramework::Account;
fun main(account: signer) {
    let coin = Account::withdraw<STC>(&account, 0);
    Token::destroy_zero(coin);
}
}

//# run --signers alice --type-args 0x1::DummyToken::DummyToken 0x1::Account::accept_token

```

#### Directive - view


```
task-view 0.1.0

USAGE:
    task view --address <address> --resource <resource>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --address <address>
        --resource <resource>
```

指令 `view` 可以查询任何地址的任何资源。

例子：

```
//# view --address alice --resource 01::Account::Account

//# view --address StarcoinFramework --resource 0x1::Config::Config<0x1::VMConfig::VMConfig>
```

#### 指令 - print-bytecode

```shell
task-print-bytecode 0.1.0
Translates the given Move IR module or script into bytecode, then prints a textual representation of that bytecode

USAGE:
    task print-bytecode [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --input <input>    The kind of input: either a script, or a module [default: script]
```

指令 `print-bytecode` 可以打印给定模块或脚本的字节码。

### 集成测试期望

每个集成测试都应该有一个对应的期望文件，其中包含集成测试中每个指令的期望输出。
Move 包管理器会将集成测试的测试结果与期望文件进行比较。
如果有不同的输出，则集成测试失败。
您可以在第一次运行 `mpm integration-test` 时通过提供 `--ub` 参数来生成预期的文件。
但是您必须检查生成的输出是否真的是您的集成测试的预期输出。

例子：

```
cd coin-swap
mpm pacakge build
mpm integration-test test_coin_swap
```

这都是关于 Move 的集成测试。

## 更多例子

1. [basic-coin](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/basic-coin/)
2. [coin-swap](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/coin-swap/)
3. [my-token](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-token/)
4. [my-counter](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter/)
5. [simple-nft](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/simple-nft/) A NFT example

## 问题

如果您有任何问题，请前往 Discord 中的 [Starcoin/move-lang channel in Discord](https://discord.com/channels/822159062475997194/892760287797714954) 频道。
