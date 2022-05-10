# 包（pacakage）

包允许 Move 程序员更轻松地重用代码并在项目之间共享。Move 包系统允许程序员轻松地：

- 定义一个包含 Move 代码的包；
- 通过命名地址（named address）参数化包；
- 在其他 Move 代码中导入和使用包并实例化命名地址；
- 构建包并从包中生成相关的编译工件（compilation artifact）；
- 使用围绕已编译 Move 工件的通用接口。

## 包布局和清单语法

Move 包源目录包含一个 `Move.toml` 包清单文件以及一组子目录：

```
a_move_package
├── Move.toml      (required)
├── sources        (required)
├── examples       (optional, test & dev mode)
├── scripts        (optional)
├── doc_templates  (optional)
└── tests          (optional, test mode)
```

如上结构所示，一个 Move 包中必须存在 `required` 标记的文件或目录才能被视为一个 Move 包并进行编译。
可以存在可选目录，如果存在，将包含在编译过程中。
根据构建包的模式（`test` 或 `dev`），`tests` 和 `examples` 目录也将包括在内。

`sources` 目录可以包含 Move 模块和 Move 脚本（事务脚本和包含脚本函数的模块）。
`examples` 目录可以包含仅用于开发和/或教程目的的附加代码，这些代码在 `test` 或 `dev` 模式之外编译时不会包含在内。

支持 `scripts` 目录，因此如果包作者需要，可以将事务脚本与模块分开。
如果存在 `scripts` 目录，则将始终包含它以进行编译。
将使用 `doc_templates` 目录中存在的任何文档模板构建文档。

### Move.toml

Move 包的清单定义在 `Move.toml` 文件中，并具有以下语法。
可选字段标有 `*`，`+` 表示一个或多个元素：

```
[package]
name = <string>                  # e.g., "MoveStdlib"
version = "<uint>.<uint>.<uint>" # e.g., "0.1.1"
license* = <string>              # e.g., "MIT", "GPL", "Apache 2.0"
authors* = [<string>]            # e.g., ["Joe Smith (joesmith@noemail.com)", "Jane Smith (janesmith@noemail.com)"]

[addresses]  # (Optional section) Declares named addresses in this package and instantiates named addresses in the package graph
# One or more lines declaring named addresses in the following format
<addr_name> = "_" | "<hex_address>" # e.g., Std = "_" or Addr = "0xC0FFEECAFE"

[dependencies] # (Optional section) Paths to dependencies and instantiations or renamings of named addresses from each dependency
# One or more lines declaring dependencies in the following format
<string> = { local = <string>, addr_subst* = { (<string> = (<string> | "<hex_address>"))+ } } # local dependencies
<string> = { git = <URL ending in .git>, subdir=<path to dir containing Move.toml inside git repo>, rev=<git commit hash>, addr_subst* = { (<string> = (<string> | "<hex_address>"))+ } } # git dependencies

[dev-addresses] # (Optional section) Same as [addresses] section, but only included in "dev" and "test" modes
# One or more lines declaring dev named addresses in the following format
<addr_name> = "_" | "<hex_address>" # e.g., Std = "_" or Addr = "0xC0FFEECAFE"

[dev-dependencies] # (Optional section) Same as [dependencies] section, but only included in "dev" and "test" modes
# One or more lines declaring dev dependencies in the following format
<string> = { local = <string>, addr_subst* = { (<string> = (<string> | <address>))+ } }
```

具有一个本地依赖项和一个 git 依赖项的最小包清单示例：

```
[package]
name = "AName"
version = "0.0.0"
```

一个更准标的包清单示例，该示例还包括 Move 标准库，并将命名地址 `Std` 与其地址值 `0x1` 实例化：

```
[package]
name = "AName"
version = "0.0.0"
license = "Apache 2.0"

[addresses]
AddressToBeFilledIn = "_"
SpecifiedAddress = "0xB0B"

[dependencies]
# Local dependency
LocalDep = { local = "projects/move-awesomeness", addr_subst = { "Std" = "0x1" } }
# Git dependency
MoveStdlib = { git = "https://github.com/diem/diem.git", subdir="language/move-stdlib", rev = "56ab033cc403b489e891424a629e76f643d4fb6b" }

[dev-addresses] # For use when developing this module
AddressToBeFilledIn = "0x101010101"
```

包装清单中的大多数部分都是自我解释的，但是命名地址可能很难理解，因此值得更详细地检查它们。

## 汇编期间的命名地址

回想一下 Move 的命名地址，该命名地址不能直接在 Move 中声明。
因此，到目前为止，命名地址及其值需要传递给命令行上的编译器。
使用 Move 的包系统，不再需要这样做，可以在包中声明命名地址，在作用域内实例化其他命名地址，并从 Move 的包系统清单文件中的其他包中重命名的地址。
让我们单独浏览这些内容：

### 声明

假设我们在 `example_pkg/sources/A.move` 中有一个 Move 模块，如下所示：

```move
module NamedAddr::A {
    public fun x(): address { @NamedAddr }
}
```


我们可以在 `example_pkg/move.toml` 中以两种不同的方式声明名为 `NamedAddr` 的命名地址。首先：

```
[package]
name = "ExamplePkg"
...
[addresses]
NamedAddr = "_"
```

声明 `NamedAddr` 为包 `ExamplePkg` 中的命名地址，并且此地址可以是任何有效的地址值。
因此，导入包可以选择 `NamedAddr` 的值为其想要的任何地址。
直观地，您可以将其视为通过 `NamedAddr` 的命名地址参数化包 `ExamplePkg`，然后可以通过导入包来对包进行实例化。

`NamedAddr` 也可以这样声明：

```
[package]
name = "ExamplePkg"
...
[addresses]
NamedAddr = "0xCAFE"
```

指定的地址恰好是 `0xCAFE`，无法更改。
这很有用，因此其他导入包可以使用此命名地址，而无需担心分配给其的确切值。

使用这两种不同的声明方法，有关命名地址的信息有两种方法可以在包装图中流动：

- 前者（“未分配命名地址”）允许命名地址值从导入位置流到声明位置。
- 后者（“分配命名地址”）允许命名的地址值从包中的声明位置向上流到使用的位置。

借助这两种用于在整个包中流动的命名地址信息的方法，围绕范围和重命名的规则变得很重要。

## 命名地址的作用域和重命名

如果包 `P` 中的命名地址 `N` 在作用域内，则有以下内容：

1. 声明一个命名地址 `N`；或者
2. `P` 中的一个传递依赖项中的一个包声明了命名地址 `N`，并且在 `P` 和 `N` 声明的包之间有一个依赖关系路径，而没有 `N` 的重命名。

此外，包中的每个命名地址都会导出。
因此，可以将每个包视为带有一组命名地址的规则，这些地址将在导入软件包时将其带入作用域，
例如，如果导入了 `ExamplePkg` 包，则将 `NamedAddr` 命名地址引入作用域内。
因此，如果 `P` 导入两个包 `P1` 和 `P2`，则两者都声明了一个命名地址 `N`，一个问题是 `P`：在 `P` 中引用 `N` 时的 `N` 是指哪个？
来自 `P1` 还是 `P2`？为了防止围绕哪个命名地址来源的包的歧义，我们强制执行包装中所有依赖项引入的作用域的集合是不连接的，并提供了一种将其引入作用域的包的命名地址的方法。

在我们的 `P`，`P1` 和 `P2` 示例中，可以在导入时重命名命名地址：

```
[package]
name = "P"
...
[dependencies]
P1 = { local = "some_path_to_P1", addr_subst = { "P1N" = "N" } }
P2 = { local = "some_path_to_P2"  }
```

随着该重命名的 `N` 是指向 `P2` 和 `P1N` 的 `N`，将指出来自 `P1` 的 `N`：

```
module N::A {
    public fun x(): address { @P1N }
}
```

It is important to note that _renaming is not local_: once a named address `N`
has been renamed to `N2` in a package `P` all packages that import `P` will not
see `N` but only `N2` unless `N` is reintroduced from outside of `P`. This is
why rule (2) in the scoping rules at the start of this section specifies a
"dependency path in the package graph between between `P` and the declaring
package of `N` with no renaming of `N`."

需要特别注意，重命名不是本地的：一旦命名地址 `N` 在包 `P` 中被重命名为了 `N2`，
`N` 对于所有导入的包来说都是不可见的，除非包 `P` 从外部重新导入。
这就是为什么规则（2）在本节开始时的作用域规则中，指定 `P` 和 `N` 声明时没有重命名 `N`。

### 实例化

只要始终具有相同的值，命名地址可以在整个包中进行多次实例化。
如果相同的命名地址（无论如何重命名）是在包上具有不同值的不同值，这会视为错误。

只有当所有命名地址都解析为一个值时，才能汇总 Move 包。
如果包希望公开一个未实现的命名地址，则会提出问题。
这就是 `[dev-addresses]` 部分解决的问题。
本节可以为命名地址设置值，但不能引入任何命名地址。
另外，在 `dev` 模式下仅包含根包中的 `[dev-addresses]`。
例如，带有以下清单的根包不会在 `dev` 模式之外编译，因为 `NamedAddr` 是不可避免的：

```
[package]
name = "ExamplePkg"
...
[addresses]
NamedAddr = "_"

[dev-addresses]
NamedAddr = "0xC0FFEE"
```

## 用法，工件和数据结构

Move 包系统带有命令行选项，作为 Move 客户端的一部分：`move package <package_flags> <command> <command_flags>`。
除非提供特定的路径，否则所有包命令将在当前工作目录中运行。
可以通过运行 `move package --help` 找到 Move 包 CLI 的命令和选项的完整列表。

### Usage

可以通过 Move CLI 命令或用函数 `compile_package` 在 Rust 中编译软件包。
这将创建一个 `CompiledPackage`，该包装在内存中包含编译字节码以及其他编译工件（源代码映射，文档，ABI）。
可以将此编译的包转换为 `OnDiskPackage`，反之亦然 —— 下面列出文件系统中的 `CompiledPackage` 的数据：

```
a_move_package
├── Move.toml
...
└── build
    ├── <dep_pkg_name>
    │   ├── BuildInfo.yaml
    │   ├── bytecode_modules
    │   │   └── *.mv
    │   ├── source_maps
    │   │   └── *.mvsm
    │   ├── bytecode_scripts
    │   │   └── *.mv
    │   ├── abis
    │   │   ├── *.abi
    │   │   └── <module_name>/*.abi
    │   └── sources
    │       └── *.move
    ...
    └── <dep_pkg_name>
        ├── BuildInfo.yaml
        ...
        └── sources
```

有关这些数据结构是如何在 Move 的包管理系统运作的，更多信息请参见 `move-package`。
