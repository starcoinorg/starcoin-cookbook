# StarcoinReact Fastest Guild

**Take you from entry to advanced in one hour**

## Prepared

If you have programming experience is enough, if you have React, Rust, Move experience will be better. Programming is a hands-on craft, the key is action.

## Step 1 - The Basic

### Download starmask-wallet

https://starcoin.org/en/individual/#wallets

Now the wallet is the key to enter the blockchain, so preparing a wallet is a must. We want to use starcoin, then we need to use starcoin wallet. According to the wallet wizard, use the mnemonic to enter the wallet. Then switch the network to the barnard test network. Under the test network, we can receive tokens for free.

### Get test tokens

https://faucet.starcoin.org/barnard

After the wallet is downloaded, go to this address to receive test coins. After receiving, the received STC will be displayed in the wallet in about 5 seconds. Now you can add an account to your wallet and transfer money between your two accounts. Make a perceptual understanding of the blockchain.

## Step 2 - The FrontEnd of Dapp

Let's start with the front end, and use JS to get accounts, balances, signatures, etc.

### Init Project

Use JS to call wallet basic functions

`yarn create react-app starcoin-dapp --template typescript `

Will CRA with webpack 5 build in now，some polyfill have removed from webpack 5 ，so we need inject with `react-app-rewired` ， Specific visible warehouse in `package.json`。

After copying the official code, it feels very similar to eth, so the code has been modified.

1. init starcoinProvider

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

This starcoinProvider is actually a wrapper for `(window as any).starcoin`, for the convenience of writing programs.

2. Use `starcoinProvider` to get the public information of the wallet account:

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

In this way, the address of the wallet and the balance of the wallet are obtained.

3. msg signing using `starcoinProvider`

Nowadays, many web3 websites use wallet signatures to log in users, and they mainly use the msg signature signature function.

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

These are the basic functions that wallets often use.

## Step 3 - communication with contract

call contract use javascript.

### NFT

To play the hottest NFT at the moment, prepare the description information of the NFT first

```js
...
const nft = { 
    name: "test_nft",
    imageUrl: "https://arweave.net/QeSUFwff9xDbl4SCXlOmEn0TuS4vPg11r2_ETPPu_nk",
    description: "test nft desc",
  }
...
```

The image address can be any address that can be accessed on the network. Then call the contract. Here is the official SimpleNFT

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

Later, you will be able to see your NFT in your starcoin wallet.

If you've used HTTP to get backend interfaces, this code will feel familiar. Yes, calling a contract is like calling an interface. In a way they are the same, but the backend is decentralized.

## Step 4 - The Move Contract

First connect to the Barnard test network. *Many follow the tutorial to open the node locally, which is only suitable for understanding some commands. If you want to play, you still have to go to the test network*.

```bash
> starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults console
```

more about RPC info can be found here： https://starcoinorg.github.io/starcoin-cookbook/docs/getting-started/setup/test-network/

Then create an account, you can add the -p parameter to set the password.

```bash
> starcoin% account create 

> starcoin% account list
{
  "ok": [
    {
        ...
```

After the account is complete, you can go to https://faucet.starcoin.org/barnard to receive some test coins, which is required for deploy contracts.

### Move Contract Project

Prepare the command line tools first. https://github.com/starcoinorg/starcoin/releases/tag/v1.11.13 Download the appropriate command line tool here.

create new move project

```bash
> mpm package new starcoin-contract
```

you can copy the counter demo code here: https://starcoinorg.github.io/starcoin-cookbook/docs/move/deploy-first-move-contract/

build the project

```bash
> mpm release
```


deploy the project

```bash
> mpm deploy --rpc ws://barnard.seed.starcoin.org:9870 --local-account-dir  ~/.starcoin/barnard/account_vaults ~/HelloWorld/starcoin-contract/release/my_counter.v0.0.1.blob        
Use package address (0xb80660f71e0d5ac2b5d5c43f2246403f) as transaction sender
No password given, use empty String.
txn 0x1d9b69f5fe765897875689b52df7f4807ca663b073bfcea9a763c3948ebeddb4 submitted.
The deployment is successful.
```

This makes the deployment successful. Then you can communicate with the contract. Just like the previous NFT.

### Call Contract

**Write the contract**

Replace the functionId below with your deployed contract. You can have fun.

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

**Read the contract**

The above call is a write operation, and then query to see the effect:


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

In this code, I have added other fields except value. This involves parsing the bsc structure. specific documentation: https://starcoinorg.github.io/starcoin-cookbook/docs/web3/understanding-resource-and-bcs/bcs/

This parsing is in the order of the fields defined by **Move**

```js
  const de = new bcs.BcsDeserializer(arrayify(result.raw));
  const name = de.deserializeStr();
  const value = de.deserializeU8();
  const timestamp = de.deserializeU64();
```

with

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

Here the last addr of the `Counter` structure is address. Now it needs to be resolved with `const addr = AccountAddress.deserialize(de);`, but you may already have the `de.deserializeAccountAddress();` method when you are learning.

**Delete from contract**

To delete is to remove `Counter` from the user account. This operation is the biggest improvement of web3.0 compared to web2.0. That is, no one can delete it except the user himself. If the contract allows other people to delete it, then such a contract is not played. It's like someone else can take your money at will.

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

Deletion is like above in Move. In JS it is called the same as before.

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

At this point, you have finished getting started. Yes, it's getting started. Next, use a SicBoGame to show how to advance.

## Step 5 - Game Advanced
The specific issue of SicBoGame comes from https://github.com/starcoinorg/dapps/issues/9 . That is, because it is impossible to bet at the same time, the contract needs to hide the information of the first bet. But the information of the blockchain is public, how to hide it? Issues9 also gives a method, that is, sha3 processing, and then compare in the contract. Large numbers, to prevent collisions. In this example code, we don't use this large number.

Create a new SicBo.move file, define Bank and Game

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

`Token::Token<T>` cannot be `drop`, so it cannot be held by Game like this

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

In this way, the Game cannot be deleted, and one person can only play one game. We hope that after a game is over, the next game can be started.

Then initialize Back This is the same as in the sample code, the difference is the command to initialize the bank.

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

Since we set admin as the contract owner, here we use the command line to initialize the bank.

Use the starcoin command line tool to enter the console

```bash
$ starcoin --connect ws://barnard.seed.starcoin.org:9870 --local-account-dir ~/.starcoin/barnard/account_vaults console
```

and then exec

```bash
starcoin% starcoin% account execute-function --function 0xb80660f71e0d5ac2b5d5c43f2246403f::SicBo::init_bank -t 0x00000000000000000000000000000001::STC::STC --arg 0u128 -b
```

The *`u128`* in **`--arg 0u128` is important because I initially got an argument error using `--arg 0`. Because the contract specifies that the amount is u128, the u128 suffix is also required to indicate the type. **

If the command returns `account 0xb80660f71e0d5ac2b5d5c43f2246403f is locked`, the account is locked and you need to unlock the account `starcoin% account unlock`. Then call the command again. Get `txn 0x14bc2406c4967194fcb2b47a03a6404117bac24ebee6cf25d3c05b2fe7e65fd5 submitted.` similar information, it means that our deployment has been adopted by the blockchain. After a while, you will get a bunch of post-execution returns. At this point the bank has been initialized, and we need to initialize the Game.


```rust
// SicBo.move
...
    public(script) fun init_game<TokenType: store>(alice: signer, aliceSecret: vector<u8>, amount: u128) acquires Bank {
        let account = &alice;

        let token = Account::withdraw<TokenType>(account, amount);
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        Token::deposit<TokenType>(&mut bank.bank, token);

        // init Game
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

The parameters to initialize Game are alice's encrypted information and alice's bet amount. A lot of the information here is what I use for debugging, **a better way to debug move is unit testing**. The default guess for alice and bob is 0 . Then 0 should not be used as a betting number, it can be 1-10.

After alice initializes the game, bob takes alice's address to participate in alice's game.

```rust
  public(script) fun bob_what<TokenType: store>(bob: signer, alice: address, bobNum: u8, amount: u128) acquires Game, Bank {
        let account = &bob;

        let token = Account::withdraw<TokenType>(account, amount);
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        Token::deposit<TokenType>(&mut bank.bank, token);

        let game = borrow_global_mut<Game>(alice);
        game.bobNum = bobNum;
        game.amount = game.amount + amount;
        // TODO 
        // game.bobAddr = account
    }

```

When bob finishes betting, alice decrypts his bet. If alice does not decipher his bet, it is directly judged that alice has lost.

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
              game.aliceWin = true;
              game.bobWin = true;  
              win_token(game.bobWin, game.amount / 2);
              win_token(game.bobWin, game.amount / 2);
            }
        } else {
            game.bobWin = true;
            win_token(game.bobWin, game.amount);
        }

        // Game over, drop
        move_from<Game>(game.aliceAddr);
    }

    fun win_token<TokenType: store>(account: address, amount: u128) acquires Bank {
        let bank = borrow_global_mut<Bank<TokenType>>(@admin);
        let token = Token::withdraw<TokenType>(&mut bank.bank, amount);
        Account::deposit<TokenType>(account, token);
    }
...
```

This completes the main logic of the game. It records the Game start time. Some more check functions can be added: for example, if bob doesn't bet at the specified time, then alice can terminate the game and get her bet back. Likewise, if alice fails to reveal her bet on time, it can be ruled that alice has lost.

How to write JS. See `SicBoGame.tsx` in [repo](https://github.com/Tonyce/starcoin-react-stepby)

## Step 6 - Test Case

During the debugging process of the above game, a relatively "stupid" method was used to debug the sha3-256 result of the Move contract. It is to save the results of sha3-256 and compare them. In fact, it is more efficient to use unit-test (test cases) for this verification. Next a demo to show how to use test cases to verify Move sha3-256 results.

To simply introduce test cases, create a new project

```bash
$ mpm package new move_ut
````

Modify Move.toml and add starcoin's library.

````toml
...
[addresses]
StarcoinFramework = "0x1"
admin = "0xb80660f71e0d5ac2b5d5c43f2246403f"
SFC = "0x6ee3f577c8da207830c31e1f0abb4244"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
starcoin-framework-commons = { git = "https://github.com/starcoinorg/starcoin-framework-commons.git", rev = "e7f538175a5f50a97207692569b6631a87ee08cc" }
...
````

Create a new move file under source with any name. Copy the sample code from https://diem.github.io/move/unit-testing.html.

````move
#[test_only]
module admin::UTest {
    struct MyCoin has key { value: u64 }

    public fun make_sure_non_zero_coin(coin: MyCoin): MyCoin {
        assert!(coin.value > 0, 0);
        coins
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
````

Then you will see the output of test after executing `mpm package test`

```bash
❯ mpm package test
BUILDING UnitTest
BUILDING StarcoinFramework
BUILDING starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
Test result: OK. Total tests: 1; passed: 1; failed: 0
````

This proves that the test case ran successfully. In this module, we add the `#[test_only]` macro so that this module will not be compiled into release. If you execute `mpm release` in this example project, you get:

```bash
❯ mpm release
Packaging Modules:
Error: must at latest one module
```


What we want to verify is the result of sha3-256, so modify the move code to

````move
#[test_only]
module admin::UTest {

    use StarcoinFramework::Debug;
    use StarcoinFramework::Vector;
    use StarcoinFramework::Hash;

    struct MyCoin has key { value: u64 }

    public fun make_sure_non_zero_coin(coin: MyCoin): MyCoin {
        assert!(coin.value > 0, 0);
        coins
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
````

A new test function `test_hash_result` has been added, which does one thing: sha3-256("hello world"). First Debug and print it to see the result

❯ mpm package test
CACHED UnitTest
CACHED StarcoinFramework
CACHED starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
[debug] (&) [100, 75, 204, 126, 86, 67, 115, 4, 9, 153, 170, 200, 158, 118, 34, 243, 202, 113, 251, 161, 217, 114 , 253, 148, 163, 28, 59, 251, 242, 78, 57, 56]
[ PASS ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::test_hash_result
Test result: OK. Total tests: 2; passed: 2; failed: 0

This is the result of my execution of JS, which can be seen to be the same with the naked eye.

```bash
❯ node sha3test.js
{
  type: 'Buffer',
  data: [
    100, 75, 204, 126, 86, 67, 115, 4,
      9, 153, 170, 200, 158, 118, 34, 243,
    202, 113, 251, 161, 217, 114, 253, 148,
    163, 28, 59, 251, 242, 78, 57, 56
  ]
}
````

But this is not enough, the assert result needs to be the same as the JS result. Modify `test_hash_result` to

````move
...
    #[test]
    fun test_hash_result() {
        let expect_vec = vector[
            100, 75, 204, 126, 86, 67, 115, 4,
            9, 153, 170, 200, 158, 118, 34, 243,
            202, 113, 251, 161, 217, 114, 253, 148,
            163, 28, 59, 251, 242, 78, 57, 56
        ];
        let temp_camp = Vector::empty();
        Vector::append(&mut temp_camp, b"hello world");
        let camp = Hash::sha3_256(temp_camp);
        Debug::print(&camp);
        assert!(&camp == &expect_vec, 1);
    }
````

then execute

```bash
❯ mpm package test
CACHED UnitTest
CACHED StarcoinFramework
CACHED starcoin-framework-commons
BUILDING move_ut
Running Move unit tests
[ PASS ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::make_sure_non_zero_coin_passes
[debug] (&) [100, 75, 204, 126, 86, 67, 115, 4, 9, 153, 170, 200, 158, 118, 34, 243, 202, 113, 251, 161, 217, 114 , 253, 148, 163, 28, 59, 251, 242, 78, 57, 56]
[ PASS ] 0xb80660f71e0d5ac2b5d5c43f2246403f::UTest::test_hash_result
Test result: OK. Total tests: 2; passed: 2; failed: 0
````

As you can see, there is no problem. If you doubt the assert, you can modify one of the data in `expect_vec` and `mpm package test` again. Then you will find:


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

The test case does not pass. Perfect.

Test cases can not only ensure the quality of the program, but also greatly improve the efficiency.

## Refinement plan

1. The cookbook is used as a manual, if you have any problems, go to see it.
2. Common methods of move contract.
3. . . .