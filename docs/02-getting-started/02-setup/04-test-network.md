# How to participate in a test network

## Starcoin testnet introduction

Starcoin has a total of three testnets, `Halley`, `Proxima` and `Barnard`.

## Join Halley network

- Halley
  - Introduction: It is the first test network of Starcoin, and the data on it will be cleaned regularly.
  - Meaning: The name `Halley` is inspired by [Halley's Comet](https://en.wikipedia.org/wiki/Halley%27s_Comet), officially named `1P/Halley`, a short-period comet that can be seen from Earth every 75-76 years.

- Proxima
  - Introduction: It is a long-running test network for Starcoin, released in the third quarter of 2020. Every time a major protocol upgrade is performed on the mainnet, such as the upgrade of `starcoin-framework`, the network will be reset first, and then the new `starcoin-framework` will be upgraded.
  - Meaning: The name `Proxima` is inspired by [Proxima Centauri](https://en.wikipedia.org/wiki/Proxima_Centauri), a small, low-mass star located 4.246 light-years (1.302 pc) from the Sun in the southern constellation Centaurus.

- Barnard
  - Introduction: As the permanent test network of Starcoin, the Barnard network was launched on 2021/3/27 and is the successor of Proxima.
  - Meaning: The name `Barnard` is inspired by [Barnard's Star](https://en.wikipedia.org/wiki/Barnard%27s_Star), a very low-mass red dwarf star located near the star Ophiuchus, 6 light-years from the Sun.

## Join Halley network

```shell
starcoin -n halley
```

## Join Proxima network

```shell
starcoin -n proxima
```

## Join Barnard network

```shell
starcoin -n barnard
```

## Get the Token of the test network

- [Barnard Authenticated Faucet](https://faucet.starcoin.org/barnard)

## Seed Node RPC

| Network | JSON-RPC | WebSocket |
| - | - | - |
| Halley | https://halley-seed.starcoin.org | ws://halley.seed.starcoin.org:9870 |
| Proxima | https://proxima-seed.starcoin.org | ws://proxima.seed.starcoin.org:9870 |
| Barnard | https://barnard-seed.starcoin.org | ws://barnard.seed.starcoin.org:9870 |
