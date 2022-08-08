"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[3543],{3905:function(e,r,t){t.d(r,{Zo:function(){return l},kt:function(){return h}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),p=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=p(e.components);return n.createElement(i.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(t),h=a,d=m["".concat(i,".").concat(h)]||m[h]||u[h]||o;return t?n.createElement(d,c(c({ref:r},l),{},{components:t})):n.createElement(d,c({ref:r},l))}));function h(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,c[1]=s;for(var p=2;p<o;p++)c[p]=t[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8598:function(e,r,t){t.r(r),t.d(r,{assets:function(){return i},contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return p}});var n=t(3117),a=(t(7294),t(3905));const o={},c="Starcoin Json RPC",s={unversionedId:"web3/starcoin-json-rpc",id:"web3/starcoin-json-rpc",title:"Starcoin Json RPC",description:"account. and node_manager. is not public on Main/Barnard/Proxima/Halley networks. They are only accessable while you enable public on your local node.",source:"@site/docs/04-web3/02-starcoin-json-rpc.md",sourceDirName:"04-web3",slug:"/web3/starcoin-json-rpc",permalink:"/starcoin-cookbook/docs/web3/starcoin-json-rpc",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/04-web3/02-starcoin-json-rpc.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"StatMask javascript sdk",permalink:"/starcoin-cookbook/docs/web3/starmask/rpc-api"},next:{title:"Starcoin sdk",permalink:"/starcoin-cookbook/docs/web3/starcoin-sdks"}},i={},p=[{value:"account",id:"account",level:2},{value:"chain",id:"chain",level:2},{value:"contract_api",id:"contract_api",level:2},{value:"debug",id:"debug",level:2},{value:"miner",id:"miner",level:2},{value:"network_manager",id:"network_manager",level:2},{value:"node",id:"node",level:2},{value:"node_manager",id:"node_manager",level:2},{value:"state",id:"state",level:2},{value:"sync_manager",id:"sync_manager",level:2},{value:"txpool",id:"txpool",level:2}],l={toc:p};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"starcoin-json-rpc"},"Starcoin Json RPC"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"account.*")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"node_manager.*")," is not public on Main/Barnard/Proxima/Halley networks. They are only accessable while you enable ",(0,a.kt)("inlineCode",{parentName:"p"},"public")," on your local node.")),(0,a.kt)("h2",{id:"account"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/account.json"},"account")),(0,a.kt)("h2",{id:"chain"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/chain.json"},"chain")),(0,a.kt)("h2",{id:"contract_api"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/contract_api.json"},"contract_api")),(0,a.kt)("h2",{id:"debug"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/debug.json"},"debug")),(0,a.kt)("h2",{id:"miner"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/miner.json"},"miner")),(0,a.kt)("h2",{id:"network_manager"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/network_manager.json"},"network_manager")),(0,a.kt)("h2",{id:"node"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/node.json"},"node")),(0,a.kt)("h2",{id:"node_manager"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/node_manager.json"},"node_manager")),(0,a.kt)("h2",{id:"state"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/state.json"},"state")),(0,a.kt)("h2",{id:"sync_manager"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/sync_manager.json"},"sync_manager")),(0,a.kt)("h2",{id:"txpool"},(0,a.kt)("a",{parentName:"h2",href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/starcoinorg/starcoin/master/rpc/generated_rpc_schema/txpool.json"},"txpool")))}u.isMDXComponent=!0}}]);