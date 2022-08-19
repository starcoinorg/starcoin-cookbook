# StarcoinReact 最快速指南

**一小时带你从入门到进阶**

## 准备条件

如果你有编程经验就够了，如果你有 React，Rust，Move 经验会更好。编程是门实践的手艺，关键在行动。

## 第一步 - 基础

### 下载 starmask 钱包

https://starcoin.org/zh/individual/#wallets

现在钱包是进入区块链的钥匙，所以准备一个钱包是必须的。我们要使用 starcoin ，那么就要用 starcoin 的钱包。根据钱包向导，使用助记词进入钱包。然后切换网络到 barnard 测试网络。在测试网络下，我们可以免费的领取代币。

### 领取测试代币

https://faucet.starcoin.org/barnard

钱包下载好后，去这个地址领取测试币。领取后，大约 5 秒就会在钱包里显示领取到的 STC。现在可以在钱包里增加一个账户，然后在自己的两个账户上转一下帐。对区块链做一个感性认识。

## 第二步 - DApp 前端

我们先从前端开始，先用 JS 能够获取账户，余额，签名等。

*吐槽: 官网的展示的代码 https://starcoin.org/zh/developer/sdk/javascript/usersguide/gettingstarted/ 那个第 3 步，很明显没有存在的必要。如果检查有没有安装，看 window 下 有没有 starcoin 即可 `(window as any).starcoin`。检查没有安装后跳 Chrome App Store 就可以了，不明白这个包还有什么用。*

### 初始化项目

使用 JS 调用钱包基础功能


`yarn create react-app starcoin-dapp --template typescript `

因为 CRA 用的 webpack 5，webpack 5 移除了一些 polyfill，所以需要自己在想办法加入。`react-app-rewired` 提供了这个功能，具体可见仓库 `package.json`。

抄了会官方代码，感觉和 eth 十分像，所以对代码进行了修改。

1. 初始化 starcoinProvider

```js
// App.tsx
...
let starcoinProvider = new providers.Web3Provider(
    (window as any).starcoin,
    "any"
  );
  starcoinProvider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    console.log({ newNetwork, oldNetwork });
    if (oldNetwork) {
      console.log("reload");
      window.location.reload();
    }
  });
```

这个 starcoinProvider 其实就是对 `(window as any).starcoin` 包装，为方便写程序。

2. 用 `starcoinProvider` 获取钱包账户的公开信息：

```js
// App.tsx
...
  const onClickConnect = async () => {
    try {
      // const newAccounts = await (window as any).starcoin.request({
      //   method: "stc_requestAccounts",
      // });
      // console.log(newAccounts);
      // handleNewAccounts(newAccounts)
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      const result = await starcoinProvider.send("stc_requestAccounts", []);
      console.log(result);
      console.log(BigInt(10 ** 9));
      let balance = await starcoinProvider.getBalance(result[0]);
      if (balance)
        console.log(
          { balance },
          (BigInt(balance.valueOf()) / BigInt(10 ** 9)).toString()
        );
      const blockNumber = await starcoinProvider.getBlockNumber();
      console.log({ blockNumber });
    } catch (error) {
      console.error(error);
    }
  };
```

这样就获取了钱包的地址，和钱包的余额。

3. 使用 `starcoinProvider` 进行 msg 签名

现在很多 web3 网站都是用钱包签名的方式进行用户登陆，其使用到的主要就是 msg 签名签名功能。

```js
// App.tsx
...
  const personalSign = async () => {
    const exampleMessage = "Example `personal_sign` message 中文";
    try {
      // personalSignResult.innerHTML = ''
      // personalSignVerify.disabled = false
      // personalSignRecoverResult.innerHTML = ''
      const result = await starcoinProvider.send("stc_requestAccounts", []);
      const from = result[0];
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
      // console.log({ msg })
      // const networkId = networkDiv.innerHTML
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      const extraParams = { networkId: network.chainId };
      const sign = await (window as any).starcoin.request({
        method: "personal_sign",
        // params: [msg, from, 'Example password'],
        // extraParams = params[2] || {}; means it should be an object:
        // params: [msg, from, { pwd: 'Example password' }],
        params: [msg, from, extraParams],
      });
      console.log(sign);
      // personalSignResult.innerHTML = sign
    } catch (err) {
      console.error(err);
      // personalSign.innerHTML = `Error: ${ err.message }`
    }
  };
  ...
    const personalSignVerify = async () => {
    try {
      const accounts = await starcoinProvider.send("stc_requestAccounts", []);
      const from = accounts[0];
      const sign = "换成上面的签名结果";
      const recoveredAddr =
        await utils.signedMessage.recoverSignedMessageAddress(sign);
      console.log({ recoveredAddr, from });

      // if (recoveredAddr === from) {
      //   console.log(
      //     `@starcoin/starcoin Successfully verified signer as ${recoveredAddr}`
      //   );
      //   personalSignRecoverResult.innerHTML = recoveredAddr;
      // } else {
      //   console.log("@starcoin/starcoin Failed to verify signer");
      // }
    } catch (err) {
      console.error(err);
      // personalSignRecoverResult.innerHTML = `Error: ${err.message}`;
    }
  };
```

这些是钱包经常用到的基础功能。

## 第三步 - 合约通信

在 JS 端调用合约

### NFT

玩下当下最火的 NFT，先准备好 NFT 的描述信息

```js
...
const nft = { 
    name: "test_nft",
    imageUrl: "https://arweave.net/QeSUFwff9xDbl4SCXlOmEn0TuS4vPg11r2_ETPPu_nk",
    description: "test nft desc",
  }
...
```
图片地址可以是网络上任意一张可以访问到的地址。然后调取合约。这里选用官方的 SimpleNFT

```js
// App.tsx
  const mintWithImageUrl = async () => {
    // nftResult.innerHTML = 'Calling mintWithImage'
    // mintWithImage.disabled = true
    try {
      const network = await starcoinProvider.getNetwork();
      console.log(network);
      // const extraParams = { networkId: network.chainId };

      const functionId =
        "0x2c5bd5fb513108d4557107e09c51656c::SimpleNFTScripts::mint_with_image";
      const tyArgs: any[] = [];
      const args = [nft.name, nft.imageUrl, nft.description];

      const chainId = `${network.chainId}` as keyof typeof nodeUrlMap;
      if (!nodeUrlMap[chainId]) return;

      const nodeUrl = nodeUrlMap[chainId];
      console.log({ functionId, tyArgs, args, nodeUrl });

      const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
        functionId,
        tyArgs,
        args,
        nodeUrl
      );

      const payloadInHex = (function () {
        const se = new bcs.BcsSerializer();
        scriptFunction.serialize(se);
        return hexlify(se.getBytes());
      })();
      console.log({ payloadInHex });

      const txParams = {
        data: payloadInHex,
      };

      const transactionHash = await starcoinProvider
        .getSigner()
        .sendUncheckedTransaction(txParams);
      console.log({ transactionHash });
      // nftResult.innerHTML = 'Call mintWithImage Completed'
      // mintWithImage.disabled = false
    } catch (error) {
      // nftResult.innerHTML = 'Call mintWithImage Failed'
      // mintWithImage.disabled = false
      throw error;
    }
  };
```

稍后，你就可以在 starcoin 钱包里看到自己的 NFT 了。

如果你用 HTTP 获取过后端接口，那么这段代码就会感觉很熟悉。是的，调用合约就像调用接口一样。从某种程度上说它们是一样的，不过是后端是去中心化的了。

## 第四步 - 合约

首先连接 Barnard 测试网络。*很多跟着教程在本地开节点，这样只适合了解一些命令，要是玩还是要到测试网*。

```bash
> starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults console
```

RPC 地址可从 https://starcoinorg.github.io/starcoin-cookbook/zh/docs/getting-started/setup/test-network 获取。

然后创建账户，可以加 -p 参数设置密码

```bash
> starcoin% account create 

> starcoin% account list
{
  "ok": [
    {
        ...
```

账户好了之后可以去 https://faucet.starcoin.org/barnard 领一些测试币，发合约是需要的。

### 合约项目

先准备命令行工具。https://github.com/starcoinorg/starcoin/releases/tag/v1.11.13 在这里下载适合的命令行工具。

创建一个项目

```bash
> mpm package new starcoin-contract
```

把 counter 代码抄过来。https://starcoinorg.github.io/starcoin-cookbook/zh/docs/move/deploy-first-move-contract

构建

```bash
> mpm release
```

部署

```bash
> mpm deploy --rpc ws://barnard.seed.starcoin.org:9870 --local-account-dir  ~/.starcoin/barnard/account_vaults ~/HelloWorld/starcoin-contract/release/my_counter.v0.0.1.blob        
Use package address (0xb80660f71e0d5ac2b5d5c43f2246403f) as transaction sender
No password given, use empty String.
txn 0x1d9b69f5fe765897875689b52df7f4807ca663b073bfcea9a763c3948ebeddb4 submitted.
The deployment is successful.
```

这样就部署成功了。然后就可以和合约通信了。就像前面的 NFT 一样。

### 调合约

**写操作**

把下面的 functionId 换成你部署的合约。就可以愉快的玩耍了。

```js
// App.tsx
...
 const initCounterStruct = async () => {
    const accounts = await starcoinProvider.send("stc_requestAccounts", []);
    console.log(accounts);
    const network = await starcoinProvider.getNetwork();
    console.log(network);
    const chainId = `${network.chainId}` as keyof typeof nodeUrlMap;
    if (!nodeUrlMap[chainId]) return;
    const nodeUrl = nodeUrlMap[chainId];
    const token = "0x00000000000000000000000000000001::STC::STC";
    const functionId =
      "0xb80660f71e0d5ac2b5d5c43f2246403f::RockPaperScissorsV6::init_counter";
    const tyArgs: any[] = [token];
    const args: any = [];
    const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
      functionId,
      tyArgs,
      args,
      nodeUrl
    );

    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    console.log({ payloadInHex });

    const txParams = {
      data: payloadInHex,
    };

    const transactionHash = await starcoinProvider
      .getSigner()
      .sendUncheckedTransaction(txParams);
    console.log({ transactionHash });
  };
```

**读操作**

上面的调用是写入操作，再查询下看看效果：

```js
// App.tsx
...
  const getCounterStruct = async () => {
    const accounts = await starcoinProvider.send("stc_requestAccounts", []);
    console.log(accounts);
    const data = await starcoinProvider.getResource(
      accounts[0],
      `0xb80660f71e0d5ac2b5d5c43f2246403f::RockPaperScissorsV6::Counter`
    );
    console.log(data);
    const result = await (window as any).starcoin.request({
      method: "state.get_resource",
      params: [
        accounts[0],
        "0xb80660f71e0d5ac2b5d5c43f2246403f::RockPaperScissorsV6::Counter",
      ],
    });
    console.log(result);
    // const data = new bcs.BcsDeserializer(
    //   arrayify(result.raw)
    // ).de();
    const de = new bcs.BcsDeserializer(arrayify(result.raw));
    const name = de.deserializeStr();
    const value = de.deserializeU8();
    const timestamp = de.deserializeU64();
    const input = Number(timestamp);
    console.log(name, input);
    console.log({
      name: Buffer.from(name).toString(),
      value,
      timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
    });
  };
```

这段代码，我已经加了除 value 之外的其它字段。这里涉及到了 bsc 结构的解析。具体文档：https://starcoinorg.github.io/starcoin-cookbook/zh/docs/web3/understanding-resource-and-bcs/bcs/

这个解析是按照 **Move 那边定义的字段顺序来的**

```js
  const de = new bcs.BcsDeserializer(arrayify(result.raw));
  const name = de.deserializeStr();
  const value = de.deserializeU8();
  const timestamp = de.deserializeU64();
```

对应了

```rust
...
  struct Counter has key, store, drop {
      name: vector<u8>,
      value: u8,
      timestamp: u64,
      addr: address,
  }
...
```

这里 `Counter` 结构最后一个 addr 是 address。现在需要用 `const addr = AccountAddress.deserialize(de);` 解析，不过你学习的时候可能就已经有 `de.deserializeAccountAddress();` 方法了。


**删除**

删除就是要把 `Counter` 从用户账户下移除。这个操作是 web3.0 相比于 web2.0 最大的进步。就是除了用户自己可以删除，其他人都不能删除。如果合约让其他人也可以删除，那么这样的合约是没人玩的。这就像别人能随意拿走你的钱一样。

```rust
// Counter.move
...
  struct Counter has key, store, drop {
    name: vector<u8>,
    value: u8,
    timestamp: u64,
    addr: address,
  }
  ...
  public(script) fun remove_counter(account: signer) acquires Counter {
    move_from<Counter>(Signer::address_of(&account));
  }
...
```

删除在 Move 里是这样的。在 JS 中是和之前一样调用的。

```js
// Counter.tsx
...
  const removeCounter = useCallback(async () => {
    const functionId = `${ContractModule}::remove_counter`;
    const tyArgs: any[] = [];
    const args: any = [];

    await sendTx(functionId, tyArgs, args);
  }, [sendTx]);
...
```

到这里，你已经完成入门。是的，是入门。接下来用一个 SicBoGame 来展示下如何进阶。

## 第五步 - Game 进阶

SicBoGame 具体问题来自 https://github.com/starcoinorg/dapps/issues/9 。也就是因为做不到同时下注，所以需要合约隐藏先下注的信息。但区块链的信息都是公开的，如何隐藏呢？issues9 也给了方法，就是 sha3 处理，然后在合约里比较。很大的数字，是为了防止碰撞。在该示例代码中，我们就不用这个很大的数字了。

新建 SicBo.move 文件，定义 Bank 和 Game

```rust
 struct Bank<phantom T: store> has store, key {
    bank: Token::Token<T>
  }

  struct Game has key, store, drop {
      aliceSecret: vector<u8>,
      bobNum: u8,
      aliceNum: u8,
      timestamp: u64,
      amount: u128,
      campRaw: vector<u8>,
      camp: vector<u8>,
      aliceWin: bool,
      bobWin: bool
  }
```

`Token::Token<T>` 是不能被 `drop` 的，所以不能像这样
被 Game 持有
```rust
  struct Game has key, store, drop {
    aliceSecret: vector<u8>,
    bobNum: u8,
    aliceNum: u8,
    timestamp: u64,
    ..
    bank: Token::Token<T>
  }
```
这样会导致 Game 不能被删除，进而一个人只能开一局游戏。我们希望一个游戏结束后，还可以开始下一局的。

然后初始化 Back 这里和示例代码中的一样，不一样的是初始化 bank 的命令。

```rust
  /// @admin init bank
  public(script) fun init_bank<TokenType: store>(signer: signer, amount: u128) {
      let account = &signer;
      let signer_addr = Signer::address_of(account);

      assert!(signer_addr == @admin, 10003);
      assert!(! exists<Bank<TokenType>>(signer_addr), 10004);
      assert!(Account::balance<TokenType>(signer_addr) >= amount, 10005);

      let token = Account::withdraw<TokenType>(account, amount);
      move_to(account, Bank<TokenType>{
          bank: token
      });

      // move_to(account, BankEvent<TokenType>{
      //     check_event: Event::new_event_handle<CheckEvent>(account),
      // });
  }
```

因为我们设定了 admin 为合约所有者，所以这里我们要用命令行来初始化 bank。

使用 starcoin 命令行工具进入 console

```bash
$ starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults console
```

然后执行
```bash
starcoin% starcoin% account execute-function --function 0xb80660f71e0d5ac2b5d5c43f2246403f::SicBo::init_bank -t 0x00000000000000000000000000000001::STC::STC --arg 0u128 -b
```

**`--arg 0u128` 中 *`u128`* 很重要，因为我起初是使用的 `--arg 0` 得到参数错误。因为合约指定了 amount 是 u128，所以这里也需要 u128 后缀指明类型。**

如果命令返回 `account 0xb80660f71e0d5ac2b5d5c43f2246403f is locked` 说明账户是锁住的，需要解锁账户 `starcoin% account unlock`。然后再调用命令。得到 `txn 0x14bc2406c4967194fcb2b47a03a6404117bac24ebee6cf25d3c05b2fe7e65fd5 submitted.` 类似信息，就说明我们的部署已经被区块链采纳了。再等一会就会得到一大串执行后的返回。这时 bank 已经初始化好了，我们需要初始化 Game 了。

```rust
// SicBo.move
...
    public(script) fun init_game<TokenType: store>(alice: signer, aliceSecret: vector<u8>, amount: u128) acquires Bank {
        let account = &alice;

        // 把 alice 的额度质押给银行
        let token = Account::withdraw<TokenType>(account, amount);
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        Token::deposit<TokenType>(&mut bank.bank, token);

        // 初始化 Game
        move_to(account, Game {
            aliceSecret: aliceSecret,
            bobNum: 0,
            aliceNum: 0,
            timestamp: Timestamp::now_seconds(),
            amount: amount,
            campRaw: Vector::empty(),
            camp: Vector::empty(),
            aliceWin: false,
            bobWin: false,
        });
    }
```

初始化 Game 的参数是 alice 的加密信息和 alice 的下注额度。这里很多信息是我 debug 用的，**debug move 的更好方法是单元测试**。默认 alice 和 bob 的猜的数字是 0 。那么 0 就不应该被用作下注数字，可以是 1 ～ 10。

alice 初始化 game 后，由 bob 拿着 alice 的地址去参加 alice 的 game。

```rust
  public(script) fun bob_what<TokenType: store>(bob: signer, alice: address, bobNum: u8, amount: u128) acquires Game, Bank {
        let account = &bob;

        // 把 bob 的下注额质押给 bank
        let token = Account::withdraw<TokenType>(account, amount);
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        Token::deposit<TokenType>(&mut bank.bank, token);

        // game 记录下 bob 的数字
        let game = borrow_global_mut<Game>(alice);
        game.bobNum = bobNum;
        game.amount = game.amount + amount;
        // TODO 
        // game.bobAddr = account
    }

```

当 bob 下注完，再由 alice 解密他的下注。如果 alice 不如实解密他的下注，就直接判断 alice 输掉了。

```rust
...
    public(script) fun alice_what<TokenType: store>(alice: signer, aliceNum: u8) acquires Game {
        let account = &alice;
        // let token = Account::withdraw<TokenType>(account, amount);

        let game = borrow_global_mut<Game>(Signer::address_of(account));
        game.aliceNum = aliceNum;

        // check valid
        let tmpVec = Vector::empty();
        let tempCamp = Vector::empty();

        let addr = Signer::address_of(account);
        Vector::append(&mut tmpVec, BCS::to_bytes(&addr));
        Vector::append(&mut tmpVec, BCS::to_bytes(&aliceNum));
        
        Vector::append(&mut tempCamp, BCS::to_bytes(&addr));
        Vector::append(&mut tempCamp, BCS::to_bytes(&aliceNum));
        
        game.campRaw = tmpVec;
        let camp = Hash::sha3_256(tempCamp);
        game.camp = camp;
        

        if (&game.camp == &game.aliceSecret) {
            if (game.aliceNum > game.bobNum) {
              game.aliceWin = true;
              win_token(game.aliceAddr, game.amount);
            } else if (game.aliceNum < game.bobNum) {
              game.bobWin = true;  
              win_token(game.bobWin, game.amount);
            } else {
              // 平局，各自取回自己的注额
              game.aliceWin = true;
              game.bobWin = true;  
              win_token(game.bobWin, game.amount / 2);
              win_token(game.bobWin, game.amount / 2);
            }
        } else {
            game.bobWin = true;
            win_token(game.bobWin, game.amount);
        }

        // 结束 Game
        move_from<Game>(game.aliceAddr);
    }

    fun win_token<TokenType: store>(account: address, amount: u128) acquires Bank {
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        let token = Token::withdraw<TokenType>(&mut bank.bank, amount);
        Account::deposit<TokenType>(account, token);
    }
...
```

这样这个游戏的主体逻辑就完成了。其中记录了 Game 开始时间。可以再增加一些 check 函数：比如，如果 bob 没有按指定时间下注，那么 alice 就可以终止该局 Game，并拿回自己的注额。同样，如果 alice 没有按时去揭秘自己的下注，也可以裁定 alice 输了。

JS 如何写。见[仓库](https://github.com/Tonyce/starcoin-react-stepby)的 `SicBoGame.tsx`

## 第六步 - 测试用例

上面的游戏在 Debug 的过程中，用了一个比较“笨”的方法来 debug Move 合约的 sha3-256 结果。就是把 sha3-256 的结果存了下来，然后取来对比。其实这个验证用 unit-test (测试用例) 来做会更高效。接下来一个 demo 来展示如何使用测试用例来验证 Move sha3-256 结果。

为单纯的介绍测试用例，新建一个项目

```bash
$ mpm package new move_ut
```

修改  Move.toml ，加入 starcoin 的库。

```toml
...
[addresses]
StarcoinFramework = "0x1"
admin = "0xb80660f71e0d5ac2b5d5c43f2246403f"
SFC = "0x6ee3f577c8da207830c31e1f0abb4244"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
starcoin-framework-commons = { git = "https://github.com/starcoinorg/starcoin-framework-commons.git", rev = "e7f538175a5f50a97207692569b6631a87ee08cc" }
...
```

source 下新建一个 move 文件，随便什么名字。拷贝 https://diem.github.io/move/unit-testing.html 示例代码。

```move
#[test_only]
module admin::UTest {
    struct MyCoin has key { value: u64 }

    public fun make_sure_non_zero_coin(coin: MyCoin): MyCoin {
        assert!(coin.value > 0, 0);
        coin
    }

    public fun has_coin(addr: address): bool {
        exists<MyCoin>(addr)
    }

    #[test]
    fun make_sure_non_zero_coin_passes() {
        let coin = MyCoin { value: 1 };
        let MyCoin { value: _ } = make_sure_non_zero_coin(coin);
    }
}
```

然后执行 `mpm package test` 后会看到 test 的输出

```bash
❯ mpm package test   
BUILDING UnitTest
BUILDING StarcoinFramework
BUILDING starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
Test result: OK. Total tests: 1; passed: 1; failed: 0
```

这就证明测试用例成功运行。在这个模块中，我们添加了 `#[test_only]` 宏，这样这个 module 就不会被编译到 release 中。如果在这个示例项目中执行 `mpm release`，就会得到：

```bash
❯ mpm release
Packaging Modules:
Error: must at latest one module
```

这就说明了 `test_only` module 没有被编译到 release 中。

我们想验证的是 sha3-256 的结果，所以修改 move 代码为

```move
#[test_only]
module admin::UTest {

    use StarcoinFramework::Debug;
    use StarcoinFramework::Vector;
    use StarcoinFramework::Hash;

    struct MyCoin has key { value: u64 }

    public fun make_sure_non_zero_coin(coin: MyCoin): MyCoin {
        assert!(coin.value > 0, 0);
        coin
    }

    public fun has_coin(addr: address): bool {
        exists<MyCoin>(addr)
    }

    #[test]
    fun make_sure_non_zero_coin_passes() {
        let coin = MyCoin { value: 1 };
        let MyCoin { value: _ } = make_sure_non_zero_coin(coin);
    }

    #[test]
    fun test_hash_result() {
        let tempCamp = Vector::empty();
        Vector::append(&mut tempCamp, b"hello world");
        let camp = Hash::sha3_256(tempCamp);
        Debug::print(&camp);
    }

}
```

新加了一个 test 函数 `test_hash_result`，这个函数就做一件事：sha3-256("hello world")。先 Debug 打印下看看结果

❯ mpm package test 
CACHED UnitTest
CACHED StarcoinFramework
CACHED starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
[debug] (&) [100, 75, 204, 126, 86, 67, 115, 4, 9, 153, 170, 200, 158, 118, 34, 243, 202, 113, 251, 161, 217, 114, 253, 148, 163, 28, 59, 251, 242, 78, 57, 56]
[ PASS    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::test_hash_result
Test result: OK. Total tests: 2; passed: 2; failed: 0

这是我执行 JS 的结果，可以肉眼看出是一样的。

```bash
❯ node sha3test.js 
{
  type: 'Buffer',
  data: [
    100,  75, 204, 126,  86,  67, 115,   4,
      9, 153, 170, 200, 158, 118,  34, 243,
    202, 113, 251, 161, 217, 114, 253, 148,
    163,  28,  59, 251, 242,  78,  57,  56
  ]
}
```

但这样是不够的，需要 assert 结果是和 JS 的结果一样的。修改 `test_hash_result` 为

```move
...
    #[test]
    fun test_hash_result() {
        let expect_vec = vector[
            100,  75, 204, 126,  86,  67, 115,   4,
            9, 153, 170, 200, 158, 118,  34, 243,
            202, 113, 251, 161, 217, 114, 253, 148,
            163,  28,  59, 251, 242,  78,  57,  56
        ];
        let temp_camp = Vector::empty();
        Vector::append(&mut temp_camp, b"hello world");
        let camp = Hash::sha3_256(temp_camp);
        Debug::print(&camp);
        assert!(&camp == &expect_vec, 1);
    }
```

然后再执行

```bash
❯ mpm package test  
CACHED UnitTest
CACHED StarcoinFramework
CACHED starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
[debug] (&) [100, 75, 204, 126, 86, 67, 115, 4, 9, 153, 170, 200, 158, 118, 34, 243, 202, 113, 251, 161, 217, 114, 253, 148, 163, 28, 59, 251, 242, 78, 57, 56]
[ PASS    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::test_hash_result
Test result: OK. Total tests: 2; passed: 2; failed: 0
```

可以看到，是没有问题的。如果怀疑 assert，可以修改 `expect_vec` 中的一个数据，再 `mpm package test`  一下。然后就会发现：

```bash
..
[debug] (&) [100, 75, 204, 126, 86, 67, 115, 4, 9, 153, 170, 200, 158, 118, 34, 243, 202, 113, 251, 161, 217, 114, 253, 148, 163, 28, 59, 251, 242, 78, 57, 56]
[ FAIL    ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::test_hash_result

Test failures:

Failures in 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest:

┌── test_hash_result ──────
│ error[E11001]: test failure
│    ┌─ ./sources/ut.move:41:9
│    │
│ 30 │     fun test_hash_result() {
│    │         ---------------- In this function in 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest
│    ·
│ 41 │         assert!(&camp == &expect_vec, 1);
│    │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Test was not expected to abort but it aborted with 1 here
│ 
│ 
└──────────────────

Test result: FAILED. Total tests: 2; passed: 1; failed: 1
```

测试用例没有通过。完美。

测试用例不但可以保证程序质量，还能大大的提高效率。

## 再精进计划

1. cookbook 作为手册，遇到问题去看看。
2. move 合约常用方法。
3. 。。。


