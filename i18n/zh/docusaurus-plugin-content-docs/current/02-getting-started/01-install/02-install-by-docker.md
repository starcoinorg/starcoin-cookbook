# 通过 Docker 安装

Starcoin 支持通过 Docker 运行节点，并提供了 `starcoin` 应用镜像，可以直接拉取到本地运行。

## 拉取 Docker 镜像

```shell
docker pull starcoin/starcoin:latest
```

Starcoin 的二进制文件在镜像中的 `/starcoin` 目录下。

## 镜像 tag 说明

* latest：表示最新的 release 版本，包括 pre-release 的版本。
* v1.10.1：表示 Starcoin 的 v1.10.1 版本。
* master：表示根据 Starcoin 源码仓库 master 分支构建出来的镜像。
* sha-7ab632b：表示根据 git commit [7ab632b](https://github.com/starcoinorg/starcoin/commit/7ab632b36a039439d424c83951ca8d2366d311c7) 构建的版本，`7ab632b` 是该 commit 哈希的前 7 位。

例如：

```shell
docker pull starcoin/starcoin:v1.10.1
docker pull starcoin/starcoin:master
docker pull starcoin/starcoin:sha-7ab632b
```

## 运行检查

```shell
$ docker container run -it starcoin/starcoin:latest bash

# 注意：当提示符改变，说明已成功进入交互式运行
root@4d622b3fc3b4:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  starcoin  sys  tmp  usr  var

# 成功输出版本信息，说明安装成功
root@4d622b3fc3b4:/# ./starcoin/starcoin --version
starcoin 1.11.7-rc (build:1.11.7-rc)
```

## 支持的镜像仓库

* Docker hub: https://hub.docker.com/r/starcoin/starcoin/
* Github package: https://github.com/starcoinorg/starcoin/pkgs/container/starcoin
