# 帐户

管理每个帐户的帐户资源模块

## [Resource `Account`](https://github.com/starcoinorg/starcoin-framework/blob/main/build/StarcoinFramework/docs/Account.md#resource-account)

每个帐户都有一个 Account::Account 资源

```
struct Account has key
```

## [Resource `Balance`](https://github.com/starcoinorg/starcoin-framework/blob/main/build/StarcoinFramework/docs/Account.md#resource-balance)

持有该账户中存储的代币的资源
```
struct Balance<TokenType> has key
```

## [`0x1::AccountScripts` 模块](https://github.com/starcoinorg/starcoin-framework/blob/main/build/StarcoinFramework/docs/AccountScripts.md#module-0x1accountscripts)

- [Function `enable_auto_accept_token`](https://github.com/starcoinorg/starcoin-framework/blob/main/build/StarcoinFramework/docs/AccountScripts.md#function-enable_auto_accept_token)
- [Function `disable_auto_accept_token`](https://github.com/starcoinorg/starcoin-framework/blob/main/build/StarcoinFramework/docs/AccountScripts.md#function-disable_auto_accept_token)
```
use 0x1::Account;
```


:::note
介绍有关 Account 模块的更多信息
:::