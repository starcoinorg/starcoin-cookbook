# mining client

## starcoin miner

`starcoin_miner` is the mining client provided by Starcoin.
The `starcoin_miner` command line tool is used to remotely connect to the Starcoin node, and provides the ability to mine with CPU and connect to the stc-mini mining machine.

### Usage

```shell
`starcoin_miner` [OPTIONS]

USAGE:
    starcoin_miner [OPTIONS] --user <user>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -p, --plugin-path <plugin-path>
    -a, --server <server>               [default: 127.0.0.1:9880]
    -n, --thread-num <thread-num>       [default: 1]
    -u, --user <user>
```

### Connect to a node to mine with CPU

When starting the Starcoin node locally, we can run the following command to specify the mining user alice to start 4 threads to connect to the local node for mining.

```shell
starcoin_miner --user alice -n 4
```

After startup, you can see the following information in the console:

```shell
Miner client Total seals found:  3
starcoin-miner-cpu-worker-0 ⠦ [00:00:00] Hash rate:      20 Seals found:  17
starcoin-miner-cpu-worker-1 ⠦ [00:00:00] Hash rate:      21 Seals found:  17
starcoin-miner-cpu-worker-2 ⠤ [00:00:00] Hash rate:      20 Seals found:  16
starcoin-miner-cpu-worker-3 ⠤ [00:00:00] Hash rate:      20 Seals found:  16
2020-10-28T09:09:53.006852+08:00 INFO - Seal found 16718533681172480617
```

In the log, you can see the total number of seals dug up, the computing power of each thread, and the newly calculated seals and other information.

## stc-box

stc-box is the current mainstream miner of Starcoin.
No need to install additional client or software, it can be set through the miner webpage.
For the configuration method, please refer to the [configuration of the mining pool](https://www.yuque.com/bixinkelekuangchi/stoxms/knlyf3).

## stc-mini

### Windows environment usage steps

1. Install driver
2. Install the software: [Starcoin mining client](https://github.com/starcoinorg/starcoin_mini_miner/releases/)
3. Connect the miner to the computer.
4. Update firmware: After the software recognizes the miner, click to update the firmware. [Download the Starcoin mini miner firmware](https://github.com/starcoinorg/starcoin_mini_miner/releases/download/v0.0.2/starcoin_mini_miner_recovery_v0.0.2.bin) and upload it.
5. Set up the mining pool: Open the Starcoin Miner software, click the set up mining pool icon, enter the mining pool name, port number, user name, miner password, and click OK.
6. Start mining: Click to start the mining machine, and after a while, you can see that the computing power is generated to prove that the device has started to work.
7. Switch mining pool: Select the machine to stop mining, set the mining pool, and start mining.

### Notes

- Before use, please try to avoid placing the miner in an environment with poor air circulation and high temperature, otherwise it may cause abnormal work or even damage to the equipment.
- Please ensure that the network is unobstructed before use, otherwise the rejection rate will increase and affect the computing power of the machine.
- Do not overclock without permission when using it, otherwise the chip will be damaged and the consequences will be at your own risk.
- The client software only supports windows system temporarily, please refer to [starcoin mint usb solver](https://github.com/fikgol/usbsolver) for non-windows system users to use this miner.

# Mining pool related

For the mining pool protocol of starcoin, please refer to the [starcoin stratum protocol](https://github.com/starcoinorg/starcoin/blob/master/stratum/stratum_mining_protocol.md).

## Join the mining pool

- Set [Cola Pool (recommended)](https://www.yuque.com/docs/share/5c5ae94a-3ed4-4dab-98ca-62baf17891e0)
- Connect to [Poolin Pool (recommended)](https://help.poolin.com/hc/zh-cn/articles/360060982092)
- Connect to [ViaBTC mining pool](https://support.viabtc.com/hc/zh-cn/articles/900005939326)
- Connect [Elephant Pool](https://www.dxpool.com/help/zh/starcoin-mining-toturial)
- Connect to [fishpond](https://blog.f2pool.com/zh/mining-tutorial/stc)

## Self-built mining pool

A stratum server is implemented inside the Starcoin node, through which users can build their own mining pool for mining.
When starting the Starcoin node, the stratum server will monitor the local address 0.0.0.0:9880 by default, and mine by connecting to a mining client that supports starcoin stratum.
When starting a Starcoin node, you can set the address and port of the stratum server through the parameters `--stratum-address` and `--stratum-port`. like:

```shell
./starcoin -n main --stratum-port 9880 --stratum-address 127.0.0.1
```
