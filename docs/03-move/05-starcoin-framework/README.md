# Starcoin Move Framework

The Starcoin Move framework provides modules that can be used to access or interact with Starcoin blockchain.

## Build and Test

Setup dev environment:

```bash
git clone git@github.com:starcoinorg/starcoin-framework.git
bash scripts/dev_setup.sh -t -y
```

Build:

```shell
mpm package build
```

Run unit test:

```shell
mpm package test
```

Run move prove

```shell
mpm package prove
```

Run integration test:

```shell
mpm integration-test
```

:::note

This document needs to be improved.

* Introduce more information about Starcoin Move Framework

:::
