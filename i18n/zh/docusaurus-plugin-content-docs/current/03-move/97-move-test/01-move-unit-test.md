## Move 单元测试

Move 的单元测试是通过源语言的三个新的注解来实现的。

- `#[test]`
- `#[test_only]`
- `#[expected_failure]`

它们分别:
- 将一个函数标记为测试，
- 将一个模块或模块成员（使用、函数或结构）标记为仅用于测试。
- 以及标记一个测试预计会失败。

这些注解可以放在一个具有任何可见性的函数上。
每当一个模块或模块成员被注解为 `#[test_only]` 或 `#[test]` ，它将不会被包含在编译的字节码中，除非它是在测试场景下编译的。

### 测试注解 - 意思和用法

`#[test]` 和 `#[expected_failure]` 注解可以选择与参数一起使用或不与参数一起使用。

如果没有参数，注解 `#[test]` 只能放在没有参数的函数上。该注解只是用来标记某个函数是测试函数。
```
#[test] // OK
fun this_is_a_test() { ... }

#[test] // Will fail to compile since the test takes an argument
fun this_is_not_correct(arg: signer) { ... }
```

测试函数还可以加上 `#[expected_failure]` 注解。这个注解标记了这个测试应该产生错误。
想要指定某个具体错误代码，可以给 `#[expected_failure]` 加上参数：`#[expected_failure(abort_code = <code>)]`。
如果它产生不同的错误代码或者不抛错，测试将失败。

```
#[test]
#[expected_failure]
public fun this_test_will_abort_and_pass() { abort 1 }

#[test]
#[expected_failure]
public fun test_will_error_and_pass() { 1/0; }

#[test]
#[expected_failure(abort_code = 0)]
public fun test_will_error_and_fail() { 1/0; }

#[test, expected_failure] // Can have multiple in one attribute. This test will pass.
public(script) fun this_other_test_will_abort_and_pass() { abort 1 }

```


带参数的测试注解的形式是：`#[test(<param_name_1> = <address>, ..., <param_name_n> = <address>)]`.
如果一个函数以这种方式被注释，那么该函数的参数必须是参数 `<param_name_1>, ..., <param_name_n>` 的排列组合.
也就是说，这些参数在函数中出现的顺序和它们在测试注解中的顺序不一定相同，但它们必须能够通过名称相互匹配。
目前测试参数只支持 `signer` 类型。

```
#[test(arg = @0xC0FFEE)] // OK
fun this_is_correct_now(arg: signer) { ... }

#[test(wrong_arg_name = @0xC0FFEE)] // Not correct: arg name doesn't match
fun this_is_incorrect(arg: signer) { ... }

#[test(a = @0xC0FFEE, b = @0xCAFE)] // OK. We support multiple signer arguments, but you must always provide a value for that argument
fun this_works(a: signer, b: signer) { ... }

// somewhere a named address is declared
#[test_only] // test-only named addresses are supported
address TEST_NAMED_ADDR = @0x1;
...
#[test(arg = @TEST_NAMED_ADDR)] // Named addresses are supported!
fun this_is_correct_now(arg: signer) { ... }

```


一个预期失败的注解也可以采取 `#[expected_failure(abort_code = <u64>)]` 的形式。
如果一个测试函数以这样的方式被注释，测试必须以等于 `<u64>` 的错误代码中止。任何其他的失败或中止代码将导致测试失败。

```
#[test, expected_failure(abort_code = 1)] // This test will fail
fun this_test_should_abort_and_fail() { abort 0 }

#[test]
#[expected_failure(abort_code = 0)] // This test will pass
fun this_test_should_abort_and_pass_too() { abort 0 }
```

一个模块和它的任何成员都可以被声明为 `#[test_only]`。
这种情况下，被标记的模块或者成员只有在测试模式下编译时才会被包含在编译的Move字节码中。
也只能在测试函数中调用。

```
#[test_only] // test only attributes can be attached to modules
module ABC { ... }

#[test_only] // test only attributes can be attached to named addresses
address ADDR = @0x1;

#[test_only] // .. to uses
use 0x1::SomeOtherModule;

#[test_only] // .. to structs
struct SomeStruct { ... }

#[test_only] // .. and functions. Can only be called from test code, but not a test
fun test_only_function(...) { ... }

```

### 执行单元测试

Move 项目的单元测试可以通过 `mpm package test` 命令来运行。
运行测试时，每个测试的结果有 PASS、FAIL 或 TIMEOUT 三种。
如果一个测试案例失败了，失败的位置和导致失败的函数名称会报告出来（如果可能的话）。接下来有一个例子。
如果一个测试超过了可以执行的最大指令数，它将被标记为超时。
这个约束可以通过命令参数来改变，其默认值被设置为5000条指令。
此外，虽然测试的结果是确定的，但测试默认是并行运行的，所以测试结果的排序是不确定的，除非只用一个线程运行（见下面的OPTIONS）。

更多的命令参数可以参看help: `mpm pacakge -h` 。

### 例子

下面的例子展示了一个使用单元测试的项目。

首先创建一个空的项目，并进入到项目目录中：

```
$ mpm package new TestExample; cd TestExample
```

然后添加以下内容到 `Move.toml`:

```
[addresses]
Owner="0xAAAA"

[dependencies]
MoveStdlib = { git = "https://github.com/move-language/move.git", subdir="language/move-stdlib", rev = "1817aff44ddfff9d5f815e1975f63cdf03040cb7", addr_subst = { "Std" = "0x1" } }
```

再然后，添加以下代码，放在 sources 目录下。

```
// filename: sources/MyModule.move
module Owner::MyModule {

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
    // Or #[expected_failure] if we don't care about the abort code
    #[expected_failure(abort_code = 0)]
    fun make_sure_zero_coin_fails() {
        let coin = MyCoin { value: 0 };
        let MyCoin { value: _ } = make_sure_non_zero_coin(coin);
    }

    #[test_only] // test only helper function
    fun publish_coin(account: &signer) {
        move_to(account, MyCoin { value: 1 })
    }

    #[test(a = @0x1, b = @0x2)]
    fun test_has_coin(a: signer, b: signer) {
        publish_coin(&a);
        publish_coin(&b);
        assert!(has_coin(@0x1), 0);
        assert!(has_coin(@0x2), 1);
        assert!(!has_coin(@0x3), 1);
    }
}
```

然后，你就可以使用 `mpm pacakge test` 执行这些单元测试了。

```
$ mpm package test
BUILDING MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::MyModule::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::MyModule::make_sure_zero_coin_fails
[ PASS    ] 0x1::MyModule::test_has_coin
Test result: OK. Total tests: 3; passed: 3; failed: 0
```

### 测试命令的参数

#### ` <str>`

在 `mpm package test` 后面加上`<str>`，这将只运行名称中包含有 `<str>` 的测试。

例如，如果我们想只运行名称中含有 "zero_coin "的测试。

```
$ mpm package test zero_coin
CACHED MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::MyModule::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::MyModule::make_sure_zero_coin_fails
Test result: OK. Total tests: 2; passed: 2; failed: 0
```

#### `-i <bound> or --instructions <bound>`


这设置了测试最多所能执行的指令个数。

```
$ mpm package test -i 0
CACHED MoveStdlib
BUILDING TestExample
Running Move unit tests
[ TIMEOUT ] 0x1::MyModule::make_sure_non_zero_coin_passes
[ TIMEOUT ] 0x1::MyModule::make_sure_zero_coin_fails
[ TIMEOUT ] 0x1::MyModule::test_has_coin

Test failures:

Failures in 0x1::MyModule:

┌── make_sure_non_zero_coin_passes ──────
│ Test timed out
└──────────────────


┌── make_sure_zero_coin_fails ──────
│ Test timed out
└──────────────────


┌── test_has_coin ──────
│ Test timed out
└──────────────────

Test result: FAILED. Total tests: 3; passed: 0; failed: 3
```

#### `-s` or `--statistics`
通过这个参数，你可以收集有关测试运行的统计数据，报告每个测试的运行时间和执行的指令。

例如，如果我们想看到上面例子中测试的统计数字。

```
$ mpm package test -s
CACHED MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::MyModule::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::MyModule::make_sure_zero_coin_fails
[ PASS    ] 0x1::MyModule::test_has_coin

Test Statistics:

┌───────────────────────────────────────────────┬────────────┬───────────────────────────┐
│                   Test Name                   │    Time    │   Instructions Executed   │
├───────────────────────────────────────────────┼────────────┼───────────────────────────┤
│ 0x1::MyModule::make_sure_non_zero_coin_passes │   0.009    │             1             │
├───────────────────────────────────────────────┼────────────┼───────────────────────────┤
│ 0x1::MyModule::make_sure_zero_coin_fails      │   0.008    │             1             │
├───────────────────────────────────────────────┼────────────┼───────────────────────────┤
│ 0x1::MyModule::test_has_coin                  │   0.008    │             1             │
└───────────────────────────────────────────────┴────────────┴───────────────────────────┘

Test result: OK. Total tests: 3; passed: 3; failed: 0
```

#### `-g` or `--state-on-error`

这个参数将打印任何测试失败的全局状态。

例如，如果我们在 `MyModule` 的例子中加入以下（失败的）测试。

```
module Owner::MyModule {
    ...
    #[test(a = @0x1)]
    fun test_has_coin_bad(a: signer) {
        publish_coin(&a);
        assert!(has_coin(@0x1), 0);
        assert!(has_coin(@0x2), 1);
    }
}
```

运行测试，我们会得到以下结果：

```
$ mpm package test -g
CACHED MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::MyModule::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::MyModule::make_sure_zero_coin_fails
[ PASS    ] 0x1::MyModule::test_has_coin
[ FAIL    ] 0x1::MyModule::test_has_coin_bad

Test failures:

Failures in 0x1::MyModule:

┌── test_has_coin_bad ──────
│ error[E11001]: test failure
│    ┌─ /home/tzakian/TestExample/sources/MyModule.move:47:10
│    │
│ 44 │      fun test_has_coin_bad(a: signer) {
│    │          ----------------- In this function in 0x1::MyModule
│    ·
│ 47 │          assert!(has_coin(@0x2), 1);
│    │          ^^^^^^^^^^^^^^^^^^^^^^^^^^ Test was not expected to abort but it aborted with 1 here
│
│
│ ────── Storage state at point of failure ──────
│ 0x1:
│       => key 0x1::MyModule::MyCoin {
│           value: 1
│       }
│
└──────────────────

Test result: FAILED. Total tests: 4; passed: 3; failed: 1
```