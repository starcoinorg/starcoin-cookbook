# 3. MoveVM资源修改和销毁的原理
------

## 0. MoveVM 中资源修改和销毁的原理

### 0.1 资源修改编译过程

在之前的文章中，我们分析了 Move 中资源的创建在 Move 虚拟机中的实现方式，这篇内容分析资源创建后的修改和销毁。

在 Move 中，当使用 `move_to` 为某个账户创建了一个资源之后，就可以将这个资源借用出来，并修改它。

例如下面的 Move 代码：

```rust
public fun set_value(addr: address, value: u64) acquires Counter {
    let counter = borrow_global_mut<Counter>(addr);
    counter.i = value;
}
```

编译器输出的字节码如下：

```
public set_value(counter: address) {
B0:
	0: MoveLoc[0](addr: address)
	1: MutBorrowGlobal[0](Counter)
	2: StLoc[2](counter: &mut Counter)
	3: MoveLoc[1](value: u64)
	4: MoveLoc[2](counter: &mut Counter)
	5: MutBorrowField[0](Counter.i: u64)
	6: WriteRef
	7: Ret
}
```

下面我们对字节码列表中的指令逐一解析，让大家能看明白大致的编译过程。

不过在开始之前，先回顾一下 Move 虚拟机中代表函数栈帧的结构：

```rust
struct Frame {
    pc: u16,
    locals: Locals,
    function: Arc<Function>,
    ty_args: Vec<Type>,
}
```

我们看到 `Frame` 结构体 中有一个 `locals` 字段，它其实是一个数组，其中保存了函数的局部变量，也就是说，函数执行之前，所有的局部变量要先保存在这个数组中。

函数的实参和函数的局部变量，组合在一起，统称为函数的局部变量。

下面３个指令是编译第一行代码的结果：

```let counter = borrow_global_mut<Counter>(addr);```

1. `MoveLoc[0](account: &signer)`  指令把函数参数 `account` 从 `locals` 数组中取出，并放在操作数栈上。
2. `MutBorrowGlobal[0](Counter)` 从栈上弹出一个账户地址，并从账户信息和资源对象组成的路径中读取对应的 GlobalValue 资源，然后将读出的资源 GlobalValue 资源保存在内存中每个账户的 DataCache 中，最后生成一个引用对象并放在操作数栈上，这个对象引用了这个放在 DataCache 中的GlobalValue 对象。现在操作数栈上有一个引用对象。
3. `StLoc[2](counter: &mut Counter)` 将上一步从账户地址下借用的 Counter 对象的引用，在 locals 数组中找到counter，并引用到局部变量 counter。

下面４个指令是，是编译第二行代码的结果：

```counter.i = value;```

1. `MoveLoc[1](value: u64)` 把局部变量 value 的值，从 locals 数组中放在操作数栈的栈顶。
2. `MoveLoc[2](counter: &mut Counter)` 将 counter 这个引用类型的变量，放在操作数栈的栈顶。
3. `MutBorrowField[0](Counter.i: u64)` 将 counter.i 这个变量再次借用：counter 已经是一个结构体的引用，`MutBorrowFiel` 指令再次借用结构体中的字段。指令生成对 counter.i 对象的引用对象，并将引用对象并放在操作数栈上。
4. `WriteRef` 从操作数栈上弹出两个对象：需要写入的值 value 和 需要被写入的引用 counter.i，最后将值写入到引用中。


### 0.2 资源销毁编译过程

在 Move 中，当一个资源结构体具有 drop ability，就可以使用 `move_from()` 函数从账户中移除并销毁这个资源结构体。

例如下面的 Move 代码：

```rust
public fun remove(account: address) acquires Counter {
    let _ = move_from<Counter>(account);
}
```
 
 函数 `remove()` 编译生成的字节码如下：
 
```
public remove() {
B0:
	0: MoveLoc[0](account: address)
	1: MoveFrom[0](Counter)
	2: Pop
	3: Ret
}
```

下面我们对字节码列表中的指令逐一解析，让大家能看明白大致的编译过程。

1. `0: MoveLoc[0](account: address)` 指令将 account 变量从 locals 数组移动到操作数栈的栈顶。
2. `MoveFrom[0](Counter)` 指令是源码中 `move_from()` 函数的具体实现。`MoveFrom` 和 `move_to()` 函数一样接受一个参数，此时操作数栈中正好有一个元素： `account`。`MoveFrom`  指令从栈中取出一个元素并执行执行，最终将  `account` 账户下的 `Counter` 类型的资源移除。
3. `Pop` 因为我们没有使用这个从用户账户下移出的引用，所以直接Pop，从栈顶弹出它。

## 1. WriteRef 指令实现资源修改

上面的内容分析了对用户账户下的资源做修改时，编译器生成了 `WriteRef` 指令，下面我们分析 `WriteRef` 指令在虚拟机中的实现源码。

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
Bytecode::WriteRef => {
    // 从操作数栈上弹出引用类型的对象
    let reference: Reference = interpreter.operand_stack.pop_as::<Reference>()?;
    // 从操作数栈上弹出值类型对象
    let value = interpreter.operand_stack.pop()?;
    gas_status.charge_instr_with_size(Opcodes::WRITE_REF, value.size())?;
    // 调用引用类型的 write_ref 函数，将值写入到被引用的对象中
    reference.write_ref(value)?;
}
```

上面的代码最重要的一行是 `reference.write_ref(value)`，`reference` 对象的类型是 `Reference`:

```rust
pub struct Reference(ReferenceImpl);
```

`Reference` 类型只包含了一个 `ReferenceImpl` 类型。

所以实际调用的是 `ReferenceImpl` 的 write_ref 函数：

```rust
impl ReferenceImpl {
    fn write_ref(self, x: Value) -> PartialVMResult<()> {
        match self {
            Self::ContainerRef(r) => r.write_ref(x),
            Self::IndexedRef(r) => r.write_ref(x),
        }
    }
}
```

我们分析 `ContainerRef` 类型的 `write_ref` 函数：

```rust
impl ContainerRef {
    fn write_ref(self, v: Value) -> PartialVMResult<()> {
        // 类型判断：写入的值类型，要和引用的类型匹配
		    // 如果是 Locals 类型报错：不能写入到 Locals 类型中
		
        // 写入值到 ContainerRef 类型引用的对象中
		
		    // 标记当前引用为 Dirty 状态
		    self.mark_dirty();
    }
```

`mark_dirty()` 函数标记了 `ContainerRef` 类型对象的状态为 `Dirty`。

`ContainerRef` 类型结构如下：

```rust
enum ContainerRef {
    Local(Container),	// 引用的是局部变量，Container 是 实际引用的值
    Global {	// 引用的是全局变量，即用户账户下的资源
        // 引用的状态: Clean or Dirty
        status: Rc<RefCell<GlobalDataStatus>>,	 
        // Container 是 实际引用的值
        container: Container,	
    },
}
```

`ContainerRef` 的 `mark_dirty()` 函数只是把引用标记为了 `Dirty` 状态。

```rust
impl ContainerRef {
    fn mark_dirty(&self) {
        if let Self::Global { status, .. } = self {
            *status.borrow_mut() = GlobalDataStatus::Dirty
        }
    }
}
```

`mark_dirty()` 函数设置了 `ContainerRef` 类型的状态为 `GlobalDataStatus::Dirty`。

下面的内容就是在VM执行交易完毕之后，将标记为 `GlobalDataStatus::Dirty` 状态的引用，保存到数据库中。

保存的过程和资源创建调用 `move_to()` 函数的过程一样，调用 VM的finish 函数：`session.finish()`，将标记为 `GlobalDataStatus::Dirty` 的状态的引用，转换为 `GlobalValueEffect::Changed` 状态。

最后调用 `maybe_commit_effects()` 函数将状态变更的内存对象，写入并提交到磁盘。


## 2. MoveFrom 指令实现资源销毁

上面的内容分析了移除账户下的资源时，编译器生成了 `MoveFrom` 指令，下面我们分析 `MoveFrom` 指令在虚拟机中的实现源码。

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
// sd_idx: 代表了资源对应的结构体类型，在Move虚拟机的结构体定义列表中的索引
// Move虚拟机的结构体定义列表，是虚拟机从Move语言字节码文件中解析得来的
// 实际上资源对应的结构体定义，是编译器在生成字节码文件时写入的信息
Bytecode::MoveFrom(sd_idx) => {
    // 从操作数栈中弹出一个元素：账户
    let addr = interpreter.operand_stack.pop_as::<AccountAddress>()?;
    // 使用sd_idx结构体索引，到结构体定义表中查询结构体类型
    let ty = resolver.get_struct_type(*sd_idx);
    // 调用解释器的 move_from 函数，传入数据存储 data_store，账户地址，资源类型
    let size = interpreter.move_from(data_store, addr, &ty)?;
    gas_status.charge_instr_with_size(Opcodes::MOVE_FROM, size)?;
}
```

和 `move_to()` 函数一样，`move_from()` 函数实际调用的 `GlobalValueImpl` 类型的 `move_from()` 函数：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
fn move_from(&mut self) -> PartialVMResult<ValueImpl> {
    let fields = match self {
        Self::None | Self::Deleted => return Err(PartialVMError::new(StatusCode::MISSING_DATA)),
        // 如果是 Fresh(GlobalValue在内存中，未持久化到存储) 直接把自身(GlobalValueImpl)替换为 None
        Self::Fresh { .. } => match std::mem::replace(self, Self::None) {
            Self::Fresh { fields } => fields, // 返回同样类型的 Fresh 数据 (move_from函数有返回值)
            _ => unreachable!(),
        },
        // 如果是 Cached(GlobalValue在内存中，也持久化到了存储中) 直接把自身(GlobalValueImpl)替换为 Deleted
        Self::Cached { .. } => match std::mem::replace(self, Self::Deleted) {
            Self::Cached { fields, .. } => fields, // 返回同样类型的 Cached 数据 (move_from函数有返回值)
            _ => unreachable!(),
        },
    };

    // 如果已经有对这个全局变量的多余１个的引用，说明多余一个对象引用当前对象，就不能 move_from 它
    // Move虚拟机报错：moving global resource with dangling reference
    if Rc::strong_count(&fields) != 1 {
        return Err(
            PartialVMError::new(StatusCode::UNKNOWN_INVARIANT_VIOLATION_ERROR)
                .with_message("moving global resource with dangling reference".to_string()),
        );
    }

    // move_from 返回的对象
    Ok(ValueImpl::Container(Container::Struct(fields)))
}
```

其中最关键的动作是：

- 如果是 `GlobalValueImpl::Fresh` (GlobalValue在内存中，未持久化到存储) 直接把自身(GlobalValueImpl)替换为 None
- 如果是 `GlobalValueImpl::Cached` (GlobalValue在内存中，也持久化到了存储中) 直接把自身(GlobalValueImpl)替换为 Deleted

在交易执行完毕后，最终提交之前，会将标记为上面两个状态 (None和Delete) 的 GlobalValueImpl 对象，转换为对应的状态：

```rust
fn into_effect(self) -> PartialVMResult<GlobalValueEffect<ValueImpl>> {
    Ok(match self {
        Self::None => GlobalValueEffect::None,
        Self::Deleted => GlobalValueEffect::Deleted,
    })
}
```

最终在 `TransactionDataCache` 的 `into_effects()` 函数中，将上述两个状态转换：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
// move_from 函数对 GlobalValueImpl Fresh 设置 None
// None 表示 Fresh(在内存中) 的数据不存储
GlobalValueEffect::None => (),  

// move_from 函数对 GlobalValueImpl Cached 设置 Deleted
// Deleted 生成 None，会从存储中删除
GlobalValueEffect::Deleted => { 
    let struct_tag = match self.loader.type_to_type_tag(&ty)? {
        TypeTag::Struct(struct_tag) => struct_tag,
    }
    resources.insert(struct_tag, None);
}
```

最后调用 `maybe_commit_effects()` 函数将状态变更集合的内存对象，写入并提交到磁盘。



