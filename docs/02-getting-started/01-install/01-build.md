# Build from Source

Build starcoin from the source.


### Clone source code

```shell
git clone https://github.com/starcoinorg/starcoin.git
cd starcoin
```

### Setup build environment

```shell
./scripts/dev_setup.sh
```

If your operating system is CentOS 6.x , then use such commands to install some toolset.
    
```shell
yum install centos-release-scl
yum install devtoolset-7
. /opt/rh/devtoolset-7/enable
```

### Run debug build

```shell
cargo build
```
    
### Run release build

```shell
cargo build --release
```
   
The debug version starcoin at target/debug/starcoin and the release version at target/release/starcoin.

:::note

This document needs to be improved.

* Add more troubleshooting notes

:::
