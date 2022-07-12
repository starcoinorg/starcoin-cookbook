"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[1131],{3905:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var s=r.createContext({}),l=function(t){var e=r.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},p=function(t){var e=l(t.components);return r.createElement(s.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,a=t.originalType,s=t.parentName,p=c(t,["components","mdxType","originalType","parentName"]),m=l(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(f,i(i({ref:e},p),{},{components:n})):r.createElement(f,i({ref:e},p))}));function d(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var s in e)hasOwnProperty.call(e,s)&&(c[s]=e[s]);c.originalType=t,c.mdxType="string"==typeof t?t:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6658:function(t,e,n){n.r(e),n.d(e,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return l}});var r=n(3117),o=(n(7294),n(3905));const a={},i="Transaction",c={unversionedId:"concepts/transaction",id:"concepts/transaction",title:"Transaction",description:"Clients of the Starcoin Blockchain submit transactions to request updates to the ledger state.",source:"@site/docs/99-concepts/02-transaction.md",sourceDirName:"99-concepts",slug:"/concepts/transaction",permalink:"/starcoin-cookbook/docs/concepts/transaction",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/99-concepts/02-transaction.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Account",permalink:"/starcoin-cookbook/docs/concepts/account"},next:{title:"Block",permalink:"/starcoin-cookbook/docs/concepts/block"}},s={},l=[],p={toc:l};function u(t){let{components:e,...n}=t;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"transaction"},"Transaction"),(0,o.kt)("p",null,"Clients of the Starcoin Blockchain submit transactions to request updates to the ledger state."),(0,o.kt)("p",null," A signed transaction on the blockchain mainly contains:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Sender address")," \u2014 Account address of the sender of the transaction."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Sender public key")," \u2014 The public key that corresponds to the private key used to sign the transaction."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Program")," \u2014 The program is comprised of the following:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"A Move bytecode transaction script."),(0,o.kt)("li",{parentName:"ul"},"An optional list of inputs to the script. For a peer-to-peer transaction, the inputs contain the information about the recipient and the amount transferred to the recipient."),(0,o.kt)("li",{parentName:"ul"},"An optional list of Move bytecode modules to publish."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Sequence number")," \u2014 An unsigned integer that must be equal to the sequence number stored under the sender\u2019s account."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Expiration time")," \u2014 The time after which the transaction ceases to be valid."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Signature")," \u2014 The digital signature of the sender.")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"TODO"),(0,o.kt)("ol",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ol"},"Transaction struct"),(0,o.kt)("li",{parentName:"ol"},"Transaction type introduce"),(0,o.kt)("li",{parentName:"ol"},"Transaction Info"),(0,o.kt)("li",{parentName:"ol"},"Transaction Info accumulator")),(0,o.kt)("p",{parentName:"admonition"},"Migrate and Rewrite:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/key_concepts/transaction/"},"https://starcoin.org/zh/developer/key_concepts/transaction/")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://starcoin.org/en/developer/key_concepts/transaction/"},"https://starcoin.org/en/developer/key_concepts/transaction/")))))}u.isMDXComponent=!0}}]);