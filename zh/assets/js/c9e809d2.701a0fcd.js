"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[2270],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return k}});var l=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=l.createContext({}),p=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return l.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},d=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(n),k=a,m=d["".concat(s,".").concat(k)]||d[k]||c[k]||r;return n?l.createElement(m,i(i({ref:t},u),{},{components:n})):l.createElement(m,i({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<r;p++)i[p]=n[p];return l.createElement.apply(null,i)}return l.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5441:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return c},frontMatter:function(){return r},metadata:function(){return o},toc:function(){return p}});var l=n(3117),a=(n(7294),n(3905));const r={},i="\u4ece\u6e90\u7801\u6784\u5efa Starcoin",o={unversionedId:"getting-started/install/build",id:"getting-started/install/build",title:"\u4ece\u6e90\u7801\u6784\u5efa Starcoin",description:"\u5feb\u901f\u5f00\u59cb",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/02-getting-started/01-install/01-build.md",sourceDirName:"02-getting-started/01-install",slug:"/getting-started/install/build",permalink:"/starcoin-cookbook/zh/docs/getting-started/install/build",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/02-getting-started/01-install/01-build.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u4e0b\u8f7d\u5b89\u88c5",permalink:"/starcoin-cookbook/zh/docs/getting-started/install/"},next:{title:"\u901a\u8fc7 Docker \u5b89\u88c5",permalink:"/starcoin-cookbook/zh/docs/getting-started/install/install-by-docker"}},s={},p=[{value:"\u5feb\u901f\u5f00\u59cb",id:"\u5feb\u901f\u5f00\u59cb",level:2},{value:"\u95ee\u9898\u6392\u67e5",id:"\u95ee\u9898\u6392\u67e5",level:2},{value:"Windows",id:"windows",level:3},{value:"WSL",id:"wsl",level:3},{value:"Q1:",id:"q1",level:4},{value:"Q2:",id:"q2",level:4},{value:"CentOS",id:"centos",level:3},{value:"\u5e38\u89c1\u95ee\u9898\u6392\u67e5",id:"\u5e38\u89c1\u95ee\u9898\u6392\u67e5",level:3},{value:"Q1:",id:"q1-1",level:4},{value:"Q2:",id:"q2-1",level:4},{value:"GitHub \u7f51\u7edc\u95ee\u9898",id:"github-\u7f51\u7edc\u95ee\u9898",level:3}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,l.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4ece\u6e90\u7801\u6784\u5efa-starcoin"},"\u4ece\u6e90\u7801\u6784\u5efa Starcoin"),(0,a.kt)("h2",{id:"\u5feb\u901f\u5f00\u59cb"},"\u5feb\u901f\u5f00\u59cb"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u514b\u9686\u6e90\u4ee3\u7801\u5230\u672c\u5730")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/starcoinorg/starcoin.git\ncd starcoin\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u8bbe\u7f6e\u6784\u5efa\u73af\u5883")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"./scripts/dev_setup.sh\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"\u4f7f\u7528 Cargo \u6784\u5efa")),(0,a.kt)("p",null,"\u6ce8\u610f\uff1a\u8fd9\u91cc\u63d0\u4f9b\u4e24\u4e2a\u7248\u672c\uff08debug\u3001release\uff09\u7684\u6784\u5efa\u65b9\u6cd5\uff0cdebug \u7248\u672c\u7528\u4e8e\u5f00\u53d1\u73af\u5883\uff0crelease \u7248\u672c\u7528\u4e8e\u751f\u4ea7\u73af\u5883\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u8981\u6b63\u5f0f\u4f7f\u7528\uff0c\u8bf7\u4f7f\u7528 release \u7248\u672c\uff0cdebug \u7248\u672c\u548c release \u7248\u672c\u4e4b\u95f4\u7684\u6027\u80fd\u6709\u6570\u91cf\u7ea7\u5dee\u5f02\u3002"),(0,a.kt)("p",null,"\uff081\uff09\u6784\u5efa debug \u7248\u672c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cargo build\n")),(0,a.kt)("p",null,"\uff082\uff09\u6784\u5efa release \u7248\u672c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cargo build --release\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"\u76ee\u6807\u6587\u4ef6")),(0,a.kt)("p",null,"\u7f16\u8bd1\u7ed3\u675f\u540e\uff0c\u53ef\u5728 target \u76ee\u5f55\u4e0b\u627e\u5230\u76f8\u5e94\u7684 starcoin \u7a0b\u5e8f\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"debug \u7248\u672c\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"target/debug/starcoin")," \u76ee\u5f55\u4e0b"),(0,a.kt)("li",{parentName:"ul"},"release \u7248\u672c\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"target/release/starcoin")," \u76ee\u5f55\u4e0b")),(0,a.kt)("h2",{id:"\u95ee\u9898\u6392\u67e5"},"\u95ee\u9898\u6392\u67e5"),(0,a.kt)("h3",{id:"windows"},"Windows"),(0,a.kt)("p",null,"\u5982\u679c\u5728 Windows \u7684\u7f16\u8bd1\u8fc7\u7a0b\u4e2d\u51fa\u73b0\u4ee5\u4e0b\u9519\u8bef\u4fe1\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-text"},"'Unable to find libclang: \"couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])\"'\n")),(0,a.kt)("p",null,"\u8fd9\u662f\u56e0\u4e3a\u6ca1\u6709\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"LIBCLANG_PATH")," \u73af\u5883\u53d8\u91cf\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u89e3\u51b3\u65b9\u6848\uff1a")),(0,a.kt)("p",null,"\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"LIBCLANG_PATH")," \u7684\u503c\u8bbe\u7f6e\u4e3a LLVM \u7f16\u8bd1\u5de5\u5177\u96c6\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"bin")," \u76ee\u5f55\u3002"),(0,a.kt)("p",null,"\u6839\u636e\u4f60\u7684\u5177\u4f53\u5b89\u88c5\u4f4d\u7f6e\u6765\u8bbe\u7f6e\uff0c\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-text"},"C:\\Program Files\\LLVM\\bin\n")),(0,a.kt)("h3",{id:"wsl"},"WSL"),(0,a.kt)("h4",{id:"q1"},"Q1:"),(0,a.kt)("p",null,"\u4f7f\u7528 WSL2 \u8fdb\u884c\u7f16\u8bd1\u53ef\u80fd\u4f1a\u51fa\u73b0\u4e0b\u9762\u7684\u62a5\u9519\u4fe1\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"error: linking with `cc` failed: exit status: 1\n")),(0,a.kt)("p",null,"\u8fd9\u662f\u56e0\u4e3a WSL2 \u7684\u4ea4\u6362\u5185\u5b58\uff08swap\uff09\u672a\u8bbe\u7f6e\uff0c\u6216\u8005\u5c0f\u4e8e WSL2 \u7684\u6700\u5927\u5185\u5b58\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u89e3\u51b3\u65b9\u6848\uff1a")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6253\u5f00 Windows \u8d44\u6e90\u7ba1\u7406\u5668\uff0c\u5728\u5730\u5740\u680f\u8f93\u5165 ",(0,a.kt)("inlineCode",{parentName:"li"},"%UserProfile%")," \u56de\u8f66\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5728\u8be5\u76ee\u5f55\u4e0b\u521b\u5efa\u4e00\u4e2a\u6587\u4ef6\uff0c\u540d\u5b57\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},".wslconfig")),(0,a.kt)("li",{parentName:"ul"},"\u5199\u5165\u5185\u5bb9\u793a\u4f8b\u5982\u4e0b\uff1a\uff08\u6839\u636e\u81ea\u5df1\u7535\u8111\u5b9e\u9645\u5206\u914d\uff0c\u52a1\u5fc5\u4f7f swap \u5927\u4e8e\u7b49\u4e8e memory\uff09",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-config"},"[wsl2]\nmemory=2GB\nswap=4GB\n"))),(0,a.kt)("li",{parentName:"ul"},"\u5728 cmd \u6267\u884c wsl --shutdown \u5173\u95ed WSL2\uff0c\u518d\u91cd\u65b0\u6253\u5f00\u5373\u53ef\u3002")),(0,a.kt)("h4",{id:"q2"},"Q2:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u4e3a\u4ec0\u4e48\u6211\u7684\u7f16\u8bd1\u65f6\u95f4\u8fd9\u4e48\u4e45\uff1f")),(0,a.kt)("p",null,"\u8fd9\u79cd\u60c5\u51b5\u901a\u5e38\u4f1a\u5728\u7535\u8111\u914d\u7f6e\u6bd4\u8f83\u4f4e\u7684\u7528\u6237\u8eab\u4e0a\u51fa\u73b0\uff0c\u4e0b\u9762\u63d0\u4f9b\u4e24\u4e2a\u53ef\u884c\u7684\u5efa\u8bae\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5347\u7ea7\u7535\u8111\u914d\u7f6e\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u63a7\u5236 Cargo \u7f16\u8bd1\u65f6\u7684 job \u6570\u91cf\u3002"))),(0,a.kt)("p",null,"\u5bf9\u4e8e\u4f4e\u914d\u7f6e\u673a\u5668\u6765\u8bf4\uff0c\u63a7\u5236\u6838\u5fc3\u6570\u662f\u5927\u5e45\u63d0\u9ad8\u7f16\u8bd1\u6548\u7387\u7684\u5173\u952e\u3002\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cargo build -j 1\n")),(0,a.kt)("p",null,"\u5177\u4f53\u7684\u6d4b\u8bd5\u6848\u4f8b\uff0c\u8bf7\u53c2\u89c1 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starcoin-cookbook/issues/70"},"[bug] Excessive swap may result in slower builds #70")," \u4e2d\u7684\u8ba8\u8bba\u3002"),(0,a.kt)("h3",{id:"centos"},"CentOS"),(0,a.kt)("p",null,"\u5982\u679c\u64cd\u4f5c\u7cfb\u7edf\u662f CentOS\uff0c\u5219\u9700\u8981\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\uff0c\u5355\u72ec\u5b89\u88c5\u76f8\u5173\u5f00\u53d1\u5de5\u5177\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'yum install -y openssl-devel                    # \u5b89\u88c5openssl\nyum install -y centos-release-scl               # \u5b89\u88c5centos-release-scl\nyum install -y devtoolset-7                     # \u5b89\u88c5\u5f00\u53d1\u5de5\u5177\nscl enable devtoolset-7 bash                    # \u6fc0\u6d3b\u5f00\u53d1\u5de5\u5177\n\n# \u4e0b\u9762\u7684\u8fd9\u4e24\u6b65\uff0c\u4f1a\u5220\u9664\u9519\u8bef\u94fe\u63a5\u7684 llvm-private \u5305\uff0c\u4f46\u540c\u6837\u4f1a\u5bfc\u81f4 GUI \u767b\u5f55\u4e0d\u4e86\uff0c\n# \u5982\u679c\u4f7f\u7528\u547d\u4ee4\u884c\uff0c\u5219\u4e0d\u5f71\u54cd\u3002\n# \u614e\u91cd\uff0c\u5982\u679c\u8981\u4f7f\u7528 GUI \u7cfb\u7edf\uff0c\u5219\u8fd9\u4e0b\u9762\u7684\u64cd\u4f5c\u5f88\u5371\u9669\uff01\nrpm -qa | grep "llvm-private"                   # \u67e5\u627e\u5305\u542b llvm-private \u7684\u5305\nrpm -e --nodeps llvm-private-6.0.1-2.el7.x86_64 # \u5378\u8f7d\u67e5\u627e\u5230\u7684\u5305\uff0c\u5b9e\u9645\u627e\u5230\u7684\u53ef\u80fd\u548c\u793a\u4f8b\u4e0d\u540c\n')),(0,a.kt)("h3",{id:"\u5e38\u89c1\u95ee\u9898\u6392\u67e5"},"\u5e38\u89c1\u95ee\u9898\u6392\u67e5"),(0,a.kt)("h4",{id:"q1-1"},"Q1:"),(0,a.kt)("p",null,"\u4f7f\u7528 Cargo \u7f16\u8bd1\u65f6\u51fa\u73b0\u5982\u4e0b\u9519\u8bef\u4fe1\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"error: linker cc not found | = note: No such file or directory (os error 2)\n")),(0,a.kt)("p",null,"\u8fd9\u662f\u56e0\u4e3a Cargo \u627e\u4e0d\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"cc")," \u7f16\u8bd1\u5668\u7a0b\u5e8f\uff08\u8fde\u63a5\u5668\uff09\u6765\u7f16\u8bd1\u7ed9\u5b9a\u7684\u5e94\u7528\u7a0b\u5e8f\u3002"),(0,a.kt)("p",null,"\u7531\u4e8e Rust \u8fd8\u6ca1\u6709\u5305\u542b\u5b83\u81ea\u5df1\u7684\u94fe\u63a5\u5668\uff0c\u901a\u5e38\u6211\u4eec\u9700\u8981\u5b89\u88c5\u4e00\u4e2a C \u7f16\u8bd1\u5668\uff0c\u5982\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"gcc")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"cmake")," \u7b49\u7f16\u8bd1\u5de5\u5177\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u89e3\u51b3\u65b9\u6848"),"\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8981\u5728 Ubuntu \u4e0a\u5b89\u88c5 gcc\uff0c\u53ea\u9700\u8fd0\u884c\uff0c",(0,a.kt)("inlineCode",{parentName:"li"},"build-essential")," \u5305\u542b\u4e86\u7f16\u8bd1\u5f00\u53d1\u6240\u9700\u7684\u57fa\u672c\u5de5\u5177\u96c6\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo apt install build-essential\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8981\u5728 Arch Linux \u4e0a\u5b89\u88c5 Cmake\uff0c\u8bf7\u542f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"[Extra]")," \u5b58\u50a8\u5e93\u5e76\u8fd0\u884c\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo pacman -S gcc cmake\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5728 Fedora\u3001RHEL\u3001CentOS\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo dnf install gcc cmake\n")),(0,a.kt)("h4",{id:"q2-1"},"Q2:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u82e5\u51fa\u73b0 ",(0,a.kt)("inlineCode",{parentName:"li"},"Could not find directory of OpenSSL installation")," \u7684\u62a5\u9519\u4fe1\u606f\uff0c\u5219\u9700\u8981\u5b89\u88c5 OpenSSL \u5e93\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u82e5\u51fa\u73b0 ",(0,a.kt)("inlineCode",{parentName:"li"},'Unable to find libclang: "the `libclang` shared library at /usr/lib64/clang-private/libclang.so.6.0"')," \u5b57\u6837\u9519\u8bef\uff0c\u5219\u53ef\u80fd\u662f ",(0,a.kt)("inlineCode",{parentName:"li"},"llvm-private")," \u7684\u539f\u56e0\uff0c\u89e3\u51b3\u65b9\u6cd5\u662f\u5378\u8f7d\u5b83\uff1a",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'rpm -qa | grep "llvm-private" # \u67e5\u627e\u5305\u542b llvm-private \u7684\u5305\nrpm -e --nodeps llvm-private-6.0.1-2.el7.x86_64 # \u5378\u8f7d\u67e5\u627e\u5230\u7684\u5305\n'))),(0,a.kt)("li",{parentName:"ul"},"\u6bcf\u6b21\u7f16\u8bd1\u51fa\u9519\u540e\uff0c\u89e3\u51b3\u540e\uff0c\u9700\u8981 cargo clean\uff0c\u6e05\u9664\u4e4b\u524d\u5df2\u7f16\u8bd1\u7684\u76ee\u6807\u6587\u4ef6\uff0c\u518d\u91cd\u65b0\u7f16\u8bd1\u3002")),(0,a.kt)("h3",{id:"github-\u7f51\u7edc\u95ee\u9898"},"GitHub \u7f51\u7edc\u95ee\u9898"),(0,a.kt)("p",null,"\u5982\u679c\u5728\u5f00\u59cb\u6784\u5efa\u65f6\u51fa\u73b0\u4ee5\u4e0b\u9519\u8bef\u6d88\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"error: failed to get `xxx` as a dependency of package `...`\n...\n...\n  fatal: couldn't find remote ref HEAD\n")),(0,a.kt)("p",null,"\u60a8\u53ef\u80fd\u9700\u8981\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"GitHub")," \u8bbe\u7f6e\u4ee3\u7406\u670d\u52a1\u5668\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"git config --global http.https://github.com.proxy [protocol://][user[:password]@]proxyhost[:port]\n")))}c.isMDXComponent=!0}}]);