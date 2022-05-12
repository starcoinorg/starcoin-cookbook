# Building Starcoin from source

## Quick start

1. Clone the source code to local

```shell
git clone https://github.com/starcoinorg/starcoin.git
cd starcoin
```

2. Setup build environment

```shell
./scripts/dev_setup.sh
```

3. Buid with Cargo

Note: Two versions (debug, release) of build methods are provided here, the debug version is used in the development environment, and the release version is used in the production environment.

If you want to use it formally, use the release version, there is an order of magnitude difference in performance between the debug version and the release version.

(1) Build the debug version

```shell
cargo build
```

(2) Build the release version

```shell
cargo build --release
```

4. Target file

After compiling, you can find the corresponding starcoin program in the target directory.

- The debug version is in the `target/debug/starcoin` directory
- The release version is in the `target/release/starcoin` directoryg

## Troublehooting

### WSL

#### Q1:

Compiling with WSL2 may give the following error message:

```shell
error: linking with `cc` failed: exit status: 1
```

This is because the swap memory of WSL2 is not set, or is less than the maximum memory of WSL2.

**Solution:**

- Open Windows Explorer, type `%UserProfile%` in the address bar and hit enter.
- Create a file in this directory named `.wslconfig`
- An example of the written content is as follows: (according to the actual allocation of your computer, make sure that swap is greater than or equal to memory)
    ```config
    [wsl2]
    memory=2GB
    swap=4GB
    ```
- Execute `wsl --shutdown` in cmd to close WSL2, and then reopen it.

#### Q2:

**Why do I compile for so long?**

This situation usually occurs on users with low computer configuration. Here are two feasible suggestions:

1. Upgrade computer configuration.

2. Controls the number of jobs Cargo compiles with.

For low-profile machines, controlling the number of cores is the key to greatly improving compilation efficiency.

For example:

```shell
cargo build -j 1
```

For specific test cases, see the discussion in [[bug] Excessive swap may result in slower builds #70](https://github.com/starcoinorg/starcoin-cookbook/issues/70).

### CentOS

If your operating system is `CentOS 6.x`, then use such commands to install some toolsets.

```shell
yum install centos-release-scl
yum install devtoolset-7
. /opt/rh/devtoolset-7/enable
```

### Common troubleshooting

#### Q1:

The following error message appears when compiling with Cargo:

```shell
error: linker cc not found | = note: No such file or directory (os error 2)
```

This is because Cargo cannot find the `cc` compiler program (linker) to compile the given application.

Since Rust does not yet include its own linker, usually we need to install a C compiler, such as: compilation tools such as `gcc` and `cmake`.

**Solution:**

- To install gcc on Ubuntu, simply run, `build-essential` contains the basic toolset needed to compile and develop:

```shell
sudo apt install build-essential
```

- To install Cmake on Arch Linux, enable the `[Extra]` repository and run:

```shell
sudo pacman -S gcc cmake
```

- On Fedora, RHEL, CentOS:

```shell
sudo dnf install gcc cmake
```

#### Q2:

- If the error message `Could not find directory of OpenSSL installation` appears, you need to install the OpenSSL library.
- If the error ```Unable to find libclang: "the `libclang` shared library at /usr/lib64/clang-private/libclang.so.6.0"``` appears, it may be the cause of `llvm-private`. The solution is to uninstall it:
    ```shell
    rpm qa | grep "llvm-private" # Find packages containing llvm-private
    rpm -e --nodeps llvm-private-6.0.1-2.el7.x86_64 # Uninstall found packages
    ```
- After each compilation error, after solving, you need to `cargo clean`, remove the previously compiled object files, and then recompile.

