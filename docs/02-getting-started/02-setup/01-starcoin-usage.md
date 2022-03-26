# How to use starcoin CLI

`starcoin` is used to start a local network or join a starcoin network. Running a local network or join test network makes it easier to test and debug your code changes. You can use the CLI command dev to compile, publish, and execute Move programs on your local network or test network. 

<!--more-->

## Usage

`starcoin` [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
- --disable-file-log Disable std error log output
- --disable-seed Disable seed for seed node


OPTIONS:
- --seed config seed node address manually
- -n, --net network name, it should be one of dev/halley/proxima/barnard/main

SUBCOMMAND:
- console Run node background, after node started, start cli console
- help  Prints this message or the help of the given subcommand(s)



