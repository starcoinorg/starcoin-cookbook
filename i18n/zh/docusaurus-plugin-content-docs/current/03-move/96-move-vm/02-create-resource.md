# 2. MoveVM资源修改和销毁的原理
------

## 0. Move中的资源类型

Move 中的资源类型，我们都知道它其实就是 Move 中的一个自定义结构体类型，只不过我们在结构体上加了一些限制：

1. 资源存储在帐户下。因此，只有在分配帐户后才会存在，并且只能通过该帐户访问。
2. 一个帐户同一时刻只能容纳一个某类型的资源。
3. 资源不能被复制，准确的说没有办法去复制资源。
4. Resource 必需被使用，这意味着必须将新创建的 Resource move 到某个帐户下，从帐户移出的 Resource 必须被解构或存储在另一个帐户下。


## 1. 资源的创建

### 1.1 创建资源对应的字节码指令

资源必须存储在账户下，也就是说创建资源的时候，必须要传入一个账户信息，例如下面的代码：

```move
address 0x2 {
	module Counter {
		struct Counter has key { i: u64 }

		public fun publish(account: &signer, i: u64) {
		  move_to(account, Counter { i })
		}

	}
}
```

`move_to()` 函数负责资源的创建，它有两个参数，账户和需要创建的资源类型。

`move_to()` 函数原型如下：

```move
native fun move_to<T: key>(account: &signer, value: T);
```

上面的 `publish()` 经过编译出的字节码如下：

```
public publish() {
B0:
	0: MoveLoc[0](account: &signer)
	1: MoveLoc[1](i: u64)
	2: Pack[0](Counter)
	3: MoveTo[0](Counter)
	4: Ret
}
```

下面我们对字节码列表中的指令逐一解析，让大家能看明白大致的编译过程。

不过在开始之前，先回顾一下 Move 虚拟机中代表函数栈帧的结构：

文件: `language/move-vm/runtime/src/interpreter.rs`

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


1. `MoveLoc[0](account: &signer)`  指令把函数参数 `account` 从 `locals` 数组中取出，并放在操作数栈上。
2. `MoveLoc[1](i: u64)` 指令把局部变量 `i` 从 `locals` 数组中取出，并放在操作数栈上。现在栈上有两个元素：`i` 和 `account`。
3. `Pack[0](Counter)` 指令从操作数栈的栈顶取出一个元素，将它打包成一个结构体对象，并再次放在操作数栈上。现在栈上的两个元素就变成了：`Counter结构体对象` 和 `account`。
4. `MoveTo[0](Counter)` 指令是源码中 `move_to()` 函数的具体实现。`MoveTo` 和 `move_to()` 函数一样接受两个参数，此时操作数栈中正好有两个元素：`Counter结构体对象` 和 `account`。`MoveTo`  指令从栈中取出两个元素并执行执行，最终将 `Counter结构体对象` 保存到 `account` 代表的账户下。

经过对上面的字节码指令序列的分析，不难看出最重要的指令就是 `MoveTo` 指令，是它执行了最重要的资源创建操作。


### 1.2 虚拟机中 MoveTo 指令的实现

下面我们来对照 Move 虚拟机的代码，分析虚拟机中如何实现 `MoveTo` 指令。

**解释器的总体执行过程：**

下面的代码，就是 Move 虚拟机中 `MoveTo` 指令的解释执行过程：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
// sd_idx: 代表了资源对应的结构体类型，在Move虚拟机的结构体定义列表中的索引
// Move虚拟机的结构体定义列表，是虚拟机从Move语言字节码文件中解析得来的
// 实际上资源对应的结构体定义，是编译器在生成字节码文件时写入的信息
Bytecode::MoveTo(sd_idx) => {
	
    // 从操作数栈中弹出一个元素：资源对象
    let resource = interpreter.operand_stack.pop()?;
    // 从操作数栈中弹出一个元素：账户
    let signer_reference = interpreter.operand_stack.pop_as::<StructRef>()?;

    // 将操作数栈中弹出的账户对象，转换成 AccountAddress 类型
    let addr = signer_reference
        .borrow_field(0)?
        .value_as::<Reference>()?
        .read_ref()?
        .value_as::<AccountAddress>()?;

    // 使用sd_idx结构体索引，到结构体定义表中查询结构体类型
    let ty = resolver.get_struct_type(*sd_idx);
	
    // 调用解释器的 move_to 函数，传入数据存储 data_store，账户地址，资源类型，资源对象
    let size = interpreter.move_to(data_store, addr, &ty, resource)?;
	
    gas_status.charge_instr_with_size(Opcodes::MOVE_TO, size)?;
}
```

从上面Move虚拟机中 `MoveTo` 指令的代码实现入口就可以看出，`move_to()` 函数先从操作数栈上弹出两个元素：账户和资源对象，然后调用 `interpreter.move_to()` 函数实现真正的 `MoveTo` 功能。

`interpreter.move_to()` 的代码如下：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
fn move_to(
    &mut self,
    data_store: &mut impl DataStore,
    addr: AccountAddress,
    ty: &Type,
    resource: Value,
) -> PartialVMResult<AbstractMemorySize<GasCarrier>> {
    let size = resource.size();
    Self::load_resource(data_store, addr, ty)?.move_to(resource)?;
    Ok(size)
}
```

**查询账户下的资源：**

我们可以看到，核心的代码，就是下面这行：

```rust
Self::load_resource(data_store, addr, ty)?.move_to(resource)?;
```

上面这行代码的含义是，首先根据 `addr` 即账户地址，查询到该账户下的资源，再调用资源的 `move_to()` 函数，将新的资源保存。

`Self::load_resource()` 函数最终会调用到 `DataStore` 类型的 `load_resource()` 函数：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
impl<'r, 'l, S: MoveResolver> DataStore for TransactionDataCache<'r, 'l, S> {
    fn load_resource(
        &mut self,
        addr: AccountAddress,
        ty: &Type,
    ) -> PartialVMResult<&mut GlobalValue> {
        // 从 self.account_map 中使用 addr 查询该账户地址，是否之前已经查询过，查询过则返回 AccountDataCache
        let account_cache = Self::get_mut_or_insert_with(&mut self.account_map, &addr, || {
            (addr, AccountDataCache::new())
        });

        // 账户的 AccountCache 保存了很多账户中很多类型的数据，下面一行代码使用 资源 的类型查询，账户下是否有该资源
        // 如果没有对应的资源，则将资源对应的结构体的类型，和用户组成的 路径 从底层数据库中读取数据
        // 如果能读取数据到则首先反序列化为 Value 类型，然后将 Value 类型包装为 GlobalValue 类型返回
        if !account_cache.data_map.contains_key(ty) {
            // 使用资源对应的结构体类型作为参数，在字节码的loader中查询结构体的Tag
            let ty_tag = match self.loader.type_to_type_tag(ty)? {
                TypeTag::Struct(s_tag) => s_tag,
                _ =>
                // non-struct top-level value; can't happen
                {
                    return Err(PartialVMError::new(StatusCode::INTERNAL_TYPE_ERROR))
                }
            };
            let ty_layout = self.loader.type_to_type_layout(ty)?;

            // 将结构体的Tag和账户地址组合，作为路径，查询账户下的资源
            let gv = match self.remote.get_resource(&addr, &ty_tag) {
                Ok(Some(blob)) => {
                    let val = match Value::simple_deserialize(&blob, &ty_layout) {
                        Some(val) => val,
                        None => {
                            let msg =
                                format!("Failed to deserialize resource {} at {}!", ty_tag, addr);
                            return Err(PartialVMError::new(
                                StatusCode::FAILED_TO_DESERIALIZE_RESOURCE,
                            )
                            .with_message(msg));
                        }
                    };

                    GlobalValue::cached(val)? // 查到了返回 GlobalValue::Cached
                }
                Ok(None) => GlobalValue::none(), // 没查到返回 GlobalValue::None
                Err(err) => {
                    let msg = format!("Unexpected storage error: {:?}", err);
                    return Err(
                        PartialVMError::new(StatusCode::UNKNOWN_INVARIANT_VIOLATION_ERROR)
                            .with_message(msg),
                    );
                }
            };

            // 查询到了资源之后，将资源对象放在账户地址对应的 account_cache 中
            account_cache.data_map.insert(ty.clone(), (ty_layout, gv));
        }

        // 返回这个资源对应的 GlobalValue 的可变引用
        Ok(account_cache
            .data_map
            .get_mut(ty)
            .map(|(_ty_layout, gv)| gv)
            .expect("global value must exist"))
    }
}
```

函数的核心功能，在代码中已经有注释，其中最关键的是 `self.remote.get_resource(&addr, &ty_tag)` 这一行代码，它将账户对应的 addr 和资源对应的结构体 tag，组成一个路径去底层数据库中查询数据。

以本地磁盘中查询数据举例：

文件：`language/tools/move-cli/src/sandbox/utils/on_disk_state_view.rs`

```rust
impl ResourceResolver for OnDiskStateView {
    type Error = anyhow::Error;

    fn get_resource(
        &self,
        address: &AccountAddress,
        struct_tag: &StructTag,
    ) -> Result<Option<Vec<u8>>, Self::Error> {
        self.get_resource_bytes(*address, struct_tag.clone())
    }
}
```

`OnDiskStateView` 类实现了 `get_resource()` 函数，核心的一行代码是：`self.get_resource_bytes(*address, struct_tag.clone())`。

`OnDiskStateView` 的函数 `get_resources_bytes()` 实现了查询数据功能：

文件：`language/tools/move-resource-viewer/src/lib.rs`

```rust
pub fn get_resource_bytes(&self, addr: AccountAddress, tag: StructTag) -> Result<Option<Vec<u8>>> {
    Self::get_bytes(&self.get_resource_path(addr, tag))
}
```

`get_resource_bytes()` 函数首先调用 `get_resource_path()` 把账户的地址和资源结构体的Tag组织成路径参数，组合的过程如下：

文件：`./language/tools/move-resource-viewer/src/lib.rs`

```rust
fn get_resource_path(&self, addr: AccountAddress, tag: StructTag) -> PathBuf {
    let mut path = self.get_addr_path(&addr);
    path.push(RESOURCES_DIR);
    path.push(StructID(tag).to_string());
    path.with_extension(BCS_EXTENSION)
}
```

然后 `get_resource_bytes()` 函数直接从文件系统读取数据：

文件：`language/tools/move-cli/src/sandbox/utils/on_disk_state_view.rs`

```rust
fn get_bytes(path: &Path) -> Result<Option<Vec<u8>>> {
    Ok(if path.exists() {
        // 从磁盘读取文件，并返回 u8 字节数据
        Some(fs::read(path)?)
    } else {
        None
    })
}
```

到这里，我们了解到了 `MoveTo` 指令首先根据账户地址和对应的资源结构体类型，组合成一个路径，从磁盘中查询对应的数据。

**将资源对象保存：**

回到刚开始的代码，我们知道 `MoveTo` 指令的核心分为两部，第一步是把账户下的资源从内存中的缓存或磁盘中读取出来，第二步是将当前需要保存的 `resource` 保存。

```rust
Self::load_resource(data_store, addr, ty)?.move_to(resource)?;
```

通过上一部分的代码，我们知道了 `Self::load_resource()` 返回的是 `GlobalValue` 类型的数据，`GlobalValue` 类型结构如下：

```rust
#[derive(Debug)]
pub struct GlobalValue(GlobalValueImpl);
```

`GlobalValue` 结构体类型只保存一个类型: `GlobalValueImpl`。

`GlobalValueImpl` 是一个枚举类型：

```rust
enum GlobalValueImpl {
    // 没有保存任何资源
    None,

    // 资源已经保存在GlobalValue中，但是还没有持久化到存储
    Fresh {
        fields: Rc<RefCell<Vec<ValueImpl>>>,
    },

    // 资源已经保存在Global中，也在持久化的存储中
    // status 字段指示资源可能已被更改
    Cached {
        fields: Rc<RefCell<Vec<ValueImpl>>>,
        status: Rc<RefCell<GlobalDataStatus>>,
    },

    // 资源已经在存储中持久化，但是被当前交易标记为删除
    Deleted,
}
```

我们可以看到，`GlobalValueImpl` 类型依靠 `ValueImpl` 类型保存真正的数据：

```rust
enum ValueImpl {
    Invalid,

    U8(u8),
    U64(u64),
    U128(u128),
    Bool(bool),
    Address(AccountAddress),

    Container(Container),

    ContainerRef(ContainerRef),
    IndexedRef(IndexedRef),
}
```

枚举类型 `ValueImpl` 代表了真正保存的数据，出来基本类型以外，最重要的是 `Container`、`ContainerRef`、`IndexedRef`，这几个类型在实现 Move 中借用的功能时，发挥了重要的作用。

Move 中借用的实现分两部分，一部分是编译器根据编译过程中的IR，分析出的借用依赖图，来判断是否有非法的借用，而虚拟机中的借用功能，则实现了对象的实际借用过程。

Move 中借用的实现这里只是顺带提及，之后会有其他文章详细分析借用的实现。

我们回到 `GlobalValue` 类型的 `move_to()` 函数中：

文件：`language/move-vm/runtime/src/interpreter.rs`

```rust
fn move_to(&mut self, val: ValueImpl) -> PartialVMResult<()> {
    match self {
        // 之前查出数据，类型是 Self::Cached，说明已经账户下已经有该资源，不能再次 move_to
        Self::Fresh { .. } | Self::Cached { .. } => {
            return Err(PartialVMError::new(StatusCode::RESOURCE_ALREADY_EXISTS))
        }

        // 之前未查出数据，就设置新的值，并标记自身(GlobalValueImpl)为Fresh状态
        // Fresh状态在 into_effect() 函数中会被标记为 GlobalValueEffect::Changed
        Self::None => *self = Self::fresh(val)?,

        // 数据已被标记为 Deleted，move_from() 函数标记
        // Dirty 状态也会被标记为 GlobalValueEffect::Changed
        Self::Deleted => *self = Self::cached(val, GlobalDataStatus::Dirty)?,
    }
    Ok(())
}
```

可以看到比较关键的部分，如果 `ValueImpl` 对象是 `Fresh` ，说明账户下已经存在对应的资源，则虚拟机报错：**资源已经存在！**

如果是 `None` 说明之前账户下从来没存在过该类型的资源，就执行下面的代码：

```rust
*self = Self::fresh(val)
```

这里的 `self` 是 `GlobalValueImpl` 结构体对象，这行代码是把 `GlobalValueImpl` 对象设置为 `GlobalValueImpl::Fresh`，并保存资源对象。

这样我们就把从磁盘中查询到，然后保存在内存中的 `GlobalValue` 对象设置为 `GlobalValueImpl::Fresh` 并保存了实际的资源。

**Move虚拟机保存资源：**

虽然已经执行了 Move 的解释器已经执行了 `move_to()` 函数，但目前新的资源还保存在内存中，还需要在交易执行结束时，保存到磁盘。

在文件 `sandbox/commands/run.rs` 文件中，有函数 `run():`

```
pub fn run() {
    // 读取字节码文件
    let bytecode = if is_bytecode_file(script_path) {...};

    // 创建需要传递给 Move VM 的参数
    let vm_args: Vec<Vec<u8>> = convert_txn_args(txn_args);

    // 创建 Move VM 实例
    let vm = MoveVM::new(natives).unwrap();

    // 传入状态存储对象，创建 Move VM 会话
    let mut session: Session<OnDiskStateView> = vm.new_session(state);

    // 执行 Move 脚本
    session.execute_script(
        bytecode.to_vec(),
        vm_type_args.clone(),
        vm_args,
        &mut gas_status,
    );

    // 完成 Move VM 的执行
    // 拿到内存保存的所有账户下的 GlobalValue 数据对应的修改类型
    // GlobalValueEffect::Deleted 或者 GlobalValueEffect::Changed
    // 以及修改类型对应的数据
    let (changeset, events) = session.finish().map_err(|e| e.into_vm_status())?;

    // 把内存 changeset 中的数据保存到磁盘
    maybe_commit_effects(!dry_run, changeset, events, state)
}
```

在 Move VM 执行脚本的整个过程中，在最后的阶段，会调用 `session.finish()` 把内存中的数据保存到磁盘：

```rust
pub fn finish(self) -> VMResult<(ChangeSet, Vec<Event>)> {
    self.data_cache
        .into_effects()
        .map_err(|e| e.finish(Location::Undefined))
}
```

上面的代码中，`self.data_cache.into_effects()` 是最重要的函数，最终调用的是 `TransactionDataCache` 类型的 `into_effects()` 函数：

文件：`language/move-vm/runtime/src/data_cache.rs`

```rust
pub(crate) fn into_effects(self) -> PartialVMResult<(ChangeSet, Vec<Event>)> {
    // change_set 用于保存账户地址对应的修改集列表
    let mut change_set = ChangeSet::new();

    // 循环所有账户的账户缓存 AccountDataCache
    for (addr, account_data_cache::AccountDataCache) in self.account_map.into_iter() {
        let mut resources = BTreeMap::new();

        // 循环单个账户下缓存中的所有 GlobalValue
        for (ty, (layout, gv::GlobalValue)) in account_data_cache.data_map {
            // 调用 GlobalValue 的 into_effect() 函数返回 GlobalValue 对应的修改类型
            match gv.into_effect()? {
                GlobalValueEffect::None => (), // 什么都不做
                GlobalValueEffect::Deleted => {
                    // 标记为删除
                    resources.insert(struct_tag, None); // 资源类型: None
                }
                GlobalValueEffect::Changed(val) => {
                    // 标记为已被修改
                    let resource_blob = val
                        .simple_serialize(&layout)
                        .ok_or_else(|| PartialVMError::new(StatusCode::INTERNAL_TYPE_ERROR))?;
                    resources.insert(struct_tag, Some(resource_blob)); // 资源类型：修改后的数据
                }
            }
            // 为每个 change_set 关联账户地址
            change_set.publish_or_overwrite_account_change_set(
                addr,
                AccountChangeSet::from_modules_resources(modules, resources),
            );
        }
    }

    // 返回 change_set
    Ok((change_set, events))
}
```

上面的函数 `TransactionDataCache.into_effects()` 循环所有账户的缓存中的 `GlobalValue`，并调用 `GlobalValue.into_effects()`，目的是把 `GlobalValue` 对应的枚举类型，变成 `GlobalValueEffect` 对应的类型。

`GlobalValue.into_effects()` 函数：

文件：`language/move-vm/types/src/values/values_impl.rs`

```rust
pub fn into_effect(self) -> PartialVMResult<GlobalValueEffect<Value>> {
    Ok(match self.0.into_effect()? {
        GlobalValueEffect::None => GlobalValueEffect::None,
        GlobalValueEffect::Deleted => GlobalValueEffect::Deleted,
        GlobalValueEffect::Changed(v) => GlobalValueEffect::Changed(Value(v)),
    })
}
```

核心的函数是这一行：

```rust
self.0.into_effect()
```

上面这行代码，实际调用的是 `ValueImpl.into_effects()` 函数：

文件：`language/move-vm/types/src/values/values_impl.rs`

```rust
fn into_effect(self) -> PartialVMResult<GlobalValueEffect<ValueImpl>> {
    Ok(match self {
        Self::None => GlobalValueEffect::None,
        Self::Deleted => GlobalValueEffect::Deleted,
        Self::Fresh { fields } => {
            // 新的 GlobalValue 类型数据，即该账户下第一次创建对应类型的资源
            GlobalValueEffect::Changed(ValueImpl::Container(Container::Struct(fields)))
        }
        Self::Cached { fields, status } => match &*status.borrow() {
            GlobalDataStatus::Dirty => {
                GlobalValueEffect::Changed(ValueImpl::Container(Container::Struct(fields)))
            }
            GlobalDataStatus::Clean => GlobalValueEffect::None,
        },
    })
}
```

可以看到 `GlobalValue::Fresh` 类型的枚举，会返回 `GlobalValueEffech::Changed` 类型的枚举，并把实际的数据 `fields` 保存。

之前的内容中提到，`GlobalValue::Fresh` 代表该账户下第一次创建对应类型的资源。　

到这里 Move VM  执行过程中的 `finish()` 函数执行完毕，拿到了所有用户的资源的修改记录：

```rust
let (changeset, events) = session.finish().map_err(|e| e.into_vm_status())?;
```

最后要做的，就是把这些修改记录保存到磁盘中：

```rust
maybe_commit_effects(!dry_run, changeset, events, state)
```

`maybe_commit_effects` 函数判断，只要不是 `dry_run`，就循环修改集中的每个元素，把它写入到磁盘：

文件：`language/tools/move-cli/src/sandbox/utils/mod.rs`

```rust
pub(crate) fn maybe_commit_effects(
    commit: bool,
    changeset: ChangeSet,
    events: Vec<Event>,
    state: &OnDiskStateView,
) -> Result<()> {
    if commit {
        for (addr, account) in changeset.into_inner() {
            for (struct_tag, blob_opt) in account.into_resources() {
                match blob_opt {
                    Some(blob) => state.save_resource(addr, struct_tag, &blob)?,
                    None => state.delete_resource(addr, struct_tag)?,
                }
            }
        }

        for (event_key, event_sequence_number, event_type, event_data) in events {
            state.save_event(&event_key, event_sequence_number, event_type, event_data)?
        }
    }

    Ok(())
}
```


如果修改集存在要数据，说明要保存最新的数据：

```rust
Some(blob) => state.save_resource(addr, struct_tag, &blob)
```

如果修改集为空，说明要删除数据：

```rust
None => state.delete_resource(addr, struct_tag)
```

`save_resource()`  函数保存数据：

文件：`language/tools/move-cli/src/sandbox/utils/on_disk_state_view.rs`

```rust
pub fn save_resource(&self, addr: AccountAddress, tag: StructTag, bcs_bytes: &[u8]) -> Result<()> {
    let path = self.get_resource_path(addr, tag);
    if !path.exists() {
        fs::create_dir_all(path.parent().unwrap())?;
    }
    Ok(fs::write(path, bcs_bytes)?)
}
```

`delete_resource()` 函数删除数据：

文件：`language/tools/move-cli/src/sandbox/utils/on_disk_state_view.rs`

```rust
pub fn delete_resource(&self, addr: AccountAddress, tag: StructTag) -> Result<()> {
    let path = self.get_resource_path(addr, tag);
    fs::remove_file(path)?;

    // delete addr directory if this address is now empty
    let addr_path = self.get_addr_path(&addr);
    if addr_path.read_dir()?.next().is_none() {
        fs::remove_dir(addr_path)?
    }
    Ok(())
}
```

到目前为止，在某个账户下创建资源的源码分析完毕。
