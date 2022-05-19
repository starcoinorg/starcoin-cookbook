# Setting up Move develop environment

## Installation

1. Run [`dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)(automated installation script) of starcoin-framework, which contains the move prover environment setup
```
curl -s https://raw.githubusercontent.com/starcoinorg/starcoin-framework/main/scripts/dev_setup.sh | bash /dev/stdin -b -t
```

2. Download from the release page of [starcoiorg/starcoin](https://github.com/starcoinorg/starcoin).

3.
```
$ git clone https://github.com/starcoinorg/starcoin.git
$ cargo install --path starcoin/vm/move-package-manager
```

4.
```
$ cargo install --git https://github.com/starcoinorg/starcoin move-package-manager --bin mpm
```

This will install the `mpm` binary in your Cargo binary directory. On macOS and Linux this is usually *~/.cargo/bin*. You'll want to make sure this location is in your `PATH` environment variable.

Now you should be able to run the `mpm`:
```
$ mpm
move-package-manager 1.11.7-rc
Starcoin Core Dev <dev@starcoin.org>
CLI frontend for the Move compiler and VM

USAGE:
    mpm [OPTIONS] <SUBCOMMAND>
  ...
```


# Set up env for move prover.

1. Run [`dev_setup.sh`](https://github.com/starcoinorg/starcoin-framework/blob/main/scripts/dev_setup.sh)(automated installation script) of starcoin-framework
```
./scripts/dev_setup.sh -ypt
```

When the above command is executed, type `boogie /version` and if the output is similar to "Boogie program verifier version X.X.X", then the installation has been successful.

Note that currently Move Prover can only run under UNIX-based operating systems (e.g. Linux, macOS). Windows users can run it by installing WSL.

