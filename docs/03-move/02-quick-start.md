# Quick Start

In this tutorial, we will implement a simple counter to show how Move manages resources through code.
This document covers background knowledge, writing code, how to compile, how to publish to the chain, and how to call.
The complete code repository is [here](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter).

Prepare in advance:

1. You need to build a *dev* network according to [how to set up a local development network](../02-getting-started/02-setup/03-dev-network.md) and connect to the *dev* network through the Starcoin console.

2. Create an account according to [account management](../02-getting-started/03-accounts/1.account-manage.md) or use an existing account, and transfer a little STC to the account.

3. There is a basic understanding of the *transaction* through [the first on-chain transaction](../02-getting-started/03-accounts/2.first-transaction.md).

Next, we will introduce some necessary tools and project structure.

## mpm command-line tool and project structure

Before we start writing code, let's install the `mpm` (Move Package Manager) command line tool and briefly introduce the structure of the Move project.

:::tip Introduction to MPM
`mpm` is encapsulated and integrated with some additional functions on the basis of `move-cli` by Starcoin developers to facilitate the development, testing and deployment of Starcoin smart contracts.
:::

The installation method is to [set up the Move development environment](./01-prepare-move-env.md).

Now you can create a new project through `mpm`:

``` shell
$ mpm package new my-counter
```

You can see the generated directory structure:

```
my-counter
├── Move.toml
└── sources
```

- *sources* - Directory of storing the Move module.
- *Move.toml* - Manifest file: Define the metadata, dependencies and named addresses of the package.

:::tip MOVE MODULE
A module is a library that define **structure types** and **functions** of manipulate structures.
*The concept of class in other programming languages can be used to help understand.*

The module will be published to the publisher's address, and the *entry functions* in the module can be called and executed by everyone.
*(You can use function computing platforms such as AWS Lambda to publish functions and call functions to help understand)*
:::

A project consisting of *Move.toml* files and *sources* directory will be considered a [Move Package](./03-move-language/01-packages.md).

## Create a MyCounter module

Create a *MyCounter.move* file in the *sources* directory to store the code of the module.

The module we are going to create is named `MyCounter`.
In this article, we will demonstrate it using an account address `0xcada49d6a37864931afb639203501695` of my local dev network.
We will publish the `MyCounter` module to this address.

Define the syntax of the module:

```move
module <address>::<identifier> {
    // module body
}
```

### The first version of the code

In the `MyCounter` module, we define a structure `Counter`, which contains a field `value` representing the number of times the counter is triggered.
The type of `value` is `u64`, that is, unsigned 64-bit integer.

The following is the first version of the `MyCounter` module:

```move title="my-counter/sources/MyCounter.move"
module 0xcada49d6a37864931afb639203501695::MyCounter {
    struct Counter {
        value: u64,
    }
}
```

We can use the `mpm package build` command to build our counter program.

```shell
$ mpm package build

BUILDING my-counter
```

As you can see, the program passed the compilation smoothly and then went down.

Because this address is too long, you can set a *named address* in the *Move.toml* file, which can be globally replaced in the Move project.

```toml title="my-counter/Move.toml" {5,6}
[package]
name = "my-counter"
version = "0.0.1"

[addresses]
MyCounterAddr = "0xcada49d6a37864931afb639203501695"
...
```

:::note Tips
Highlighted blocks of code are changes or parts that need attention.
:::

In this way, the first version of code can be written as:

```move title="my-counter/sources/MyCounter.move" {1}
module MyCounterAddr::MyCounter {
    struct Counter {
        value: u64,
    }
}
```

MyCounterAddr is a named address and MyCounter is a module identifier.

Then we compile the code:

```shell
$ mpm package build

BUILDING my-counter
```

There is no error, indicating that there is no problem.

### Initialization method init

Then we customize an initialization method to create a `Counter` instance and *"move"* to the storage space of the caller's account.

```move title="my-counter/sources/MyCounter.move" {6-8}
module MyCounterAddr::MyCounter {
    struct Counter {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }
}
```

`move_to<T>(&signer, T)` here is a built-in method to add resources of type `T` to the storage space under the address of the account `signer` (the brackets here represent generics).

:::info More information
The storage space here is `GlobalState`, which can be simply understood as the place where the account is stored in *resources* and *module code*.
More details can be found in [Concept-Status](../99-concepts/04-state.md).
:::

The `signer` in the `init` function on line 6 `account: &signer` is the built-in type of Move.
If you want to put resources under the caller's account address, you need to pass the `&signer` parameter to the function.
The `&signer` data type represents the initiator of the current transaction (the caller of the function can be any account).

:::info Help you understand —— signer
`signer` is like *uid* under Linux.
After logging in to the Linux system, all the commands you enter are considered to be "this logged-in **certified** user" operation.
The key is that this authentication process is not done in running commands and programs, but is completed by the operating system after booting.

Corresponding to Move, this authentication process is a well-known "private key signature, public key verification" process similar to other blockchain systems.
When the function with the `&signer` parameter is executed, the identity of the initiator has been authenticated by the Starcoin blockchain.
:::

Let's try to compile it:

```shell
$ mpm package build

BUILDING my-counter
error[E05001]: ability constraint not satisfied
  ┌─ ./sources/MyCounter.move:7:6
  │
2 │     struct Counter {
  │            ------- To satisfy the constraint, the 'key' ability would need to be added here
  ·
7 │         move_to(account, Counter { value: 0 });
  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  │         │                │
  │         │                The type 'MyCounterAddr::MyCounter::Counter' does not have the ability 'key'
  │         Invalid call of 'move_to'
```

Something went wrong! Prompt us "ability constraint not satisfied", and the following is a sentence "The type 'MyCounterAddr::MyCounter::Counter' does not have the ability 'key'".
The compiler told us that the resource type `MyCounterAddr::MyCounter::Counter` lacks `key` *capacity*, so it cannot be added to the account address with `move_to`.

The *ability* feature of Move are involved here.

:::tip concept —— ability
Move language is a resource-oriented language, and the core is resource management.
For what "**ability**" resources have, the Move programming language abstracts the four attributes of resources -- copyable(copy), indexable (key), discarded(drop), and storable(store).
Through the different combinations of these four attributes, users can easily define the resources of any ability.
For example, users can define an ordinary information type through the combination of `key + copy + drop + store`, and an asset type through the combination of `key + store` -- such as NFT -- without `copy` attributes ensure that NFT cannot be copied at will, which improves security.

Move provides four competencies:

* copy: Indicates whether the value can be copied.
* drop: Indicates whether the value can be discarded at the end of the scope.
* key: Indicates whether the value can be accessed as a global key.
* store: Indicates whether the value can be saved to the global state.

By endowing resources with different ability, the Move virtual machine can fundamentally ensure that "resources" can only *move*.
As for copying, modifying and discarding, it depends on the specific ability of resources.
If it is forcibly copied, modified or discarded, the code compilation will go wrong and there is no chance to run at all.

For more information, please refer to the [Understanding Ability](./04-understanding-ability.md) chapter.
:::

Generally speaking, we believe that **the structure with `key` ability is resources**.

We modify the code and follow the prompts to add `key` ability.

```move title="my-counter/sources/MyCounter.move" {2}
module MyCounterAddr::MyCounter {
    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }
}
```

At this time, it can be compiled again.

### Counter plus one method incr

Now add an `incr` method to the `Counter` resource.

```move title="my-counter/sources/MyCounter.move" {3,13-16}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }
}
```

Note that in line 3, we refer to a dependency - [StarcoinFramwork](https://github.com/starcoinorg/starcoin-framework) can be regarded as the Stdlib standard library of Starcoin.
We need to use the `Signer::address_of(&signer)` method in the library to extract the address of the `signer`.

Modify the *Move.toml* file to add dependencies to the project

```toml title="my-counter/Move.toml" {6,9-10}
[package]
name = "my-counter"
version = "0.0.1"

[addresses]
StarcoinFramework = "0x1"
MyCounterAddr = "0xcada49d6a37864931afb639203501695"

[dependencies]
StarcoinFramework = {git = "https://github.com/starcoinorg/starcoin-framework.git", rev="cf1deda180af40a8b3e26c0c7b548c4c290cd7e7"}
```

Line 16 has a new method `borrow_global_mut`.
Like the previous `move_to`, it is a built-in method to operate resources on the storage space of the account address.

:::tip Gas Station -- Operation of Resources
1. `move_to<T>(&signer, T)`: Publish and add resources of type `T` to the address of the `signer`.
2. `move_from<T>(address): T`: Delete the resource of type `T` from the address and return this resource.
3. `borrow_global<T>(address): &T`: Returns an *immutable reference* to a resource of type `T` under the address.
4. `borrow_global_mut<T>(address): &mut T`: Returns a *mutable reference* to a resource of type `T` under the address.
5. `exists<T>(address): bool`: Judge whether there are resources of type `T` under the address.

To use these methods, resource `T` must be defined in the current module.
**This ensures that resources can only be operated by the API method provided by the module that defines the resource.**
The parameters `address` and `signer` represent the address stored in a resource of type `T`.
:::

Then we will try to compile it:

```
$ mpm package build
CACHED StarcoinFramework
BUILDING my-counter
error[E04020]: missing acquires annotation
   ┌─ ./sources/MyCounter.move:14:20
   │
14 │         let counter = borrow_global_mut<Counter>(Signer::address_of(account));
   │                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   │                       │                 │
   │                       │                 The call acquires 'MyCounterAddr::MyCounter::Counter', but the 'acquires' list for the current function does not contain this type. It must be present in the calling context's acquires list
   │                       Invalid call to borrow_global_mut.
```

哦！又出错了。
报错信息提示了我们第14行调用方法获取 `Counter` 结构时，类型（Counter 结构）必须出现在调用上下文的 `qcquires` 列表中，而当前函数的 `acquires` 列表没有包含这个类型。

这里我们引入 `acquire` 的概念。
Oh! Something went wrong again.
The error message prompts that when we call the method in line 14 to get the `Counter` structure, the type (Counter structure) must appear in the `acquires` list of the call context, and the `acquires` list of the current function does not contain this type.

Here we introduce the concept of *acquire*.

:::tip concept
When a function accesses resources with `move_from()`, `borrow_global()` and `borrow_global_mut()`, the function must show which resource the declaration needs to "**acquire**".
This will be ensured by Move's type system that references to resources are safe and there are no suspended references.
:::

The revised code is as follows:

```move title="my-counter/sources/MyCounter.move" {13}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }
}
```

It can now be compiled.

Next, we write functions that can be executed directly through the console.

### Write a callable script function

The previously written `public fun init` and `public fun incr` functions cannot be called and executed directly in the console.
You need to use the *entry function* to call.

At present, in Move, the entry method is achieved through `script function`, writing `public(script) fun`.

The concept of function *visibility* is introduced here.
Different visibility determines where functions can be called. (The following concept tip can be skipped first)

:::tip Concept - Function Visibility
| visibility        | write              | explain                                                                                                                                                                                                                                    |
|-------------------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| internal          | fun                | It can also be called private, which can only be called in the same module.                                                                                                                                                                |
| public            | public fun         | It can be called by functions in any module.                                                                                                                                                                                               |
| **public script** | public(script) fun | The script function is an entry method in the module, which can be called by initiating a transaction through the console, just like the local execution script (although the code has been stored under the module address on the chain). |
| public friend     | public(friend) fun | It can be called in the same module and added to the trusted module call of the `friend list`.                                                                                                                                             |
:::

Next, let's write the *script function* corresponding to `init` and `incr` functions.

```move title="my-counter/sources/MyCounter.move" {18-24}
module MyCounterAddr::MyCounter {

    use StarcoinFramework::Signer;

    struct Counter has key, store {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun incr(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(Signer::address_of(account));
        counter.value = counter.value + 1
    }

    public(script) fun init_counter(account: signer) {
        Self::init(&account);
    }

    public(script) fun incr_counter(account: signer) acquires Counter {
        Self::incr(&account);
    }
}
```

The only thing to explain is that `Self` refers to the current module.

Now, we publish the module to the chain and try to call it.

## Publish to the chain and call

### Publish to the chain

Run the `mpm release` command:

```shell
$ mpm release

Packaging Modules:
         0xcada49d6a37864931afb639203501695::MyCounter
Release done: release/my-counter.v0.0.1.blob, package hash: 0x31b36a1cd0fd13e84034a02e9972f68f1c9b1cde1c9dfbe7ac69f32f6fc6dafa
```

It will package the compilation module and get the binary package.

In the previous article, we have prepared an account with the address `0xcada49d6a37864931afb639203501695`.
If there is no balance, we can get some test coins through the `dev get-coin` command.
Now deploy the compiled module to this account address.

```starcoin title="Starcoin console" {1,3,5}
starcoin% account unlock 0xcada49d6a37864931afb639203501695 -p <MY-PASSWORD>

starcoin% dev deploy /path/to/my-counter/release/my-counter.v0.0.1.blob -s 0xcada49d6a37864931afb639203501695 -b

txn 0xf60662ba0ac3373c28f827a0ac9d9db6667c3921056905356aa5414b3bf3df09 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "7800",
      "status": "Executed",
      "write_set": [
        {
          "access_path": "0x00000000000000000000000000000001/1/0x00000000000000000000000000000001::TransactionFee::TransactionFee<0x00000000000000000000000000000001::STC::STC>",
          "action": "Value",
          "value": {
            "Resource": {
              "json": {
                "fee": {
                  "value": 292331
                }
              },
              "raw": "0xeb750400000000000000000000000000"
            }
          }
        },
...
```

`-s` that is `--sender` is the sender, `-b` is `--blocking`, blocking and waiting for the command to be executed.

The `txn 0xf60662... submitted` on line 5 means that the smart contract of the counter has been successfully deployed to the publisher's address, which belongs to an on-chain transaction, and the chain has recorded the transaction status.

At this time, we can check the storage of the code on the chain.

```starcoin title="Starcoin console" {1}
starcoin% state list code 0xcada49d6a37864931afb639203501695

{
  "ok": {
    "codes": {
      "MyCounter": {
        "abi": {
          "module_name": {
            "address": "0xcada49d6a37864931afb639203501695",
            "name": "MyCounter"
          },
          ...
}
```

You can see that there is only `MyCounter`, the contract code at the address of `0xcada49d6a37864931afb639203501695`.

:::note state command
The `state` command is used to view the data under the account address.
You can enter `state --help` in the console to see more help.
:::

### Call init_counter to initialize resources

Use the `account execute-function` command to execute a script function.
Now we call the `init_counter` method to initialize the `Counter` resource to the caller's address.

```starcoin title="Starcoin console" {1}
starcoin% account execute-function --function 0xcada49d6a37864931afb639203501695::MyCounter::init_counter -s 0xcada49d6a37864931afb639203501695 -b

txn 0x032c0eda779157e0ef3949338c3b3e4e6528c7720776d02c2cb0ddd64804f1c2 submitted.
{
  "ok": {
    "dry_run_output": {
      "events": [],
      "explained_status": "Executed",
      "gas_used": "11667",
      "status": "Executed",
      "write_set": [
...
}
```

In the `init_counter` function, we initialize a *Counter object (resource)* and `move_to` to the caller's address.
Let's see if this resource exists. Use the `state list resource <ADDRESS>` command to view the list of resources under a given address.

```starcoin title="Starcoin console" {1}
starcoin% state list resource 0xcada49d6a37864931afb639203501695

{
    ...（There are many output, we observe the last one）
    "0xcada49d6a37864931afb639203501695::MyCounter::Counter": {
        "json": {
          "value": 0
        },
        "raw": "0x0000000000000000"
    }
}
```

You can see the address `0xcada49d6a37864931afb639203501695` had `0xcada49d6a37864931afb639203501695::MyCounter::Counter` type of resource, the content is `"value": 0`.

Some friends may wonder why the `Counter` resource type name is written so long.
Let's first help you recall the concept of FQN.

:::tip Concept - Full Name FQN
*Fully Qualified Name (FQN)* is a computer term that defines the name of a resource (object, function, domain name, file) in a call context. For example:

1. The absolute path name `/path/to/file` of Linux is the *fully qualified file name*, and the relative `./to/file` is a relative path address.
2. In the domain name system, `google.com.` is an *fully qualified domain name*, pay attention to the last `.`.
This means that this domain name should not continue to be recursively resolved.

Then it corresponds to the Move language, and the resource type is published under an address, which belongs to this address.
Address `0x001` can create a resource of `Counter` type, and address `0x002` can also create a resource of `Counter` type.
To distinguish two `Counters`, you need to bring an address and module name.

```
<address>::<module_identifier>::<structure>
```
:::

### Call incr_counter incremental counter

Next, call another function `incr_counter` to try to add one to the counter.

```starcoin title="Starcoin console" {1}
starcoin% account execute-function --function 0xcada49d6a37864931afb639203501695::MyCounter::incr_counter -s 0xcada49d6a37864931afb639203501695 -b

txn 0x032c0eda779157e0ef3949338c3b3e4e6528c7720776d02c2cb0ddd64804f1c2 submitted.
...
```

Check the resources again.
With the previous concept of FQN, this time we will use `state get resource <ADDRESS> [RESOURCE_TYPE]` to view specific resource types under `ADDRESS`.

```starcoin title="Starcoin console" {1}
starcoin% state get resource 0xcada49d6a37864931afb639203501695 0xcada49d6a37864931afb639203501695::MyCounter::Counter

{
  "ok": {
    "json": {
      "value": 1
    },
    "raw": "0x0100000000000000"
  }
}
```

You can see that the `value` of the counter has changed to `1`.

### Another account call

In the previous example, we used the same address `0xcada49d6a37864931afb639203501695` to publish modules, create a counter resource type (dev deploy), and call function add counters (account execute-function).

We will have another account to initialize the counter and the self-increment counter. Suppose a local account is `0x012ABC`

```starcoin title="Starcoin console"
starcoin% account execute-function -s 0x012ABC  --function 0xb19b07b76f00a8df445368a91c0547cc::MyCounter::init_counter -b

starcoin% state get resource 0x012ABC 0xcada49d6a37864931afb639203501695::MyCounter::Counter
```

Readers can observe the changes in resources under `0x012ABC`.

:::info 历史 —— script 和 script function
In order to prevent people from being confused by `scripts` in tutorials read elsewhere, let's briefly talk about the origin of history. *This section can be skipped.*

We use *Python* pip or *Node.js* `npm` to assist in understanding.

Before the emergence of centralized package management hosting platforms such as `pip` and `npm`, we want to install a package, which requires `setup.py install /path/to/package`.
Of course, this is not convenient for the distribution, dissemination and indexing of packages.
Later, with `pip`, how did we do it? The package author first uploaded his own package to the `pip` repository, and the `pip` will store the package and index it.
Ordinary users only need `pip install package_name`.
The `pip` tool will download the source code according to the `package_name` you provided, and then install it.
The two packages are actually installed in the same way.

It now corresponds to Move. Before the `script function` appeared, there was only `script`, and the `script` was written in the `scripts` directory equal to the `sources` directory.

The script is like a local Python package. The script can be compiled into bytecode. When calling the script, you need to create a transaction. Bring the compiled bytecode in the payload, and the script can be Mov on the node. E The virtual machine executed it. The right should be in the Starcoin console:

```
starcoin% account execute-script </path/to/mv_file>
```

As an alternative to `script`, `script function` [has been added to the Move language](https://github.com/move-language/move/commit/e0a3acb7d5e3f5dbc07ee76b47dd05229584d4d0).
Analogy to packages stored in the pip repository.
The `script function` will be published to an address together in the module (just as the package author publishes the package in `pip`).
At this time, to call the `script`, you need to create a transaction, and the address of the published code in `payload`.
Corresponding to the Starcoin console are:

```
starcoin% account execute-function --function  <0xAddress>::<module>::<function> --arg xxx
```

Of course, Move is also an evolving language, and `public(script) fun` [is being replaced by `public entry`](https://github.com/move-language/move/pull/186). Let's wait and see.

To sum up:

1. The `script` may be abandoned, and it is recommended to use the `script function` as the entry method.
2. The next version of Move will replace `public(script) fun` with `public entry fun`.
:::

## What course to follow

Congratulations, you have completed the whole process of writing, deploying and invoking a simple contract.

The complete code repository is [here](https://github.com/starcoinorg/starcoin-cookbook/tree/main/examples/my-counter).

Next,

* You can systematically learn the Move language through the [Move language](./03-move-language/README.md)
* View [more Move examples]
* Learn [how to Debug/test Move module](./97-move-test/01-move-unit-test.md)
* Learn about the [Starcoin Move Framework](./starcoin-framework/)
* Advanced Move can be learned through [Move Advanced Development].
* Learn about the [Move specification language and Move Prover](./100-move-prover/01-move-spec-language.md) to develop safer Move applications
* Explore more features of [Move Package Manager](./05-move-package-manager.md)

Or you can directly enter the world of Dapp.
* [Web3 and DApp develop](../web3/)
