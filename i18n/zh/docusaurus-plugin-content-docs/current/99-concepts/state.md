--- 
sidebar_position: 3
---

# State

1. Introduce starcoin's two levels SMT state


starcoin中需要用到账号地址(AccountAddress)是128 bits的，也就是32个16进制的数(一个16进制的数是4bits)

不同于以太坊外部账号和合约账号是分开的，在starcoin中合约相关都在账号(AccountAddress)对应的状态里面(State)

状态