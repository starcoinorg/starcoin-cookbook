"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[8525],{3905:function(e,r,t){t.d(r,{Zo:function(){return p},kt:function(){return f}});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=o.createContext({}),s=function(e){var r=o.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},p=function(e){var r=s(e.components);return o.createElement(l.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=s(t),f=n,d=u["".concat(l,".").concat(f)]||u[f]||m[f]||a;return t?o.createElement(d,c(c({ref:r},p),{},{components:t})):o.createElement(d,c({ref:r},p))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,c=new Array(a);c[0]=u;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var s=2;s<a;s++)c[s]=t[s];return o.createElement.apply(null,c)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3914:function(e,r,t){t.r(r),t.d(r,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return m}});var o=t(7462),n=t(3366),a=(t(7294),t(3905)),c=["components"],i={},l="Oracle protocol",s={unversionedId:"move/starcoin-framework/oracle",id:"move/starcoin-framework/oracle",title:"Oracle protocol",description:"Migrate and Rewrite",source:"@site/docs/03-move/05-starcoin-framework/7-oracle.md",sourceDirName:"03-move/05-starcoin-framework",slug:"/move/starcoin-framework/oracle",permalink:"/starcoin-cookbook/docs/move/starcoin-framework/oracle",editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/03-move/05-starcoin-framework/7-oracle.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DAO",permalink:"/starcoin-cookbook/docs/move/starcoin-framework/dao"},next:{title:"Deploy your first Move contract",permalink:"/starcoin-cookbook/docs/move/deploy-first-move-contract"}},p={},m=[],u={toc:m};function f(e){var r=e.components,t=(0,n.Z)(e,c);return(0,a.kt)("wrapper",(0,o.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"oracle-protocol"},"Oracle protocol"),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Migrate and Rewrite"),(0,a.kt)("ul",{parentName:"div"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://starcoin.org/zh/developer/blog/starcoin_oracle_protocol/"},"https://starcoin.org/zh/developer/blog/starcoin_oracle_protocol/")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://starcoin.org/en/developer/blog/starcoin_oracle_protocol/"},"https://starcoin.org/en/developer/blog/starcoin_oracle_protocol/"))))))}f.isMDXComponent=!0}}]);