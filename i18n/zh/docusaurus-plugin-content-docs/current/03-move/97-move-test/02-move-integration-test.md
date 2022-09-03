## Move 集成测试

现在你知道如何在Move中写单元测试了。但是单元测试只适合于简单的测试场景，如数学计算。对于有用户交互的端到端测试案例，集成测试就开始发挥作用了。

集成测试是 mpm 的一个功能，它可以模拟：

- 账户初始化。
- 块的生成。
- 模块发布。
- 执行脚本或脚本函数。

所有的动作都被包装成事务。所有的集成测试文件应该在软件包根路径下的`integration-tests`目录中。

集成测试是在源码文件添加注解来表示测试指令。注解以`//#`开头，用空行隔开。指令的工作方式类似于命令行，开发者提供命令名称和命令参数，
mpm 将会自动执行指令，就像系统执行命令行 CLI 命令一样。

```
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
        --public-keys <public-keys>...      the `public-keys` option is deprecated, please remove it.
        --rpc <rpc>                         use remote starcoin rpc as initial state
        --debug                             enable debug mode, output more info to stderr.
```

`init` 指令用来声明某个集成测试的的初始状态。

你可以声明测试从一个创世块开始（通过参数 `-n test` ），或者从一个远程状态快照开始，比如`--rpc http://main.seed.starcoin.org:9850 --block-number 100000`。`--address <named-addresses>` 可以用来声明额外的命名地址，这将在后面的集成测试中使用。`--debug` 模式将会打印更多的交易信息，便于调试。

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


这个 `block` 指令和下一个 `block` 指令之间的其他指令都在这个区块中运行。你可以自定义区块的 `--author`，`--timestamp`，`--uncles`。

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
```

`faucet` 指令可以创建地址，给地址充钱。
地址可以是命名地址(named address)，比如 `alice`, `tom`， 或者是字面地址(raw address)，比如 `0x1`, `0x2`。
如果是命名地址，它会为该地址自动生成一个字面地址以及对应的公钥。

例子:

```
//# faucet --addr bob

//# faucet --addr alice --amount 0

//# faucet --addr tom --amount 10000000000000

```


#### call 指令

```
task-call 0.1.0

Call a smart contract function 

USAGE:
    task call <function>  [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

ARGS:
    <function>       Smart contract function name

OPTIONS:
    -i, --args <args>               function arguments
    -t, --type-args <type-args>     function type arguments
```

`call` 指令可以用来直接调用智能合约的函数。

示例:

```
//# call 0x1::Account::balance --type-args 0x1::STC::STC --args 0x662ba5a1a1da0f1c70a9762c7eeb7aaf
```


#### call-api 指令

```
task-call-api 0.1.0

Call a RPC api from remote starcoin node.

USAGE:
    task call-api <method> <params>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

ARGS:
    <method>         api method to call, example: node.info
    <params>         api params, should be a json array string
```

`call-api` 指令可以用来调用远程 RPC 的接口。返回值会被保存在 mpm 的运行环境中，可以后续的测试指令中用模板变量来获取返回结果并将其作为后续指令的参数输入。
可以通过 [jsonrpc](https://starcoinorg.github.io/jsonrpcdoc/) 查看 Starcoin 的 API 接口和它们的输出格式。

示例:

```
//# call-api chain.info

//# call-api chain.get_block_by_hash [{{$.call-api[0].head.parent_hash}}]

```

#### Directive - package

```
task-package 0.1.0

Package a module

USAGE:
    task package [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --signers
        --init-function
        --type-args
        --args
```

`package` 指令可以将模块打包并返回打包后的 bytes，hash 和保存下来的临时文件。
这常在两阶段提交的测试用到。

输出示例：
```
{
    "file":"/tmp/.tmpnok0M6/0x3c6b00fadc6b4f37fa6e2c6c0949e97c89b00c07c0d1f1761671e6fe18792676.blob",
    "hex":"0x662ba5a1a1da0f1c70a9762c7eeb7aaf0146a11ceb0b040000000601000203020505070107080b0813100c2307000000010000000004746573740568656c6c6f662ba5a1a1da0f1c70a9762c7eeb7aaf000100000001020000",
    "package_hash":"0x3c6b00fadc6b4f37fa6e2c6c0949e97c89b00c07c0d1f1761671e6fe18792676"
}
```

示例:

```
//# package
module creator::test {
    public fun hello() {}
}
```

#### deploy 指令

```
task-deploy 0.1.0

Deploy a packed module.

USAGE:
    task deploy [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

ARGS:
    <mv-or-package-file>    move bytecode file path or package binary path

OPTIONS:
        --signers
        --gas-budget
```

`deploy` 指令可以将打包后的模块部署到区块链上。

`--signers` 一般在两阶段提交中用到，在第二阶段发布模型是，任何人都可以发起模型部署的交易。
`--gas-budget` 指定交易的最大 gas 。

示例: 

```
//# deploy {{$.package[0].file}}
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