"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[7434],{3905:function(n,e,t){t.d(e,{Zo:function(){return d},kt:function(){return p}});var a=t(7294);function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){r(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function s(n,e){if(null==n)return{};var t,a,r=function(n,e){if(null==n)return{};var t,a,r={},o=Object.keys(n);for(a=0;a<o.length;a++)t=o[a],e.indexOf(t)>=0||(r[t]=n[t]);return r}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(a=0;a<o.length;a++)t=o[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var c=a.createContext({}),l=function(n){var e=a.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},d=function(n){var e=l(n.components);return a.createElement(c.Provider,{value:e},n.children)},u={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},b=a.forwardRef((function(n,e){var t=n.components,r=n.mdxType,o=n.originalType,c=n.parentName,d=s(n,["components","mdxType","originalType","parentName"]),b=l(t),p=r,g=b["".concat(c,".").concat(p)]||b[p]||u[p]||o;return t?a.createElement(g,i(i({ref:e},d),{},{components:t})):a.createElement(g,i({ref:e},d))}));function p(n,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof n||r){var o=t.length,i=new Array(o);i[0]=b;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=n,s.mdxType="string"==typeof n?n:r,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},8092:function(n,e,t){t.r(e),t.d(e,{assets:function(){return c},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return l}});var a=t(3117),r=(t(7294),t(3905));const o={},i="Onboarding Library",s={unversionedId:"web3/starmask/onboarding-library",id:"web3/starmask/onboarding-library",title:"Onboarding Library",description:"As an Starcoin enabled site developer, sending users offsite to install StarMask presents challenges. Most notably, you must inform the user to return to your site and refresh their browser after the installation. Your site will detect the user's newly installed StarMask extension only after that refresh. We at StarMask care deeply about user experience, and we knew that this workflow needed to be improved.",source:"@site/docs/04-web3/01-starmask/01-onboarding-library.md",sourceDirName:"04-web3/01-starmask",slug:"/web3/starmask/onboarding-library",permalink:"/starcoin-cookbook/docs/web3/starmask/onboarding-library",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/04-web3/01-starmask/01-onboarding-library.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"StarMask",permalink:"/starcoin-cookbook/docs/web3/starmask/"},next:{title:"Starcoin Provider API",permalink:"/starcoin-cookbook/docs/web3/starmask/starcoin-provider"}},c={},l=[{value:"Getting Started",id:"getting-started",level:2},{value:"Examples",id:"examples",level:2},{value:"Basic Usage",id:"basic-usage",level:3},{value:"Using React",id:"using-react",level:3},{value:"Using TypeScript",id:"using-typescript",level:3},{value:"Using Vanilla Javascript + HTML",id:"using-vanilla-javascript--html",level:3},{value:"Onboarding Diagram",id:"onboarding-diagram",level:2}],d={toc:l};function u(n){let{components:e,...o}=n;return(0,r.kt)("wrapper",(0,a.Z)({},d,o,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"onboarding-library"},"Onboarding Library"),(0,r.kt)("p",null,"As an Starcoin enabled site developer, sending users offsite to install StarMask presents challenges. Most notably, you must inform the user to return to your site and refresh their browser after the installation. Your site will detect the user's newly installed StarMask extension only after that refresh. We at StarMask care deeply about user experience, and we knew that this workflow needed to be improved."),(0,r.kt)("p",null,"StarMask now provides a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/starcoinorg/starmask-onboarding"},"starmask-onboarding library")," designed to improve and simplify the onboarding experience. The new library exposes an API to initiate the onboarding process. In the process, it registers your site as the origin of the onboarding request. StarMask will check for this origin after the user completes the onboarding flow. If it finds an origin, the final confirmation button of the StarMask onboarding flow will indicate that the user will be redirected back to your site."),(0,r.kt)("h2",{id:"getting-started"},"Getting Started"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install ",(0,r.kt)("inlineCode",{parentName:"p"},"@starcoin/starmask-onboarding")," using npm or yarn.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Import the Onboarding Library or include it in your page."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'// As an ES6 module\nimport StarMaskOnboarding from "@starcoin/starmask-onboarding";\n// Or as an ES5 module\nconst StarMaskOnboarding = require("@starcoin/starmask-onboarding");\n')),(0,r.kt)("p",null,"If you'd prefer you can instead include the prebuilt ES5 bundle that ships with the library:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script src="./starmask-onboarding.bundle.js"><\/script>\n')),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Create a new instance of the Onboarding library")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const onboarding = new StarMaskOnboarding();\n")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Start the onboarding process in response to a user event (e.g. a button click).")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"onboarding.startOnboarding();\n")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("h3",{id:"basic-usage"},"Basic Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const onboarding = new StarMaskOnboarding();\nonboarding.startOnboarding();\n")),(0,r.kt)("h3",{id:"using-react"},"Using React"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import StarMaskOnboarding from "@starcoin/starmask-onboarding";\nimport React from "react";\n\nconst ONBOARD_TEXT = "Click here to install StarMask!";\nconst CONNECT_TEXT = "Connect";\nconst CONNECTED_TEXT = "Connected";\n\nexport function OnboardingButton() {\n  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);\n  const [isDisabled, setDisabled] = React.useState(false);\n  const [accounts, setAccounts] = React.useState([]);\n  const onboarding = React.useRef();\n\n  React.useEffect(() => {\n    if (!onboarding.current) {\n      onboarding.current = new StarMaskOnboarding();\n    }\n  }, []);\n\n  React.useEffect(() => {\n    if (StarMaskOnboarding.isStarMaskInstalled()) {\n      if (accounts.length > 0) {\n        setButtonText(CONNECTED_TEXT);\n        setDisabled(true);\n        onboarding.current?.stopOnboarding();\n      } else {\n        setButtonText(CONNECT_TEXT);\n        setDisabled(false);\n      }\n    }\n  }, [accounts]);\n\n  React.useEffect(() => {\n    function handleNewAccounts(newAccounts) {\n      setAccounts(newAccounts);\n    }\n    if (StarMaskOnboarding.isStarMaskInstalled()) {\n      window.starcoin\n        .request({ method: "stc_requestAccounts" })\n        .then(handleNewAccounts);\n      window.starcoin.on("accountsChanged", handleNewAccounts);\n      return () => {\n        window.starcoin.removeListener("accountsChanged", handleNewAccounts);\n      };\n    }\n  }, []);\n\n  const onClick = () => {\n    if (StarMaskOnboarding.isStarMaskInstalled()) {\n      window.starcoin\n        .request({ method: "stc_requestAccounts" })\n        .then((newAccounts) => setAccounts(newAccounts));\n    } else {\n      onboarding.current?.startOnboarding();\n    }\n  };\n  return (\n    <button disabled={isDisabled} onClick={onClick}>\n      {buttonText}\n    </button>\n  );\n}\n')),(0,r.kt)("h3",{id:"using-typescript"},"Using TypeScript"),(0,r.kt)("p",null,"We ship our TypeScript types with ",(0,r.kt)("inlineCode",{parentName:"p"},"@starcoin/starmask-onboarding"),".\nModifying the above example to get type safety when using the ",(0,r.kt)("inlineCode",{parentName:"p"},"onboarding")," library is simple:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"  -const onboarding = React.useRef();\n  +const onboarding = React.useRef<StarMaskOnboarding>();\n")),(0,r.kt)("p",null,"Doing this step will give you editor auto-completion for the methods exposed by the library, and helpful documentation."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Editor Highlighting",src:t(1693).Z,width:"2204",height:"756"})),(0,r.kt)("h3",{id:"using-vanilla-javascript--html"},"Using Vanilla Javascript + HTML"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html lang="en-CA">\n  <head>\n    <title>StarMask Onboarding Example</title>\n    <meta charset="UTF-8" />\n  </head>\n  <body>\n    <h1>Sample Dapp</h1>\n    <button id="onboard">Loading...</button>\n    <script src="./starmask-onboarding.bundle.js"><\/script>\n    <script>\n      window.addEventListener("DOMContentLoaded", () => {\n        const onboarding = new StarMaskOnboarding();\n        const onboardButton = document.getElementById("onboard");\n        let accounts;\n\n        const updateButton = () => {\n          if (!StarMaskOnboarding.isStarMaskInstalled()) {\n            onboardButton.innerText = "Click here to install StarMask!";\n            onboardButton.onclick = () => {\n              onboardButton.innerText = "Onboarding in progress";\n              onboardButton.disabled = true;\n              onboarding.startOnboarding();\n            };\n          } else if (accounts && accounts.length > 0) {\n            onboardButton.innerText = "Connected";\n            onboardButton.disabled = true;\n            onboarding.stopOnboarding();\n          } else {\n            onboardButton.innerText = "Connect";\n            onboardButton.onclick = async () => {\n              await window.starcoin.request({\n                method: "stc_requestAccounts",\n              });\n            };\n          }\n        };\n\n        updateButton();\n        if (StarMaskOnboarding.isStarMaskInstalled()) {\n          window.starcoin.on("accountsChanged", (newAccounts) => {\n            accounts = newAccounts;\n            updateButton();\n          });\n        }\n      });\n    <\/script>\n  </body>\n</html>\n')),(0,r.kt)("h2",{id:"onboarding-diagram"},"Onboarding Diagram"),(0,r.kt)("p",null,"Here is a diagram of the interactions between the onboarding library, the forwarder, and the extension:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Onboarding Library Diagram",src:t(2083).Z,width:"1065",height:"742"})))}u.isMDXComponent=!0},2083:function(n,e,t){e.Z=t.p+"assets/images/onboarding-diagram-f04deff7120343396a63b1bc4eb8779d.png"},1693:function(n,e,t){e.Z=t.p+"assets/images/onboarding-library-1-a9e850e1e7d3eea560ec39912e7a0b99.png"}}]);