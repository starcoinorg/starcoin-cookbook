"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[6625],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,k=d["".concat(i,".").concat(f)]||d[f]||p[f]||a;return n?r.createElement(k,l(l({ref:t},u),{},{components:n})):r.createElement(k,l({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5253:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),l=["components"],c={},i="\u5982\u4f55\u8bbe\u7f6e\u672c\u5730\u5f00\u53d1\u7f51\u7edc",s={unversionedId:"getting-started/setup/dev-network",id:"getting-started/setup/dev-network",title:"\u5982\u4f55\u8bbe\u7f6e\u672c\u5730\u5f00\u53d1\u7f51\u7edc",description:"TODO",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/02-getting-started/02-setup/03-dev-network.md",sourceDirName:"02-getting-started/02-setup",slug:"/getting-started/setup/dev-network",permalink:"/starcoin-cookbook/zh/docs/getting-started/setup/dev-network",editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/02-getting-started/02-setup/03-dev-network.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Working with the Starcoin console",permalink:"/starcoin-cookbook/zh/docs/getting-started/setup/starcoin-console"},next:{title:"\u5982\u4f55\u53c2\u4e0e\u6d4b\u8bd5\u7f51\u7edc",permalink:"/starcoin-cookbook/zh/docs/getting-started/setup/test-network"}},u={},p=[{value:"\u8fd0\u884c\u672c\u5730\u7f51\u7edc",id:"\u8fd0\u884c\u672c\u5730\u7f51\u7edc",level:2}],d={toc:p};function f(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u5982\u4f55\u8bbe\u7f6e\u672c\u5730\u5f00\u53d1\u7f51\u7edc"},"\u5982\u4f55\u8bbe\u7f6e\u672c\u5730\u5f00\u53d1\u7f51\u7edc"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"local dev node set up."),(0,a.kt)("li",{parentName:"ol"},"How to get STC in dev node."),(0,a.kt)("li",{parentName:"ol"},"How to set up a local cluster"),(0,a.kt)("li",{parentName:"ol"},"Some useful tips for local dev node",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"How to skip time in local dev?")))),(0,a.kt)("h2",{id:"\u8fd0\u884c\u672c\u5730\u7f51\u7edc"},"\u8fd0\u884c\u672c\u5730\u7f51\u7edc"),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u547d\u4ee4\u53ef\u4ee5\u542f\u52a8\u65b0\u7684 dev \u8282\u70b9\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"starcoin -n dev\n")),(0,a.kt)("p",null,"\u5728\u6b64\u547d\u4ee4\u4e4b\u540e\uff0c\u4f60\u53ef\u4ee5\u5728\u65e5\u5fd7\u6216 std \u8f93\u51fa\u4e2d\u627e\u5230\u8282\u70b9\u5730\u5740\uff0c\u5b83\u53ef\u80fd\u5982\u4e0b\u6240\u793a\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"Self address is: /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb\n")),(0,a.kt)("p",null,"\u7136\u540e\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u8bbe\u7f6e\u53e6\u4e00\u4e2a\u8282\u70b9\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"starcoin -n dev --seed /ip4/127.0.0.1/tcp/59476/p2p/12D3KooWPePRG6BDdjgtEYmPDxNyJfMWpQ1Rwgefuz9eqksLfxJb\n\n")),(0,a.kt)("p",null,"\u4f60\u53ef\u4ee5\u4f7f\u7528\u5b50\u547d\u4ee4\u63a7\u5236\u53f0\u6765\u542f\u52a8 cli \u63a7\u5236\u53f0\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"starcoin -n dev console\n")),(0,a.kt)("p",null,"\u91cd\u590d\u8fd9\u4e9b\u6b65\u9aa4\uff0c\u4f60\u53ef\u4ee5\u83b7\u5f97\u591a\u8282\u70b9\u672c\u5730\u5f00\u53d1\u7f51\u7edc\u3002"),(0,a.kt)("p",null,"\u901a\u8fc7 docker \u8fd0\u884c\u8282\u70b9\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"docker run --name starcoin -d --network host -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n dev\n")))}f.isMDXComponent=!0}}]);