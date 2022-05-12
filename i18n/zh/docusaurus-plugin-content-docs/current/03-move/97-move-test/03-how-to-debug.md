# 如何 Debug Move 模块和排查问题

> Move 编程有两种测试方式，分别是单元测试（unit test）和集成测试（integration test）。这两种测试方式足以覆盖几乎 90% 的使用场景。单元测试可以用来对一些功能模块进行简单的验证。然而，很多测试场景是在区块链上的，需要从一些初始的交易状态开始，单元测试无法满足此类需求。因此，我们需要更强大的测试功能来模拟真实区块链上的交易，才能覆盖大部分用例，从而让代码更加健壮。


###  简单示例

我们从一个简单的例子开始。  
这是一个非常简单的 Token 模块，我将留下一些小错误来展示整个 debug 过程。

**你可以使用下面的地址来测试**
```
address:0xf2aa2eae4ceaae88b308fc904975e4ae  
public_key:0x98826ab91a9a5d85dec536418090aa6342991bc8f947613721c8165e7102b132  
private_key:0xa5ead1fb25114b335ad21a07ed5cee8cecba8763309ec78656e7c4ccaf5735e7
```


- 使用 mpm 命令创建项目
```
mpm package new MyCake
```

- 进入目录并编辑 mycake.move 文件
```
cd MyCake
vi sources/mycake.move
```

在文件中输入以下代码：
```
address Chef{
    module Cake{
        use StarcoinFramework::Signer;
        use StarcoinFramework::Token;
        use StarcoinFramework::Account;

        struct Cake has copy, drop, store { }

        public fun admin():address{
            @Chef
        }

        public fun init(account :&signer){
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::register_token<Cake>( account, 9 );
        }

        public fun make_cake( account: &signer , amount : u128): Token::Token<Cake> {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::mint<Cake>( account , amount  )
        }

        public fun destroy_cake( account: &signer , cake: Token::Token<Cake>) {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::burn<Cake>( account , cake  );
        }

        public fun send_cake( _to :address , cake: Token::Token<Cake> ){
            Account::deposit<Cake>(@Chef, cake);
        }

        public fun add (x:u128, y:u128 ):u128{
            x - y
        }

    }
}

```

- 编辑 Move.toml 文件
```
vi Move.toml
```
```
[package]
name = "MyCake"
version = "0.0.0"

[addresses]
Chef = "0xf2aa2eae4ceaae88b308fc904975e4ae"

[dependencies]
StarcoinFramework = { git = "https://github.com/starcoinorg/starcoin-framework.git", rev = "01c84198819310620f2417413c3c800df8292ae5" }
```

### 单元测试

代码编写完成后，应首先进行单元测试，保证代码的正确性。 
单元测试通常用来测试一些函数或者功能模块的正确性。

**测试 add 函数的返回值** 

- 添加单元测试代码 

```
address Chef{
    module Cake{
        use StarcoinFramework::Signer;
        use StarcoinFramework::Token;
        use StarcoinFramework::Account;

        struct Cake has copy, drop, store { }

        public fun admin():address{
            @Chef
        }

        public fun init(account :&signer){
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::register_token<Cake>( account, 9 );
        }

        public fun make_cake( account: &signer , amount : u128): Token::Token<Cake> {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::mint<Cake>( account , amount  )
        }

        public fun destroy_cake( account: &signer , cake: Token::Token<Cake>) {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::burn<Cake>( account , cake  );
        }

        public fun send_cake( _to :address , cake: Token::Token<Cake> ){
            Account::deposit<Cake>(@Chef, cake);
        }

        public fun add (x:u128, y:u128 ):u128{
            x - y
        }

        #[test]
        public fun add_test(){
            assert!( add(10 , 1) == 11, 101);
        }
    }
}

```

- 运行测试命令
```
mpm package test
```

- 获取测试结果
```
BUILDING UnitTest
BUILDING StarcoinFramework
BUILDING MyCake
Running Move unit tests
[ FAIL    ] 0xf2aa2eae4ceaae88b308fc904975e4ae::Cake::add_test

Test failures:

Failures in 0xf2aa2eae4ceaae88b308fc904975e4ae::Cake:

┌── add_test ──────
│ error[E11001]: test failure
│    ┌─ ./sources/mycake.move:38:13
│    │
│ 37 │         public fun add_test(){
│    │                    -------- In this function in 0xf2aa2eae4ceaae88b308fc904975e4ae::Cake
│ 38 │             assert!( add(10 , 1) == 11, 101);
│    │             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Test was not expected to abort but it aborted with 101 here
│ 
│ 
└──────────────────

Test result: FAILED. Total tests: 1; passed: 0; failed: 1
```

**可以看到 add 函数的返回结果不是我们预期的** 

我们检查一下 add 函数，可以看到其内部实现是错误的。  
修复这个错误：
```
    public fun add (x:u128, y:u128 ):u128{
        x + y
    }
```

- 重新运行单元测试
```
mpm package test
```

- 获取测试结果
```
CACHED UnitTest
CACHED StarcoinFramework
BUILDING MyCake
Running Move unit tests
[ PASS    ] 0xf2aa2eae4ceaae88b308fc904975e4ae::Cake::add_test
Test result: OK. Total tests: 1; passed: 1; failed: 0
```
恭喜，所有测试通过了！  

通过这种方式可以发现函数或功能模块里的问题。你可以在单元测试中打印变量，也可以调用其他函数，但是一定记住，单元测试是非常局限的。如果你需要 signature ，那你可以使用集成测试。

### 集成测试  

单元测试只能满足一小部分的测试需求。
更多情况下，我们在测试阶段需要模拟代码在区块链上运行的情况，很多问题只有在区块链上运行时才能暴露出来。

集成测试最适合完成这项需求。

- 创建一个 integration-tests 的工作目录，并添加 mycake_test.move 文件
```
mkdir integration-tests
vi integration-test/mycake.move
```

在 mycake.move 文件中添加以下代码：  
```
//# init -n test --public-keys Chef=0x98826ab91a9a5d85dec536418090aa6342991bc8f947613721c8165e7102b132 

//# faucet --addr Chef --amount 10000000000000000

//# faucet --addr guest --amount 10000000000000000

//# run --signers Chef
script {
    use Chef::Cake;
    fun init(signer: signer) {
        Cake::init(&signer);
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use StarcoinFramework::Signer;
    use StarcoinFramework::Account;
    use Chef::Cake;
    fun make_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Account::deposit<Cake::Cake>( Signer::address_of(&signer) , cake );
        assert!( Account::balance<Cake::Cake>(@Chef) == 1 * 1000 * 1000 * 1000 , 1001);
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use Chef::Cake;
    fun destroy_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Cake::destroy_cake(&signer, cake);
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use StarcoinFramework::Account;
    use Chef::Cake;
    fun send_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Cake::send_cake(@guest, cake);
        assert!( Account::balance<Cake::Cake>(@guest) == 1 * 1000 * 1000 * 1000 , 1001);
    }
}
// check: EXECUTED
```

- 运行集成测试  
```
mpm integration-test
```
**命令行中将输出如下结果**

可以看到，大部分测试结果是符合预期的。但是最后一个测试的结果是错误的，我们需要仔细检查最后一项测试代码，理清其背后的逻辑。
```
BUILDING StarcoinFramework
BUILDING MyCake

running 1 tests

test transactional-test::mycake_test.move ... FAILED
Error: Expected errors differ from actual errors:
processed 7 tasks

task 3 'run'. lines 7-14:
{
  "gas_used": 97115,
  "status": {
    "Keep": "Executed"
  }
}

task 4 'run'. lines 16-26:
{
  "gas_used": 128354,
  "status": {
    "Keep": "Executed"
  }
}

task 5 'run'. lines 28-36:
{
  "gas_used": 90747,
  "status": {
    "Keep": "Executed"
  }
}

task 6 'run'. lines 38-48:
{
  "gas_used": 90471,
  "status": {
    "Keep": {
      "MoveAbort": [
        "Script",
        1001
      ]
    }
  }
}



failures:
    transactional-test::mycake_test.move

test result: FAILED. 0 passed; 1 failed; 0 filtered out
```

- 问题分析  

首先看一下代码，我们获取了一些 cake 代币，然后想发送给 guest 账户；但是执行 send_cake 后，guest 账户里并没有收到 cake 代币。
```
//# run --signers Chef
script {
    use StarcoinFramework::Account;
    use Chef::Cake;
    fun send_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Cake::send_cake(@guest, cake);
        assert!( Account::balance<Cake::Cake>(@guest) == 1 * 1000 * 1000 * 1000 , 1001);
    }
}
// check: EXECUTED
```
通过上面的单元测试，我们知道 make_cake 函数是正常的，**那么问题一定出在 send_cake 上面**。

我们就来检查一下吧。
```
    public fun send_cake( _to :address , cake: Token::Token<Cake> ){
        Account::deposit<Cake>(@Chef, cake);
    }
```
仔细查看 send_cake 函数，可以看到 Account::deposit<Cake\>(@Chef, cake) 的参数错误写成了管理员的地址，而实际上应该是接受代币的账户地址。

修复该问题：
```
    public fun send_cake( to :address , cake: Token::Token<Cake> ){
        Account::deposit<Cake>(to, cake);
    }
```
好了，我们重新运行 integration-test
```
mpm integration-test
```
**这下测试项中没有出现错误了，但是我们的测试结果仍然失败了。这又是什么原因？**
```
BUILDING StarcoinFramework
BUILDING MyCake

running 1 tests

test transactional-test::mycake_test.move ... FAILED
Error: Expected errors differ from actual errors:
processed 7 tasks

task 3 'run'. lines 7-14:
{
  "gas_used": 97115,
  "status": {
    "Keep": "Executed"
  }
}

task 4 'run'. lines 16-26:
{
  "gas_used": 128354,
  "status": {
    "Keep": "Executed"
  }
}

task 5 'run'. lines 28-36:
{
  "gas_used": 90747,
  "status": {
    "Keep": "Executed"
  }
}

task 6 'run'. lines 38-48:
{
  "gas_used": 141989,
  "status": {
    "Keep": "Executed"
  }
}



failures:
    transactional-test::mycake_test.move

test result: FAILED. 0 passed; 1 failed; 0 filtered out
```
 
- 更新测试基准

**这是因为我们需要更新测试基准**
```
mpm integration-test --ub
```

该命令会在 integration-tests 目录下生成和测试文件同名，后缀为 exp 的文件。命令运行结束后，所有测试通过！
```
BUILDING StarcoinFramework
BUILDING MyCake

running 1 tests

test transactional-test::mycake_test.move ... ok

test result: ok. 1 passed; 0 failed; 0 filtered out
```

**当修改测试项后，记得一定要在在测试命令中加上 "--ub" 选项：`mpm integration-test --ub`。**

### 正确代码  
#### Move.toml
```
[package]
name = "MyCake"
version = "0.0.0"

[addresses]
Chef = "0xf2aa2eae4ceaae88b308fc904975e4ae"

[dependencies]
StarcoinFramework = { git = "https://github.com/starcoinorg/starcoin-framework.git", rev = "01c84198819310620f2417413c3c800df8292ae5" }

```
#### mycake.move
```
address Chef{
    module Cake{
        use StarcoinFramework::Signer;
        use StarcoinFramework::Token;
        use StarcoinFramework::Account;

        struct Cake has copy, drop, store { }

        public fun admin():address{
            @Chef
        }

        public fun init(account :&signer){
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::register_token<Cake>( account, 9 );
        }

        public fun make_cake( account: &signer , amount : u128): Token::Token<Cake> {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::mint<Cake>( account , amount  )
        }

        public fun destroy_cake( account: &signer , cake: Token::Token<Cake>) {
            assert!( admin() == Signer::address_of( account ) , 10000);
            Token::burn<Cake>( account , cake  );
        }

        public fun send_cake( to :address , cake: Token::Token<Cake> ){
            Account::deposit<Cake>(to, cake);
        }

        public fun add (x:u128, y:u128 ):u128{
            x + y
        }

        #[test]
        public fun add_test(){
            assert!( add(10 , 1) == 11, 101);
        }
    }
}

```
#### mycake_test.move
```
//# init -n test --public-keys Chef=0x98826ab91a9a5d85dec536418090aa6342991bc8f947613721c8165e7102b132 

//# faucet --addr Chef --amount 10000000000000000

//# faucet --addr guest --amount 10000000000000000

//# run --signers Chef
script {
    use Chef::Cake;
    fun init(signer: signer) {
        Cake::init(&signer);
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use StarcoinFramework::Signer;
    use StarcoinFramework::Account;
    use Chef::Cake;
    fun make_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Account::deposit<Cake::Cake>( Signer::address_of(&signer) , cake );
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use Chef::Cake;
    fun destroy_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Cake::destroy_cake(&signer, cake);
    }
}
// check: EXECUTED

//# run --signers Chef
script {
    use StarcoinFramework::Account;
    use Chef::Cake;
    fun send_cake(signer: signer) {
        let cake = Cake::make_cake(&signer , 1 * 1000 * 1000 * 1000);
        Cake::send_cake(@guest, cake);
        assert!( Account::balance<Cake::Cake>(@guest) == 1 * 1000 * 1000 * 1000 , 1001);
    }
}
// check: EXECUTED
```