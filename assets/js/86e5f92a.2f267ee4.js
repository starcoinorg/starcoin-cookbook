"use strict";(self.webpackChunkstarcoin_cookbook=self.webpackChunkstarcoin_cookbook||[]).push([[5521],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return p}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),l=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),b=l(a),p=i,f=b["".concat(s,".").concat(p)]||b[p]||d[p]||r;return a?n.createElement(f,c(c({ref:t},u),{},{components:a})):n.createElement(f,c({ref:t},u))}));function p(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,c=new Array(r);c[0]=b;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,c[1]=o;for(var l=2;l<r;l++)c[l]=a[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,a)}b.displayName="MDXCreateElement"},5120:function(e,t,a){a.r(t),a.d(t,{assets:function(){return s},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return r},metadata:function(){return o},toc:function(){return l}});var n=a(3117),i=(a(7294),a(3905));const r={},c="Multisig accounts and multisig transactions",o={unversionedId:"getting-started/accounts/multisig-account",id:"getting-started/accounts/multisig-account",title:"Multisig accounts and multisig transactions",description:"Account concept",source:"@site/docs/02-getting-started/03-accounts/3.multisig-account.md",sourceDirName:"02-getting-started/03-accounts",slug:"/getting-started/accounts/multisig-account",permalink:"/starcoin-cookbook/docs/getting-started/accounts/multisig-account",draft:!1,editUrl:"https://github.com/starcoinorg/starcoin-cookbook/edit/main/docs/02-getting-started/03-accounts/3.multisig-account.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Execute your first transaction on Starcoin",permalink:"/starcoin-cookbook/docs/getting-started/accounts/first-transaction"},next:{title:"Rotate Authentication Key",permalink:"/starcoin-cookbook/docs/getting-started/accounts/rotate-authentication-key"}},s={},l=[{value:"Pre-preparation",id:"pre-preparation",level:2},{value:"Generate multisig account",id:"generate-multisig-account",level:2},{value:"Transfer money to a multisig account",id:"transfer-money-to-a-multisig-account",level:2},{value:"Initiate a multisig transaction",id:"initiate-a-multisig-transaction",level:2},{value:"Signatures of other participants",id:"signatures-of-other-participants",level:2},{value:"Submit a multi-signature transaction",id:"submit-a-multi-signature-transaction",level:2},{value:"Other multisig management methods",id:"other-multisig-management-methods",level:2}],u={toc:l};function d(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"multisig-accounts-and-multisig-transactions"},"Multisig accounts and multisig transactions"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../concepts/account"},"Account concept")),(0,i.kt)("p",null,"This section describes the use of multisig accounts, including how to create multisig accounts on-chain via the CLI, and how to initiate multisig transactions. For the principle and implementation of multi-signature accounts, please refer to the multi-signature account section of the ",(0,i.kt)("a",{parentName:"p",href:"../../concepts/account"},"account concept"),"."),(0,i.kt)("h2",{id:"pre-preparation"},"Pre-preparation"),(0,i.kt)("p",null,"Multi-signature transactions involve multiple participants. Here we use three participants, alice, bob and tom, to illustrate the process of multi-signature transactions."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"First, you need to start three Starcoin ",(0,i.kt)("inlineCode",{parentName:"li"},"dev")," nodes locally, corresponding to alice, bob and tom respectively, and connect to the console at the same time.\nThe ",(0,i.kt)("inlineCode",{parentName:"li"},"--discover-local")," option allows nodes to discover other nodes in the local area network, and then connect into a network.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"% starcoin -n dev -d alice --discover-local true console\n% starcoin -n dev -d bob --discover-local true console\n% starcoin -n dev -d tom --discover-local true console\n")),(0,i.kt)("p",null,"We use the default accounts provided by the three nodes as the personal accounts of alice, bob and tom respectively."),(0,i.kt)("p",null,"Personal account addresses of alice, bob and tom:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"alice: 0x31515d36fa0b9e01bbdb1638d7c79e51\nbob: 0x991c2f856a1e32985d9793b449c0f9d3\ntom: 0x17183867a6142e821ee8a2dc6bb4d69d\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Use the following commands to generate a new public-private key pair for each:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'starcoin% account generate-keypair\n\n# As follow:\n{\n  "ok": [\n    {\n      "address": "0xb6b67729f9ed83f3cf542952fbded752",\n      "auth_key": "0x459381118ed14d42097b977aae5fe1d4b6b67729f9ed83f3cf542952fbded752",\n      "private_key": "0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d",\n      "public_key": "0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5",\n      "receipt_identifier": "stc1pk6m8w20eakpl8n6599f0hhkh2gg3czy9"\n    }\n  ]\n}\n')),(0,i.kt)("p",null,"The generated key pair has 5 fields of information:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"address -> Generate address (in this demo, useless)\nauth_key -> authentication key\nprivate_key -> private key\npublic_key -> public key\nreceipt_identifier -> receipt identifier\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note:")," Do not confuse ",(0,i.kt)("inlineCode",{parentName:"p"},"the personal account address")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"the address generated by generate-keypair"),"!"),(0,i.kt)("p",null,"Here, it is assumed that the three of them generate pair key information (for example only, do not use it in the official network) are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"alice:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"pubkey: 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5"),(0,i.kt)("li",{parentName:"ul"},"prikey: 0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"bob:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"pubkey: 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0"),(0,i.kt)("li",{parentName:"ul"},"prikey: 0x163e272560e53b75c087bc424fc7ff8cdbc0608ce4695f9bf69c8bd430a2bfeb"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"tom:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"pubkey: 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301"),(0,i.kt)("li",{parentName:"ul"},"prikey: 0xe38bfd1510a24c54d966dcbe13a4d06a798606f4b557823845156857b4dfb0b1")))),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Each console gets 10,000 STC for the default account through the ",(0,i.kt)("inlineCode",{parentName:"li"},"dev get-coin -v 10000STC")," command.")),(0,i.kt)("p",null,"After completing the above preparations, let's start our multi-signature transaction process. The main steps are as follows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"First we create a multi-signature account locally."),(0,i.kt)("li",{parentName:"ol"},"Then ask alice to transfer an STC to this multi-signature account."),(0,i.kt)("li",{parentName:"ol"},"Finally, initiate a multi-signature transaction in the name of this multi-signature account: transfer money from the multi-signature account to bob.")),(0,i.kt)("h2",{id:"generate-multisig-account"},"Generate multisig account"),(0,i.kt)("p",null,"It is assumed here that the reader understands the basic concepts of multi-signature accounts."),(0,i.kt)("p",null,"In this section, we will create a multi-signature account maintained by ",(0,i.kt)("strong",{parentName:"p"},"three")," participants, and transactions only require the signatures of two of them (",(0,i.kt)("inlineCode",{parentName:"p"},"threshold=2"),"). We use the public-private key pair generated above and ",(0,i.kt)("inlineCode",{parentName:"p"},"threshold=2")," to generate a multi-signature account."),(0,i.kt)("p",null,"First, a multi-signature account jointly maintained by three people is generated in the nodes of alice, bob and tom."),(0,i.kt)("p",null,"Execute in alice's console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# --pubkey specifies the generated public key of bob and tom, --prikey specifies the generated private key of alice\nstarcoin% account import-multisig --pubkey 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0 --pubkey 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301 --prikey 0xa530797cfb5fad79fe5ebf6add24dafbc141021a7d9c164840db0e29d944593d -t 2\n")),(0,i.kt)("p",null,"Execute in bob's console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# --pubkey specifies the generated public key of alice and tom, --prikey specifies the generated private key of bob\nstarcoin% account import-multisig --pubkey 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5 --pubkey 0x7315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301 --prikey 0x163e272560e53b75c087bc424fc7ff8cdbc0608ce4695f9bf69c8bd430a2bfeb -t 2\n")),(0,i.kt)("p",null,"Execute in tom's console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# --pubkey specifies the generated public key of alice and bob, --prikey specifies the generated private key of tom\nstarcoin% account import-multisig --pubkey 0xf423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb5 --pubkey 0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d0 --prikey 0xe38bfd1510a24c54d966dcbe13a4d06a798606f4b557823845156857b4dfb0b1 -t 2\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"--pubkey")," option specifies that ",(0,i.kt)("inlineCode",{parentName:"p"},"generate-keypair")," generates a public key instead of the personal account's public key, the ",(0,i.kt)("inlineCode",{parentName:"p"},"--prikey")," option specifies the private key generated by ",(0,i.kt)("inlineCode",{parentName:"p"},"generate-keypair")," instead of the personal account's private key, and the ",(0,i.kt)("inlineCode",{parentName:"p"},"-t")," option specifies the number of signatures required, ie ",(0,i.kt)("inlineCode",{parentName:"p"},"threshold"),"."),(0,i.kt)("p",null,"After executing the above commands on the three consoles, you will find that the three commands all generate the same multi-signature account information (Causion: ",(0,i.kt)("inlineCode",{parentName:"p"},"priv_key")," of the three multi-sig account is different, see the next section):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "ok": {\n    "address": "0x8afd731146fbc206d56265adedb4b50a",\n    "is_default": false,\n    "is_readonly": false,\n    "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",\n    "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"\n  }\n}\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Understand the public and private keys of multi-signature accounts:")),(0,i.kt)("p",null,"public key: You can see that the public key of this multi-signature account is very long. It is the combination of the public keys generated by multiple single-signature private keys. Everyone holds the same multisig public key."),(0,i.kt)("p",null,"private key: The private key of a multi-signature account is the combination of multiple single-signature private keys, each of which holds ",(0,i.kt)("inlineCode",{parentName:"p"},"1/n"),". Run ",(0,i.kt)("inlineCode",{parentName:"p"},"account export 0x8afd731146fbc206d56265adedb4b50a")," in three consoles separately, to check private keys and compare them."),(0,i.kt)("p",null,"View multi-signature accounts:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'starcoin% account show 0x8afd731146fbc206d56265adedb4b50a\n{\n  "ok": {\n    "account": {\n      "address": "0x8afd731146fbc206d56265adedb4b50a",\n      "is_default": false,\n      "is_readonly": false,\n      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",\n      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"\n    },\n    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",\n    "balances": {},\n    "sequence_number": null\n  }\n}\n')),(0,i.kt)("h2",{id:"transfer-money-to-a-multisig-account"},"Transfer money to a multisig account"),(0,i.kt)("p",null,"In this section, we transfer 1000 STC from tom's account to this multi-signature account."),(0,i.kt)("p",null,"Executed in tom's Starcoin console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"starcoin% account transfer -r 0x8afd731146fbc206d56265adedb4b50a -v 1000000000000 -b\n")),(0,i.kt)("p",null,"Then check the information of the multi-signature account:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'starcoin% account show 0x8afd731146fbc206d56265adedb4b50a\n{\n  "ok": {\n    "account": {\n      "address": "0x8afd731146fbc206d56265adedb4b50a",\n      "is_default": false,\n      "is_readonly": false,\n      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",\n      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"\n    },\n    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",\n    "balances": {\n      "0x00000000000000000000000000000001::STC::STC": 1000000000000\n    },\n    "sequence_number": 0\n  }\n}\n')),(0,i.kt)("p",null,"Pay attention to the ",(0,i.kt)("inlineCode",{parentName:"p"},"balances")," field: the multi-signature account already has 1000 STC at this point."),(0,i.kt)("h2",{id:"initiate-a-multisig-transaction"},"Initiate a multisig transaction"),(0,i.kt)("p",null,"Now the multi-signature account has 1000 STC."),(0,i.kt)("p",null,"Let's initiate a multi-signature transaction: transfer 1 STC from the multi-signature account to bob."),(0,i.kt)("p",null,"Execute in tom's Starcoin console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"starcoin% account sign-multisig-txn -s 0x8afd731146fbc206d56265adedb4b50a --function 0x1::TransferScripts::peer_to_peer_v2 -t 0x1::STC::STC --arg 0x991c2f856a1e32985d9793b449c0f9d3 --arg 1000000000u128\n")),(0,i.kt)("p",null,"where ",(0,i.kt)("inlineCode",{parentName:"p"},"peer_to_peer_v2")," script parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"0x991c2f856a1e32985d9793b449c0f9d3")," is bob's personal account address."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"1000000000u128")," is the number of tokens to send.")),(0,i.kt)("p",null,"After a while, you should see the last few lines of output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'mutlisig txn(address: 0x8afd731146fbc206d56265adedb4b50a, threshold: 2): 1 signatures collected\nstill require 1 signatures\n{\n  "ok": "/94713c208ff452d4d02c5446eb18f5ab538b72976e08a84cada4b08be68583ab.multisig-txn"\n}\n')),(0,i.kt)("p",null,"This command will generate the original transaction and sign it with tom's ",(0,i.kt)("strong",{parentName:"p"},"multi-signature account private key"),".\nThe generated transaction will be saved as a file in the current directory, and the file name is the hash of the transaction."),(0,i.kt)("p",null,"Note: The file path will vary slightly according to different operating systems and usage methods."),(0,i.kt)("p",null,"Command line prompt: One signature has been collected for this multi-signature transaction, and another signature is required.\nAt this point, the generated transaction file needs to be distributed to other participants of the multi-signature account for signature."),(0,i.kt)("h2",{id:"signatures-of-other-participants"},"Signatures of other participants"),(0,i.kt)("p",null,"After alice gets the above transaction file, she signs it in her Starcoin console:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"starcoin% account sign-multisig-txn /94713c208ff452d4d02c5446eb18f5ab538b72976e08a84cada4b08be68583ab.multisig-txn\n")),(0,i.kt)("p",null,"After a while, you should see the last few lines of output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'mutlisig txn(address: 0x8afd731146fbc206d56265adedb4b50a, threshold: 2): 2 signatures collected\nenough signatures collected for the multisig txn, txn can be submitted now\n{\n  "ok": "/root/f93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837.multisig-txn"\n}\n')),(0,i.kt)("p",null,"This command will generate another multi-signature transaction signature file, which contains the signatures of ",(0,i.kt)("strong",{parentName:"p"},"tom's multi-signature private key")," and ",(0,i.kt)("strong",{parentName:"p"},"alice's multi-signature private key"),".\nThe returned information prompts the user that the multi-signature transaction has collected enough signatures and can be submitted to the chain for execution."),(0,i.kt)("h2",{id:"submit-a-multi-signature-transaction"},"Submit a multi-signature transaction"),(0,i.kt)("p",null,"After the multi-signature transaction is fully generated, anyone can submit it to the chain.\nHere we submit the multisig transaction from bob's Starcoin console."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"starcoin% account submit-multisig-txn f93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837.multisig-txn\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'txn 0xf93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837 submitted.\n{\n  "ok": {\n    "events": null,\n    "txn_hash": "0xf93382dc60d1f518e313202cc6f0b86116ba81e25b554b174537bfae18987837",\n    "txn_info": null\n  }\n}\n')),(0,i.kt)("p",null,"After waiting for the execution, check the information of the multi-signature account, and you will find that the balance of the multi-signature account has been reduced (gas fee and 1 STC transferred out), and the ",(0,i.kt)("inlineCode",{parentName:"p"},"sequence_number")," of the account has also become 1, indicating that the transaction has been successfully executed."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'starcoin% account show 0x8afd731146fbc206d56265adedb4b50a\n{\n  "ok": {\n    "account": {\n      "address": "0x8afd731146fbc206d56265adedb4b50a",\n      "is_default": false,\n      "is_readonly": false,\n      "public_key": "0x3639b4d6bc2d6588a6517f82ae1ff7fa1e64eb994a4d8ee6d6f948e1997b97d07315e22ea8bd4aaa8bdfe65b4a3c9334d726e12c21881cbbe9a79f57538c6301f423c3d02ac400037a40e8dbbf8b3c3e4545548ff71332737bbfe1abbef97cb502",\n      "receipt_identifier": "stc1p3t7hxy2xl0pqd4tzvkk7md94pgvvpcut"\n    },\n    "auth_key": "0xf112c676ef1a7bfbd29699f14a6260c88afd731146fbc206d56265adedb4b50a",\n    "balances": {\n      "0x00000000000000000000000000000001::STC::STC": 998999894453\n    },\n    "sequence_number": 1\n  }\n}\n')),(0,i.kt)("p",null,"So far, you have completed the creation of a multi-signature account and the generation and on-chain execution of multi-signature transactions."),(0,i.kt)("h2",{id:"other-multisig-management-methods"},"Other multisig management methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=a9nwRZunwwg"},"Manage Multisig via StarMask (Youtube)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/wenwenprotocol/wen-multi-sign"},"A multi-signature management tool based on NodeJs provided by WenWen"))))}d.isMDXComponent=!0}}]);