# `mpm` 帮助信息

## 用法

```shell
# mpm 选项 子命令
mpm [OPTIONS] <SUBCOMMAND>
```

## 选项

```shell
# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `--force`
  - Force recompilation of all packages
  - 强制重新编译所有的包。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `--install-dir <INSTALL_DIR>`
  - Installation directory for compiled artifacts. Defaults to current directory
  - 为手动编译的程序指定安装目录，默认为当前目录。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。

- `-V, --version`
  - Print version information
  - 打印版本信息。

## 子命令

    check-compatibility    Check compatibility of modules comparing with remote chain chate
    experimental           (Experimental) Run static analyses on Move source or bytecode
    help                   Print this message or the help of the given subcommand(s)
    integration-test       Run integration tests in tests dir
    package                Execute a package command. Executed in the current directory or the
                               closest containing Move package
    release                Release the package
    sandbox                Execute a sandbox command

接下来将详细介绍 `mpm` 子命令的子命令。
子命令选项信息基本与 mpm 的选项相同，可以直接参考。

### `mpm package` 详述

**用法：**

```shell
# mpm package 选项 子命令
mpm package [OPTIONS] <SUBCOMMAND>
```

**子命令：**

```shell
# 结构描述

- 子命令
  - 子命令的原文描述
  - 子命令的通俗解释
  - 用法：……
```

- `build`
  - Build the package at `path`. If no path is provided defaults to current directory
  - 在指定 `path` 路径下构建包，如果没有使用选项指定路径，那么默认在当前目录下构建，构建结束后，会在当前目录或指定目录下看到一个 `build` 目录。
  - 用法：`mpm package build [OPTIONS]`

- `coverage`
  - Inspect test coverage for this package. A previous test run with the `--coverage` flag must have previously been run
  - 检查包的测试覆盖范围。在使用 `--coverage` 标记（选项）的测试运行前必须先运行。
  - 用法：`mpm package coverage [OPTIONS] <SUBCOMMAND>`

- `disassemble`
  - Disassemble the Move bytecode pointed to
  - 拆解指向的 Move 字节码。
  - 用法：`mpm package disassemble [OPTIONS] --name <MODULE_OR_SCRIPT_NAME>`

- `errmap`
  - Generate error map for the package and its dependencies at `path` for use by the Move explanation tool
  - 在指定 `path` 下生成包及其依赖项的错误映射，以供 Move 说明工具使用。
  - 用法：`mpm package errmap [OPTIONS]`

- `info`
  - Print address information
  - 打印地址信息。
  - 用法：`mpm package info [OPTIONS]`

- `new`
  - Create a new Move package with name `name` at `path`. If `path` is not provided the package will be created in the directory `name`
  - 在指定的 `path` 处创建一个名为 `name` 的 Move 包，如果没有指定 `path` 选项来指定一个路径，那么就会在当前路径下使用 `name` 作为包名来创建一个包。
  - 用法：`mpm package new [OPTIONS] <NAME>`

- `prove`
  - Run the Move Prover on the package at `path`. If no path is provided defaults to current directory. Use `.. prove .. -- <options>` to pass on options to the prover
  - 在 `path` 的包上运行 Move Prover。如果没有提供路径，则默认使用当前目录。使用 `.. prove .. -- <options>` 将选项传递给 Prover。
  - 用法：`mpm package prove [OPTIONS] [SUBCOMMAND]`

- `test`
  - Run Move unit tests in this package
  - 用法：`mpm package prove [OPTIONS] [SUBCOMMAND]`

### `mpm release` 详述

这个命令用于发布包。

**用法：**

```shell
# mpm release 选项
mpm release [OPTIONS]

# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `--arg <transaction-args>`
  - args for the init script function
  - 指定用于初始化脚本函数的参数。

- `-d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `--force`
  - Force recompilation of all packages
  - 强制重新编译所有的包。

- `--function <script-function>`
  - init script function to execute, example: 0x123::MyScripts::init_script
  - 执行初始化脚本函数，例如：`0x123::MyScripts::init_script`。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `--install-dir <INSTALL_DIR>`
  - Installation directory for compiled artifacts. Defaults to current directory
  - 为手动编译的程序指定安装目录，默认为当前目录。

- `--move-version <move-version>`
  - specify the move lang version for the release. currently, only v3, v4 are supported [default: 4] [possible values: 3, 4]
  - 为将要发布的包指定 Move 语言的版本，目前仅支持 `v3` 和 `v4`，默认值为 `4`。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `--release-dir <release-dir>`
  - dir to store released blob [default: release]
  - 指定用来存放发布 `blob` 对象的目录，默认情况下会在执行发布命令的当前目录的 `release` 目录中。

- `-t, --type_tag <type-tag>`
  - type tags for the init script function
  - 为初始化脚本函数设置一个标签。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。


### `mpm-integration-test` 详述

在测试目录（`integration-tests`）运行集成测试。

**用法：**

```shell
# mpm integration-test 选项 过滤器
mpm integration-test [OPTIONS] [FILTER]

- `<FILTER>`
 - The FILTER string is tested against the name of all tests, and only those tests whose names contain the filter are run
 - 过滤字符串是针对所有测试的名称进行测试的，并且只有那些包含过滤器的名称的测试才能运行。
```

**选项：**

```shell
# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `--exact`
  - Exactly match filters rather than by substring
  - 完全匹配过滤器，而不是子字符串。

- `--force`
  - Force recompilation of all packages
  - 强制重新编译所有的包。

- `--format <FORMAT>`
  - Configure formatting of output: pretty = Print verbose output; terse = Display one character per test; (json is unsupported, exists for compatibility with the default test harness) [default: pretty] [possible values: pretty, terse]
  - 输出的配置格式：`pretty` 打印详细输出；`terse` 每个测试显示一个字符；（不支持 json，存在与默认测试安全带的兼容），默认值为 `pretty`。

- `-h, --help`
  - Print help information
  - 打印帮助信息

- `--install-dir <INSTALL_DIR>`
  - Installation directory for compiled artifacts. Defaults to current directory
  - 为手动编译的程序指定安装目录，默认为当前目录。

- `--list`
  - List all tests
  - 列出所有测试。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `-q, --quiet`
  - Output minimal information
  - 输出最小信息。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `--test-threads <TEST_THREADS>`
  - Number of threads used for running tests in parallel [env: RUST_TEST_THREADS=] [default: 32]
  - 指定用于并行测试的线程数量，默认值为 `32`，通过环境变量指定：`RUST_TEST_THREADS=32`。

- `--ub`
  - update test baseline
  - 更新测试基线。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。

### `mpm sandbox` 详述

这个组合命令用于执行相关的沙箱命令。

**用法：**

```shell
mpm sandbox [OPTIONS] <SUBCOMMAND>
```

**选项：**
- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `--storage-dir <STORAGE_DIR>`
  - Directory storing Move resources, events, and module bytecodes produced by module publishing and script execution [default: storage]
  - 指定由模块发布和脚本执行所生成的 Move 资源、事件和模块的字节码，默认目录为 `storage`。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。

**子命令：**

```shell
# 结构描述

- 子命令
  - 子命令的原文描述
  - 子命令的通俗解释
```

- `clean`
  - Delete all resources, events, and modules stored on disk under `storage-dir`.
  - 删除存储在磁盘上 `storage-dir` 下的所有资源、事件、模块，不会删除 `src` 中的任何内容。
- `doctor`
  - Run well-formedness checks on the `storage-dir` and `install-dir` directories
  - 对 `storage-dir` 和 `install-dir` 进行格式良好检查。

- `exp-test`
  - Run expected value tests using the given batch file
  - 使用给定的批处理文件运行预期值测试。

- `generate`
  - Generate struct layout bindings for the modules stored on disk under `storage-dir`
  - 为存储在 `storage-dir` 磁盘上的模块生成结构布局绑定。

- `publish`
  - Compile the modules in this package and its dependencies and publish the resulting bytecodes in global storage
  - 编译当前包中的模块及其依赖项，并发布在全局存储中生成的字节码。

- `run`
  - Run a Move script that reads/writes resources stored on disk in `storage-dir`. The script must be defined in the package
  - 运行一个 Move 脚本，读取/写入存储在 `storage-dir` 磁盘上的资源。脚本必须定义在包中。

- `view`
  - View Move resources, events files, and modules stored on disk
  - 查看存储在磁盘上 Move 的资源、事件文件和模块。

### `check-compatibility` 详述

这个命令是让模块跟远程链（链上）的状态比较，检查模块的兼容性。

**用法：**

```shell
mpm check-compatibility [OPTIONS]
```

**选项：**

```shell
# 结构描述

- 选项
  - 选项原文描述
  - 选项通俗解释
```

- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `--block-number <BLOCK_NUMBER>`
  - block number to read state from. default to latest block number
  - 指定要读取状态的块号，默认为最新的块号。

- `d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `--force`
  - Force recompilation of all packages
  - 强制重新编译所有的包。

- `-h, --help`
  - Print help information
  - 打印帮助信息。

- `--install-dir <INSTALL_DIR>`
  - Installation directory for compiled artifacts. Defaults to current directory
  - 为手动编译的程序指定安装目录，默认为当前目录。

- `-n, --network <NETWORK>`
  - genesis with the network
  - 指定网络。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `--rpc <rpc>`
  - use remote starcoin rpc as initial state
  - 使用远程（链上）的 Starcoin rpc 作为初始状态。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。

### `experimental` 详述

在 Move 的源代码或字节码上运行静态分析，这个功能目前处于实验阶段。

**用法：**

```shell
mpm experimental [OPTIONS] <SUBCOMMAND>
```

**选项：**

- `--abi`
  - Generate ABIs for packages
  - 为包生成应用程序二进制接口（ABI），即两个程序模块之间的接口。

- `-d, --dev`
  - Compile in 'dev' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used if this flag is set. This flag is useful for development of packages that expose named addresses that are not set to a specific value
  - 在 `dev` 模式下编译。如果设置了此标志（选项），则会使用 `dev-addresses` 和 `dev-dependencies` 字段。这个选项对于公开未设置为特定值的命名地址的包的开发非常有用。

- `--doc`
  - Generate documentation for packages
  - 为包生成文档。

- `--force`
  - Force recompilation of all packages
  - 强制重新编译所有的包。

- `--install-dir <INSTALL_DIR>`
  - Installation directory for compiled artifacts. Defaults to current directory
  - 为手动编译的程序指定安装目录，默认为当前目录。

- `-p, --path <PACKAGE_PATH>`
  - Path to a package which the command should be run withrespect to [default: .]
  - 指定命令应该运行的包的路径，默认为当前路径，即 `[default: .]`。

- `--storage-dir <STORAGE_DIR>`
  - Directory storing Move resources, events, and module bytecodes produced by module publishing and script execution [default: storage]
  - 指定由模块发布和脚本执行所生成的 Move 资源、事件和模块的字节码，默认目录为 `storage`。

- `--test`
  - Compile in 'test' mode. The 'dev-addresses' and 'dev-dependencies' fields will be used along with any code in the 'tests' directory
  - 在 `test` 模式下编译。`dev-addresses` 和 `dev-dependencies` 字段将与 `tests` 目录中的任何代码一起使用。

- `-v`
  - Print additional diagnostics if available
  - 如果功能用，将打印额外的诊断信息。

**子命令：**

```shell
# 结构描述

- 子命令
  - 子命令的原文描述
  - 子命令的通俗解释
```

- `read-write-set`
  - Perform a read/write set analysis and print the results for `module_file`::`script_name`
  - 执行读取/写入来设置分析并打印 `module_file`::`script_name` 的结果。
