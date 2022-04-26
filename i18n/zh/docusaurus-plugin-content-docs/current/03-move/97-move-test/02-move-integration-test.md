## Move 集成测试

现在你知道如何在Move中写单元测试了。但是单元测试只适合于简单的测试场景，如数学计算。对于有用户交互的端到端测试案例，集成测试就开始发挥作用了。

集成测试是 mpm 的一个功能，它可以模拟：

- 账户初始化。
- 块的生成。
- 模块发布。
- 执行脚本或脚本函数。

所有的动作都被包装成事务。所有的集成测试文件应该在软件包根路径下的`integration-tests`目录中。

集成测试文件包含测试指令，用空的换行符隔开。指令的工作方式类似于命令行，你提供命令名称和命令参数。
mpm 执行指令，就像操作系统执行 cli 命令一样。


```
mpm-integration-test
Datatest-harness for running data-driven tests

USAGE:
    mpm integration-test [FLAGS] [OPTIONS] [--] [filter]

FLAGS:
        --bench                   NO-OP: unsupported option, exists for compatibility with the default test harness
    -d, --dev                     Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used
                                  if this flag is set. This flag is useful for development of packages that expose named
                                  addresses that are not set to a specific value
        --ensure-time             NO-OP: unsupported option, exists for compatibility with the default test harness
        --exclude-should-panic    NO-OP: unsupported option, exists for compatibility with the default test harness
        --exact                   Exactly match filters rather than by substring
        --force                   Force recompilation of all packages
        --force-run-in-process    NO-OP: unsupported option, exists for compatibility with the default test harness
        --abi                     Generate ABIs for packages
        --doc                     Generate documentation for packages
    -h, --help                    Prints help information
        --ignored                 List or run ignored tests (always empty: it is currently not possible to mark tests as
                                  ignored)
        --include-ignored         NO-OP: unsupported option, exists for compatibility with the default test harness
        --list                    List all tests
        --nocapture               NO-OP: unsupported option, exists for compatibility with the default test harness
    -q, --quiet                   Output minimal information
        --show-output             NO-OP: unsupported option, exists for compatibility with the default test harness
        --test                    NO-OP: unsupported option, exists for compatibility with the default test harness
        --ub                      update test baseline
    -V, --version                 Prints version information
    -v                            Print additional diagnostics if available

OPTIONS:
        --color <color>                  NO-OP: unsupported option, exists for compatibility with the default test
                                         harness
        --format <format>                Configure formatting of output: pretty = Print verbose output; terse = Display
                                         one character per test; (json is unsupported, exists for compatibility with the
                                         default test harness) [default: Pretty]  [possible values: Pretty, Terse, Json]
        --install-dir <install-dir>      Installation directory for compiled artifacts. Defaults to current directory
        --logfile <logfile>              NO-OP: unsupported option, exists for compatibility with the default test
                                         harness
    -p, --path <package-path>            Path to a package which the command should be run with respect to [default: .]
        --report-time <report-time>      NO-OP: unsupported option, exists for compatibility with the default test
                                         harness
        --skip <skip>...                 NO-OP: unsupported option, exists for compatibility with the default test
                                         harness
        --test-threads <test-threads>    Number of threads used for running tests in parallel [env: RUST_TEST_THREADS=]
                                         [default: 32]

ARGS:
    <filter>    The FILTER string is tested against the name of all tests, and only those tests whose names contain
                the filter are run
```

###  编写 test 指令

#### `init` 指令

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

`init` 指令用来声明某个集成测试的的初始状态。

You can either start from a fresh blockchain state by providing arg `-n test`,
or fork from a remote state snapshot like `--rpc http://main.seed.starcoin.org:9850 --block-number 100000`.
`--address <named-addresses>` can be used to declare additional named addressed which will be used in the integration test later.

你可以申明测试从一个创世块开始（通过参数 `-n test` ），
或者从一个远程状态快照开始，比如`--rpc http://main.seed.starcoin.org:9850 --block-number 100000`。

`--address <named-addresses>` 可以用来声明额外的命名地址，这将在后面的集成测试中使用。

例子:

```
//# init -n dev

//# init -n test --addresses alice=0xAA

//# init -n barnard

//# init --rpc http://main.seed.starcoin.org:9850 --block-number 100000

```

#### `block` 指令

```
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

`block` 指令申明一个新区块产生。


Every directives between this block directive and next block directive are running in this block.
You can pass custom `--author`, `--timestamp`, `--uncles` to fit your need.

If no block directive specified, transactions will run on default block whose block number is the next block number of initial state.
If you fork from a remote state of block number `h`, then the next block's number is `h+1`.

这个 `block` 指令和下一个 `block` 指令之间的其他指令都在这个区块中运行。
你可以自定义 区块的 `--author`，`--timestamp`，`--uncles`。

如果没有 `block` 指令，事务将在默认的块上运行，其块号是初始状态的下一个块号。

如果你的初始状态是某个远程状态，其最新区块高度为 `h`，那么测试默认使用的区块高度是`h+1`。

例子:


```
//# block

//# block --author alice

//# block --timestamp 100000000

//# block --uncles 10
```

#### `faucet` 指令

```
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

`faucet` 指令可以创建地址，给地址充钱。
地址可以是命名地址(named address)，比如 `alice`, `tom`， 或者是字面地址(raw address)，比如 `0x1`, `0x2`。
如果是命名地址，它会为该地址自动生成一个字面地址以及对应的公钥。
如果你想指定具体的某个公钥，可以用 `--public-key` 参数。

例子:

```
//# faucet --addr bob

//# faucet --addr alice --amount 0

//# faucet --addr tom --amount 10000000000000

```

#### `publish` 指令

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



`pulish` 指令可以将某个模块发布到链上。
模块代码必须跟在该指令后面。

- `--gas-budget` 指定了该交易的最大gas。
- `--syntax` 暂时还没有用到，可以忽略。


例子:

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

#### `run` 指令

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

`run` 指令可以执行一个脚本或者脚本函数。
如果是脚本，那么脚本代码必须跟在该指令后面。
如果是脚本函数，那么函数名字 `<NAME>` 必须提供。

- `--signers` 声明交易的发起者。
- `--type-args` 和 `--args` 声明交易要执行的函数的类型参数和参数。

例子:

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

#### `view` 指令


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

`view` 指令可以查询某个地址下的某个资源数据。


例子:

```
//# view --address alice --resource 01::Account::Account

//# view --address StarcoinFramework --resource 0x1::Config::Config<0x1::VMConfig::VMConfig>
```

#### `print-bytecode` 指令

```
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

`print-bytecode` 指令可以打印给定的模块或者脚本的字节码。

### 集成测试的期望结果

每个集成测试都应该有一个相应的期望文件，它包含了集成测试中每个指令的预期输出。
mpm 将比较集成测试的测试结果和期望文件。
如果两者不同，那么该集成测试就会失败。

你可以在运行`mpm integration-test`时提供`--ub`参数来生成期望文件。
但你必须检查生成的输出是否真的是你的集成测试的预期输出。

例子:

```
cd coin-swap
mpm pacakge build
mpm integration-test test_coin_swap
```

以上就是集成测试的用法，如有疑问，欢迎在 starcoin 的 discord 论坛提出。