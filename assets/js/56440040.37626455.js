"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[3702],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(h,c(c({ref:t},l),{},{components:n})):r.createElement(h,c({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var u=2;u<a;u++)c[u]=n[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8467:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return c},default:function(){return p},frontMatter:function(){return a},metadata:function(){return i},toc:function(){return u}});var r=n(3117),o=(n(7294),n(3905));const a={},c="Account",i={unversionedId:"concepts/account",id:"concepts/account",title:"Account",description:"Account, Addresses, Authentication keys",source:"@site/docs/99-concepts/01-account.md",sourceDirName:"99-concepts",slug:"/concepts/account",permalink:"/starcoin-cookbook/docs/concepts/account",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/99-concepts/01-account.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"merkletree",permalink:"/starcoin-cookbook/docs/concepts/merkletree"},next:{title:"Transaction",permalink:"/starcoin-cookbook/docs/concepts/transaction"}},s={},u=[{value:"Account",id:"account-1",level:2},{value:"Addresses, authentication keys",id:"addresses-authentication-keys",level:3},{value:"Sequence Number",id:"sequence-number",level:3}],l={toc:u};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"account"},"Account"),(0,o.kt)("p",null,"Account, Addresses, Authentication keys"),(0,o.kt)("h2",{id:"account-1"},"Account"),(0,o.kt)("p",null,"An account represents a resource on the Starcoin that can send transactions. An account is a collection of Move resources stored at a particular 16-byte account address."),(0,o.kt)("h3",{id:"addresses-authentication-keys"},"Addresses, authentication keys"),(0,o.kt)("p",null,"A Starcoin account is uniquely identified by its 16-byte account address. Each account stores an authentication key used to authenticate the signer of a transaction. An account\u2019s address is derived from its initial authentication key, but the Diem Payment Network supports rotating the authentication key of an account without changing its address."),(0,o.kt)("p",null,"the authentication key is not a private key,it is public to others."),(0,o.kt)("p",null,"To generate an authentication key and account address:"),(0,o.kt)("p",null,"Generate a fresh key-pair (pubkey_A, privkey_A). The Starcoin uses the PureEdDSA scheme over the Ed25519 curve, as defined in RFC 8032.\nDerive a 32-byte authentication key auth_key = sha3-256(pubkey | 0x00), where | denotes concatenation. The 0x00 is a 1-byte signature scheme identifier where 0x00 means single-signature.\nThe account address is the last 16 bytes of auth_key."),(0,o.kt)("h3",{id:"sequence-number"},"Sequence Number"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"sequence number")," for an account indicates the number of transactions that have been submitted and committed on chain from that account. It is incremented every time a transaction sent from that account is executed or aborted and stored in the blockchain."),(0,o.kt)("li",{parentName:"ul"},"A transaction is executed only if it matches the current sequence number for the sender account. This helps sequence multiple transactions from the same sender and prevents replay attacks."),(0,o.kt)("li",{parentName:"ul"},"If the current sequence number of an account A is X, then a transaction T on account A will only be executed if T's sequence number is X."),(0,o.kt)("li",{parentName:"ul"},"Transactions with a sequence number greater than the account sequence number will be stored in mempool until their account sequence number is added to match the transaction sequence number (or until they expire)."),(0,o.kt)("li",{parentName:"ul"},"When the transaction is applied, the sequence number of the account will become X+1. The account has a strictly increasing sequence number.")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"TODO: this document needs to be improvement."),(0,o.kt)("ol",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ol"},"Private key, Public key, Auth key, Address"),(0,o.kt)("li",{parentName:"ol"},"MultiKey account"),(0,o.kt)("li",{parentName:"ol"},"Offchain account & Onchain account"),(0,o.kt)("li",{parentName:"ol"},"Account Resource"),(0,o.kt)("li",{parentName:"ol"},"Account Sequence Number"),(0,o.kt)("li",{parentName:"ol"},"Account Storage")),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://discord.com/channels/822159062475997194/892760287797714954/899142725251780608"},"https://discord.com/channels/822159062475997194/892760287797714954/899142725251780608")),(0,o.kt)("p",{parentName:"admonition"},"Migrate and Rewrite:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/key_concepts/account/"},"https://starcoin.org/zh/developer/key_concepts/account/")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://starcoin.org/en/developer/key_concepts/account/"},"https://starcoin.org/en/developer/key_concepts/account/")))))}p.isMDXComponent=!0}}]);