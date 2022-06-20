# Setting up Move develop environment

## Install mpm
Move Package Manager(mpm) is a command line tool to develop move projects, like Cargo for Rust, or NPM for NodeJS.

### Install using the convenience script
1. Run [`scripts/dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)(automated installation script) of starcoin-framework, which contains mpm, Rust, PATH config and the move prover environment setup.
```
curl -s https://raw.githubusercontent.com/starcoinorg/starcoin-framework/main/scripts/dev_setup.sh | bash /dev/stdin -b -t
```

The command above will install mpm and Rust to default location. It also set the PATH env. Check more arguments in shell script.

### Install from binary
Download `mpm-[your_os]-latest.zip` from the release page of [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin), unarchive it and add it to PATH env.

### Install from source

From local source code
```
$ git clone https://github.com/starcoinorg/starcoin.git
$ cd starcoin
$ cargo install --path vm/move-package-manager
```

Or from remote git repo
```
$ cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

This will install the `mpm` binary in your Cargo binary directory. On macOS and Linux this is usually *~/.cargo/bin/*. You'll want to make sure this location is in your `PATH` environment variable.

### Summary
Now you should be able to run the `mpm`:
```
$ mpm
move-package-manager 1.11.11
Starcoin Core Dev <dev@starcoin.org>
CLI frontend for the Move compiler and VM

USAGE:
    mpm [OPTIONS] <SUBCOMMAND>
  ...
```

## Install IDE plugin

### VS Code
Search `starcoin-ide` in Extensions.

## Set up env for move prover

1. Run [`dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)(automated installation script) of starcoin-framework
```
./scripts/dev_setup.sh -ypt
```

When the above command is executed, type `boogie /version` and if the output is similar to "Boogie program verifier version X.X.X", then the installation has been successful.

Note that currently Move Prover can only run under UNIX-based operating systems (e.g. Linux, macOS). Windows users can run it by installing WSL.
