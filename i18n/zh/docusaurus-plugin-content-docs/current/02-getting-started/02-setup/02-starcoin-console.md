# Working with the Starcoin console

TODO

1. How to start with console
2. How to attach to the console
3. How to connect remote node with console
4. How to connect remote node and use local account


3. Attach to console by docker

```shell
docker run --rm -it -v  ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin --connect /root/.starcoin/main/starcoin.ipc console
```
