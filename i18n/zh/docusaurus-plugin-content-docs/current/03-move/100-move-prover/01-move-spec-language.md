# Move 规范语言

## 表达式 (Expression)
MSL 中的表达式是 Move 程序表达式的子集以及一组附加结构，如以下所述。

### 类型系统
MSL 中的类型系统和 Move 的很相似，但有几点区别：
- Move 中的所有整数类型（`u8`、`u64` 和 `u128`）视为同一类型。
在 MSL 中，这种类型被称为 `num`，它是一种任意精度的*有符号*整数类型。
当 MSL 引用类型为 `u8` 这类整数的变量名时，它将自动扩展为 `num`.
这就允许在 MSL 中使用类似 `x + 1 <= MAX_U128` 或者 `x - y >= 0` 这样的表达式，
而不需要担心上溢或下溢。
- Move 中形为 `&T`、`&mut T` 的类型，在 MSL 中直接视为和 `T` 等价的类型。
相等性判断被解释为值相等性。
（也就是说，如果在 Move 中有两个引用类型的数据 `r1` 和 `r2`，在 MSL 中写 `r1 == r2` 将被解释成 `*r1 == *r2`）
在 MSL 中，不需要像在 Move 程序语言中那样解引用：表达式会根据需要自动解引用。
之所以可以做这种简化，是因为 MSL 无法修改 Move 程序中的值，并且 Move 程序也无法判断
引用的相等性，所以在 MSL 中也没有这个必要。
（注意，它导致了一点表现力的限制，即对于 [返回 `&mut T`](#表现力) 的函数，不过这在实际开发场景中很少遇到，而且也有别的解决方法。）
- 有一个附加类型叫 `type`，它是所有类型的类型。它只能用于量词中。
- 还有一种附加类型叫 `range`，它表示整数区间，用 `n..m` 的方式表示一个区间。

### 命名
名称解析的工作方式类似于 Move 语言。
`use` 声明可以为导入的名称引入别名。
MSL 函数和变量名必须以小写字母开头。
Schema 名称被视为类型，并且必须以大写字母开头（Schema 是一种新的命名构造，[后面](#TODO)会讨论到）。

Move 函数、MSL 函数、Move 类型和 Schema 都在相同的命名空间，因此如果通过 Move 的 `use` 声明引入别名，它们必须不能有歧义。
由于用的是同一命名空间，MSL 函数的名称不能与 Move 函数的名称相同。
为了解决这个问题，约定俗成，我们给 MSL 函数添加前缀：
比如对于 Move 函数 `has_access`，对应的 MSL 函数叫 `spec_has_access`。

### 操作符
除了 `&`、`&mut` 和 `*` (解引用)， MSL 支持所有 Move 中全部运算符。

除了 Move 中已有的操作符，MSL 还支持向量下标 `v[i]`、
切片 `v[i..j]` 和区间构造 `i..j`（整数区间是一种新的内置类型，称为 `range`）。
此外，还支持布尔蕴涵 `p ==> q`，它比 `!p || q` 更直观。

### 函数调用
像 Move 一样，MSL 表达式也可以调用函数。但是，被调用的必须是 [MSL 函数](#辅助函数) 或 Move 的 **纯**函数。

Move 中的纯函数是指，不修改全局状态、并且不使用 MSL 不支持的 Move 表达式（[上面](#操作符)提到的引用相关）的函数。

一个扩展是，如果 Move 函数定义包含直接的 `assert`，则从 MSL 表达式调用它时将忽略断言，并且该函数将被视为纯函数。例如：
```rust
fun get(addr: address): &T { assert(exists<T>(addr), ERROR_CODE); borrow_global<T>(addr) }
```
此函数是纯函数，可以从 MSL 表达式中调用。断言将被忽略，函数将被解释为：
```rust
spec fun get(addr: address): T { global<T>(addr) }
```
这是因为 MSL 具有 [偏语义](#偏语义)。

### 语句
支持有限制的顺序形式，形如 `{ let x = foo(); x + x }`，以及 if-then-else。
不支持 Move 语言的其他语句形式。

### 打包和解包
支持打包表达式。但目前*不支持*解包表达式。

### 量词
支持*全称量词*和*存在量词*。一般形式是
```rust
forall <绑定>, ..., <绑定> [ where <表达式> ] : <表达式>
exists <绑定>, ..., <绑定> [ where <表达式> ] : <表达式>
```
- 绑定允许两种形式：`名称: 类型` 或 `名称 in <表达式>`。第二种形式中的`<表达式>`目前必须是 `range` 或 `vector<T>`。
- 可选约束 `where <表达式>` 允许限制量化范围。`forall x: T where p: q` 等价于 `forall x: T : p ==> q`；
而 `exists x: T where p: q` 等价于 `exists x: T : p && q`。

注意也可以对类型进行量化。例如：
```rust
forall t: type, addr: address where exists<R<t>>(addr): exists<T<t>>(addr)
```

### 选择操作符
选择操作符允许选择满足谓词的值：
```rust
choose a: address where exists<R>(a) && global<R>(a).value > 0
```
如果谓词不可满足，则选择的结果将是不确定的（参见[偏语义](#偏语义)的讨论）。

选择还可以以从一组整数中选择*最小值*的形式出现，如：
```rust
choose min i: num where in_range(v, i) && v[i] == 2
```

### 内置函数
MSL 支持许多内置常量和函数。其中大部分在 Move 语言中不可用：

- `MAX_U8: num`, `MAX_U64: num`, `MAX_U128: num` 返回对应类型的最大值。
- `exists<T>(address): bool` 如果资源 T 存在于地址，则返回 true。
- `global<T>(address): T` 返回地址处的资源值。
- `len<T>(vector<T>): num` 返回向量的长度。
- `update<T>(vector<T>, num, T>): vector<T>` 返回在给定索引处替换元素的新向量。
- `vec<T>(): vector<T>` 返回空向量。
- `vec<T>(x): vector<T>` 返回单例向量。
- `concat<T>(vector<T>, vector<T>): vector<T>` 返回两个向量连接后的新向量。
- `contains<T>(vector<T>, T): bool` 如果元素在向量中，则返回 true。
- `index_of<T>(vector<T>, T): num` 返回向量中元素的索引，如果不包含向量，则返回向量的长度。
- `range<T>(vector<T>): range` 返回向量的索引范围。
- `in_range<T>(vector<T>, num): bool` 如果数字在向量的索引范围内，则返回 true。
- `in_range<T>(range, num): bool` 如果数字在范围内，则返回 true。
- `update_field(S, F, T): S` 更新结构中的字段，保留其他字段的值，其中`S`是结构体，`F`是`S`中的字段名称，`T`是更新后字段的值。
- `old(T): T` 返回传入参数在函数入口处的原始值。允许在 `ensures` 后置条件、内联 spec 块（有附加限制）和某些形式的不变量中出现，后面会有讨论。
- `TRACE(T): T` 在语义上是恒等函数，能让 Prover 创建的错误消息中的参数值可视化。

内置函数位于模块的未命名外部范围内。如果模块定义了一个函数 `len`，那么这个定义将隐藏相应的内置函数。
要在这种情况下访问内置函数，可以用 `::len(v)` 这种写法。

### 偏语义
在 MSL 中，表达式具有偏语义（partial semantics）。
对比之下，Move 程序表达式具有全语义（total semantics），因为它们要么有返回值，要么中止。

形如 `e[X]` 的表达式依赖于某变量 `X`，它对于 `X` 的某些赋值可能有意义，但对于其他赋值则没有。
如果整个表达式结果不需要子表达式的值，则子表达式无意义也没关系。
因此，写 `y != 0 && x / y > 0` 还是 `x / y > 0 && y != 0` 并不重要：布尔运算符是可交换的。

这一基本原则在更高级的语言构造中也适用。
例如，在 spec 中，条件以怎样的顺序书写无关紧要：
`aborts_if y != 0; ensures result == x / y;` 与 `ensures result == x / y; aborts_if y != 0;` 一样。
此外，`aborts_if P; aborts_if Q;` 与 `aborts_if Q || P` 也相同。

此外，偏语义的原则被继承到 [规范辅助函数](#辅助函数) 中，它们的行为是透明的。
具体来说，内联这些函数和调用它们（按表达式调用的参数传递语义）等价。

## 规范 (Specification)
规范包含在*规范块*（Specification block, 本文缩写为 spec 块）中，它可以作为模块成员出现在 Move 函数当中。
下面列出了各种类型的 spec 块，后续会有更多说明。
```rust
module M {
    resource struct Counter {
        value: u8,
    }

    public fun increment(a: address) acquires Counter {
        let r = borrow_global_mut<Counter>(a);
        spec {
            // 针对此处代码的规范（只有这种 spec 块的位置不能随便移动）
            ...
        };
        r.value = r.value + 1;
    }

    spec increment {
        // 针对 increment 函数的规范
        ...
    }

    spec Counter {
        // 针对 Counter 结构的规范
        ...
    }

    spec schema Schema {
        // 声明一个 Schema 的 spec 块
        ...
    }

    spec fun f(x: num): num {
        // 声明辅助函数的 spec 块
        ...
    }

    spec module {
        // 对于整个模块的 spec 块
        ...
    }
}
```
除了 Move 函数中的 spec 块之外，spec 块的位置是无关紧要的。此外，结构、函数或模块的规范块可以重复多次，累积内容。

### 分离规范
除了将规范放入与常规 Move 定义相同的模块中，还可以将它们放入单独的“规范”模块中，该模块可以存在于相同或不同的文件中：
```rust
module M {
    ...
}
spec M {
    spec increment { .. }
}
```
规范模块的语法与常规模块的语法相同，但是不允许定义 Move 函数和结构。

规范模块必须与它所对应的 Move 模块一起编译，而不能单独编译和验证。

如果 Move 定义相距甚远（例如在不同的文件中），则可以使用此函数的签名来扩充 Move 函数的规范，以提供足够的上下文来理解规范。
在常规模块和规范模块中可以选择启用此语法：
```rust
public fun increment(a: address) acquires Counter { .. }
...
spec increment(a: address) { .. } // 注意这里加上了函数签名，而不是一个简单的 spec increment { ... }
```

### 编译指示和属性
编译指示（pragma）和属性（property）是影响规范解释的通用机制。它们也是在成为主流语法的一部分之前尝试新概念的扩展点。
这里我们简单介绍它们的一般语法；个别情况将在后面讨论。

编译指示的一般形式是：
```rust
spec .. {
    pragma <名称> = <字面值>;
}
```
属性的一般形式是：
```rust
spec .. {
    <指令> [<名称> = <字面值>] <内容>; // ensures、aborts_if、include 等
}
```
`<字面值>` 可以是 MSL（或 Move 语言）支持的任何值。也可以省略赋值，在这种情况下使用默认值。
例如，通常用 `pragma option;`，它相当于 `pragma option = true;` 的简写。

除了单个编译指示或属性，还可以提供一个列表，如 `invariant [global, isolated] P`.

### 编译指示的继承
如果在模块层级的 spec 块中用 pragma 设置一个值，这个值默认会适用到模块中所有其他 spec 块当中。
函数或结构的 spec 块中的具体 pragma 可以覆盖继承的默认值。
此外，一些 pragma 的默认值可以通过配置 Prover 来定义。

下面这个例子用到了 `verify` 指示，它用于打开或关闭验证。
```rust
spec module {
    pragma verify = false; // 默认情况下，不要验证这个模块中的规范...
}

spec increment {
    pragma verify = true; // ...但是需要验证这个 increment 函数
    ...
}
```

### 通用编译指示和属性
许多编译指示控制验证的通用行为。这些列在下表中。

| 名称                             | 说明 |
|---------------------------------|----|
| `verify`     | 打开或关闭验证
| `intrinsic`  | 让函数跳过 Move 实现并使用 Prover 的 native 实现。这样就可以让函数表现得像 native 的一样，即使它实际上是用 Move 实现的
| `timeout` | 为函数或模块设置超时（单位为秒）。覆盖命令行选项提供的超时。
| `verify_duration_estimate`     | 设置函数验证所需时间的估计值（单位为秒）。如果它比 `timeout` 时间更长，则跳过验证。
| `seed` | 为函数或模块设置随机种子。覆盖命令行选项提供的种子。

以下属性控制验证的通用行为：

| 名称       | 说明 |
|------------|--------------
| `[deactivated]` | 从验证中排除关联的条件。

### 前置/后置状态
spec 块中的一些条件会同时用到*前置状态*和*后置状态*，将它们相互关联。
函数规范就是一个例子：在 `ensures P` 条件中，前置状态（函数入口处）和后置状态（函数退出处）通过谓词 `P` 关联。
不过这个概念其实更普遍，也适用于不变量（invariant），其中全局更新前后两个状态分别是前置状态和后置状态。

在前后置状态都可用的环境下，表达式默认在后置状态中被求值。
若要在前置状态中求值表达式，可以使用内置函数 `old(exp)`，该函数返回前置状态参数的求值。
注意 `exp` 中的每个子表达式都是在前置状态中计算的，包括对辅助函数的调用。

这里所讨论的「状态」包括对全局资源内存的赋值、和对函数的任何类型为 `&mut T` 的参数的赋值。例子：
```rust
fun increment(counter: &mut u64) { *counter = *counter + 1 }
spec increment {
    // 和函数的类型为 `&mut T` 的参数的赋值
    ensures counter == old(counter) + 1;
}

fun increment_R(addr: address) {
    let r =  borrow_global_mut<R>(addr);
    r.value = r.value + 1;
}
spec increment_R {
    // 对全局资源内存的赋值
    ensures global<R>(addr).value == old(global<R>(addr).value) + 1;
}
```

### 辅助函数
MSL 允许定义辅助函数。然后可以在表达式中使用这些函数。

辅助函数使用以下语法定义：
```rust
spec fun exists_balance<Currency>(a: address): bool { exists<Balance<Currency>>(a) }
```

如例所示，辅助函数可以用泛型。此外，它们也可以访问全局状态。

对于前置还是后置状态上，辅助函数是中立的。也就是说，它们在当前活动的状态下进行求值。
例如，为了查看前置状态中是否存在余额，使用 `old(exists_balance<Currency>(a))`.
因此，在辅助函数的定义中不允许使用 `old(..)` 表达式。

辅助函数是偏函数；参见 [偏语义](#偏语义) 的讨论。

#### 无解释函数
只要省略函数体，辅助函数就会被定义为**无解释**的：
```rust
spec fun something(x: num): num;
```
无解释函数允许 Prover 赋予它任意含义，只要它在给定的验证上下文中是一致。
无解释函数是规范抽象的有用工具（另见 [此处](#TODO)）。

#### 公理
辅助函数的含义可以通过使用**公理**来进一步约束。目前，公理必须包含在模块的 spec 块中：

```move
spec module {
    axiom forall x: num: something(x) == x + 1;
}
```
应谨慎使用公理，因为它们可能通过相互矛盾的假设在规范逻辑中引入不可靠的推论。
Move Prover 支持通过 `--check-inconsistency` 命令行选项通过
[冒烟测试](https://zh.wikipedia.org/wiki/%E5%86%92%E7%83%9F%E6%B5%8B%E8%AF%95_(%E8%BD%AF%E4%BB%B6))
检测不可靠的假设。

### let 绑定
TODO

## 表现力 (Expressiveness)

MSL 几乎可以完整表示的 Move 语言语义（不过目前还没有形式化的证明），但有一个例外：返回 `&mut T` 类型的函数。

考虑以下代码：
```rust
struct S { x: u64, y: u64 }

fun x_or_y(b: bool, s: &mut S): &mut u64 {
    if (b) &mut s.x else &mut s.y
}
spec x_or_y {
    ensures b ==> result == s.x;
    ensures !b ==> result == s.y;
}
```

我们没法在 MSL 中指定 `x_or_y` 函数的完整语义，因为 MSL 中不能表达可变引用的语义。
虽然可以表达「在函数结束时返回的引用指向的值」有什么性质，但后续效果，比如 `*x_or_y(b, &mut s) = 2` 无法被表达。

但是，Move Prover 其实**可以理解**这样的函数的意义——只是我们可以用 MSL 表达的性质被限制了。
实际上，这意味着我们不能把函数 `x_or_y` 变成不透明的，并且必须让 Prover 直接看函数实现来做验证。
具体来说，我们可以验证以下函数，它可以是不透明的：
```rust
fun x_or_y_test(s: S): S {
    *x_or_y(true, &mut s) = 2;
    s
}
spec x_or_y_test {
    pragma opaque;
    ensures result.x == 2;
    ensures result.y == s.y;
}/in
// TODO: Typo
```