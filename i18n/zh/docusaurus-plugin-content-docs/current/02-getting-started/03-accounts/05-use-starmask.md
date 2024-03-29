# StarMask 入门

StarMask 是一款基于浏览器扩展的钱包，它运行在 Web 浏览器（Chrome、Firefox 或 Edge）中。
StarMask 是用于与 Starcoin 区块链进行交互的软件加密货币钱包，使用这个钱包和进行各项测试都很容易，可以连接多种 Starcoin 节点。
StarMask 可用于存储和管理 Starcoin 的链上资产，用户可以通过 StarMask 直接参与 Starcoin 的链上治理，包括投票、IDO、SWAP 等等。

## 下载与安装

### 在线安装

在线安装即从 Chrome 应用商店安装，目前仅支持 Chrome 浏览器，如果使用其它浏览器，请参考[离线安装](#离线安装).

1. 安装

在 [Chrome 应用商店](https://chrome.google.com/webstore/search/StarMask?hl=zh-CN)搜
索 `StarMask`，点击`添加至 Chrome`，即可完成安装。

2. 如何手动更新钱包

在 Chrome 浏览器地址栏输入 `chrome://extensions/`，开启页面右上角的 `开发者模式`。
在当前页的左上方就会出现`更新`按钮，点击更新即可。

3. 图文参考

更详细的图文安装步骤，请参考[安装指南 - Chrome 浏览器](https://github.com/starcoinorg/starmask-extension/blob/main/docs/zh/how-to-install.md)。

### 离线安装

这一小节中，主要介绍如何通过离线安装在主流的浏览器（Chrome、Firefox 和 Edge）中使用 StarMask 钱包。

#### 下载

访问 StarMask 的 [GitHub 仓库](https://github.com/starcoinorg/starmask-extension)，下载对应浏览器的[最新发布版本](https://github.com/starcoinorg/starmask-extension/releases/latest)。

注：目前发布的版本有 Chrome 版本 和 Firefox 版本，对于 Edge 浏览器，可以暂时使用 Chrome 版本。

#### 安装 - Chrome

打开 Chrome 浏览器，在地址栏输入 `chrome://extensions/`，开启页面右上角的 `开发者模式`。
将在载好的压缩包拖拽到 Chrome 中，即可完成安装。

安装完成后，点击 Chrome 浏览器右上角的`扩展程序`图标，点击`固定` StarMask，即可将其固定到`工具栏`，方便使用 StarMask。

#### 安装 - Firefox

打开 Firefox 浏览器，点击右上角的`打开应用程序菜单`按钮，选择`扩展和主题`，点击当前页面上方的小齿轮（`用于所有附加组件的工具`），选择`调试附加组件`，点击`临时载入附加组件`，选择刚才下载好的 StarMask 压缩包，即可完成安装。

也可以在 Firefox 浏览器的地址栏输入 `about:debugging#/runtime/this-firefox`，点击`临时载入附加组件`，选择 StarMask 压缩包，即可完成安装。

更详细的图文安装步骤，请参考[安装指南 - Firefox 浏览器](https://github.com/starcoinorg/starmask-extension/blob/main/docs/zh/how-to-install-firefox.md)。

#### 安装 - Edge

打开 Edge 浏览器，在地址栏输入 `edge://extensions/`，开启左侧的`开发人员选项`，将下载好的 StarMask 压缩包拖拽到 Edge 中，即可完成安装。

## 创建钱包

StarMask 安装完成后，它会自动打开欢迎页面。如果没有自动打开，也可以点击工具栏上的 StatMask 图标。
点击这个图标就能开始使用 StarMask 了，你需要先阅读和接受用户使用协议，然后输入**密码**来创建新的 Starcoin 钱包。

点击`开始使用`，点击`创建钱包`，点击`我同意`，输入密码。

:::tip 提示

这个密码是用来控制对 StarMask 软件的使用，例如当他人使用你的电脑时，需要知道密码才能对 StarMask 进行操作。

:::

设置完密码后，StarMask 会为你生成一个钱包并进入助记词页面，点击`小锁`就会显示由12个英文单词组成的助记词密语。
这些助记词可用在所有的兼容钱包上进行钱包恢复。
如果你忘记了钱包密码或是电脑出问题了，只需要使用这12个单词就可以重置钱包密码或在其它设备完成钱包的恢复。

:::caution 注意

建议把这12个助记词备份在多张纸上，并分别保存在2~3个不同的地方。
例如保险柜、上锁的抽屉或其它能保证这些记录着助记词的纸张安全的地方。
这些纸的价值等同于你在 Starcoin 链上所持有的数字货币的价值。
如果他人获得了这12个助记词，就可以窃取你的数字货币，请务必妥善保管！
通常，不建议将助记词截图、文本文件上传到网盘或其他联网设备进行保存，而应该选择纸张或者离线的加密硬盘进行保存。
如果你想使用离线加密设备的方式保存，可以点击页面左侧`下载账户助记词`，将其移动到加密存储介质后，确保在当前的电脑上没有任何备份！

:::

在你确定已经正确保存了助记词之后，点击`下一步`，按照刚才的助记词序列点击助记词，点击`确认`。
完成助记词校验后，就完成了钱包创建的所有流程了，愉快地开始 Starcoin 链上之旅吧！

## 使用钱包

完成钱包的创建后，就会进入账户页面，StarMask 会显示你的 Starcoin 账户的概览信息。

在账户页面第一栏左侧显示 Starcoin 图标，左侧显示的是当前钱包连接的 Starcoin 网络（默认显示“Starcoin 主网络”）和一个彩色的图标（用于在多个账户之间进行区分）。

此时点击浏览器工具栏上的 StarMask 图标，弹出的页面和 StarMask 扩展页基本一致。
唯一区别是，StarMask 钱包弹出页的第二栏左侧会有一个 Web3 网页连接状态按钮。
如果你的钱包连接上某个 Web3 网页，则会显示`已连接`，点开后可以查看详情。

第二栏中间显示的是账户名称（默认是 `Account1`）和账户的 Starcoin 地址（例如：`0xeD49…683e`）。
第二栏右侧显示的是`账户选项`。

第三栏中间显示当前账户所持有的 STC 代币数量，以及一个用于发送代币的`发送`按钮。
在下方有三个按钮分别是`资产`、`NFT` 和`活动`。
