# Starcoin Move 框架

Starcoin Move 框架提供了可用于访问 Starcoin 区块链或与其交互的模块。

## 构建和测试

设置开发环境：

```bash
$ git clone git@github.com:starcoinorg/starcoin-framework.git
$ bash scripts/dev_setup.sh -t -y
```

构建：

```shell
$ mpm package build
```

运行单元测试：

```shell
$ mpm package test
```

运行 move prove：

```shell
$ mpm package prove
```

运行集成测试：

```shell
$ mpm integration-test
```

:::note

这篇文档需要被改进。

* 介绍有关 Starcoin Move Framework 的更多信息

:::
