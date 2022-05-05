# User Guide of Move Package Manager

Move Package Manager(mpm) is a command line tool to develop move projects, like Cargo for Rust, or NPM for NodeJS.

It integrates the latest move pacakge system introduced in [move-language/move](https://github.com/move-language/move/tree/main/language/tools/move-package),
and reuse most functionality of [move-cli](https://github.com/move-language/move/tree/main/language/tools/move-cli) by diem.
**Before dive into this tutorial, please read the [pacakge section](https://github.com/move-language/move/blob/main/language/documentation/book/src/packages.md) of move book first.**
Understanding how move package work is a prerequest.


## Installation

Download from the release page of [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin).

Or use:

```
cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

### Overview

``` shell
joe@MX:~$ mpm
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


mpm is a convenient wrapper and superset of [move-cli](https://github.com/move-language/move/tree/main/language/tools/move-cli).

What applies to move-cli is also applied to mpm.

**So, We recommend you to go through the (https://github.com/move-language/move/tree/main/language/documentation/tutorial) written by move-language.**

In that tutorial, you can add an alias `alias move="mpm"` so that you can invoke move as it is.

You can check that it is working by running the following command:

```
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

### Spec Test

Based on move-cli, mpm add the support of integration test to test your move project in the whole.

It can simulates:

- account initialization.
- block generation.
- module publishing.
- execute scripts or script function.

All actions are wrapped into transactions.

All integration test files should be in `integration-tests` dir under the package root path.

spec test file contains test directives seperated by empty newlines.

directives works like a command line, you provide command name and command arguments,
and move pacakge manager executes the directives like OS executes cli commands.

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
            Print additional diagnostics if available@
```

### Integration test Directives

#### Directive - init

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

Directive `init` can declare the initial state of you spec test.
You can either start from a fresh blockchain state by providing arg `-n test`,
or fork from a remote state snapshot like `--rpc http://main.seed.starcoin.org:9850 --block-number 100000`.
`--address <named-addresses>` can be used to declare additional named addressed which will be used in the spec test later.

Examples:

```
//# init -n dev

//# init -n test --addresses alice=0xAA

//# init -n barnard

//# init --rpc http://main.seed.starcoin.org:9850 --block-number 100000

```

#### Directive - block

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

Directive `block` start a new block.

Every directives between this block directive and next block directive are running in this block.
You can pass custom `--author`, `--timestamp`, `--uncles` to fit your need.

If no block directive specified, transactions will run on default block whose block number is the next block number of initial state.
If you fork from a remote state of block number `h`, then the next block's number is `h+1`.

Examples:

```
//# block

//# block --author alice

//# block --timestamp 100000000

//# block --uncles 10
```

#### Directive - faucet

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

Directive **faucet** can create and faucet an address (can be named address like `alice`, `tom` or raw address like `0x1`, `0x2`) with some STC of given amount.
If the address is a named address, it will auto generate an raw address(and public key) and assign it to the named address.
If you has some specific requirements on `public-key`, use `--public-key` to specify it.


Examples:

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

Directive `publish` can publish a module to the blockchain.
The module code must follows the directive.

`--gas-budget` specifies the max gas of the transaction.
`--syntax` can be ingored for now.

Exmaples:

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

Directive `run` can execute a script of script function.
If it's a script, the script code must follow the directive.
If it's a script function, then `<NAME>` should be provided.

`--signers` declare the transaction sender.
`--type-args` and `--args` declare type arguments and arguments of the script of script function.

Examples:

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

Directive `view` can query any resource of any address.


Examples:

```
//# view --address alice --resource 01::Account::Account

//# view --address StarcoinFramework --resource 0x1::Config::Config<0x1::VMConfig::VMConfig>
```

#### Directive - print-bytecode

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

Directive `print-bytecode` can print the bytecode of given module or script.

### Installation Test Expectation

Each integration test should have an corresponding expectation file, which contains the expected output of each directives in integration test.
Move package manager will compare the test result of a integration test with the expectation file.
If there are different outputs, then the integration test fails.
You can generate the expected file by providing `--ub` argument when running `mpm integration-test` for the first time.
But you have to check whether the generated output really is the expected output of your integration test.

Example:

```
cd coin-swap
mpm pacakge build
mpm integration-test test_coin_swap
```

This's all about integration test of move.

## More example

1. [basic-coin](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/basic-coin/)
2. [coin-swap](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/coin-swap/)
3. [my-token](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-token/)
4. [my-counter](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter/)
5. [simple-nft](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/simple-nft/) A NFT example

## Questions

If you have any question, please go to [Starcoin/move-lang channel in Discord](https://discord.com/channels/822159062475997194/892760287797714954).
