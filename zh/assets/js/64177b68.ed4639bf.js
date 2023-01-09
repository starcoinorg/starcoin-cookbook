"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[6457],{3905:function(e,n,t){t.d(n,{Zo:function(){return m},kt:function(){return d}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),p=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=p(e.components);return r.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},s=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),s=p(t),d=a,k=s["".concat(u,".").concat(d)]||s[d]||c[d]||l;return t?r.createElement(k,o(o({ref:n},m),{},{components:t})):r.createElement(k,o({ref:n},m))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=s;var i={};for(var u in n)hasOwnProperty.call(n,u)&&(i[u]=n[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}s.displayName="MDXCreateElement"},2870:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return o},default:function(){return c},frontMatter:function(){return l},metadata:function(){return i},toc:function(){return p}});var r=t(3117),a=(t(7294),t(3905));const l={},o="3. MoveVM\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406",i={unversionedId:"move/move-vm/modify-and-drop-resource",id:"move/move-vm/modify-and-drop-resource",title:"3. MoveVM\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406",description:"------",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/03-move/96-move-vm/03-modify-and-drop-resource.md",sourceDirName:"03-move/96-move-vm",slug:"/move/move-vm/modify-and-drop-resource",permalink:"/starcoin-cookbook/zh/docs/move/move-vm/modify-and-drop-resource",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/03-move/96-move-vm/03-modify-and-drop-resource.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"2. MoveVM\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406",permalink:"/starcoin-cookbook/zh/docs/move/move-vm/create-resource"},next:{title:"Move test",permalink:"/starcoin-cookbook/zh/docs/move/move-test/"}},u={},p=[{value:"0. MoveVM \u4e2d\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406",id:"0-movevm-\u4e2d\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406",level:2},{value:"0.1 \u8d44\u6e90\u4fee\u6539\u7f16\u8bd1\u8fc7\u7a0b",id:"01-\u8d44\u6e90\u4fee\u6539\u7f16\u8bd1\u8fc7\u7a0b",level:3},{value:"0.2 \u8d44\u6e90\u9500\u6bc1\u7f16\u8bd1\u8fc7\u7a0b",id:"02-\u8d44\u6e90\u9500\u6bc1\u7f16\u8bd1\u8fc7\u7a0b",level:3},{value:"1. WriteRef \u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u4fee\u6539",id:"1-writeref-\u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u4fee\u6539",level:2},{value:"2. MoveFrom \u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u9500\u6bc1",id:"2-movefrom-\u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u9500\u6bc1",level:2}],m={toc:p};function c(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"3-movevm\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406"},"3. MoveVM\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406"),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"0-movevm-\u4e2d\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406"},"0. MoveVM \u4e2d\u8d44\u6e90\u4fee\u6539\u548c\u9500\u6bc1\u7684\u539f\u7406"),(0,a.kt)("h3",{id:"01-\u8d44\u6e90\u4fee\u6539\u7f16\u8bd1\u8fc7\u7a0b"},"0.1 \u8d44\u6e90\u4fee\u6539\u7f16\u8bd1\u8fc7\u7a0b"),(0,a.kt)("p",null,"\u5728\u4e4b\u524d\u7684\u6587\u7ae0\u4e2d\uff0c\u6211\u4eec\u5206\u6790\u4e86 Move \u4e2d\u8d44\u6e90\u7684\u521b\u5efa\u5728 Move \u865a\u62df\u673a\u4e2d\u7684\u5b9e\u73b0\u65b9\u5f0f\uff0c\u8fd9\u7bc7\u5185\u5bb9\u5206\u6790\u8d44\u6e90\u521b\u5efa\u540e\u7684\u4fee\u6539\u548c\u9500\u6bc1\u3002"),(0,a.kt)("p",null,"\u5728 Move \u4e2d\uff0c\u5f53\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"move_to")," \u4e3a\u67d0\u4e2a\u8d26\u6237\u521b\u5efa\u4e86\u4e00\u4e2a\u8d44\u6e90\u4e4b\u540e\uff0c\u5c31\u53ef\u4ee5\u5c06\u8fd9\u4e2a\u8d44\u6e90\u501f\u7528\u51fa\u6765\uff0c\u5e76\u4fee\u6539\u5b83\u3002"),(0,a.kt)("p",null,"\u4f8b\u5982\u4e0b\u9762\u7684 Move \u4ee3\u7801\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"public fun set_value(addr: address, value: u64) acquires Counter {\n    let counter = borrow_global_mut<Counter>(addr);\n    counter.i = value;\n}\n")),(0,a.kt)("p",null,"\u7f16\u8bd1\u5668\u8f93\u51fa\u7684\u5b57\u8282\u7801\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"public set_value(counter: address) {\nB0:\n    0: MoveLoc[0](addr: address)\n    1: MutBorrowGlobal[0](Counter)\n    2: StLoc[2](counter: &mut Counter)\n    3: MoveLoc[1](value: u64)\n    4: MoveLoc[2](counter: &mut Counter)\n    5: MutBorrowField[0](Counter.i: u64)\n    6: WriteRef\n    7: Ret\n}\n")),(0,a.kt)("p",null,"\u4e0b\u9762\u6211\u4eec\u5bf9\u5b57\u8282\u7801\u5217\u8868\u4e2d\u7684\u6307\u4ee4\u9010\u4e00\u89e3\u6790\uff0c\u8ba9\u5927\u5bb6\u80fd\u770b\u660e\u767d\u5927\u81f4\u7684\u7f16\u8bd1\u8fc7\u7a0b\u3002"),(0,a.kt)("p",null,"\u4e0d\u8fc7\u5728\u5f00\u59cb\u4e4b\u524d\uff0c\u5148\u56de\u987e\u4e00\u4e0b Move \u865a\u62df\u673a\u4e2d\u4ee3\u8868\u51fd\u6570\u6808\u5e27\u7684\u7ed3\u6784\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"struct Frame {\n    pc: u16,\n    locals: Locals,\n    function: Arc<Function>,\n    ty_args: Vec<Type>,\n}\n")),(0,a.kt)("p",null,"\u6211\u4eec\u770b\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"Frame")," \u7ed3\u6784\u4f53 \u4e2d\u6709\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"locals")," \u5b57\u6bb5\uff0c\u5b83\u5176\u5b9e\u662f\u4e00\u4e2a\u6570\u7ec4\uff0c\u5176\u4e2d\u4fdd\u5b58\u4e86\u51fd\u6570\u7684\u5c40\u90e8\u53d8\u91cf\uff0c\u4e5f\u5c31\u662f\u8bf4\uff0c\u51fd\u6570\u6267\u884c\u4e4b\u524d\uff0c\u6240\u6709\u7684\u5c40\u90e8\u53d8\u91cf\u8981\u5148\u4fdd\u5b58\u5728\u8fd9\u4e2a\u6570\u7ec4\u4e2d\u3002"),(0,a.kt)("p",null,"\u51fd\u6570\u7684\u5b9e\u53c2\u548c\u51fd\u6570\u7684\u5c40\u90e8\u53d8\u91cf\uff0c\u7ec4\u5408\u5728\u4e00\u8d77\uff0c\u7edf\u79f0\u4e3a\u51fd\u6570\u7684\u5c40\u90e8\u53d8\u91cf\u3002"),(0,a.kt)("p",null,"\u4e0b\u9762\uff13\u4e2a\u6307\u4ee4\u662f\u7f16\u8bd1\u7b2c\u4e00\u884c\u4ee3\u7801\u7684\u7ed3\u679c\uff1a"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"let counter = borrow_global_mut<Counter>(addr);")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MoveLoc[0](account: &signer)"),"  \u6307\u4ee4\u628a\u51fd\u6570\u53c2\u6570 ",(0,a.kt)("inlineCode",{parentName:"li"},"account")," \u4ece ",(0,a.kt)("inlineCode",{parentName:"li"},"locals")," \u6570\u7ec4\u4e2d\u53d6\u51fa\uff0c\u5e76\u653e\u5728\u64cd\u4f5c\u6570\u6808\u4e0a\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MutBorrowGlobal[0](Counter)")," \u4ece\u6808\u4e0a\u5f39\u51fa\u4e00\u4e2a\u8d26\u6237\u5730\u5740\uff0c\u5e76\u4ece\u8d26\u6237\u4fe1\u606f\u548c\u8d44\u6e90\u5bf9\u8c61\u7ec4\u6210\u7684\u8def\u5f84\u4e2d\u8bfb\u53d6\u5bf9\u5e94\u7684 GlobalValue \u8d44\u6e90\uff0c\u7136\u540e\u5c06\u8bfb\u51fa\u7684\u8d44\u6e90 GlobalValue \u8d44\u6e90\u4fdd\u5b58\u5728\u5185\u5b58\u4e2d\u6bcf\u4e2a\u8d26\u6237\u7684 DataCache \u4e2d\uff0c\u6700\u540e\u751f\u6210\u4e00\u4e2a\u5f15\u7528\u5bf9\u8c61\u5e76\u653e\u5728\u64cd\u4f5c\u6570\u6808\u4e0a\uff0c\u8fd9\u4e2a\u5bf9\u8c61\u5f15\u7528\u4e86\u8fd9\u4e2a\u653e\u5728 DataCache \u4e2d\u7684GlobalValue \u5bf9\u8c61\u3002\u73b0\u5728\u64cd\u4f5c\u6570\u6808\u4e0a\u6709\u4e00\u4e2a\u5f15\u7528\u5bf9\u8c61\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"StLoc[2](counter: &mut Counter)")," \u5c06\u4e0a\u4e00\u6b65\u4ece\u8d26\u6237\u5730\u5740\u4e0b\u501f\u7528\u7684 Counter \u5bf9\u8c61\u7684\u5f15\u7528\uff0c\u5728 locals \u6570\u7ec4\u4e2d\u627e\u5230counter\uff0c\u5e76\u5f15\u7528\u5230\u5c40\u90e8\u53d8\u91cf counter\u3002")),(0,a.kt)("p",null,"\u4e0b\u9762\uff14\u4e2a\u6307\u4ee4\u662f\uff0c\u662f\u7f16\u8bd1\u7b2c\u4e8c\u884c\u4ee3\u7801\u7684\u7ed3\u679c\uff1a"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"counter.i = value;")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MoveLoc[1](value: u64)")," \u628a\u5c40\u90e8\u53d8\u91cf value \u7684\u503c\uff0c\u4ece locals \u6570\u7ec4\u4e2d\u653e\u5728\u64cd\u4f5c\u6570\u6808\u7684\u6808\u9876\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MoveLoc[2](counter: &mut Counter)")," \u5c06 counter \u8fd9\u4e2a\u5f15\u7528\u7c7b\u578b\u7684\u53d8\u91cf\uff0c\u653e\u5728\u64cd\u4f5c\u6570\u6808\u7684\u6808\u9876\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MutBorrowField[0](Counter.i: u64)")," \u5c06 counter.i \u8fd9\u4e2a\u53d8\u91cf\u518d\u6b21\u501f\u7528\uff1acounter \u5df2\u7ecf\u662f\u4e00\u4e2a\u7ed3\u6784\u4f53\u7684\u5f15\u7528\uff0c",(0,a.kt)("inlineCode",{parentName:"li"},"MutBorrowFiel")," \u6307\u4ee4\u518d\u6b21\u501f\u7528\u7ed3\u6784\u4f53\u4e2d\u7684\u5b57\u6bb5\u3002\u6307\u4ee4\u751f\u6210\u5bf9 counter.i \u5bf9\u8c61\u7684\u5f15\u7528\u5bf9\u8c61\uff0c\u5e76\u5c06\u5f15\u7528\u5bf9\u8c61\u5e76\u653e\u5728\u64cd\u4f5c\u6570\u6808\u4e0a\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"WriteRef")," \u4ece\u64cd\u4f5c\u6570\u6808\u4e0a\u5f39\u51fa\u4e24\u4e2a\u5bf9\u8c61\uff1a\u9700\u8981\u5199\u5165\u7684\u503c value \u548c \u9700\u8981\u88ab\u5199\u5165\u7684\u5f15\u7528 counter.i\uff0c\u6700\u540e\u5c06\u503c\u5199\u5165\u5230\u5f15\u7528\u4e2d\u3002")),(0,a.kt)("h3",{id:"02-\u8d44\u6e90\u9500\u6bc1\u7f16\u8bd1\u8fc7\u7a0b"},"0.2 \u8d44\u6e90\u9500\u6bc1\u7f16\u8bd1\u8fc7\u7a0b"),(0,a.kt)("p",null,"\u5728 Move \u4e2d\uff0c\u5f53\u4e00\u4e2a\u8d44\u6e90\u7ed3\u6784\u4f53\u5177\u6709 drop ability\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"move_from()")," \u51fd\u6570\u4ece\u8d26\u6237\u4e2d\u79fb\u9664\u5e76\u9500\u6bc1\u8fd9\u4e2a\u8d44\u6e90\u7ed3\u6784\u4f53\u3002"),(0,a.kt)("p",null,"\u4f8b\u5982\u4e0b\u9762\u7684 Move \u4ee3\u7801\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"public fun remove(account: address) acquires Counter {\n    let _ = move_from<Counter>(account);\n}\n")),(0,a.kt)("p",null," \u51fd\u6570 ",(0,a.kt)("inlineCode",{parentName:"p"},"remove()")," \u7f16\u8bd1\u751f\u6210\u7684\u5b57\u8282\u7801\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"public remove() {\nB0:\n    0: MoveLoc[0](account: address)\n    1: MoveFrom[0](Counter)\n    2: Pop\n    3: Ret\n}\n")),(0,a.kt)("p",null,"\u4e0b\u9762\u6211\u4eec\u5bf9\u5b57\u8282\u7801\u5217\u8868\u4e2d\u7684\u6307\u4ee4\u9010\u4e00\u89e3\u6790\uff0c\u8ba9\u5927\u5bb6\u80fd\u770b\u660e\u767d\u5927\u81f4\u7684\u7f16\u8bd1\u8fc7\u7a0b\u3002"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"0: MoveLoc[0](account: address)")," \u6307\u4ee4\u5c06 account \u53d8\u91cf\u4ece locals \u6570\u7ec4\u79fb\u52a8\u5230\u64cd\u4f5c\u6570\u6808\u7684\u6808\u9876\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"MoveFrom[0](Counter)")," \u6307\u4ee4\u662f\u6e90\u7801\u4e2d ",(0,a.kt)("inlineCode",{parentName:"li"},"move_from()")," \u51fd\u6570\u7684\u5177\u4f53\u5b9e\u73b0\u3002",(0,a.kt)("inlineCode",{parentName:"li"},"MoveFrom")," \u548c ",(0,a.kt)("inlineCode",{parentName:"li"},"move_to()")," \u51fd\u6570\u4e00\u6837\u63a5\u53d7\u4e00\u4e2a\u53c2\u6570\uff0c\u6b64\u65f6\u64cd\u4f5c\u6570\u6808\u4e2d\u6b63\u597d\u6709\u4e00\u4e2a\u5143\u7d20\uff1a ",(0,a.kt)("inlineCode",{parentName:"li"},"account"),"\u3002",(0,a.kt)("inlineCode",{parentName:"li"},"MoveFrom"),"  \u6307\u4ee4\u4ece\u6808\u4e2d\u53d6\u51fa\u4e00\u4e2a\u5143\u7d20\u5e76\u6267\u884c\u6267\u884c\uff0c\u6700\u7ec8\u5c06  ",(0,a.kt)("inlineCode",{parentName:"li"},"account")," \u8d26\u6237\u4e0b\u7684 ",(0,a.kt)("inlineCode",{parentName:"li"},"Counter")," \u7c7b\u578b\u7684\u8d44\u6e90\u79fb\u9664\u3002"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"Pop")," \u56e0\u4e3a\u6211\u4eec\u6ca1\u6709\u4f7f\u7528\u8fd9\u4e2a\u4ece\u7528\u6237\u8d26\u6237\u4e0b\u79fb\u51fa\u7684\u5f15\u7528\uff0c\u6240\u4ee5\u76f4\u63a5Pop\uff0c\u4ece\u6808\u9876\u5f39\u51fa\u5b83\u3002")),(0,a.kt)("h2",{id:"1-writeref-\u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u4fee\u6539"},"1. WriteRef \u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u4fee\u6539"),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u5185\u5bb9\u5206\u6790\u4e86\u5bf9\u7528\u6237\u8d26\u6237\u4e0b\u7684\u8d44\u6e90\u505a\u4fee\u6539\u65f6\uff0c\u7f16\u8bd1\u5668\u751f\u6210\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"WriteRef")," \u6307\u4ee4\uff0c\u4e0b\u9762\u6211\u4eec\u5206\u6790 ",(0,a.kt)("inlineCode",{parentName:"p"},"WriteRef")," \u6307\u4ee4\u5728\u865a\u62df\u673a\u4e2d\u7684\u5b9e\u73b0\u6e90\u7801\u3002"),(0,a.kt)("p",null,"\u6587\u4ef6\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"language/move-vm/runtime/src/interpreter.rs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"Bytecode::WriteRef => {\n    // \u4ece\u64cd\u4f5c\u6570\u6808\u4e0a\u5f39\u51fa\u5f15\u7528\u7c7b\u578b\u7684\u5bf9\u8c61\n    let reference: Reference = interpreter.operand_stack.pop_as::<Reference>()?;\n    // \u4ece\u64cd\u4f5c\u6570\u6808\u4e0a\u5f39\u51fa\u503c\u7c7b\u578b\u5bf9\u8c61\n    let value = interpreter.operand_stack.pop()?;\n    gas_status.charge_instr_with_size(Opcodes::WRITE_REF, value.size())?;\n    // \u8c03\u7528\u5f15\u7528\u7c7b\u578b\u7684 write_ref \u51fd\u6570\uff0c\u5c06\u503c\u5199\u5165\u5230\u88ab\u5f15\u7528\u7684\u5bf9\u8c61\u4e2d\n    reference.write_ref(value)?;\n}\n")),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u4ee3\u7801\u6700\u91cd\u8981\u7684\u4e00\u884c\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"reference.write_ref(value)"),"\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"reference")," \u5bf9\u8c61\u7684\u7c7b\u578b\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"Reference"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Reference(ReferenceImpl);\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Reference")," \u7c7b\u578b\u53ea\u5305\u542b\u4e86\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"ReferenceImpl")," \u7c7b\u578b\u3002"),(0,a.kt)("p",null,"\u6240\u4ee5\u5b9e\u9645\u8c03\u7528\u7684\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"ReferenceImpl")," \u7684 write_ref \u51fd\u6570\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"impl ReferenceImpl {\n    fn write_ref(self, x: Value) -> PartialVMResult<()> {\n        match self {\n            Self::ContainerRef(r) => r.write_ref(x),\n            Self::IndexedRef(r) => r.write_ref(x),\n        }\n    }\n}\n")),(0,a.kt)("p",null,"\u6211\u4eec\u5206\u6790 ",(0,a.kt)("inlineCode",{parentName:"p"},"ContainerRef")," \u7c7b\u578b\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"write_ref")," \u51fd\u6570\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"impl ContainerRef {\n    fn write_ref(self, v: Value) -> PartialVMResult<()> {\n        // \u7c7b\u578b\u5224\u65ad\uff1a\u5199\u5165\u7684\u503c\u7c7b\u578b\uff0c\u8981\u548c\u5f15\u7528\u7684\u7c7b\u578b\u5339\u914d\n            // \u5982\u679c\u662f Locals \u7c7b\u578b\u62a5\u9519\uff1a\u4e0d\u80fd\u5199\u5165\u5230 Locals \u7c7b\u578b\u4e2d\n        \n        // \u5199\u5165\u503c\u5230 ContainerRef \u7c7b\u578b\u5f15\u7528\u7684\u5bf9\u8c61\u4e2d\n        \n            // \u6807\u8bb0\u5f53\u524d\u5f15\u7528\u4e3a Dirty \u72b6\u6001\n            self.mark_dirty();\n    }\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"mark_dirty()")," \u51fd\u6570\u6807\u8bb0\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"ContainerRef")," \u7c7b\u578b\u5bf9\u8c61\u7684\u72b6\u6001\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"Dirty"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ContainerRef")," \u7c7b\u578b\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"enum ContainerRef {\n    Local(Container),   // \u5f15\u7528\u7684\u662f\u5c40\u90e8\u53d8\u91cf\uff0cContainer \u662f \u5b9e\u9645\u5f15\u7528\u7684\u503c\n    Global {    // \u5f15\u7528\u7684\u662f\u5168\u5c40\u53d8\u91cf\uff0c\u5373\u7528\u6237\u8d26\u6237\u4e0b\u7684\u8d44\u6e90\n        // \u5f15\u7528\u7684\u72b6\u6001: Clean or Dirty\n        status: Rc<RefCell<GlobalDataStatus>>,   \n        // Container \u662f \u5b9e\u9645\u5f15\u7528\u7684\u503c\n        container: Container,   \n    },\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ContainerRef")," \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"mark_dirty()")," \u51fd\u6570\u53ea\u662f\u628a\u5f15\u7528\u6807\u8bb0\u4e3a\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"Dirty")," \u72b6\u6001\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"impl ContainerRef {\n    fn mark_dirty(&self) {\n        if let Self::Global { status, .. } = self {\n            *status.borrow_mut() = GlobalDataStatus::Dirty\n        }\n    }\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"mark_dirty()")," \u51fd\u6570\u8bbe\u7f6e\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"ContainerRef")," \u7c7b\u578b\u7684\u72b6\u6001\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalDataStatus::Dirty"),"\u3002"),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u5185\u5bb9\u5c31\u662f\u5728VM\u6267\u884c\u4ea4\u6613\u5b8c\u6bd5\u4e4b\u540e\uff0c\u5c06\u6807\u8bb0\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalDataStatus::Dirty")," \u72b6\u6001\u7684\u5f15\u7528\uff0c\u4fdd\u5b58\u5230\u6570\u636e\u5e93\u4e2d\u3002"),(0,a.kt)("p",null,"\u4fdd\u5b58\u7684\u8fc7\u7a0b\u548c\u8d44\u6e90\u521b\u5efa\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"move_to()")," \u51fd\u6570\u7684\u8fc7\u7a0b\u4e00\u6837\uff0c\u8c03\u7528 VM\u7684finish \u51fd\u6570\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"session.finish()"),"\uff0c\u5c06\u6807\u8bb0\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalDataStatus::Dirty")," \u7684\u72b6\u6001\u7684\u5f15\u7528\uff0c\u8f6c\u6362\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalValueEffect::Changed")," \u72b6\u6001\u3002"),(0,a.kt)("p",null,"\u6700\u540e\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"maybe_commit_effects()")," \u51fd\u6570\u5c06\u72b6\u6001\u53d8\u66f4\u7684\u5185\u5b58\u5bf9\u8c61\uff0c\u5199\u5165\u5e76\u63d0\u4ea4\u5230\u78c1\u76d8\u3002"),(0,a.kt)("h2",{id:"2-movefrom-\u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u9500\u6bc1"},"2. MoveFrom \u6307\u4ee4\u5b9e\u73b0\u8d44\u6e90\u9500\u6bc1"),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u5185\u5bb9\u5206\u6790\u4e86\u79fb\u9664\u8d26\u6237\u4e0b\u7684\u8d44\u6e90\u65f6\uff0c\u7f16\u8bd1\u5668\u751f\u6210\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"MoveFrom")," \u6307\u4ee4\uff0c\u4e0b\u9762\u6211\u4eec\u5206\u6790 ",(0,a.kt)("inlineCode",{parentName:"p"},"MoveFrom")," \u6307\u4ee4\u5728\u865a\u62df\u673a\u4e2d\u7684\u5b9e\u73b0\u6e90\u7801\u3002"),(0,a.kt)("p",null,"\u6587\u4ef6\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"language/move-vm/runtime/src/interpreter.rs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"// sd_idx: \u4ee3\u8868\u4e86\u8d44\u6e90\u5bf9\u5e94\u7684\u7ed3\u6784\u4f53\u7c7b\u578b\uff0c\u5728Move\u865a\u62df\u673a\u7684\u7ed3\u6784\u4f53\u5b9a\u4e49\u5217\u8868\u4e2d\u7684\u7d22\u5f15\n// Move\u865a\u62df\u673a\u7684\u7ed3\u6784\u4f53\u5b9a\u4e49\u5217\u8868\uff0c\u662f\u865a\u62df\u673a\u4eceMove\u8bed\u8a00\u5b57\u8282\u7801\u6587\u4ef6\u4e2d\u89e3\u6790\u5f97\u6765\u7684\n// \u5b9e\u9645\u4e0a\u8d44\u6e90\u5bf9\u5e94\u7684\u7ed3\u6784\u4f53\u5b9a\u4e49\uff0c\u662f\u7f16\u8bd1\u5668\u5728\u751f\u6210\u5b57\u8282\u7801\u6587\u4ef6\u65f6\u5199\u5165\u7684\u4fe1\u606f\nBytecode::MoveFrom(sd_idx) => {\n    // \u4ece\u64cd\u4f5c\u6570\u6808\u4e2d\u5f39\u51fa\u4e00\u4e2a\u5143\u7d20\uff1a\u8d26\u6237\n    let addr = interpreter.operand_stack.pop_as::<AccountAddress>()?;\n    // \u4f7f\u7528sd_idx\u7ed3\u6784\u4f53\u7d22\u5f15\uff0c\u5230\u7ed3\u6784\u4f53\u5b9a\u4e49\u8868\u4e2d\u67e5\u8be2\u7ed3\u6784\u4f53\u7c7b\u578b\n    let ty = resolver.get_struct_type(*sd_idx);\n    // \u8c03\u7528\u89e3\u91ca\u5668\u7684 move_from \u51fd\u6570\uff0c\u4f20\u5165\u6570\u636e\u5b58\u50a8 data_store\uff0c\u8d26\u6237\u5730\u5740\uff0c\u8d44\u6e90\u7c7b\u578b\n    let size = interpreter.move_from(data_store, addr, &ty)?;\n    gas_status.charge_instr_with_size(Opcodes::MOVE_FROM, size)?;\n}\n")),(0,a.kt)("p",null,"\u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"move_to()")," \u51fd\u6570\u4e00\u6837\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"move_from()")," \u51fd\u6570\u5b9e\u9645\u8c03\u7528\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalValueImpl")," \u7c7b\u578b\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"move_from()")," \u51fd\u6570\uff1a"),(0,a.kt)("p",null,"\u6587\u4ef6\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"language/move-vm/runtime/src/interpreter.rs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},'fn move_from(&mut self) -> PartialVMResult<ValueImpl> {\n    let fields = match self {\n        Self::None | Self::Deleted => return Err(PartialVMError::new(StatusCode::MISSING_DATA)),\n        // \u5982\u679c\u662f Fresh(GlobalValue\u5728\u5185\u5b58\u4e2d\uff0c\u672a\u6301\u4e45\u5316\u5230\u5b58\u50a8) \u76f4\u63a5\u628a\u81ea\u8eab(GlobalValueImpl)\u66ff\u6362\u4e3a None\n        Self::Fresh { .. } => match std::mem::replace(self, Self::None) {\n            Self::Fresh { fields } => fields, // \u8fd4\u56de\u540c\u6837\u7c7b\u578b\u7684 Fresh \u6570\u636e (move_from\u51fd\u6570\u6709\u8fd4\u56de\u503c)\n            _ => unreachable!(),\n        },\n        // \u5982\u679c\u662f Cached(GlobalValue\u5728\u5185\u5b58\u4e2d\uff0c\u4e5f\u6301\u4e45\u5316\u5230\u4e86\u5b58\u50a8\u4e2d) \u76f4\u63a5\u628a\u81ea\u8eab(GlobalValueImpl)\u66ff\u6362\u4e3a Deleted\n        Self::Cached { .. } => match std::mem::replace(self, Self::Deleted) {\n            Self::Cached { fields, .. } => fields, // \u8fd4\u56de\u540c\u6837\u7c7b\u578b\u7684 Cached \u6570\u636e (move_from\u51fd\u6570\u6709\u8fd4\u56de\u503c)\n            _ => unreachable!(),\n        },\n    };\n\n    // \u5982\u679c\u5df2\u7ecf\u6709\u5bf9\u8fd9\u4e2a\u5168\u5c40\u53d8\u91cf\u7684\u591a\u4f59\uff11\u4e2a\u7684\u5f15\u7528\uff0c\u8bf4\u660e\u591a\u4f59\u4e00\u4e2a\u5bf9\u8c61\u5f15\u7528\u5f53\u524d\u5bf9\u8c61\uff0c\u5c31\u4e0d\u80fd move_from \u5b83\n    // Move\u865a\u62df\u673a\u62a5\u9519\uff1amoving global resource with dangling reference\n    if Rc::strong_count(&fields) != 1 {\n        return Err(\n            PartialVMError::new(StatusCode::UNKNOWN_INVARIANT_VIOLATION_ERROR)\n                .with_message("moving global resource with dangling reference".to_string()),\n        );\n    }\n\n    // move_from \u8fd4\u56de\u7684\u5bf9\u8c61\n    Ok(ValueImpl::Container(Container::Struct(fields)))\n}\n')),(0,a.kt)("p",null,"\u5176\u4e2d\u6700\u5173\u952e\u7684\u52a8\u4f5c\u662f\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c\u662f ",(0,a.kt)("inlineCode",{parentName:"li"},"GlobalValueImpl::Fresh")," (GlobalValue\u5728\u5185\u5b58\u4e2d\uff0c\u672a\u6301\u4e45\u5316\u5230\u5b58\u50a8) \u76f4\u63a5\u628a\u81ea\u8eab(GlobalValueImpl)\u66ff\u6362\u4e3a None"),(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c\u662f ",(0,a.kt)("inlineCode",{parentName:"li"},"GlobalValueImpl::Cached")," (GlobalValue\u5728\u5185\u5b58\u4e2d\uff0c\u4e5f\u6301\u4e45\u5316\u5230\u4e86\u5b58\u50a8\u4e2d) \u76f4\u63a5\u628a\u81ea\u8eab(GlobalValueImpl)\u66ff\u6362\u4e3a Deleted")),(0,a.kt)("p",null,"\u5728\u4ea4\u6613\u6267\u884c\u5b8c\u6bd5\u540e\uff0c\u6700\u7ec8\u63d0\u4ea4\u4e4b\u524d\uff0c\u4f1a\u5c06\u6807\u8bb0\u4e3a\u4e0a\u9762\u4e24\u4e2a\u72b6\u6001 (None\u548cDelete) \u7684 GlobalValueImpl \u5bf9\u8c61\uff0c\u8f6c\u6362\u4e3a\u5bf9\u5e94\u7684\u72b6\u6001\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"fn into_effect(self) -> PartialVMResult<GlobalValueEffect<ValueImpl>> {\n    Ok(match self {\n        Self::None => GlobalValueEffect::None,\n        Self::Deleted => GlobalValueEffect::Deleted,\n    })\n}\n")),(0,a.kt)("p",null,"\u6700\u7ec8\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"TransactionDataCache")," \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"into_effects()")," \u51fd\u6570\u4e2d\uff0c\u5c06\u4e0a\u8ff0\u4e24\u4e2a\u72b6\u6001\u8f6c\u6362\uff1a"),(0,a.kt)("p",null,"\u6587\u4ef6\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"language/move-vm/runtime/src/interpreter.rs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"// move_from \u51fd\u6570\u5bf9 GlobalValueImpl Fresh \u8bbe\u7f6e None\n// None \u8868\u793a Fresh(\u5728\u5185\u5b58\u4e2d) \u7684\u6570\u636e\u4e0d\u5b58\u50a8\nGlobalValueEffect::None => (),  \n\n// move_from \u51fd\u6570\u5bf9 GlobalValueImpl Cached \u8bbe\u7f6e Deleted\n// Deleted \u751f\u6210 None\uff0c\u4f1a\u4ece\u5b58\u50a8\u4e2d\u5220\u9664\nGlobalValueEffect::Deleted => { \n    let struct_tag = match self.loader.type_to_type_tag(&ty)? {\n        TypeTag::Struct(struct_tag) => struct_tag,\n    }\n    resources.insert(struct_tag, None);\n}\n")),(0,a.kt)("p",null,"\u6700\u540e\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"maybe_commit_effects()")," \u51fd\u6570\u5c06\u72b6\u6001\u53d8\u66f4\u96c6\u5408\u7684\u5185\u5b58\u5bf9\u8c61\uff0c\u5199\u5165\u5e76\u63d0\u4ea4\u5230\u78c1\u76d8\u3002"))}c.isMDXComponent=!0}}]);