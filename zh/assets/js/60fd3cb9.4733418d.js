"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[9153],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return k}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=c(n),k=o,m=s["".concat(l,".").concat(k)]||s[k]||u[k]||r;return n?a.createElement(m,p(p({ref:t},d),{},{components:n})):a.createElement(m,p({ref:t},d))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,p=new Array(r);p[0]=s;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,p[1]=i;for(var c=2;c<r;c++)p[c]=n[c];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},2705:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return r},metadata:function(){return i},toc:function(){return c}});var a=n(3117),o=(n(7294),n(3905));const r={},p="\u72b6\u6001",i={unversionedId:"concepts/state",id:"concepts/state",title:"\u72b6\u6001",description:"\u9700\u8981\u5148\u4e86\u89e3\u4e0b SMT \u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/99-concepts/04-state.md",sourceDirName:"99-concepts",slug:"/concepts/state",permalink:"/starcoin-cookbook/zh/docs/concepts/state",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/99-concepts/04-state.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u533a\u5757",permalink:"/starcoin-cookbook/zh/docs/concepts/block"},next:{title:"Sparse Merkle Tree",permalink:"/starcoin-cookbook/zh/docs/concepts/smt"}},l={},c=[{value:"\u72b6\u6001\u7684\u5b9e\u73b0",id:"\u72b6\u6001\u7684\u5b9e\u73b0",level:2},{value:"\u72b6\u6001\u5728 Starcoin \u4e2d\u5bf9\u5e94\u4ee3\u7801",id:"\u72b6\u6001\u5728-starcoin-\u4e2d\u5bf9\u5e94\u4ee3\u7801",level:2},{value:"StateTree API \u8bf4\u660e",id:"statetree-api-\u8bf4\u660e",level:2},{value:"new",id:"new",level:3},{value:"put",id:"put",level:3},{value:"remove",id:"remove",level:3},{value:"commit",id:"commit",level:3},{value:"flush",id:"flush",level:3},{value:"get",id:"get",level:3},{value:"get_with_proof",id:"get_with_proof",level:3},{value:"ChainStateDB API \u8bf4\u660e",id:"chainstatedb-api-\u8bf4\u660e",level:2},{value:"new",id:"new-1",level:3},{value:"get_account_state_object",id:"get_account_state_object",level:3},{value:"get_with_proof",id:"get_with_proof-1",level:3},{value:"StateView \u76f8\u5173",id:"stateview-\u76f8\u5173",level:2},{value:"\u5e42\u7b49\u6027\u76f8\u5173",id:"\u5e42\u7b49\u6027\u76f8\u5173",level:2},{value:"\u8d44\u6e90",id:"\u8d44\u6e90",level:2}],d={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u72b6\u6001"},"\u72b6\u6001"),(0,o.kt)("p",null,"\u9700\u8981\u5148\u4e86\u89e3\u4e0b ",(0,o.kt)("a",{parentName:"p",href:"/starcoin-cookbook/zh/docs/concepts/smt"},"SMT")," \u3002"),(0,o.kt)("h2",{id:"\u72b6\u6001\u7684\u5b9e\u73b0"},"\u72b6\u6001\u7684\u5b9e\u73b0"),(0,o.kt)("p",null,"\u5728 Starcoin \u4e2d\uff0c\u533a\u5757 ( ",(0,o.kt)("inlineCode",{parentName:"p"},"Block")," ) \u7531\u4e00\u4e9b\u4ea4\u6613 \uff08 ",(0,o.kt)("inlineCode",{parentName:"p"},"Transaction")," ) \u7ec4\u6210\uff0c\u5bf9\u4e00\u4e2a\u533a\u5757\u7684\u6267\u884c\u5c31\u662f\u5bf9\u533a\u5757\u5185\u4ea4\u6613\u7684\u6267\u884c\u3002\n\u4ea4\u6613\u6267\u884c\u7684\u7ed3\u679c\u7531\u72b6\u6001\u8868\u793a\u3002\u8fd9\u91cc\u91c7\u7528\u7684\u5168\u5c40\u72b6\u6001\uff0c\u5305\u542b\u94fe\u4e0a\u6240\u6709\u8d26\u6237\u7684\u6700\u65b0\u72b6\u6001\u548c\u5386\u53f2\u72b6\u6001\u3002\n\u72b6\u6001\u5b9e\u9645\u4e0a\u5c31\u662f\u8d26\u6237\u5730\u5740 ( ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddress")," ) \u5230\u8d26\u6237\u72b6\u6001 ( ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," ) \u7684\u6620\u5c04\u3002\nStarcoin \u4e2d\u72b6\u6001\u662f\u4e00\u98972\u7ea7\u7684 SMT \u6811\uff0c\u5982\u4e0b\u56fe\u6240\u793a\u3002"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"two_level_state.png",src:n(6037).Z,width:"526",height:"431"})),(0,o.kt)("p",null,"\u72b6\u6001\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddress")," \u5230 ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u7684\u6620\u5c04\uff0c\u968f\u7740\u65b0\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Block")," \u7684\u6267\u884c \uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u4f1a\u53d8\u5316\uff0c\u7531\u4e8e\u9700\u8981\u4fdd\u7559\u5386\u53f2\u72b6\u6001\u76f8\u5173\u7684\u8bc1\u660e\uff0c\u8fd9\u91cc\u4f7f\u7528\u4e86 SMT \u8fd9\u4e00\u6570\u636e\u7ed3\u6784\u3002\n\u4e3a\u4e86\u65b9\u4fbf\u8fd9\u91cc\u628a ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddress")," \u5230 ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u7684\u72b6\u6001\u79f0\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT"),"\u3002\u5982\u56fe\u4e2d\u663e\u793a\u8fd9\u91cc ",(0,o.kt)("inlineCode",{parentName:"p"},"(AccountAddress, AccountState)")," \u5b58\u50a8\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Leaf")," \u8282\u70b9\u4e0a\u3002\n\u5728\u56fe\u4e2d\u5c31\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT")," \u7684\u6839\u8282\u70b9\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"Root_Hash"),"\uff0c\u8fd9\u91cc\u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"BlockHeader")," \u4e2d\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"state_root"),"\u3002\n\u5728 Starcoin \u4e2d ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddress")," \u4e0d\u540c\u4e8e\u4ee5\u592a\u574a\u4e2a\u4eba\u8d26\u6237\u548c\u5408\u7ea6\u8d26\u6237\u662f\u5206\u5f00\u7684\uff0c\u5408\u7ea6\u662f\u90e8\u7f72\u5728\u4e2a\u4eba\u8d26\u6237\u4e0b\u3002",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u5206\u4e3a\u4e24\u90e8\u5206\uff0c\u5206\u522b\u662f\u5408\u7ea6\u4ee3\u7801 ( ",(0,o.kt)("inlineCode",{parentName:"p"},"Code")," ) \u548c \u8d44\u6e90 ( ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource"),"  )\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"Code")," \u5c31\u662f\u8d26\u53f7\u4e0b\u5408\u7ea6\u4ee3\u7801\uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource")," \u5c31\u662f\u7c7b\u4f3c\u6709\u54ea\u4e9b Token (\u6bd4\u5982 STC )\u3002\n\u65b0 ",(0,o.kt)("inlineCode",{parentName:"p"},"Block")," \u6267\u884c\uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"Code")," \u72b6\u6001\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource")," \u72b6\u6001\u90fd\u53ef\u80fd\u4f1a\u6539\u53d8\u3002\n\u8fd9\u6837 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code")," \u72b6\u6001\u7528\u4e86\u4e00\u68f5 SMT \u8bb0\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource")," \u72b6\u6001\u7528\u4e86\u4e00\u68f5 SMT \u8bb0\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT"),"\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u72b6\u6001\u5206\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Rescoure SMT"),"\uff0c\u8fd9\u6837\u6bcf\u6b21\u6267\u884c\u65b0 ",(0,o.kt)("inlineCode",{parentName:"p"},"Block")," \u540e\uff0c\u5148\u5b58\u50a8 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT"),"\uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u53ea\u7528\u5b58\u50a8 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT")," \u7684\u6839\u8282\u70b9\u3002\n\u5728\u56fe\u4e2d\u5206\u522b\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"Code_Root_Hash1")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Res_Root_Hash1"),"\u3002\n\u5f53\u7136\u8fd9\u5e94\u8be5\u662f\u4e00\u4e2a\u4e8b\u52a1\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("h2",{id:"\u72b6\u6001\u5728-starcoin-\u4e2d\u5bf9\u5e94\u4ee3\u7801"},"\u72b6\u6001\u5728 Starcoin \u4e2d\u5bf9\u5e94\u4ee3\u7801"),(0,o.kt)("p",null,"\u5728 Starcoin \u4e2d ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT")," \u5b9a\u4e49\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"ChainStateDB")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct ChainStateDB {\n    store: Arc<dyn StateNodeStore>,\n    ///global state tree.\n    state_tree: StateTree<AccountAddress>,\n}\n\npub struct StateTree<K: RawKey> {\n    storage: Arc<dyn StateNodeStore>,\n    storage_root_hash: RwLock<HashValue>,\n}\n\npub enum DataType {\n    CODE,\n    RESOURCE,\n}\n\npub struct AccountState {\n    storage_roots: Vec<Option<HashValue>>,\n}\n\nstruct AccountStateObject {\n    code_tree: Mutex<Option<StateTree<ModuleName>>>,\n    resource_tree: Mutex<StateTree<StructTag>>,\n    store: Arc<dyn StateNodeStore>,\n}\n")),(0,o.kt)("p",null,"\u8fd9\u91cc ",(0,o.kt)("inlineCode",{parentName:"p"},"store")," \u5bf9\u5e94\u5b58\u50a8\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"KvStore"),"\uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"ChainStateDB")," \u7684\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"state_tree")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddreee")," -> ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT")," \u6811\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u7684\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"storage_root_hash")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT")," \u7684\u6839\u8282\u70b9\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u67092\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"HashValue")," \u5143\u7d20\uff0c\u5bf9\u5e94\u56fe\u4e2d ",(0,o.kt)("inlineCode",{parentName:"p"},"Code_Root_Hash1")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Res_Root_Hash1"),"\uff0c\u4e5f\u5c31\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountStateObject")," \u4e2d\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"code_tree")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"resource_tree")," \u7684\u6839\u8282\u70b9\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"AccountStateObject")," \u7684\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"code_tree")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"ModuleName")," -> ",(0,o.kt)("inlineCode",{parentName:"p"},"Vec<u8>")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u3002\u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"AccountStateObject")," \u7684\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"resource_tree")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"StructTag")," -> ",(0,o.kt)("inlineCode",{parentName:"p"},"Vec<u8>")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT")," \u3002\n",(0,o.kt)("inlineCode",{parentName:"p"},"ModuleName")," \u7c7b\u4f3c\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},"Account1")," (\u5bf9\u5e94 starcoin-framework \u91cc\u9762\u7684\u6a21\u5757 ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin-framework/tree/v11/sources)%E3%80%82"},"https://github.com/starcoinorg/starcoin-framework/tree/v11/sources)\u3002"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"struct_tag")," \u7c7b\u4f3c\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},"0x00000000000000000000000000000001::Account::Account"),"\u3002"),(0,o.kt)("p",null,"\u53ef\u89c1 Starcoin \u4e2d\u72b6\u6001\u662f\u4e00\u4e2a2\u7ea7\u7684 SMT \u7ed3\u6784\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"ChainStateDB")," \u5bf9\u5e94\u4e00\u7ea7 SMT \uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountStateObject")," \u5bf9\u5e94\u4e24\u4e2a\u4e8c\u7ea7 SMT \u3002"),(0,o.kt)("h2",{id:"statetree-api-\u8bf4\u660e"},"StateTree API \u8bf4\u660e"),(0,o.kt)("h3",{id:"new"},"new"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn new(state_storage: Arc<dyn StateNodeStore>, state_root_hash: Option<HashValue>) -> Self;\n")),(0,o.kt)("p",null,"\u521b\u5efa ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree"),"\uff0c \u8fd9\u91cc ",(0,o.kt)("inlineCode",{parentName:"p"},"state_storage")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"KvStore"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"state_root_hash")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT")," \u7684\u6839\u8282\u70b9\uff0c \u540e\u9762\u7684\u66f4\u65b0\u67e5\u627e\u90fd\u662f\u57fa\u4e8e\u8fd9\u4e2a\u6839\u8282\u70b9\u7684 SMT \u3002"),(0,o.kt)("h3",{id:"put"},"put"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn put(&self, key: K, value: Vec<u8>);\npub struct StateTree<K: RawKey> {\n    storage: Arc<dyn StateNodeStore>,\n    storage_root_hash: RwLock<HashValue>,\n    updates: RwLock<BTreeMap<K, Option<Blob>>>,\n    cache: Mutex<StateCache<K>>,\n}\n")),(0,o.kt)("p",null,"\u5c06\u8981\u66f4\u65b0\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"\uff08key, value)")," \u7f13\u5b58\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u7684\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"updates")," \uff0c\u8fd9\u91cc\u5e76\u6ca1\u6709\u53c2\u4e0e ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT")," \u7684\u8ba1\u7b97"),(0,o.kt)("h3",{id:"remove"},"remove"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn remove(&self, key: &K);\n")),(0,o.kt)("p",null,"\u4e00\u79cd ",(0,o.kt)("inlineCode",{parentName:"p"},"value")," \u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"NONE")," \u7684\u7279\u6b8a\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"put")," \u64cd\u4f5c\u3002"),(0,o.kt)("h3",{id:"commit"},"commit"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"}," pub fn commit(&self) -> Result<HashValue>;\n")),(0,o.kt)("p",null,"\u5c06\u7f13\u5b58\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},"updates")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"(key, value)")," \u53d6\u51fa\uff0c\u53c2\u4e0e\u5230 SMT \u66f4\u65b0\u4e2d\uff0c\u5e76\u8ba1\u7b97\u65b0\u7684\u6839\u8282\u70b9\u3002\n\u8fd9\u91cc\u4f1a\u5c06\u65b0\u4ea7\u751f\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT Node"),", \u751f\u6210\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"(Hash(Node), Encode(Node))")," \u7f13\u5b58\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u7684\n\u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"cache")," \u4e2d\u3002"),(0,o.kt)("h3",{id:"flush"},"flush"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"}," pub fn flush(&self) -> Result<()>;\n")),(0,o.kt)("p",null,"\u5c06 ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"cache")," \u4e2d\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"(Hash(Node), Encode(Node))")," \u5199\u5230 ",(0,o.kt)("inlineCode",{parentName:"p"},"KvStore")," \u4e2d\u3002"),(0,o.kt)("h3",{id:"get"},"get"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn get(&self, key: &K) -> Result<Option<Vec<u8>>>;\n")),(0,o.kt)("p",null,"\u67e5\u627e ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u4e2d ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," \u5bf9\u5e94 ",(0,o.kt)("inlineCode",{parentName:"p"},"value"),"\u3002 \u5148\u68c0\u67e5 ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"update")," \u7f13\u5b58\u4e2d\u662f\u5426\u6709\uff0c\u6709\u76f4\u63a5\u8fd4\u56de\u3002\n\u6ca1\u6709\u6309\u7167 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT")," \u4e2d ",(0,o.kt)("inlineCode",{parentName:"p"},"get_with_proof")," \u6d41\u7a0b\u3002"),(0,o.kt)("h3",{id:"get_with_proof"},"get_with_proof"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn get_with_proof(&self, key: &K) -> Result<(Option<Vec<u8>>, SparseMerkleProof)>;\n")),(0,o.kt)("p",null,"\u83b7\u53d6 ",(0,o.kt)("inlineCode",{parentName:"p"},"proof"),(0,o.kt)("a",{parentName:"p",href:"/starcoin-cookbook/zh/docs/concepts/proof"},"proof")," \u5f85\u8865\u5145"),(0,o.kt)("h2",{id:"chainstatedb-api-\u8bf4\u660e"},"ChainStateDB API \u8bf4\u660e"),(0,o.kt)("h3",{id:"new-1"},"new"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn new(store: Arc<dyn StateNodeStore>, root_hash: Option<HashValue>) -> Self;\n")),(0,o.kt)("p",null,"\u7c7b\u4f3c ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree new")," \u751f\u6210\u6839\u8282\u70b9\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"root_hash")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT"),"\u3002"),(0,o.kt)("h3",{id:"get_account_state_object"},"get_account_state_object"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"}," fn get_account_state_object(\n    &self,\n    account_address: &AccountAddress,\n    create: bool,\n) -> Result<Arc<AccountStateObject>>;\n")),(0,o.kt)("p",null,"\u83b7\u53d6 ",(0,o.kt)("inlineCode",{parentName:"p"},"account_address")," \u5bf9\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT"),"\u3002\n\u5148\u6839\u636e ",(0,o.kt)("inlineCode",{parentName:"p"},"Account SMT")," \u83b7\u53d6 ",(0,o.kt)("inlineCode",{parentName:"p"},"account_address")," \u5bf9\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState"),"\uff0c\n\u518d\u6839\u636e ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountState")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code_Root_Hash")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Res_Root_Hash")," \u751f\u6210\u5bf9\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code SMT")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource SMT"),"\u3002"),(0,o.kt)("h3",{id:"get_with_proof-1"},"get_with_proof"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"fn get_with_proof(&self, access_path: &AccessPath) -> Result<StateWithProof>;\n")),(0,o.kt)("p",null,"\u83b7\u53d6 ",(0,o.kt)("inlineCode",{parentName:"p"},"proof"),", ",(0,o.kt)("a",{parentName:"p",href:"/starcoin-cookbook/zh/docs/concepts/proof"},"proof")," \u5f85\u8865\u5145"),(0,o.kt)("h2",{id:"stateview-\u76f8\u5173"},"StateView \u76f8\u5173"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},'pub enum DataPath {\n    Code(#[schemars(with = "String")] ModuleName),\n    Resource(#[schemars(with = "String")] StructTag),\n}\n\npub struct AccessPath {\n    pub address: AccountAddress,\n    pub path: DataPath,\n}\nfn get(&self, access_path: &AccessPath) -> Result<Option<Vec<u8>>>;\n')),(0,o.kt)("p",null,"\u7ed9 ",(0,o.kt)("inlineCode",{parentName:"p"},"vm")," \u63d0\u4f9b\u72b6\u6001\u4fe1\u606f\u67e5\u8be2\u63a5\u53e3\uff0c  ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountAddress")," \u67e5\u627e\u5bf9\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"AccountStateObject"),"\uff0c\u518d\u751f\u6210\n",(0,o.kt)("inlineCode",{parentName:"p"},"Code Tree")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource Tree"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"AccessPath")," \u6210\u5458 ",(0,o.kt)("inlineCode",{parentName:"p"},"path")," \u5bf9\u5e94\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"ModuleName")," \u7531 ",(0,o.kt)("inlineCode",{parentName:"p"},"Code Tree")," \u63d0\u4f9b\u67e5\u627e\uff0c\n\u5426\u5219 ",(0,o.kt)("inlineCode",{parentName:"p"},"Resource Tree")," \u63d0\u4f9b\u67e5\u627e\u3002"),(0,o.kt)("h2",{id:"\u5e42\u7b49\u6027\u76f8\u5173"},"\u5e42\u7b49\u6027\u76f8\u5173"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u5e42\u7b49\u6027\u7531 ",(0,o.kt)("inlineCode",{parentName:"p"},"SMT")," \u4fdd\u8bc1\uff0c ",(0,o.kt)("inlineCode",{parentName:"p"},"ChainStateDB")," \u5e42\u7b49\u6027\u7531 ",(0,o.kt)("inlineCode",{parentName:"p"},"StateTree")," \u4fdd\u8bc1\u3002"),(0,o.kt)("h2",{id:"\u8d44\u6e90"},"\u8d44\u6e90"),(0,o.kt)("p",null,(0,o.kt)("a",{target:"_blank",href:n(1774).Z},"draw.io")))}u.isMDXComponent=!0},1774:function(e,t,n){t.Z=n.p+"assets/files/state-1e26acfae1d78527ffca2566da475098.drawio"},6037:function(e,t,n){t.Z=n.p+"assets/images/two_level_state-aceb866ac3e79144f6f5dbfc8094804b.png"}}]);