# 交易

交易 SignedUserTransaction 是 Starcoin 区块链的基本概念，是用户跟链打交道的入口。
用户通过客户端提交签名后的交易，更新链上的账本状态。

签名交易包括 Authenticator 和 RawUserTransaction 两部分，如图所示：

![Transaction](../../../../../static/img/key_words/Transaction.png)

其中，Authenticator 有 Ed25519 和 MultiEd25519 两种方式。

RawUserTransaction 则包括以下内容：

- `sender` —— **发送地址**：16字节，交易发送者的账户地址
- `sequence_number` —— **序列号**：8字节，一个无符号整数，必须等于发送者账户下存储的序列号
- `expiration_timestamp_secs` —— **过期时间**：8字节，交易失效的时间
- `chain_id` —— **网络标识**：1字节，区分不同网络
- `max_gas_amount` —— **最大 Gas 数**：8字节
- `gas_unit_price` —— **Gas 单位**：8字节
- `gas_token_code` —— **支付 Gas 的 Token**：默认 STC，长度与 Token 有关
- `payload` —— **交易数据**：包含3种类型（Script、ScriptFunction、Package），长度不确定
  - `Script`：自定义智能合约脚本
  - `Package`：部署和更新智能合约
  - `ScriptFunction`：调用智能合约的脚本函数 

签名交易主要包括以下内容：

- **发送地址** —— 交易发送者的账户地址
- **发送公钥** —— 由发送者签署交易的私钥生成的公钥
- **程序** —— 程序可能包含以下部分：
  - Move脚本的字节码
  - 输入参数。对于点对点交易，输入包括接收者的信息和金额
  - 要发布的 Move 模块的字节码
- **序列号** —— 一个无符号整数，必须等于发送者账户下存储的序列号
- **过期时间** —— 交易失效的时间
- **签名** —— 发送者的数字签名

