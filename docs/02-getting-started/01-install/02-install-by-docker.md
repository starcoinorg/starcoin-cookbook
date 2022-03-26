# Install by docker

Starcoin supports running nodes via Docker, so you can install starcoin via a Docker image.

### Pull the Docker image

```shell
docker pull starcoin/starcoin:latest
```

The starcoin binary at `/starcoin` dir in the docker image.


### Image tag description

* latest: indicates the latest release version, including pre-release versions.
* v1.10.1: indicates the v1.10.1 version of starcoin.
* master: The image built from the master branch of the starcoin repository.
* sha-7ab632b: indicates the version built from the git commit [7ab632b](https://github.com/starcoinorg/starcoin/commit/7ab632b36a039439d424c83951ca8d2366d311c7). 7ab632b is the first 7 chars of the commit's hash. 

For example:

```shell
docker pull starcoin/starcoin:v1.10.1
docker pull starcoin/starcoin:master
docker pull starcoin/starcoin:sha-7ab632b
```

### Supported image repositories

* Docker hub: https://hub.docker.com/r/starcoin/starcoin/
* Github package: https://github.com/starcoinorg/starcoin/pkgs/container/starcoin