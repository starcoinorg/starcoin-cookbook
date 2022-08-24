# 节点激励计划

节点激励计划，旨在帮助大家迈出第一步，尝试跟着文档轻松启动一个节点，后续也可以由此展开自己的 Move 智能合约开发之旅。

# 如何创建 Starcoin 节点

在新手入门[配置节点并加入网络](https://starcoinorg.github.io/starcoin-cookbook/zh/docs/getting-started/setup/)一章有详细的说明。
其中比较耗时的一个步骤是区块同步，可以使用代码目录 `script` 下的 *import_snapshot.sh* 脚本导入快照来操作，会更快。

# 如何参与激励计划

启动节点的时候指定节点名（node name），把自己的钱包地址填上去，这样节点就和自己的钱包关联上了，参与后续的激励活动，奖励的 STC 会打到刚刚所填的地址上。（所以私钥一定要备份哦！）

比如我们可以用如下命令加入 Barnard 测试网：

```
starcoin -n barnard --node-name 钱包地址

-n 指定网络
--node-name 指定节点名字，这里我们用这个参数来指定自己的钱包地址
```

指定之后，如果想确认操作有没有成功，我们可以连接远程节点，然后在 `console` 里执行 `node peers`，通过节点 `peer_id`，找到自己的节点，就可以看到在 `version_string` 字段里，包含我们刚刚指定的钱包地址了。

```
starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults  console
```

然后我们打开[节点激励的前端页面](http://ac39c62b4d6d745be9d279c39b108caf-1186135409.ap-northeast-1.elb.amazonaws.com:3000/)，点击连接钱包，就可以看到自己的钱包地址以及和在上一步和这个地址关联起来的节点。

## 激励规则

- 连续运行至少一个星期，满足一个星期内至少 80% 的在线时长
- 一般按在线时长 claim 奖励
- 注意以上说的是一般情况，但通常不同的激励活动会有稍微不同的规则，具体规则需要以通告为准
