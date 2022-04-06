# How to debug Move module and troubleshooting

>There are two test methods for move, unit test and spec test.  
Using the two test methods separately can cover almost 90% of the usage scenarios.  
We can usually test some functional modules in unit tests as simple verification.  
However, many test scenarios require that we must initiate transactions on the block to debug the correctness of the module, and unit testing cannot meet these requirements.  
So we must use more powerful canonical tests to simulate transactions in real blocks to cover most use cases and make your code more robust.  

###  Simple Example  
Let's take an example, this is a very simple Token module    
I will leave some small errors in it to demonstrate the whole debug process  
**You can use this test address**  
```
address:0xf2aa2eae4ceaae88b308fc904975e4ae  
public_key:0x98826ab91a9a5d85dec536418090aa6342991bc8f947613721c8165e7102b132  
private_key:0xa5ead1fb25114b335ad21a07ed5cee8cecba8763309ec78656e7c4ccaf5735e7
```
#### Use the mpm command
Create a project
```
mpm package new MyCake
```
#### Go to the folder and edit mycake.move
```
cd MyCake
```
```
vi sources/mycake.move
```
fill in
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
#### Edit Move.toml
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

### Unit Test Debug

After you have written some move code, you need to unit test first to ensure that your code is correct in the details  
Unit testing is generally used to test the correctness of certain functions or functional modules  

**Let's test the return value of the add function**

#### add unit test
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
####  execute test command
```
mpm package test
```
#### get test results
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
**We can see that the result of the add function is not what we expected**  
Let's check the add function, we can see that the internal implementation of the add function is incorrect  
Fix it
```
    public fun add (x:u128, y:u128 ):u128{
        x + y
    }
```

####  Rerun unit test
```
mpm package test
```
#### get test results
```
CACHED UnitTest
CACHED StarcoinFramework
BUILDING MyCake
Running Move unit tests
[ PASS    ] 0xf2aa2eae4ceaae88b308fc904975e4ae::Cake::add_test
Test result: OK. Total tests: 1; passed: 1; failed: 0
```
Congratulations! The test has passed, you can find the error of the algorithm this way!

You can print certain values in unit tests, and you can also call functions in modules, but keep in mind that unit tests are very limited, and if you need a signature, you can use spectest  

### Spectest  Debug
Unit testing can only meet the needs of a small range of tests.   
More often, we want to simulate the execution of the code on the block during the testing phase,   
because many problems occur after the block is executed.   

At this time, spectest is the best.     
#### Create a new spectest directory and add mycake_test.move
```
mkdir spectests
```
```
vi spectests/mycake.move
```
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
#### Run Spectest

```
mpm spectest
```
**The following will be output on the command line**  
We can see that most of the tests are as we expected  
But the result of the last test is wrong  
We need to examine the code used by the test and the logic behind it  
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

#### Analyse Problem  
First look at the test code  
We made some cakes and wanted to give them to the guest, but after send_cake, the cake did not appear in the guest's account 
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
We already know in the above test that the make_cake function is normal  
**Then the problem must be in send_cake**  
Let's check it out  
```
    public fun send_cake( _to :address , cake: Token::Token<Cake> ){
        Account::deposit<Cake>(@Chef, cake);
    }
```
When we look at the send_cake function, we will find that the parameter of Account::deposit\<Cake\>(@Chef, cake) is fixed to the administrator 
address, which is wrong  
It should be sent to whoever needs to send it  
Fix it  
```
    public fun send_cake( to :address , cake: Token::Token<Cake> ){
        Account::deposit<Cake>(to, cake);
    }
```
Ok, let's rerun spectest  
```
mpm spectest
```
**We didn't find any errors in the test items, but the test still failed. What's going on?**  
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
 
#### Execution update test baseline  
**This is because we need to update test baseline**  
```
mpm spectest --ub
```
An exp file with the same name as the test file will appear in the spectests directory  
The result of the simultaneous test results is a pass  
```
BUILDING StarcoinFramework
BUILDING MyCake

running 1 tests

test transactional-test::mycake_test.move ... ok

test result: ok. 1 passed; 0 failed; 0 filtered out
```
When you need to modify test items, remember to execute mpm spectest --ub after all test items are within the expected range  

### Correct Code  
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