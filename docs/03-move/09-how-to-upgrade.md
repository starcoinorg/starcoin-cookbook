# How to upgrade Move Module

TODO

1. Introduce the Compatibility requirement
2. Introduce upgrade strategy
3. Suggestion to keep Compatibility and How to force upgrade
4. Hot to delegate UpgradeCapability to DAO
3. Give an example for upgrade module

## FAQ

1. [Can third-party contract incompatible upgrade be implemented without Dao?](https://discord.com/channels/822159062475997194/892760287797714954/905361928652722177)

    > Incompatible upgrades can be achieved through a two-stage commit upgrade, but the current command line does not yet support direct two-stage upgrades.

2. [What if `BACKWARD_INCOMPATIBLE_MODULE_UPDATE` error occurs when redeploying tokenswap?](https://discord.com/channels/822159062475997194/892760287797714954/908657602811006996)

    > Error due to incompatibility between front and back，add the `--ignore-breaking-changes` parameter and rerun.

3. [Is there a way to force deploy module?](https://discord.com/channels/822159062475997194/892760287797714954/909277467032830012)

    > Without considering compatibility, the deploy module can be submitted in two phases.