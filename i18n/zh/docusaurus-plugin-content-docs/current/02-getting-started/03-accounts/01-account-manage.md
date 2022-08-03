# 账号管理

Starcoin 节点内置了一个去中心化的钱包，用户可以通过账号相关的接口以及命令来管理自己的账户。

节点启动的时候，会自动创建一个默认账户，默认密码为空。
默认账户可以通过账户相关的命令进行变更。
以下命令需要连接到控制台进行操作，连接方式请参看[如何与 Starcoin 控制台交互](../02-setup/02-starcoin-console.md)。

 1. 创建账户

```bash
starcoin% account create -p <MY-PASSWORD>
{
  "ok": {
    "address": "0xf096a2a61d3042774187a462a5394537",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x96734ea5015c3e1901b1af3e9c16f42df074c92749988d0563be3f5df65c2da6",
    "receipt_identifier": "stc1p7zt29fsaxpp8wsv853322w29xu02slxc"
  }
}
```

2. 查看账户

```bash
starcoin% account show 0xf096a2a61d3042774187a462a5394537
{
  "ok": {
    "account": {
      "address": "0xf096a2a61d3042774187a462a5394537",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x96734ea5015c3e1901b1af3e9c16f42df074c92749988d0563be3f5df65c2da6",
      "receipt_identifier": "stc1p7zt29fsaxpp8wsv853322w29xu02slxc"
    },
    "auth_key": "0x4c9c5a86f958a1a02286e46807df916ff096a2a61d3042774187a462a5394537",
    "balances": {},
    "sequence_number": null
  }
}
```

- `address` 是账户地址。
- `is_default` 表示是否为默认账号。很多命令如果需要账号参数，但用户没有传递，则会使用默认账号。如果节点开启了挖矿客户端，也会使用默认账号进行挖矿。
- `is_readonly` 表示是否为只读账号，只读账号的私钥并不托管在节点钱包中。
- `public_key` 是账户地址对应的公钥。
- `receipt_identifier` 是收款人识别码。
- `auth_key` 是认证秘钥，最后是需要写到链上去的。

> 注意，创建账户只是在 Starcoin 节点里创建一对密钥，并不会更新链的状态，所以 `balance` 和 `sequence_number` 此时还是空的。以上信息都属于公开信息，只有私钥是需要用户保密的。

3. 查看账户列表

```bash
starcoin% account list
```

这个命令会列出当前节点上的所有账户。

如果在本地的 `dev` 网络使用这个命令，那么在列出的账户列表中可以看到如下账户的信息：

```bash
    {
      "address": "0x0000000000000000000000000a550c18",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0xb9c6ee1630ef3e711144a648db06bbb2284f7274cfbee53ffcee503cc1a49200aef3f4a4b8eca1dfc343361bf8e436bd42de9259c04b8314eb8e2054dd6e82ab01",
      "receipt_identifier": "stc1pqqqqqqqqqqqqqqqqqqqq54gvrqzaqnvx"
    },
```

`0x0000000000000000000000000a550c18` 这个账户地址是 Starcoin 基金会的地址，同时也是内置在 `dev` 网络的水龙头地址。

4. 查看或者变更默认账号

查看默认账号地址：

```bash
starcoin% account default
```

将 `0xf096a2a61d3042774187a462a5394537` 设置位默认地址：

```bash
starcoin% account default 0xf096a2a61d3042774187a462a5394537
```

5. 导出导入账号

为了避免磁盘损坏等原因导致自己的资产损失，备份自己的私钥非常重要。

执行以下命令：

```bash
starcoin% account export 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD>
```

即可导出 `0xf096a2a61d3042774187a462a5394537` 的私钥。

执行以下命令：

```bash
starcoin% account import -i <PRIVATE-KEY> -p <MY-PASSWORD> 0xf096a2a61d3042774187a462a5394537
```

即可导入 `0xf096a2a61d3042774187a462a5394537` 账号。这个命令也可以用于将账号导入到不同的节点上，用来做节点迁移。

6. 导入只读账号

如果不想把私钥托管在节点钱包中，只是想查看该账号，或者将该账号作为挖矿账号，可以通过公钥导入只读账号：

```bash
starcoin% account import-readonly -i <PUBLIC-KEY>
```

然后将该账号设置为默认账号。

7. 删除账号

```bash
starcoin% account remove 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD>
```

如果是只读账号，无需传递 `-p` 选项。删除账号只是将账号从节点钱包中删除，并不影响该账号在链上的状态。


8. 锁定与解锁账号

- 锁定

```shell
starcoin% account lock 0xf096a2a61d3042774187a462a5394537
```

- 解锁

`-d` 选项可以指定账户保持解锁的时间（单位为秒），默认值为 `300` 秒。

```shell
starcoin% account unlock 0xf096a2a61d3042774187a462a5394537 -p <MY-PASSWORD> -d 300
```
