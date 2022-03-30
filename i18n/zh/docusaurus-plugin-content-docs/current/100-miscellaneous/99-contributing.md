# 贡献指南

### 环境准备

1. 为了改进 Starcoin Cookbook, 首先 clone 文档的源码。

```bash
git clone https://github.com/starcoinorg/starcoin-cookbook.git
cd starcoin-cookbook
```

2. 安装

你的机器上需要预先安装好 nodejs 以及 yarn，安装方式请参看 [yarnpkg](https://yarnpkg.com/getting-started/install)。 

然后在项目目录下运行：

```bash
$ yarn
```

3. 本地热加载开发

在项目目录下运行一下命令，

```bash
$ yarn start
```

命令将自动打开浏览器并跳转到文档首页，你编写或者修改文档时浏览器会自动刷新。

4. 完整构建文档并浏览

运行以下命令进行完整构建，它同时会构建出多个语言的完整文档

```bash
$ yarn build
```

运行以下命令，将在本地启动一个 Web 服务。

```bash
$ yarn serve 
```

在浏览器中打开地址 'http://localhost:3000/starcoin-cookbook/' ，就可以看到完整的文档。

5. 提交 Pull Request

将自己的修改通过 Pull Request 提交到仓库（注意：你可能需要先 fork 仓库到自己的账号下，所以上面 clone 的地址也需要变更一下）。

Github action 会自动触发构建任务，检查文档。等文档被 Review 并合并到主分支后，文档会被自动部署并发布。


### 文档规范

1. 文档的目录名和文件名前面都有个数字前缀，比如 `01-build.md`，用来表示文档在左侧菜单中的顺序。
2. 文档目录以及文档名中间的多个词语用 `-` 连接。 
3. 每个目录中的 `README.md` 表示该目录的首页。
4. 每个目录中的 `_category_.yaml` 为该目录的配置文件，其中的 `label` 属性表示该目录在左侧菜单中展示的标题。
5. 默认文档是英文，中文文档在 `i18n/zh/docusaurus-plugin-content-docs/current` 目录下，需要建立和英文文件同名的文件。



### 常见问题

1. 如何翻译目录

新增目录后，运行以下命令

```bash
$ yarn write-translations --locale zh
```

你会发现文件 `i18n/zh/docusaurus-plugin-content-docs/current.json` 已经变更了，新的目录名项目已经增加，编辑该文件进行翻译即可。