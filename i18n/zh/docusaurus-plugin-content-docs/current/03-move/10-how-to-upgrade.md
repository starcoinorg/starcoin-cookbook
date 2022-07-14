# How to upgrade Move Module

TODO

1. Introduce the Compatibility requirement
2. Introduce upgrade strategy
3. Suggestion to keep Compatibility and How to force upgrade
4. Hot to delegate UpgradeCapability to DAO
3. Give an example for upgrade module


## FAQ

1. [如果不通过 DAO 是否可以实现第三方合约不兼容升级？](https://discord.com/channels/822159062475997194/892760287797714954/905361928652722177)

    > 通过两阶段提交升级就可以实现不兼容升级，但当前的命令行还不支持直接两阶段升级。

2. [重新部署 tokenswap 出现 `BACKWARD_INCOMPATIBLE_MODULE_UPDATE` 报错怎么办？](https://discord.com/channels/822159062475997194/892760287797714954/908657602811006996)

    > 前后两次不兼容导致的报错，根据提示需加上 `--ignore-breaking-changes` 参数重新运行。

3. [有没有强制 deploy module 的方法？](https://discord.com/channels/822159062475997194/892760287797714954/909277467032830012)

    > 在不考虑兼容性的前提下，通过两阶段提交 deploy module 即可。