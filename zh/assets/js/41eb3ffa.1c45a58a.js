"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[1366],{3905:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return b}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var l=r.createContext({}),s=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},p=function(t){var e=s(t.components);return r.createElement(l.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,l=t.parentName,p=c(t,["components","mdxType","originalType","parentName"]),m=s(n),b=a,d=m["".concat(l,".").concat(b)]||m[b]||u[b]||o;return n?r.createElement(d,i(i({ref:e},p),{},{components:n})):r.createElement(d,i({ref:e},p))}));function b(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=t,c.mdxType="string"==typeof t?t:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9565:function(t,e,n){n.r(e),n.d(e,{assets:function(){return l},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return s}});var r=n(3117),a=(n(7294),n(3905));const o={},i=void 0,c={unversionedId:"getting-started/mining/mining_protocol",id:"getting-started/mining/mining_protocol",title:"mining_protocol",description:"\u672c\u6587\u4ecb\u7ecd Starcoin \u6316\u77ff\u7684 stratum \u534f\u8bae\u4ee5\u53ca\u5b9e\u73b0\u77ff\u6c60\u65f6\u76f8\u5173\u7684 API \u4f7f\u7528",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/02-getting-started/04-mining/02-mining_protocol.md",sourceDirName:"02-getting-started/04-mining",slug:"/getting-started/mining/mining_protocol",permalink:"/starcoin-cookbook/zh/docs/getting-started/mining/mining_protocol",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/02-getting-started/04-mining/02-mining_protocol.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6316\u77ff\u5ba2\u6237\u7aef",permalink:"/starcoin-cookbook/zh/docs/getting-started/mining/mining"},next:{title:"Move \u5b9e\u6218",permalink:"/starcoin-cookbook/zh/docs/move/"}},l={},s=[{value:"POW",id:"pow",level:3},{value:"\u8ba1\u7b97 hash",id:"\u8ba1\u7b97-hash",level:4},{value:"\u96be\u5ea6\u6821\u9a8c",id:"\u96be\u5ea6\u6821\u9a8c",level:4},{value:"\u83b7\u53d6\u51fa\u5757\u4efb\u52a1",id:"\u83b7\u53d6\u51fa\u5757\u4efb\u52a1",level:3},{value:"Pubsub json rpc",id:"pubsub-json-rpc",level:4},{value:"JSON rpc",id:"json-rpc",level:4},{value:"\u63d0\u4ea4 Seal",id:"\u63d0\u4ea4-seal",level:3},{value:"stratum \u534f\u8bae",id:"stratum-\u534f\u8bae",level:3},{value:"\u533a\u5757\u5956\u52b1",id:"\u533a\u5757\u5956\u52b1",level:3},{value:"\u8f6c\u8d26,\u67e5\u8be2\u4f59\u989d",id:"\u8f6c\u8d26\u67e5\u8be2\u4f59\u989d",level:3}],p={toc:s};function u(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u672c\u6587\u4ecb\u7ecd Starcoin \u6316\u77ff\u7684 stratum \u534f\u8bae\u4ee5\u53ca\u5b9e\u73b0\u77ff\u6c60\u65f6\u76f8\u5173\u7684 API \u4f7f\u7528"),(0,a.kt)("h3",{id:"pow"},"POW"),(0,a.kt)("p",null,"Starcoin pow hash \u7b97\u6cd5\u4e3a cryptonight-rs"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin/tree/master/consensus/cryptonight-rs/ext"},"C library")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://pypi.org/project/py-cryptonight/"},"Python library")),(0,a.kt)("li",{parentName:"ul"},"\u6216\u53c2\u8003 ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/xmrig/xmrig"},"xmrig"))),(0,a.kt)("h4",{id:"\u8ba1\u7b97-hash"},"\u8ba1\u7b97 hash"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin/blob/master/consensus/src/cn.rs#L29-L39"},"rust reference")),(0,a.kt)("p",null,"minting_blob \u4e3a76\u5b57\u8282\u7684\u6570\u7ec4\u3002 (35..39] 4\u4e2a\u5b57\u8282\u4e3a\u53ef\u4fee\u6539\u7684\u6269\u5c55\u5b57\u6bb5, (39..43] 4\u4e2a\u5b57\u8282\u4e3a nonce \u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"fn calculate_pow_hash(minting_blob: [u8;76], nonce: u32, extra: [u8;4]) -> Hash{\n    minting_blob[35..39]=extra; \n    minting_blob[39..43].write_u32::<LittleEndian>(nonce); //(39..43) \u4e3a u32 \u7684 nonce \u7684\u5c0f\u7aef\u7f16\u7801\n    let pow_hash = cryptonight_r(input=minting_blob,variant=4,height=0);\n    return pow_hash\n}\n")),(0,a.kt)("h4",{id:"\u96be\u5ea6\u6821\u9a8c"},"\u96be\u5ea6\u6821\u9a8c"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin/blob/master/consensus/src/consensus.rs#L85-#L117"},"rust reference")),(0,a.kt)("h3",{id:"\u83b7\u53d6\u51fa\u5757\u4efb\u52a1"},"\u83b7\u53d6\u51fa\u5757\u4efb\u52a1"),(0,a.kt)("h4",{id:"pubsub-json-rpc"},"Pubsub json rpc"),(0,a.kt)("p",null,"\u652f\u6301 websocket or tcp"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# wsc is a WebSocket client for the terminal\n$wsc ws://localhost:9870\n> {"jsonrpc": "2.0", "method": "starcoin_subscribe", "params": [{"type_name":"newMintBlock"}], "id": 1}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "jsonrpc": "2.0",\n  "method": "starcoin_subscription",\n  "params": {\n    "subscription": 1,\n    "result": {\n      "parent_hash": "0xd401460f95556f2983815b5e00a56f36be289e3c5b61ce62af616fe83874f6ae",\n      "strategy": {\n        "type": "CryptoNight"\n      },\n      "minting_blob": "e97c0eab7fdab0f4a053251062701a878800f52f016ffbd1331c7f79c3d895610000000000000000000000000000000000000000000000000000000000000000000000000000000000019cb4",\n      "difficulty": "0x019cb4",\n      "block_number": 446\n    }\n  }\n}\n\n')),(0,a.kt)("h4",{id:"json-rpc"},"JSON rpc"),(0,a.kt)("p",null,"\u652f\u6301 tcp/websocket/http/ipc"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://localhost:9850 -X POST \\\n-H \'Content-Type: application/json\' \\\n-d \'{\n    "id":"curltest",\n    "jsonrpc":"2.0",\n    "method":"mining.get_job",\n    "params":[]\n}\'\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "jsonrpc": "2.0",\n  "result": {\n    "parent_hash": "0xd401460f95556f2983815b5e00a56f36be289e3c5b61ce62af616fe83874f6ae",\n    "strategy": {\n      "type": "CryptoNight"\n    },\n    "minting_blob": "e97c0eab7fdab0f4a053251062701a878800f52f016ffbd1331c7f79c3d895610000000000000000000000000000000000000000000000000000000000000000000000000000000000019cb4",\n    "difficulty": "0x019cb4",\n    "block_number": 446\n  },\n  "id": "curltest"\n}\n')),(0,a.kt)("h3",{id:"\u63d0\u4ea4-seal"},"\u63d0\u4ea4 Seal"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'curl --data-binary \'{\\\n  "jsonrpc": "2.0",\\\n  "id": "curltext",\\\n  "method": "mining.submit",\\\n  "params": [\\\n    "59756e812a060cf8bcedbf4cc37c25f30c479874d1dfa1cfa26f3ecac252e3dc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000ee",\\\n    1024,\\\n    "00000000"\\\n  ]\\\n}\' -H \'Content-Type: application/json\'  http://localhost:9850\n')),(0,a.kt)("p",null,"params \u4e2d\u7684\u4e09\u4e2a\u53c2\u6570\u5206\u522b\u4e3a minting_blob, nonce, extra"),(0,a.kt)("h3",{id:"stratum-\u534f\u8bae"},"stratum \u534f\u8bae"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin/blob/master/stratum/stratum_mining_protocol.md"},"starcoin stratum protocol")),(0,a.kt)("p",null,"\u6ce8\u610f: "),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"target \u7684\u8ba1\u7b97"),(0,a.kt)("li",{parentName:"ol"},"blob \u4e2d extra \u7684\u586b\u5145")),(0,a.kt)("h3",{id:"\u533a\u5757\u5956\u52b1"},"\u533a\u5757\u5956\u52b1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"reward = coinbase + 0.1 * coinbase * uncle_number + gas_fee\n")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin-sdk-python/blob/master/starcoin/sdk/client.py#L192-L217"},"python reference")),(0,a.kt)("h3",{id:"\u8f6c\u8d26\u67e5\u8be2\u4f59\u989d"},"\u8f6c\u8d26,\u67e5\u8be2\u4f59\u989d"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5229\u7528\u8282\u70b9\u8fdb\u884c\u7b7e\u540d, http api\u5c01\u88c5\u8fdb\u884c\u4ea4\u6613\u53d1\u8d77\uff0c\u8bf7\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/fikgol/starcoin-py2-example/blob/master/p2p_transfer.py"},"example"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u4f7f\u7528 sdk \u53d1\u8d77\u4ea4\u6613"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin-sdk-python/blob/master/examples/p2p_transfer.py"},"python3")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/starcoinorg/starcoin.js"},"starcoin.js")))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u67e5\u8be2\u4f59\u989d\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin-sdk-python/blob/master/starcoin/sdk/client.py#L146-L155"},"python reference"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u9ed8\u8ba4\u6316\u77ff\u5730\u5740\u4e3a\u8282\u70b9default address, \u53ef\u5012\u5165\u53ea\u8bfb\u8d26\u53f7\u4f5c\u4e3a default address"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"starcoin% account import-readonly --help\nUSAGE:\n    account import-readonly -i <input> [account_address]\nOPTIONS:\n    -i <input>        input of public key\nARGS:\n    <account_address>    if account_address is absent, generate address by public_key\n")))))}u.isMDXComponent=!0}}]);