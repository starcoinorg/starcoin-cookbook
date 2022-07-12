"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[8113],{3905:function(t,e,a){a.d(e,{Zo:function(){return p},kt:function(){return d}});var o=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,o)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function l(t,e){if(null==t)return{};var a,o,r=function(t,e){if(null==t)return{};var a,o,r={},n=Object.keys(t);for(o=0;o<n.length;o++)a=n[o],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);for(o=0;o<n.length;o++)a=n[o],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var s=o.createContext({}),c=function(t){var e=o.useContext(s),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},p=function(t){var e=c(t.components);return o.createElement(s.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},m=o.forwardRef((function(t,e){var a=t.components,r=t.mdxType,n=t.originalType,s=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),m=c(a),d=r,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||n;return a?o.createElement(h,i(i({ref:e},p),{},{components:a})):o.createElement(h,i({ref:e},p))}));function d(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var n=a.length,i=new Array(n);i[0]=m;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=t,l.mdxType="string"==typeof t?t:r,i[1]=l;for(var c=2;c<n;c++)i[c]=a[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1793:function(t,e,a){a.r(e),a.d(e,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return n},metadata:function(){return l},toc:function(){return c}});var o=a(3117),r=(a(7294),a(3905));const n={},i="How to Dapp",l={unversionedId:"web3/README",id:"web3/README",title:"How to Dapp",description:"We\u2019ll show you how to build your first decentralized application, or Dapps in this document. We\u2019ll also guide you through Dapp development process instructions.",source:"@site/docs/04-web3/README.md",sourceDirName:"04-web3",slug:"/web3/",permalink:"/starcoin-cookbook/docs/web3/",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/04-web3/README.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Verify Smart Contract: Move Prover Tutorials",permalink:"/starcoin-cookbook/docs/move/move-prover/mvp-tutorial"},next:{title:"StarMask",permalink:"/starcoin-cookbook/docs/web3/starmask/"}},s={},c=[{value:"Dapp Development Process Instructions",id:"dapp-development-process-instructions",level:2},{value:"Practical Dapp",id:"practical-dapp",level:2},{value:"StarMask",id:"starmask",level:2},{value:"SDK",id:"sdk",level:2},{value:"Starcoin Nodes and RPC API",id:"starcoin-nodes-and-rpc-api",level:2},{value:"Move",id:"move",level:2},{value:"Stdlib and Protocols",id:"stdlib-and-protocols",level:2},{value:"Other Develop Tools",id:"other-develop-tools",level:2}],p={toc:c};function u(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-dapp"},"How to Dapp"),(0,r.kt)("p",null,"We\u2019ll show you how to build your first decentralized application, or Dapps in this document. We\u2019ll also guide you through Dapp development process instructions."),(0,r.kt)("h2",{id:"dapp-development-process-instructions"},"Dapp Development Process Instructions"),(0,r.kt)("p",null,"Any Dapp on public blockchain from frontend to smart contracts, has mian steps as we show in figure 1."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"dapp_1",src:a(7022).Z,width:"681",height:"191"})),(0,r.kt)("p",null,"The decentralized network we use in this document is Startcoin. Key components that have been used in figure 1:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Frontend user interface")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"SDK tools are used to interact with the Starcoin blockchain")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Browser extension Starmask is an alternative way to interact with the Starcoin blockchain")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Nodes on Starcoin blockchain")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Smart contracts on Starcoin blockchain"))),(0,r.kt)("p",null,"Some programming tools we used in key components we mentioned in figure1 are shown in figure2:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"dapp_2",src:a(1516).Z,width:"721",height:"405"})),(0,r.kt)("p",null,"First, We will explain some concepts that developers may concern, Then we will cover more details about each programming tool."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Practical Dapp: You will get intuitive knowledge of what a decentralized application is. For a front-end developer, this will be a good choice to explore Dapp."),(0,r.kt)("li",{parentName:"ol"},"StarMask API: In some Dapp development scenarios, such as digital signatures, the Starmask API will be called to complete interactions with users and blockchain. StarMask is a software cryptocurrency wallet used to interact with the Starcoin blockchain."),(0,r.kt)("li",{parentName:"ol"},"SDK is one way to interact with Starcoin blockchain. Developers can choose one SDK which suits your needs. SDKs for Starcoin are:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"JS SDK"),(0,r.kt)("li",{parentName:"ul"},"Java SDK"),(0,r.kt)("li",{parentName:"ul"},"Python SDK"),(0,r.kt)("li",{parentName:"ul"},"Go SDK"),(0,r.kt)("li",{parentName:"ul"},"Dart SDK"))),(0,r.kt)("li",{parentName:"ol"},"RPC API and Starcoin Nodes : You can access all services and interfaces of Nodes via RPC interface, it\u2019s the fastest way to interact with Starcoin for developers or SDK."),(0,r.kt)("li",{parentName:"ol"},"Smart Contracts: Move is used to implement and deploy smart contracts on Starcoin, all users on Starcoin can reuse these smart contracts.")),(0,r.kt)("p",null,"Next, we\u2019ll explore further about each concept we have learned in figure 2. If there is a certain part that you're interested in, you can skip to it."),(0,r.kt)("h2",{id:"practical-dapp"},"Practical Dapp"),(0,r.kt)("p",null,"It\u2019s an easy decentralized application, it\u2019s designed for you to get started. You will get a quick feel of what Dapp is and how it interacts with Starcoin. For a developer, you can build your own Dapp or check the code structure through viewing its source code."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Test Dapp Link: ",(0,r.kt)("a",{parentName:"li",href:"https://starmask-test-dapp.starcoin.org/Github"},"https://starmask-test-dapp.starcoin.org/Github")),(0,r.kt)("li",{parentName:"ul"},"Github Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starmask-test-dapp"},"https://github.com/starcoinorg/starmask-test-dapp"))),(0,r.kt)("h2",{id:"starmask"},"StarMask"),(0,r.kt)("p",null,"Starmask is not only used to manage your digital assets, but another way to interact with Starcoin blockchain. Here is one example, users create digital signature for each transaction in Dapp, then submit this transaction to Txpool which in remote nodes."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Installation Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starmask-extension/blob/main/docs/how-to-install.md"},"https://github.com/starcoinorg/starmask-extension/blob/main/docs/how-to-install.md")),(0,r.kt)("li",{parentName:"ul"},"User Guides Link:",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starmask-extension/blob/main/docs/en/how-to-use.md"},"https://github.com/starcoinorg/starmask-extension/blob/main/docs/en/how-to-use.md"))),(0,r.kt)("h2",{id:"sdk"},"SDK"),(0,r.kt)("p",null,"Another way to interact with Starcoin is SDK. Starcoin now supports multi-language SDKs. SDK provides a programming interaction with nodes on Starcoin."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"JS SDK")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Developer Documentation Link: ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/sdk/javascript/"},"https://starcoin.org/zh/developer/sdk/javascript/")),(0,r.kt)("li",{parentName:"ul"},"Source Code Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin.js"},"https://github.com/starcoinorg/starcoin.js"))),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Java SDK")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Developer Documentation Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-java#readme"},"https://github.com/starcoinorg/starcoin-java#readme")),(0,r.kt)("li",{parentName:"ul"},"Source Code Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-java"},"https://github.com/starcoinorg/starcoin-java"))),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Python SDK")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Developer Documentation Link: ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin-sdk-python.readthedocs.io"},"https://starcoin-sdk-python.readthedocs.io")),(0,r.kt)("li",{parentName:"ul"},"Source Code Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-sdk-python"},"https://github.com/starcoinorg/starcoin-sdk-python"))),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Go SDK")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Developer Documentation Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-go/blob/main/README.md"},"https://github.com/starcoinorg/starcoin-go/blob/main/README.md")),(0,r.kt)("li",{parentName:"ul"},"Source Code Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-go"},"https://github.com/starcoinorg/starcoin-go"))),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Dart SDK")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Source Code Link: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin.dart"},"https://github.com/starcoinorg/starcoin.dart"))),(0,r.kt)("h2",{id:"starcoin-nodes-and-rpc-api"},"Starcoin Nodes and RPC API"),(0,r.kt)("p",null,"You can interact with Starcoin nodes using StarMask or SDK on Starcoin blockchain. The stability of nodes is essential to add Dapp transactions on Starcoin blockchain. Starcoin nodes include necessary APIs which you\u2019ll use on Starcoin blockchain."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Networks\nStarcoin has appropriate networks to satisfy the needs in various stages of development. We have five networks: Dev, Test, Halley, Proxima,Barnard,Main.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Dev: It\u2019s used for local Dapp development"),(0,r.kt)("li",{parentName:"ul"},"Test: It\u2019s used for unit and integrated test"),(0,r.kt)("li",{parentName:"ul"},"Halley: Always use the latest version of Stdlib, Genesis Block will be reset immediately and data will be cleaned up whenever there is a update for Stdlib"),(0,r.kt)("li",{parentName:"ul"},"Proxima: It\u2019s used to run tests before Dapp launch, data will be cleaned up periodically"),(0,r.kt)("li",{parentName:"ul"},"Barnard: It\u2019s also used to run tests before Dapp launch, but it\u2019s different from Proxima, we do not remove data, it\u2019s your responsibility to ensure smart contracts are still compatible."),(0,r.kt)("li",{parentName:"ul"},"Main: Main Starcoin network")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Nodes Installation Methods\nTo install on Windows,Mac, and Linux, download pre-compiled binary from ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin/releases"},"downloads")," pages.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Build Starcoin with source code, ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/setup/build/"},"Guides")),(0,r.kt)("li",{parentName:"ul"},"Run inside Docker container, ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/setup/run_by_docker/"},"Guides"))),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Run Starcoin\nThe approach is a little bit different due to different node installation methods.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run inside Docker container, ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/setup/run_by_docker/"},"Guides")),(0,r.kt)("li",{parentName:"ul"},"Pre-compiled binary, ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/setup/runnetwork/"},"Guides"),"\nYou need to change the ",(0,r.kt)("inlineCode",{parentName:"li"},"-n")," parameter to use different networks.")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Console\nStarcoin console is a command line interface for running Starcoin nodes. You can view nodes\u2019 state using a simple command.",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/cli/console/"},"Guides")),(0,r.kt)("li",{parentName:"ol"},"Command Line Document\nStarcoin has lots of commands, some useful commands are:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"account: account-related command"),(0,r.kt)("li",{parentName:"ul"},"chain: chain-related command"),(0,r.kt)("li",{parentName:"ul"},"node: node-related command"),(0,r.kt)("li",{parentName:"ul"},"state: state-related command\nCheck ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/cli/"},"here")," to view more commands.")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"RPC Protocol\nYou also can connect to Starcoin nodes via the RPC interface. It\u2019s a great programming way to access nodes on a chain, SDK is one example. Check ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/rpc/rpc_document/"},"RPC protocol document")," to get more information."),(0,r.kt)("li",{parentName:"ol"},"More about Starcoin\nIf you are a developer and want to get more details about Starcoin. We recommend you check these links:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Key concept: ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/key_concepts/"},"https://starcoin.org/zh/developer/key_concepts/")),(0,r.kt)("li",{parentName:"ul"},"SIPs: ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/sips/"},"https://starcoin.org/zh/developer/sips/")),(0,r.kt)("li",{parentName:"ul"},"Source code: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin"},"https://github.com/starcoinorg/starcoin"))),(0,r.kt)("h2",{id:"move"},"Move"),(0,r.kt)("p",null,"Currently, Starcoin is the first one public blockchain that can run Move smart contracts."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://move-book.com/"},"Move Book"),".Check ",(0,r.kt)("a",{parentName:"li",href:"https://developers.diem.com/docs/move/move-start-here/move-introduction"},"Move introduction")," to learn more about Move."),(0,r.kt)("li",{parentName:"ol"},"IDE")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Starcoin IDE: ",(0,r.kt)("a",{parentName:"li",href:"https://marketplace.visualstudio.com/items?itemName=starcoinorg.starcoin-ide"},"https://marketplace.visualstudio.com/items?itemName=starcoinorg.starcoin-ide")),(0,r.kt)("li",{parentName:"ul"},"Move-Package-Manager: It\u2019s a lightweight tool to test, deploy Move smart contracts.",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/guide-to-move-package-manager"},"Download"))),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Test\nYou can test your Move smart contracts with different test types.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Unit test: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/diem/diem/blob/main/language/changes/4-unit-testing.md"},"Guides")),(0,r.kt)("li",{parentName:"ul"},"Functional Test: To run a functional test, make sure to initialize Starcoin first."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/functional_test/functional_test/"},"Guides"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin/tree/master/vm/functional-tests/tests/testsuite"},"Examples"))))),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Compile and Deploy\nThere are multiple ways to compile and deploy Move smart contracts on Starcoin blockchain. Make sure that you have chosen appropriate networks!")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Console: ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/en/developer/tutorials/deploy_move_contract/"},"Guides")),(0,r.kt)("li",{parentName:"ul"},"Starmask-test-dapp: Contract blob hex functionality. ",(0,r.kt)("a",{parentName:"li",href:"https://starmask-test-dapp.starcoin.org/"},"Guides")),(0,r.kt)("li",{parentName:"ul"},"Move-Package-Manager: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/guide-to-move-package-manager"},"Guides"))),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"More ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/move/example/"},"example")," about Move")),(0,r.kt)("h2",{id:"stdlib-and-protocols"},"Stdlib and Protocols"),(0,r.kt)("p",null,"Starcoin has been created using Move language, it also has Stdlib features. Please check our ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin/tree/master/vm/stdlib/modules"},"source code"),".Starcoin has defined variety protocols in Stdlib, some protocols will be shown in figure 3.\n",(0,r.kt)("img",{src:a(3248).Z,width:"700",height:"706"})),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"DAO protocolDAO\nprotocol is a basic protocol in Stdlib, you can govern blockchain well via DAO protocol. Here is a ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/blog/starcoin_stdlib_upgrade"},"governable contract upgrade")," example."),(0,r.kt)("li",{parentName:"ol"},"NFT Protocol")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/protocols/starcoin_nft/"},"NFT protocol introduction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/sips/blob/master/sip-22/index.zh.md"},"SIP22")),(0,r.kt)("li",{parentName:"ul"},"Source Code",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-framework/tree/main/sources/NFT.move"},"https://github.com/starcoinorg/starcoin-framework/tree/main/sources/NFT.move")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-framework/tree/main/sources/MerkleNFT.move"},"https://github.com/starcoinorg/starcoin-framework/tree/main/sources/MerkleNFT.move"),"\n3: Stdlib ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/stdlib/stdlib/"},"Guides"))))),(0,r.kt)("h2",{id:"other-develop-tools"},"Other Develop Tools"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Official website\nVisit ",(0,r.kt)("a",{parentName:"li",href:"https://starcoin.org"},"our website")," to get more information, such as white paper, developer documents and tools, toolchain,latest news about Starcoin."),(0,r.kt)("li",{parentName:"ol"},"Faucet\nYou will need STC(native cryptocurrency of this platform) when you run tests, such as paying gas fees. As a developer, you can apply for STC in Barnad network.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Barnad: ",(0,r.kt)("a",{parentName:"li",href:"https://faucet.starcoin.org/barnard"},"https://faucet.starcoin.org/barnard"))),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Explorer\nExplorer is a complementary tool to chain. We suggest that you use ",(0,r.kt)("a",{parentName:"p",href:"https://stcscan.io/"},"stcscan")," as blockchain explorer.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Voting DappVoting Dapp is another developer tool,it\u2019s used to manage Starcoin blockchain. A developer can create a proposal, we will take a public,equal and formal vote in our community on the Vo\x01ting Dapp. Your proposal will be approved with more votes in favour.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Starcoin logos and icons\nDownload Link: ",(0,r.kt)("a",{parentName:"p",href:"https://starcoin.org/downloads/logo.zip%E2%81%A3"},"https://starcoin.org/downloads/logo.zip\u2063")))))}u.isMDXComponent=!0},7022:function(t,e,a){e.Z=a.p+"assets/images/dapp_1-4942ceb07950359f4cd81d2ef31bfdfb.png"},1516:function(t,e,a){e.Z=a.p+"assets/images/dapp_2-74ebae0ba86a50f301de39ebf2a93ee5.png"},3248:function(t,e,a){e.Z=a.p+"assets/images/pb-70072de3af92a69d04b9c237d6ee547b.jpg"}}]);