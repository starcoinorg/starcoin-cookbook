"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[6944],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return y}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),p=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(u.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(t),y=o,m=d["".concat(u,".").concat(y)]||d[y]||s[y]||i;return t?r.createElement(m,a(a({ref:n},c),{},{components:t})):r.createElement(m,a({ref:n},c))}));function y(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6148:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return a},default:function(){return s},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return p}});var r=t(3117),o=(t(7294),t(3905));const i={},a="\u8ba4\u8bc6 Ability",l={unversionedId:"move/understanding-ability",id:"move/understanding-ability",title:"\u8ba4\u8bc6 Ability",description:"Move \u5177\u6709\u72ec\u7279\u7684\u7c7b\u578b\u7cfb\u7edf \u2014\u2014 \u975e\u5e38\u7075\u6d3b\u548c\u53ef\u5b9a\u5236\uff0c\u6bcf\u79cd\u7c7b\u578b\u6700\u591a\u53ef\u4ee5\u62e5\u67094\u79cd\u80fd\u529b\uff08Ability\uff09\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/03-move/03-understanding-ability.md",sourceDirName:"03-move",slug:"/move/understanding-ability",permalink:"/starcoin-cookbook/zh/docs/move/understanding-ability",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/03-move/03-understanding-ability.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5305\uff08pacakage\uff09",permalink:"/starcoin-cookbook/zh/docs/move/move-language/packages"},next:{title:"Move \u5305\u7ba1\u7406\u5668\u7528\u6237\u6307\u5357",permalink:"/starcoin-cookbook/zh/docs/move/move-package-manager"}},u={},p=[{value:"Ability \u8bed\u6cd5",id:"ability-\u8bed\u6cd5",level:2},{value:"\u4e0d\u5e26\u80fd\u529b\u9650\u5b9a\u7b26\u7684\u7ed3\u6784\u4f53",id:"\u4e0d\u5e26\u80fd\u529b\u9650\u5b9a\u7b26\u7684\u7ed3\u6784\u4f53",level:2},{value:"drop",id:"drop",level:2},{value:"copy",id:"copy",level:2},{value:"\u5c0f\u7ed3",id:"\u5c0f\u7ed3",level:2}],c={toc:p};function s(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u8ba4\u8bc6-ability"},"\u8ba4\u8bc6 Ability"),(0,o.kt)("p",null,"Move \u5177\u6709\u72ec\u7279\u7684\u7c7b\u578b\u7cfb\u7edf \u2014\u2014 \u975e\u5e38\u7075\u6d3b\u548c\u53ef\u5b9a\u5236\uff0c\u6bcf\u79cd\u7c7b\u578b\u6700\u591a\u53ef\u4ee5\u62e5\u67094\u79cd\u80fd\u529b\uff08Ability\uff09\u3002\n\u8fd94\u79cd\u80fd\u529b\u5206\u522b\u88ab4\u4e2a\u9650\u5b9a\u7b26\u6240\u4fee\u9970\uff0c\u5b83\u4eec\u5b9a\u4e49\u4e86\u7c7b\u578b\u7684\u503c\u662f\u5426\u53ef\u4ee5\u88ab\u590d\u5236\u3001\u4e22\u5f03\u548c\u5b58\u50a8\u3002"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u8fd9\u56db\u79cd\u80fd\u529b\uff08Ability\uff09\u7684\u9650\u5236\u7b26\u5206\u522b\u662f\uff1a",(0,o.kt)("inlineCode",{parentName:"p"},"copy"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"drop"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"store")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"key"),"\uff0c")),(0,o.kt)("p",null,"\u5b83\u4eec\u7684\u529f\u80fd\u5206\u522b\u662f\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"copy")," - \u88ab\u4fee\u9970\u7684\u503c\u53ef\u4ee5\u88ab\u590d\u5236\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"drop")," - \u88ab\u4fee\u9970\u7684\u503c\u5728\u4f5c\u7528\u57df\u7ed3\u675f\u65f6\u53ef\u4ee5\u88ab\u4e22\u5f03\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"key")," - \u88ab\u4fee\u9970\u7684\u503c\u53ef\u4ee5\u4f5c\u4e3a\u952e\u503c\u5bf9\u5168\u5c40\u72b6\u6001\u8fdb\u884c\u8bbf\u95ee\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"store")," - \u88ab\u4fee\u9970\u7684\u503c\u53ef\u4ee5\u88ab\u5b58\u50a8\u5230\u5168\u5c40\u72b6\u6001\u3002")),(0,o.kt)("h2",{id:"ability-\u8bed\u6cd5"},"Ability \u8bed\u6cd5"),(0,o.kt)("p",null,"\u57fa\u672c\u7c7b\u578b\u548c\u5185\u5efa\u7c7b\u578b\u7684\u80fd\u529b\u662f\u9884\u5148\u5b9a\u4e49\u597d\u7684\u5e76\u4e14\u4e0d\u53ef\u6539\u53d8\uff1aintegers\uff0cvector\uff0caddresses \u548c boolean \u7c7b\u578b\u7684\u503c\u5148\u5929\u5177\u6709 copy\uff0cdrop \u548c store \u80fd\u529b\u3002"),(0,o.kt)("p",null,"\u7136\u800c\uff0c\u7ed3\u6784\u4f53\u7684\u80fd\u529b\u53ef\u4ee5\u7531\u5f00\u53d1\u8005\u6309\u7167\u4e0b\u9762\u7684\u8bed\u6cd5\u8fdb\u884c\u6dfb\u52a0\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"struct NAME has ABILITY [, ABILITY] { [FIELDS] }\n")),(0,o.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e9b\u4f8b\u5b50\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"module Library {\n\n    // each ability has matching keyword\n    // multiple abilities are listed with comma\n    struct Book has store, copy, drop {\n        year: u64\n    }\n\n    // single ability is also possible\n    struct Storage has key {\n        books: vector<Book>\n    }\n\n    // this one has no abilities \n    struct Empty {}\n}\n")),(0,o.kt)("h2",{id:"\u4e0d\u5e26\u80fd\u529b\u9650\u5b9a\u7b26\u7684\u7ed3\u6784\u4f53"},"\u4e0d\u5e26\u80fd\u529b\u9650\u5b9a\u7b26\u7684\u7ed3\u6784\u4f53"),(0,o.kt)("p",null,"\u5728\u8fdb\u5165\u80fd\u529b\u7684\u5177\u4f53\u7528\u6cd5\u4e4b\u524d\uff0c\u6211\u4eec\u4e0d\u59a8\u5148\u6765\u770b\u4e00\u4e0b\uff0c\u5982\u679c\u7ed3\u6784\u4f53\u4e0d\u5e26\u4efb\u4f55\u80fd\u529b\u4f1a\u53d1\u751f\u4ec0\u4e48\uff1f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"module Country {\n    struct Country {\n        id: u8,\n        population: u64\n    }\n\n    public fun new_country(id: u8, population: u64): Country {\n        Country { id, population }\n    }\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"script {\n    use {{sender}}::Country;\n\n    fun main() {\n        Country::new_country(1, 1000000);\n    }\n}\n")),(0,o.kt)("p",null,"\u8fd0\u884c\u4e0a\u9762\u7684\u4ee3\u7801\u4f1a\u62a5\u5982\u4e0b\u9519\u8bef\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"error: \n   \u250c\u2500\u2500 scripts/main.move:5:9 \u2500\u2500\u2500\n   \u2502\n 5 \u2502     Country::new_country(1, 1000000);\n   \u2502     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot ignore values without the 'drop' ability. The value must be used\n   \u2502\n")),(0,o.kt)("p",null,"\u65b9\u6cd5 ",(0,o.kt)("inlineCode",{parentName:"p"},"Country::new_country()")," \u521b\u5efa\u4e86\u4e00\u4e2a\u503c\uff0c\u8fd9\u4e2a\u503c\u6ca1\u6709\u88ab\u4f20\u9012\u5230\u4efb\u4f55\u5176\u5b83\u5730\u65b9\uff0c\u6240\u4ee5\u5b83\u5e94\u8be5\u5728\u51fd\u6570\u7ed3\u675f\u65f6\u88ab\u4e22\u5f03\u3002\n\u4f46\u662f Country \u7c7b\u578b\u6ca1\u6709 Drop \u80fd\u529b\uff0c\u6240\u4ee5\u8fd0\u884c\u65f6\u62a5\u9519\u4e86\u3002\u73b0\u5728\u8ba9\u6211\u4eec\u52a0\u4e0a Drop \u9650\u5236\u7b26\u8bd5\u8bd5\u770b\u3002"),(0,o.kt)("h2",{id:"drop"},"drop"),(0,o.kt)("p",null,"\u6309\u7167\u80fd\u529b\uff08Ability\uff09\u7684\u8bed\u6cd5\u6211\u4eec\u4e3a\u8fd9\u4e2a\u7ed3\u6784\u4f53\u589e\u52a0 drop \u80fd\u529b\uff0c\u8fd9\u4e2a\u7ed3\u6784\u4f53\u7684\u6240\u6709\u5b9e\u4f8b\u5c06\u53ef\u4ee5\u88ab\u4e22\u5f03\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"module Country {\n    struct Country has drop { // has <ability>\n        id: u8,\n        population: u64\n    }\n    // ...\n}\n")),(0,o.kt)("p",null,"\u73b0\u5728\uff0cCountry \u53ef\u4ee5\u88ab\u4e22\u5f03\u4e86\uff0c\u4ee3\u7801\u4e5f\u53ef\u4ee5\u6210\u529f\u6267\u884c\u4e86\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"script {\n    use {{sender}}::Country;\n\n    fun main() {\n        Country::new_country(1, 1000000); // value is dropped\n    }\n}\n")),(0,o.kt)("p",null,"\u6ce8\u610f Destructuring \u5e76\u4e0d\u9700\u8981 drop \u80fd\u529b\u3002"),(0,o.kt)("h2",{id:"copy"},"copy"),(0,o.kt)("p",null,"\u6211\u4eec\u5b66\u4e60\u4e86\u5982\u4f55\u521b\u5efa\u4e00\u4e2a\u7ed3\u6784\u4f53 Country \u5e76\u5728\u51fd\u6570\u7ed3\u675f\u65f6\u4e22\u5f03\u5b83\u3002\n\u4f46\u662f\u5982\u679c\u6211\u4eec\u60f3\u8981\u590d\u5236\u4e00\u4e2a\u7ed3\u6784\u4f53\u5462\uff1f\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u7ed3\u6784\u4f53\u662f\u6309\u503c\u4f20\u9012\u7684\uff0c\u5236\u9020\u4e00\u4e2a\u7ed3\u6784\u4f53\u7684\u526f\u672c\u9700\u8981\u501f\u52a9\u5173\u952e\u5b57 copy (\u6211\u4eec\u4f1a\u5728 \u4e0b\u4e00\u7ae0 \u66f4\u52a0\u6df1\u5165\u7684\u5b66\u4e60)\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"script {\n    use {{sender}}::Country;\n\n    fun main() {\n        let country = Country::new_country(1, 1000000);\n        let _ = copy country;\n    }   \n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"   \u250c\u2500\u2500 scripts/main.move:6:17 \u2500\u2500\u2500\n   \u2502\n 6 \u2502         let _ = copy country;\n   \u2502                 ^^^^^^^^^^^^ Invalid 'copy' of owned value without the 'copy' ability\n   \u2502\n")),(0,o.kt)("p",null,"\u6b63\u5982\u6240\u6599\uff0c\u7f3a\u5c11 copy \u80fd\u529b\u9650\u5b9a\u7b26\u7684\u7c7b\u578b\u5728\u8fdb\u884c\u590d\u5236\u65f6\u4f1a\u62a5\u9519\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"module Country {\n    struct Country has drop, copy { // see comma here!\n        id: u8,\n        population: u64\n    }\n    // ...\n}\n")),(0,o.kt)("p",null,"\u4fee\u6539\u540e\u7684\u4ee3\u7801\u5c31\u53ef\u4ee5\u6210\u529f\u6267\u884c\u4e86\u3002"),(0,o.kt)("h2",{id:"\u5c0f\u7ed3"},"\u5c0f\u7ed3"),(0,o.kt)("p",null,"\u57fa\u672c\u7c7b\u578b\u7f3a\u7701\u5177\u6709 store\uff0ccopy \u548c drop \u9650\u5236\u3002\n\u7f3a\u7701\u60c5\u51b5\u4e0b\u7ed3\u6784\u4f53\u4e0d\u5e26\u4efb\u4f55\u9650\u5236\u7b26\u3002\ncopy \u548c drop \u9650\u5236\u7b26\u5b9a\u4e49\u4e86\u4e00\u4e2a\u503c\u662f\u5426\u53ef\u4ee5\u88ab\u590d\u5236\u548c\u4e22\u5f03\u3002\n\u4e00\u4e2a\u7ed3\u6784\u4f53\u6709\u53ef\u80fd\u5e26\u6709\u6240\u67094\u79cd\u9650\u5236\u7b26\u3002"))}s.isMDXComponent=!0}}]);