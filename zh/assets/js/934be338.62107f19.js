"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[8863],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return c}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var N=a.createContext({}),d=function(e){var t=a.useContext(N),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(N.Provider,{value:t},e.children)},T={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},F=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,N=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),F=d(n),c=r,s=F["".concat(N,".").concat(c)]||F[c]||T[c]||o;return n?a.createElement(s,i(i({ref:t},p),{},{components:n})):a.createElement(s,i({ref:t},p))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=F;var l={};for(var N in t)hasOwnProperty.call(t,N)&&(l[N]=t[N]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}F.displayName="MDXCreateElement"},430:function(e,t,n){n.r(t),n.d(t,{assets:function(){return N},contentTitle:function(){return i},default:function(){return T},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return d}});var a=n(3117),r=(n(7294),n(3905));const o={},i="NFT \u6807\u51c6",l={unversionedId:"move/starcoin-framework/nft",id:"move/starcoin-framework/nft",title:"NFT \u6807\u51c6",description:"NFT\uff08non-fungible token\uff09\u5373\u975e\u540c\u8d28\u5316\u4ee3\u5e01\uff0c\u4e5f\u79f0\u4e3a\u4e0d\u53ef\u66ff\u4ee3\u6027\u4ee3\u5e01\u6216\u5951\u7ea6\u4ee3\u5e01\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/03-move/05-starcoin-framework/5-nft.md",sourceDirName:"03-move/05-starcoin-framework",slug:"/move/starcoin-framework/nft",permalink:"/starcoin-cookbook/zh/docs/move/starcoin-framework/nft",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/03-move/05-starcoin-framework/5-nft.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Token standard",permalink:"/starcoin-cookbook/zh/docs/move/starcoin-framework/token"},next:{title:"DAO",permalink:"/starcoin-cookbook/zh/docs/move/starcoin-framework/dao"}},N={},d=[{value:"\u4f5c\u7528",id:"\u4f5c\u7528",level:2},{value:"\u76ee\u6807",id:"\u76ee\u6807",level:2},{value:"\u7c7b\u578b\u5b9a\u4e49",id:"\u7c7b\u578b\u5b9a\u4e49",level:2},{value:"\u65b9\u6cd5\u5b9a\u4e49",id:"\u65b9\u6cd5\u5b9a\u4e49",level:2},{value:"NFT \u9648\u5217\u5ba4\uff08NFTGallery\uff09",id:"nft-\u9648\u5217\u5ba4nftgallery",level:2},{value:"\u6269\u5c55\u65b9\u5f0f",id:"\u6269\u5c55\u65b9\u5f0f",level:2},{value:"\u81ea\u5b9a\u4e49 Metadata",id:"\u81ea\u5b9a\u4e49-metadata",level:3},{value:"\u5d4c\u5957 NFTBody",id:"\u5d4c\u5957-nftbody",level:3},{value:"\u81ea\u5b9a\u4e49\u8f6c\u8ba9\u903b\u8f91",id:"\u81ea\u5b9a\u4e49\u8f6c\u8ba9\u903b\u8f91",level:3},{value:"Starcoin NFT \u6807\u51c6\u4e0e ERC721/ERC1155 \u4e4b\u95f4\u7684\u5dee\u5f02",id:"starcoin-nft-\u6807\u51c6\u4e0e-erc721erc1155-\u4e4b\u95f4\u7684\u5dee\u5f02",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],p={toc:d};function T(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"nft-\u6807\u51c6"},"NFT \u6807\u51c6"),(0,r.kt)("p",null,"NFT\uff08non-fungible token\uff09\u5373\u975e\u540c\u8d28\u5316\u4ee3\u5e01\uff0c\u4e5f\u79f0\u4e3a\u4e0d\u53ef\u66ff\u4ee3\u6027\u4ee3\u5e01\u6216\u5951\u7ea6\u4ee3\u5e01\u3002"),(0,r.kt)("p",null,"\u975e\u540c\u8d28\u5316\u4ee3\u5e01\u7528\u4e8e\u8ffd\u8e2a\u4e00\u4e2a\u7279\u5b9a\u4e8b\u7269\u7684\u6240\u6709\u6743\uff0c\u8fd9\u4e2a\u4e8b\u7269\u53ef\u4ee5\u662f\u4e00\u4e2a\u6570\u5b57\u8d44\u4ea7\uff0c\u4f8b\u5982\u4e00\u4e2a\u7535\u5b50\u6e38\u620f\u9053\u5177\u3001\u6570\u5b57\u85cf\u54c1\uff1b\n\u4e5f\u53ef\u4ee5\u5bf9\u5e94\u73b0\u5b9e\u4e2d\u7684\u8d44\u4ea7\uff0c\u6bd4\u5982\u4e00\u8f86\u8f66\u3001\u4e00\u680b\u623f\u5b50\u3001\u9057\u5631\u3001\u571f\u5730\u6743\u7b49\u7b49\u3002\n\u8fd9\u4e9b\u7279\u5b9a\u7684\u4e8b\u7269\u53ef\u4ee5\u4e0e\u5951\u7ea6\u552f\u4e00\u7ed1\u5b9a\uff0c\u901a\u8fc7 NFT \u8ffd\u8e2a\u5951\u7ea6\u7684\u62e5\u6709\u8005\u3002"),(0,r.kt)("p",null,"Starcoin \u4f7f\u7528 Move \u4f5c\u4e3a\u667a\u80fd\u5408\u7ea6\u8bed\u8a00\uff0c\u5e76\u4e14\u5de7\u5999\u5730\u8fd0\u7528 Move \u8bed\u8a00\u7684\u4f18\u70b9\uff0c\u5b9a\u4e49\u4e86\u4e00\u5957\u5b89\u5168\u7684\u3001\u53ef\u6269\u5c55\u7684\u6807\u51c6 NFT \u534f\u8bae\uff0c\u5f00\u7bb1\u5373\u7528\uff0c\u7b80\u6d01\u9ad8\u6548\u3002\n\u8ddf\u4ee5\u592a\u574a\u7684NFT\u534f\u8bae\u5bf9\u6bd4\uff0cStarcoin \u7684\u6807\u51c6NFT\u534f\u8bae\u6709\u66f4\u52a0\u4e30\u5bcc\u7684\u7279\u6027\u3002"),(0,r.kt)("h2",{id:"\u4f5c\u7528"},"\u4f5c\u7528"),(0,r.kt)("p",null,"\u5728\u667a\u80fd\u5408\u7ea6\u4e2d\uff0c\u4ee3\u5e01\uff08token\uff09\u7528\u6765\u8868\u8fbe\u53ef\u62c6\u5206\u7684\u6570\u5b57\u8d44\u6e90\uff0c\u800c\u8981\u8868\u8fbe\u4e0d\u53ef\u62c6\u5206\u7684\u8d44\u6e90\uff0c\u5c31\u9700\u8981 NFT\u3002\n\u5728 Move \u4e2d\uff0c\u4efb\u4f55\u4e00\u4e2a\u4e0d\u53ef copy \u548c drop \u7684\u7c7b\u578b\u5b9e\u4f8b\uff0c\u90fd\u53ef\u4ee5\u8ba4\u4e3a\u662f\u4e00\u4e2a\u4e0d\u53ef\u62c6\u5206\u7684\u8d44\u6e90\uff0c\u662f\u4e00\u4e2a NFT\u3002\n\u4f46 NFT \u9700\u8981\u4e00\u79cd\u7edf\u4e00\u5c55\u793a\u7684\u6807\u51c6\uff0c\u4ee5\u53ca NFT \u7684\u6536\u96c6\u548c\u8f6c\u79fb\u65b9\u6cd5\uff0c\u6240\u4ee5\u8bbe\u8ba1\u672c\u6807\u51c6\u3002"),(0,r.kt)("h2",{id:"\u76ee\u6807"},"\u76ee\u6807"),(0,r.kt)("p",null,"\u63d0\u4f9b\u4e00\u79cd\u901a\u7528\u7684\uff0c\u53ef\u6269\u5c55\u7684\u6807\u51c6\uff0c\u540c\u65f6\u63d0\u4f9b NFT \u76f8\u5173\u7684\u57fa\u672c\u64cd\u4f5c\u5b9e\u73b0\u3002"),(0,r.kt)("h2",{id:"\u7c7b\u578b\u5b9a\u4e49"},"\u7c7b\u578b\u5b9a\u4e49"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"struct NFT<NFTMeta: copy + store + drop, NFTBody: store> has store {\n        /// The creator of NFT\n        creator: address,\n        /// The unique id of NFT under NFTMeta type\n        id: u64,\n        /// The metadata of NFT\n        base_meta: Metadata,\n        /// The extension metadata of NFT\n        type_meta: NFTMeta,\n        /// The body of NFT, NFT is a box for NFTBody\n        body: NFTBody,\n}\n")),(0,r.kt)("p",null,"NFT \u662f Move \u4e2d\u7684\u4e00\u79cd\u7c7b\u578b\uff0c\u5b83\u652f\u6301 store ability\uff0c\u4f46\u4e0d\u53ef copy \u4ee5\u53ca drop\uff0c\u5305\u542b\u4e00\u4e9b\u57fa\u672c\u7684\u5143\u4fe1\u606f\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"creator"),"\uff1aNFT \u521b\u5efa\u8005\u7684 address\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"id"),"\uff1a\u8be5 NFT \u7c7b\u578b\u4e0b\u7684\u552f\u4e00 id\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"base_meta"),"\uff1a\u57fa\u7840\u7684\u901a\u7528 metadata \u4fe1\u606f\uff0c\u4e3b\u8981\u7528\u6765\u8868\u8fbe\u5982\u4f55\u5c55\u793a NFT\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"type_meta"),"\uff1a\u5f00\u53d1\u8005\u81ea\u5b9a\u4e49\u7684 metadata\uff0c\u540c\u65f6\u7528\u6765\u6807\u8bb0 NFT \u7684\u7c7b\u578b\u3002Metadata \u4e0d\u662f\u8d44\u6e90\uff0c\u5b83\u8868\u8fbe\u4fe1\u606f\uff0c\u6240\u4ee5\u652f\u6301 copy + store + drop\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"body"),"\uff1aNFT \u5305\u542b\u7684\u8d44\u6e90\uff0c\u53ef\u4ee5\u7528\u6765\u5d4c\u5165\u5176\u4ed6\u7684\u8d44\u6e90\u3002")),(0,r.kt)("p",null,"\u5982\u679c\u628a NFT \u89c6\u4e3a\u4e00\u4e2a\u7bb1\u5b50\uff0cNFT \u672c\u8eab\u5b9a\u4e49\u4e86\u8fd9\u4e2a\u7bb1\u5b50\u7684\u5f52\u5c5e\uff0c\u552f\u4e00\u7f16\u53f7\uff0c\u4ee5\u53ca\u5c55\u793a\u65b9\u5f0f\uff0c\u800c NFTBody \u5c31\u662f\u7bb1\u5b50\u4e2d\u5c01\u88c5\u7684\u73e0\u5b9d\u3002\n\u5c55\u793a\u65b9\u5f0f\u901a\u8fc7 Metadata \u6765\u5b9a\u4e49\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"struct Metadata has copy, store, drop {\n        /// NFT name's utf8 bytes.\n        name: vector<u8>,\n        /// Image link, such as ipfs://xxxx\n        image: vector<u8>,\n        /// Image bytes data, image or image_data can not empty for both.\n        image_data: vector<u8>,\n        /// NFT description utf8 bytes.\n        description: vector<u8>,\n}\n")),(0,r.kt)("p",null,"Metadata \u5b9a\u4e49\u4e86 NFT \u5c55\u793a\u6240\u9700\u8981\u7684\u57fa\u672c\u4fe1\u606f\uff0c\u540d\u79f0\uff0c\u56fe\u7247\uff0c\u63cf\u8ff0\u3002\n\u5982\u679c\u6709\u5176\u4ed6\u9700\u8981\u6269\u5c55\u7684\u4fe1\u606f\uff0c\u53ef\u4ee5\u5b9a\u4e49\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"type_meta")," \u4e2d\u3002\u56fe\u7247\u6709\u4e24\u4e2a\u5b57\u6bb5\u8868\u8fbe\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"image")," \u8868\u793a\u56fe\u7247\u5730\u5740\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"image_data")," \u53ef\u4ee5\u76f4\u63a5\u4fdd\u5b58\u56fe\u7247\u7684\u4e8c\u8fdb\u5236\u6570\u636e\uff0c\u5ba2\u6237\u7aef\u5c55\u793a\u7684\u65f6\u5019\uff0c\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"image")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"image_data")," \u4e2d\u4e0d\u4e3a\u7a7a\u7684\u90a3\u4e2a\u5b57\u6bb5\u3002"),(0,r.kt)("p",null,"\u53e6\u5916\uff0c\u6709\u7684 NFT \u7684\u6240\u6709\u5b9e\u4f8b\u4f1a\u4f7f\u7528\u540c\u4e00\u4e2a\u56fe\u7247\uff0c\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0cNFT metadata \u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"image")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"image_data")," \u53ef\u4ee5\u90fd\u4e3a\u7a7a\uff0c\u5ba2\u6237\u7aef\u5c55\u793a\u7684\u65f6\u5019\u4f7f\u7528 NFTTypeInfoV2 \u4e2d\u7684 metadata\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"}," /// The info of NFT type\nstruct NFTTypeInfoV2<NFTMeta: copy + store + drop> has key, store {\n        counter: u64,\n        meta: Metadata,\n        mint_events: Event::EventHandle<MintEvent<NFTMeta>>,\n        burn_events: Event::EventHandle<BurnEvent<NFTMeta>>,\n}\n")),(0,r.kt)("p",null,"NFTTypeInfoV2 \u7528\u4e8e\u7ef4\u62a4 NFT id \u7684\u8ba1\u6570\u5668\uff0c\u4ee5\u53ca\u8be5 NFT \u7c7b\u578b\u7684\u5168\u5c40 metata\uff0c\u6bcf\u4e00\u79cd NFT \u7c7b\u578b\u9700\u8981\u5148\u5728\u6ce8\u518c\u4e2d\u5fc3\u6ce8\u518c\u3002\n\u6240\u6709\u7684 NFT \u7c7b\u578b\u90fd\u6ce8\u518c\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"0x1")," \u8fd9\u4e2a\u8d26\u53f7\u4e0b\u3002"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u6ce8: NFTTypeInfo \u5728 stdlibv7 \u4e2d\u53d8\u4e3a NFTTypeInfoV2")),(0,r.kt)("h2",{id:"\u65b9\u6cd5\u5b9a\u4e49"},"\u65b9\u6cd5\u5b9a\u4e49"),(0,r.kt)("p",null,"\u6bcf\u79cd NFT \u7684\u7c7b\u578b\u9700\u8981\u5148\u6ce8\u518c\uff0c\u6ce8\u518c\u65f6\u9700\u8981 NFT \u7684\u6807\u8bb0\u7c7b\u578b NFTMeta \u4ee5\u53ca\u8be5\u7c7b\u578b\u7684\u5168\u5c40 metadata\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"public fun register<NFTMeta: copy + store + drop, NFTTypeInfoExt: copy + store + drop>(sender: &signer, info: NFTTypeInfoExt, meta: Metadata)\n")),(0,r.kt)("p",null,"\u6ce8\u518c\u540e ",(0,r.kt)("inlineCode",{parentName:"p"},"sender"),"  \u8d26\u53f7\u4e0b\u4f1a\u88ab\u5199\u5165\u4e09\u4e2a\u6743\u9650\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"MintCapability"),"\uff1a\u7528\u4e8e\u94f8\u9020\u8be5\u7c7b\u578b\u7684 NFT"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"BurnCapability"),"\uff1a\u7528\u4e8e\u70e7\u6bc1\u8be5\u7c7b\u578b\u7684 NFT"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"UpdateCapability"),"\uff1a\u7528\u4e8e\u66f4\u65b0\u8be5\u7c7b\u578b\u7684 NFT metadata")),(0,r.kt)("p",null,"\u8fd9\u4e09\u4e2a\u6743\u9650\u5bf9\u5e94\u4e09\u4e2a\u65b9\u6cd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"/// \u94f8\u9020 NFT\uff0c\u8fd4\u56de NFT \u7684\u5b9e\u4f8b\npublic fun mint_with_cap<NFTMeta: copy + store + drop, NFTBody: store, Info: copy + store + drop>(creator: address, cap: &mut MintCapability<NFTMeta>, base_meta: Metadata, type_meta: NFTMeta, body: NFTBody): NFT<NFTMeta, NFTBody>\n\n///\u70e7\u6bc1 NFT\uff0c\u8fd4\u56de NFT \u5185\u90e8\u5d4c\u5957\u7684 NFTBody\npublic fun burn_with_cap<NFTMeta: copy + store + drop, NFTBody: store>(cap: &mut BurnCapability<NFTMeta>, nft: NFT<NFTMeta, NFTBody>): NFTBody \n\n///\u66f4\u65b0 NFT \u7684 metadata\npublic fun update_meta_with_cap<NFTMeta: copy + store + drop, NFTBody: store>(cap: &mut UpdateCapability<NFTMeta>, nft: &mut NFT<NFTMeta, NFTBody>, base_meta: Metadata, type_meta: NFTMeta)\n")),(0,r.kt)("p",null,"\u4e0a\u9762\u5217\u4e3e\u4e86 NFT \u76f8\u5173\u7684\u57fa\u672c\u65b9\u6cd5\uff0c\u800c NFT \u5982\u4f55\u5b58\u50a8\uff0c\u5982\u4f55\u8f6c\u8ba9\uff0c\u8fd9\u4e2a\u4e0d\u662f NFT \u6a21\u5757\u672c\u8eab\u5173\u5fc3\u7684\u4e8b\u60c5\uff0c\u662f NFTGallery \u7684\u529f\u80fd\u3002"),(0,r.kt)("h2",{id:"nft-\u9648\u5217\u5ba4nftgallery"},"NFT \u9648\u5217\u5ba4\uff08NFTGallery\uff09"),(0,r.kt)("p",null,"NFTGallery \u6a21\u5757\u63d0\u4f9b\u4e86\u7528\u6237\u7528\u6765\u6536\u96c6\u548c\u5b58\u50a8 NFT \u7684\u57fa\u672c\u529f\u80fd\u3002\u4e3b\u8981\u5305\u542b\u4ee5\u4e0b\u65b9\u6cd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"/// \u521d\u59cb\u5316\u4e00\u4e2a NFTGallery \u53bb\u63a5\u53d7\u7c7b\u578b\u4e3a NFT<NFTMeta, NFTBody> \u7684 NFT\uff0c\u7528\u6237\u6bcf\u63a5\u53d7\u4e00\u79cd\u65b0\u7684 NFT\uff0c\u90fd\u9700\u8981\u8c03\u7528\u8fd9\u4e2a\u65b9\u6cd5\u521d\u59cb\u5316\u3002\npublic fun accept<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer)\n\n/// \u5c06 id \u4e3a\u53c2\u6570 `id` \u7684 NFT \u4ece `sender` \u8f6c\u7ed9 `receiver`\npublic fun transfer<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, id: u64, receiver: address)\n\n/// \u83b7\u53d6 `ownder` \u7684\u7c7b\u578b\u4e3a NFTMeta \u7684\u6240\u6709 NFT info, \u8fd4\u56de NFTInfo \u5217\u8868\npublic fun get_nft_infos<NFTMeta: copy + store + drop, NFTBody: store>(owner: address):vector<NFT::NFTInfo<NFTMeta>>\n   \n/// \u5c06 `nft` \u5b58\u653e\u5230 `sender` \u7684 NFTGallery \u4e2d\npublic fun deposit<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, nft: NFT<NFTMeta, NFTBody>)\n\n/// \u5c06 `nft` \u5b58\u653e\u5230 `receiver` \u7684 NFTGallery\npublic fun deposit_to<NFTMeta: copy + store + drop, NFTBody: store>(receiver: address, nft: NFT<NFTMeta, NFTBody>)\n\n/// \u4ece `sender` \u7684 NFTGallery \u4e2d\u53d6\u4e00\u4e2a\u7c7b\u578b\u4e3a NFTMeta \u7684 NFT\npublic fun withdraw_one<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer): NFT<NFTMeta, NFTBody>\n\n/// \u4ece `sender` \u7684 NFTGallery \u4e2d\u53d6\u4e00\u4e2a\u7c7b\u578b\u4e3a NFTMeta\uff0cid \u4e3a\u53c2\u6570 `id` \u7684 NFT\npublic fun withdraw<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer, id: u64): Option<NFT<NFTMeta, NFTBody>>\n")),(0,r.kt)("p",null,"NFTGallery \u63d0\u4f9b\u4e86\u4e00\u4e2a\u901a\u7528\u7684\u7a7a\u95f4\u7528\u6765\u5b58\u50a8\u548c\u67e5\u8be2 NFT\uff0c\u5f53\u7136\uff0c\u5f00\u53d1\u8005\u4e5f\u53ef\u4ee5\u81ea\u884c\u8bbe\u8ba1 NFT \u7684\u5b58\u50a8\u6a21\u5757\u3002"),(0,r.kt)("h2",{id:"\u6269\u5c55\u65b9\u5f0f"},"\u6269\u5c55\u65b9\u5f0f"),(0,r.kt)("h3",{id:"\u81ea\u5b9a\u4e49-metadata"},"\u81ea\u5b9a\u4e49 Metadata"),(0,r.kt)("p",null,"\u5982\u679c\u5f00\u53d1\u8005\u9700\u8981\u589e\u52a0\u65b0\u7684 Metadata\uff0c\u53ef\u4ee5\u5728 NFTMeta \u7c7b\u578b\u4e2d\u5b9a\u4e49\uff0c\u4f8b\u5982\u8981\u5b9a\u4e49\u4e00\u4e2a\u89c6\u9891\u7c7b\u7684 NFT\uff0c\u9700\u8981\u589e\u52a0\u4e00\u4e2a\u89c6\u9891\u5730\u5740\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"struct VideoNFT has copy, store, drop {\n  video_url: vector<u8>,\n}\nstruct VideoNFTBody has store{}\n")),(0,r.kt)("p",null,"\u5b9e\u9645\u7684 NFT \u6570\u636e\u683c\u5f0f\u76f8\u5f53\u4e8e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"struct NFT{\n  creator: address,\n  id: u64,\n  base_meta: Metadata,\n  type_meta: VideoNFT,\n  body: VideoNFTBody,\n}\n")),(0,r.kt)("h3",{id:"\u5d4c\u5957-nftbody"},"\u5d4c\u5957 NFTBody"),(0,r.kt)("p",null,"\u5982\u679c\u5f00\u53d1\u8005\u60f3\u518d NFT \u4e2d\u5d4c\u5165\u5176\u4ed6\u7684\u8d44\u6e90\uff0c\u53ef\u4ee5\u901a\u8fc7\u81ea\u5b9a\u4e49 Body \u7684\u65b9\u5f0f\u8fdb\u884c\uff0c\u6bd4\u5982\u4e0a\u9762\u7684 VideoNFTBody \u4e2d\u60f3\u5d4c\u5165\u4e00\u4e9b Token\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"struct VideoNFTBody has store{\n  token: Token<STC>,\n}\n")),(0,r.kt)("h3",{id:"\u81ea\u5b9a\u4e49\u8f6c\u8ba9\u903b\u8f91"},"\u81ea\u5b9a\u4e49\u8f6c\u8ba9\u903b\u8f91"),(0,r.kt)("p",null,"\u6709\u7684 NFT \u5e94\u7528\u573a\u666f\u4e0b\uff0cNFT \u8f6c\u8ba9\u662f\u53d7\u9650\u7684\uff0c\u6bd4\u5982\u4f5c\u4e3a\u4f1a\u5458\u51ed\u8bc1\u3002\n\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u9700\u8981\u81ea\u5b9a\u4e49\u4e00\u79cd NFT \u7684\u5b58\u50a8\u673a\u5236\uff0c\u4ece\u800c\u5b9e\u73b0\u81ea\u5b9a\u4e49\u8f6c\u8ba9\u673a\u5236\u3002\n\u50a8\u5b58\u5728 NFTGallery \u4e2d\u7684 NFT\uff0c\u5b8c\u5168\u53d7\u7528\u6237\u63a7\u5236\uff0cNFT \u7684\u5f00\u53d1\u8005\u4e0d\u80fd\u9650\u5236\u5b83\u7684\u4f7f\u7528\u548c\u8f6c\u8ba9\u3002"),(0,r.kt)("p",null,"\u4ee5 IdentifierNFT \u4e3a\u4f8b\uff0c IdentifierNFT \u662f\u4e00\u79cd NFT \u5bb9\u5668\uff0c\u5b83\u4fdd\u8bc1\u6bcf\u4e2a\u7528\u6237\u53ea\u80fd\u62e5\u6709\u4e00\u4e2a\u540c\u4e00\u4e2a\u7c7b\u578b\u7684 NFT\uff0cNFT \u5f00\u53d1\u8005\u6388\u4e88\u7528\u6237 NFT \u540e\uff0c\u7528\u6237\u65e0\u6cd5\u8f6c\u8ba9\uff0c\u4e00\u822c\u7528\u5728\u7528\u6237\u8eab\u4efd\u76f8\u5173\u7684 NFT \u573a\u666f\u4e0b\uff0c\u6bd4\u5982\u8363\u8a89\u5956\u7ae0\u7b49\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"/// IdentifierNFT \u4e2d\u5305\u542b\u4e86\u4e00\u4e2a Option \u7684 NFT\uff0c\u9ed8\u8ba4\u662f\u7a7a\u7684\uff0c\u76f8\u5f53\u4e8e\u4e00\u4e2a\u53ef\u4ee5\u5bb9\u7eb3 NFT \u7684\u7bb1\u5b50\nstruct IdentifierNFT<NFTMeta: copy + store + drop, NFTBody: store> has key {\n        nft: Option<NFT<NFTMeta, NFTBody>>,\n}\n\n/// \u7528\u6237\u901a\u8fc7 Accept \u65b9\u6cd5\u521d\u59cb\u5316\u4e00\u4e2a\u7a7a\u7684 IdentifierNFT \u5728\u81ea\u5df1\u7684\u8d26\u53f7\u4e0b\npublic fun accept<NFTMeta: copy + store + drop, NFTBody: store>(sender: &signer) {\n  move_to(sender, IdentifierNFT<NFTMeta, NFTBody> {\n    nft: Option::none(),\n  });\n}\n\n/// \u5f00\u53d1\u8005\u901a\u8fc7 MintCapability \u7ed9 receiver \u6388\u4e88\u8be5 nft\uff0c\u5c06 nft \u5d4c\u5165\u5230 IdentifierNFT \u4e2d\npublic fun grant_to<NFTMeta: copy + store + drop, NFTBody: store>(_cap: &mut MintCapability<NFTMeta>, receiver: address, nft: NFT<NFTMeta, NFTBody>) acquires IdentifierNFT {\n     let id_nft = borrow_global_mut<IdentifierNFT<NFTMeta, NFTBody>>(receiver);\n     Option::fill(&mut id_nft.nft, nft);\n}\n\n/// \u5f00\u53d1\u8005\u4e5f\u53ef\u4ee5\u901a\u8fc7 BurnCapability \u5c06 `owner` IdentifierNFT \u4e2d\u7684 NFT \u53d6\u51fa\u6765\npublic fun revoke<NFTMeta: copy + store + drop, NFTBody: store>(_cap: &mut BurnCapability<NFTMeta>, owner: address): NFT<NFTMeta, NFTBody>  acquires IdentifierNFT {\n     let id_nft = move_from<IdentifierNFT<NFTMeta, NFTBody>>(owner);\n     let IdentifierNFT { nft } = id_nft;\n     Option::destroy_some(nft)\n}\n")),(0,r.kt)("p",null,"\u4ee5\u4e0a\u7684\u65b9\u6848\u4e2d\uff0cNFTMeta \u5b9a\u4e49\u548c\u6ce8\u518c\u7684\u5f00\u53d1\u8005\u53ef\u4ee5\u901a\u8fc7\u7a0b\u5e8f\u6765\u5b9a\u4e49 NFT \u7684\u8f6c\u8ba9\u903b\u8f91\uff08\u5f53\u7136\uff0c\u4e5f\u53ef\u4ee5\u4e0d\u5141\u8bb8\u8f6c\u8ba9\uff09\u3002"),(0,r.kt)("h2",{id:"starcoin-nft-\u6807\u51c6\u4e0e-erc721erc1155-\u4e4b\u95f4\u7684\u5dee\u5f02"},"Starcoin NFT \u6807\u51c6\u4e0e ERC721/ERC1155 \u4e4b\u95f4\u7684\u5dee\u5f02"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"ERC721/ERC1155 \u662f Interface\uff0c\u5e76\u6ca1\u6709\u5b9a\u4e49\u5b9e\u73b0\uff0c\u53ef\u6269\u5c55\u6027\u901a\u8fc7\u4e0d\u540c\u7684\u5b9e\u73b0\u6765\u5b8c\u6210\u3002\u800c Starcoin NFT \u6807\u51c6\u5305\u542b\u6570\u636e\u7c7b\u578b\u4e0e\u57fa\u672c\u64cd\u4f5c\u7684\u5b9e\u73b0\uff0c\u53ef\u6269\u5c55\u6027\u901a\u8fc7\u4e0a\u5c42\u7ec4\u5408\u6765\u5b9e\u73b0\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cStarcoin NFT \u548c ERC721 \u7c7b\u4f3c\uff0c\u662f\u4e0d\u53ef\u62c6\u5206\u7684\u3002\u4f46\u7b2c\u4e09\u65b9\u53ef\u4ee5\u81ea\u884c\u6269\u5c55\u51fa\u62c6\u5206\u548c\u5408\u5e76\u903b\u8f91\uff0c\u4ece\u800c\u8fbe\u5230 ERC1155 \u7684\u76ee\u7684\u3002"),(0,r.kt)("li",{parentName:"ol"},"ERC721/ERC1155 \u7684 NFT \u90fd\u53ea\u80fd\u5728\u5408\u7ea6\u5185\u90e8\u79fb\u52a8\uff0c\u65e0\u6cd5\u4ece\u5408\u7ea6\u79fb\u52a8\u5230\u53e6\u5916\u4e00\u4e2a\u5408\u7ea6\uff0c\u6240\u4ee5 NFT \u4e4b\u4e0a\u7684\u534f\u8bae\u7ec4\u5408\u975e\u5e38\u56f0\u96be\u3002\u800c\u5f97\u76ca\u4e8e Move \u7684\u7c7b\u578b\u7279\u5f81\uff0cStarcoin \u4e2d\u7684 NFT \u53ef\u4ee5\u5728\u4e0d\u540c\u7684\u5408\u7ea6\u4e4b\u95f4\u79fb\u52a8\uff0c\u5176\u4ed6\u7684\u5408\u7ea6\u53ef\u4ee5\u5b9a\u4e49\u65b0\u7684\u7c7b\u578b\u6765\u5bf9 NFT \u8fdb\u884c\u5c01\u88c5\uff0c\u6269\u5c55\u51fa\u65b0\u7684\u8f6c\u8ba9\u903b\u8f91\uff08\u6bd4\u5982\u62cd\u5356\uff09\u3002\u8fd9\u7ed9 NFT \u4e4b\u4e0a\u7684\u534f\u8bae\u8bbe\u8ba1\u5e26\u6765\u4e86\u6781\u5927\u7684\u4fbf\u5229\uff0c\u53ef\u4ee5\u7ec4\u5408\u51fa\u5f88\u591a\u7684\u73a9\u6cd5\u3002"),(0,r.kt)("li",{parentName:"ol"},"ERC721/ERC1155 \u662f\u901a\u8fc7\u5408\u7ea6\u5730\u5740\u6765\u533a\u5206 NFT \u7c7b\u578b\u7684\uff0c\u8981\u60f3\u5b9e\u73b0\u591a\u79cd NFT\uff0c\u9700\u8981\u90e8\u7f72\u591a\u4e2a\u5408\u7ea6\uff0c\u5982\u679c NFT \u7c7b\u578b\u5f88\u591a\u7684\u60c5\u51b5\uff0c\u4f1a\u5bfc\u81f4\u5408\u7ea6\u8c03\u7528\u975e\u5e38\u590d\u6742\u3002"),(0,r.kt)("li",{parentName:"ol"},"Starcoin \u7684 NFT \u5b58\u50a8\u5728\u7528\u6237\u7684\u72b6\u6001\u7a7a\u95f4\u91cc\uff0c\u53ef\u4ee5\u901a\u8fc7\u5217\u4e3e\u7528\u6237\u72b6\u6001\u7a7a\u95f4\u7684\u8d44\u6e90\u6765\u5c55\u793a\u7528\u6237\u6240\u6709\u7684 NFT\uff0c\u5305\u62ec\u5d4c\u5165\u5230\u5176\u4ed6\u5408\u7ea6\u4e2d\u7684 NFT\u3002\u8fd9\u7ed9\u5468\u8fb9\u751f\u6001\u5de5\u5177\uff0c\u6bd4\u5982\u94b1\u5305\u4ee5\u53ca\u533a\u5757\u6d4f\u89c8\u5668\u4e2d\u4e2d\u5c55\u793a NFT\uff0c\u62cd\u5356\u5e02\u573a\u5c55\u793a NFT \u7b49\uff0c\u90fd\u5e26\u6765\u4e86\u6781\u5927\u7684\u4fbf\u5229\u3002")),(0,r.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,r.kt)("p",null,"Starcoin \u7684 NFT \u534f\u8bae\u662f\u4e00\u5957\u975e\u5e38\u5b8c\u5584\u7684\u5de5\u5177\uff0c\u6709\u826f\u597d\u7684\u5b89\u5168\u6027\u548c\u53ef\u6269\u5c55\u6027\uff0c\u53ef\u4ee5\u9884\u89c1\uff0c\u672a\u6765\u4f1a\u6709\u975e\u5e38\u5927\u7684\u53d1\u5c55\u7a7a\u95f4\u3002\nMerkleNFT \u548c GenesisNFT \u5de7\u5999\u5730\u5c06 MerkleTree \u4e0e NFT \u534f\u8bae\u7ed3\u5408\uff0c\u8f7b\u677e\u89e3\u51b3\u4e86\u5927\u6570\u7ec4\u7b49\u7591\u96be\u95ee\u9898\uff0c\u76f8\u4fe1\u5728 NFT \u7a7a\u6295\u7b49\u573a\u666f\u4e0b\u4f1a\u6709\u975e\u5e38\u5927\u7684\u4f5c\u7528\u3002"))}T.isMDXComponent=!0}}]);