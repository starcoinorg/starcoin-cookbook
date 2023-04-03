# 1. Move虚拟机简要介绍

## 0. 前言

下面的内容分为两部分，第一部分介绍了 Move 虚拟机的结构: 作为一个栈式虚拟机，它的操作数栈、调用栈。另外还介绍了 Move 虚拟机中，虚拟机提供了数据结构来支持函数调用和返回。

第二部分介绍了 Move 虚拟机中比较关键的字节码指令的作用。

要彻底理解 Move 虚拟机字节码的指令工作原理，还需要理解 Move 语言编译器的关键编译过程。

例如：编译器何时生成 MoveLoc 指令，何时生成 CopyLoc 指令，解引用是用哪条指令实现的，给结构体的字段赋值是哪条指令实现的，借用检查发生在编译的哪个阶段，move_to 和 move_from 如何实现，为什么 Move 没有全局变量。这些问题，需要从编译阶段入手，了解编译的大致过程，结合虚拟机的功能，做整体分析。

## 1. 虚拟机结构

解释器：

```rust
pub(crate) struct Interpreter {
		 /// 操作数栈，Move虚拟机中的Value保存在这里并用于堆栈操作
    operand_stack: Stack,
	  /// 活动函数的调用栈
    call_stack: CallStack,
}
```

`Interpreter` 结构体中，有一个操作数栈，它的作用是所有的`算术、关系、比较、copy、move、pack、unpack` 等等除了调用native函数和普通函数之外的所有操作符，都使用 `operand_stack` 作为操作数栈。

`call_stack` 专门用作调用普通函数或native函数的调用栈。

所以我们知道 Move 的虚拟机，是一个栈式的虚拟机，有三点可以证明：

- 它没有内存相关的例如 `mem_set、mem_get` 类的指令，这类指令都接受内存地址作为操作数，自然它也没有内存的概念（例如wasm虚拟机就有内存的概念，它的内存是用一个连续的平坦的字节数组来模拟）；
- 它有操作数栈，操作符使用的是 `operand_stack`，而不是使用寄存器来做运算；
- 它有 `locals` 数组，用来保存局部变量，而不像寄存器类机器一样，把局部变量保存在内存中栈的区域。

下面的 `Frame` 结构体，就代表了一个函数执行时的栈桢：

- `pc` 是当前执行的指令序号
- `locals` 保存函数的局部变量的数组

```rust
struct Frame {
    pc: u16,
    locals: Locals,
    function: Arc<Function>,
    ty_args: Vec<Type>,
}
```

多个函数之间嵌套调用时，在 `Interpreter` 结构体的 `call_stack` 中，保存了多个 `Frame` 结构体，可以看到 `CallStack` 类型如下：

```rust
struct CallStack(Vec<Frame>);
```


并且 `CallStack` 类型有如下函数：

```rust
impl CallStack {
    /// Create a new empty call stack.
    fn new() -> Self {
        CallStack(vec![])
    }

    /// Push a `Frame` on the call stack.
    fn push(&mut self, frame: Frame) -> ::std::result::Result<(), Frame> {
        if self.0.len() < CALL_STACK_SIZE_LIMIT {
            self.0.push(frame);
            Ok(())
        } else {
            Err(frame)
        }
    }

    /// Pop a `Frame` off the call stack.
    fn pop(&mut self) -> Option<Frame> {
        self.0.pop()
    }

    fn current_location(&self) -> Location {
        let location_opt = self.0.last().map(|frame| frame.location());
        location_opt.unwrap_or(Location::Undefined)
    }
}
```
上面的函数 `push、pop` 是用来在函数调用进入和退出的时候，保存和取消函数栈帧 `Frame` 的函数。


## 2. 字节码指令


下面是所有虚拟机支持的字节码类型：

```rust
    /// 弹出并丢弃在栈顶的值。
    /// 栈顶的值必须是一个可以拷贝的类型。
    Pop,

    /// 从函数返回，根据函数签名中的返回类型可能带有返回值。
    /// 返回值被 push 到栈上。
    /// 已执行的函数的函数签名定义了 Ret 操作码的语义。
    Ret,

    /// 如果栈顶的值是 true，跳转到 CodeOffset 位置处的指令。
    /// Code offsets 是想对于指令流的开始来说的。
    BrTrue(CodeOffset),

    /// 如果栈顶的值是 false，跳转到 CodeOffset 位置处的指令。
    /// Code offsets 是想对于指令流的开始来说的。
    BrFalse(CodeOffset),

    /// 无条件跳转到 CodeOffset 处的指令。
    /// Code offsets 是想对于指令流的开始来说的。
    Branch(CodeOffset),

    /// 将一个 U8 的常量 push 到栈上。
    LdU8(u8),

    /// 将一个 U64 的常量 push 到栈上。
    LdU64(u64),

    /// 将一个 U128 的常量 push 到栈上。
    LdU128(u128),

    /// 将栈顶的值转换为 U8
    CastU8,

    /// 将栈顶的值转换为 U64
    CastU64,

    /// 将栈顶的值转换为 U128
    CastU128,

    /// push一个常量到栈上。
    /// 该值通过 "常量池索引" 从 "常量池" 加载和反序列化（根据其类型）
    LdConst(ConstantPoolIndex),

    /// push "true" 到栈上
    LdTrue,

    /// push "false" 到栈上
    LdFalse,

    /// 将 `LocalIndex` 标识的 局部变量 推送到堆栈上。
    /// 值会被拷贝并且 局部变量 依然可以安全的使用。
    CopyLoc(LocalIndex),

    /// 将 `LocalIndex` 标识的 局部变量 推送到堆栈上。
    /// 局部变量 被移动并且从那时起使用无效，除非 store 操作在对该 局部变量 进行任何读取之前写入到另外的 局部变量。
    MoveLoc(LocalIndex),

    /// 从栈顶弹出一个值并且将它存储到由 LocalIndex 指定的函数 locals 数组中。
    StLoc(LocalIndex),

    /// 调用一个函数。
    /// 栈上已经存在调用参数，参数是从第一个到最后一个 push 到栈中的。
    /// 接着参数从栈中被消耗，并且push到函数的 locals 即局部变量数组中。
    /// 函数的返回值放在栈上，并且对调用者可用。
    Call(FunctionHandleIndex),
    CallGeneric(FunctionInstantiationIndex),

    /// 创建一个由 `StructHandleIndex` 指定的类型的实例，并且将这个实例 push 到栈上。
    /// 结构体所有字段的值，必须以它们在结构体中出现的顺序，依次的 push 栈上。
    /// Pack 指令必须完整的初始化结构体的实例，意味着如有字段是结构体，则嵌套初始化。
    /// 结构体实例，在栈上的类型是 Struct 类型，Struct 类型相当与把 栈上的多个元素打包了。
    Pack(StructDefinitionIndex),
    PackGeneric(StructDefInstantiationIndex),

    /// 将栈上打包的 Struct 类型中的 items 字段，解包后取出所有字段，并放在栈上
    Unpack(StructDefinitionIndex),
    UnpackGeneric(StructDefInstantiationIndex),

    /// 读取一个引用。引用在栈上，它会被消耗并且读取后的值也会放在栈上。
    /// 读取一个引用会读取一个被引用对象的拷贝。
    /// 如此，ReadRef 要求被读取的值有 `Copy` 的特性。
    ReadRef,

    /// 将栈上已经存在的Value写入到引用的Value中。
    /// WriteRef 要求值的类型具有 `Drop` 能力，因为之前的值丢失了
    WriteRef,

    /// 将一个可变的的引用转变为一个不可变引用
    FreezeRef,

    /// 将一个由 LocalIndex 指定的局部变量的可变引用放在栈上
    /// 局部变量不能是一个引用
    MutBorrowLoc(LocalIndex),

    /// 将一个由 LocalIndex 指定的局部变量的不可变引用放在栈上
    /// 局部变量不能是一个引用
    ImmBorrowLoc(LocalIndex),

    /// 将一个由 FieldHandleIndex 指定的字段的可变引用放在栈上
    /// 栈顶必须已经存在一个包含了该字段的容器类型的引用
    MutBorrowField(FieldHandleIndex),

    /// 将一个由 FieldInstantiationIndex 指定的字段的可变引用放在栈上
    /// 栈顶必须已经存在一个包含了该字段的容器类型的可变引用
    MutBorrowFieldGeneric(FieldInstantiationIndex),

    /// 将一个由 FieldHandleIndex 指定的字段的引用放在栈上
    /// 栈顶必须已经存在一个包含了该字段的容器类型的引用
    ImmBorrowField(FieldHandleIndex),

    /// 将一个由 FieldInstantiationIndex 指定的字段的可变引用放在栈上
    /// 栈顶必须已经存在一个包含了该字段的容器类型的可变引用
    ImmBorrowFieldGeneric(FieldInstantiationIndex),

    /// 返回对在作为参数传递的 地址 处发布的类型为 "StructDefinitionIndex" 的实例的可变引用。
    /// 如果这样的对象不存在或引用已被分发，则中止执行。
    /// address 地址 Value 必须已经在栈上存在
    MutBorrowGlobal(StructDefinitionIndex),
    MutBorrowGlobalGeneric(StructDefInstantiationIndex),

    /// 返回对在作为参数传递的 地址 处发布的类型为 "StructDefinitionIndex" 的实例的不可变引用。
    /// 如果这样的对象不存在或引用已被分发，则中止执行。
    /// address 地址 Value 必须已经在栈上存在
    ImmBorrowGlobal(StructDefinitionIndex),
    ImmBorrowGlobalGeneric(StructDefInstantiationIndex),

    Add,
    Sub,
    Mul,
    Mod,
    Div,
    BitOr,
    BitAnd,
    Xor,
    Or,
    And,
    Not,
    Eq,
    Neq,
    Lt,
    Gt,
    Le,
    Ge,
    Abort,
    Nop,

    /// 返回一个地址是否已经 publish 一个 StructDefinitionIndex 类型的对象
    Exists(StructDefinitionIndex),
    ExistsGeneric(StructDefInstantiationIndex),

    /// 移动一个由　栈定的地址指定的 StructDefinitionIndex 类型的实例
    /// 如果那个对象不存在就终止执行
    MoveFrom(StructDefinitionIndex),
    MoveFromGeneric(StructDefInstantiationIndex),

    /// 将栈顶的 Value 实例移动到紧挨着栈顶元素的 `Signer` 的地址上
    /// 如果 StructDefinitionIndex 类型的对象，已经在地址上存在，就停止执行
    MoveTo(StructDefinitionIndex),
    MoveToGeneric(StructDefInstantiationIndex),

    Shl,
    Shr,

    VecPack(SignatureIndex, u64),
    VecLen(SignatureIndex),
    VecImmBorrow(SignatureIndex),
    VecMutBorrow(SignatureIndex),
    VecPushBack(SignatureIndex),
    VecPopBack(SignatureIndex),
    VecUnpack(SignatureIndex, u64),
    VecSwap(SignatureIndex),
```
