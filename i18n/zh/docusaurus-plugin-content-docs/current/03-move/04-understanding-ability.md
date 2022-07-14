# 认识 Ability

Move 具有独特的类型系统 —— 非常灵活和可定制，每种类型最多可以拥有4种能力（Ability）。
这4种能力分别被4个限定符所修饰，它们定义了类型的值是否可以被复制、丢弃和存储。

> 这四种能力（Ability）的限制符分别是：`copy`，`drop`，`store` 和 `key`，

它们的功能分别是：

- `copy` - 被修饰的值可以被复制。
- `drop` - 被修饰的值在作用域结束时可以被丢弃。
- `key` - 被修饰的值可以作为键值对全局状态进行访问。
- `store` - 被修饰的值可以被存储到全局状态。

## Ability 语法

基本类型和内建类型的能力是预先定义好的并且不可改变：integers，vector，addresses 和 boolean 类型的值先天具有 copy，drop 和 store 能力。

然而，结构体的能力可以由开发者按照下面的语法进行添加：

```
struct NAME has ABILITY [, ABILITY] { [FIELDS] }
```

下面是一些例子：

```
module Library {

    // each ability has matching keyword
    // multiple abilities are listed with comma
    struct Book has store, copy, drop {
        year: u64
    }

    // single ability is also possible
    struct Storage has key {
        books: vector<Book>
    }

    // this one has no abilities 
    struct Empty {}
}
```

## 不带能力限定符的结构体

在进入能力的具体用法之前，我们不妨先来看一下，如果结构体不带任何能力会发生什么？

```
module Country {
    struct Country {
        id: u8,
        population: u64
    }

    public fun new_country(id: u8, population: u64): Country {
        Country { id, population }
    }
}
```

```
script {
    use {{sender}}::Country;

    fun main() {
        Country::new_country(1, 1000000);
    }
}
```

运行上面的代码会报如下错误：

```
error: 
   ┌── scripts/main.move:5:9 ───
   │
 5 │     Country::new_country(1, 1000000);
   │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot ignore values without the 'drop' ability. The value must be used
   │
```

方法 `Country::new_country()` 创建了一个值，这个值没有被传递到任何其它地方，所以它应该在函数结束时被丢弃。
但是 Country 类型没有 Drop 能力，所以运行时报错了。现在让我们加上 Drop 限制符试试看。

## drop

按照能力（Ability）的语法我们为这个结构体增加 drop 能力，这个结构体的所有实例将可以被丢弃。

```
module Country {
    struct Country has drop { // has <ability>
        id: u8,
        population: u64
    }
    // ...
}
```

现在，Country 可以被丢弃了，代码也可以成功执行了。

```
script {
    use {{sender}}::Country;

    fun main() {
        Country::new_country(1, 1000000); // value is dropped
    }
}
```

注意 Destructuring 并不需要 drop 能力。

## copy

我们学习了如何创建一个结构体 Country 并在函数结束时丢弃它。
但是如果我们想要复制一个结构体呢？默认情况下结构体是按值传递的，制造一个结构体的副本需要借助关键字 copy (我们会在 下一章 更加深入的学习)：

```
script {
    use {{sender}}::Country;

    fun main() {
        let country = Country::new_country(1, 1000000);
        let _ = copy country;
    }   
}
```

```
   ┌── scripts/main.move:6:17 ───
   │
 6 │         let _ = copy country;
   │                 ^^^^^^^^^^^^ Invalid 'copy' of owned value without the 'copy' ability
   │
```

正如所料，缺少 copy 能力限定符的类型在进行复制时会报错：

```
module Country {
    struct Country has drop, copy { // see comma here!
        id: u8,
        population: u64
    }
    // ...
}
```

修改后的代码就可以成功执行了。

## 小结

基本类型缺省具有 store，copy 和 drop 限制。
缺省情况下结构体不带任何限制符。
copy 和 drop 限制符定义了一个值是否可以被复制和丢弃。
一个结构体有可能带有所有4种限制符。
