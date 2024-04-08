"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[32],{97850:function(s,l,e){e.r(l);var n=e(77117),c=e.n(n),r=e(45728),a=e(71674);l.default=function(){var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,r.useEffect)((function(){var s;if(0!==window.location.hash.length){var l=decodeURIComponent(window.location.hash);setTimeout((function(){var s;null===(s=document.getElementById(l.slice(1)))||void 0===s||s.scrollIntoView()}),100)}else window.scrollTo(0,0);null===(s=document.getElementById("active-nav-item"))||void 0===s||s.scrollIntoView({behavior:"smooth",block:"center"})}),[]);var l=s.components||{},e=l.wrapper;return e?(0,a.jsx)(e,c()(c()({},s),{},{children:(0,a.jsx)(n,{})})):n();function n(){var l=Object.assign({h1:"h1",a:"a",span:"span",p:"p",h2:"h2",code:"code",blockquote:"blockquote",div:"div",pre:"pre"},s.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(l.h1,{id:"inula-x",children:[(0,a.jsx)(l.a,{"aria-hidden":"true",tabIndex:"-1",href:"#inula-x",children:(0,a.jsx)(l.span,{className:"icon icon-link"})}),"Inula-X"]}),"\n",(0,a.jsxs)(l.p,{children:[(0,a.jsx)(l.a,{href:"https://docs.openinula.net/apis/Inula-X/",children:"Inula-X"})," 是集成在openinula框架中用于状态管理的库。它能集中式地存储、管理应用中所有组件的状态，并通过相应的规则(actions)保证状态(state)以可预测的方式发生变化。"]}),"\n",(0,a.jsxs)(l.h2,{id:"使用方式",children:[(0,a.jsx)(l.a,{"aria-hidden":"true",tabIndex:"-1",href:"#使用方式",children:(0,a.jsx)(l.span,{className:"icon icon-link"})}),"使用方式"]}),"\n",(0,a.jsxs)(l.p,{children:["默认会将 src/stores 下的 store 定义自动挂载，你只需要在 stores 文件夹中新建文件即可新增一个 store 用来管理组件状态。详细的 store 写法和用法，请参考 ",(0,a.jsx)(l.a,{href:"https://docs.openinula.net/apis/Inula-X/",children:"Inula-X"}),"  文档。"]}),"\n",(0,a.jsxs)(l.p,{children:["store 文件将会被自动挂为 ",(0,a.jsx)(l.code,{children:"${store.id}Store"})," ，然后可以直接从 inula 中导出使用 ",(0,a.jsx)(l.code,{children:"import { helloStore } from 'inula'"}),";"]}),"\n",(0,a.jsxs)(l.blockquote,{children:["\n",(0,a.jsx)(l.p,{children:"注意 createStore, clearStore 和 useStore 是 openinula 导出的功能，所以无法创建一个同名的 store"}),"\n"]}),"\n",(0,a.jsx)(l.p,{children:"对于某个 pages 文件夹下面的 store 也会默认挂载"}),"\n",(0,a.jsxs)(l.blockquote,{children:["\n",(0,a.jsx)(l.p,{children:"请注意使用约定式路由时你无法创建一个名为 /store 路径的页面"}),"\n"]}),"\n",(0,a.jsxs)(l.p,{children:["新建一个 store 文件，可以使用 inula g x storeName 快速创建模版文件，如 ",(0,a.jsx)(l.code,{children:"npx inula g x hello"})]}),"\n",(0,a.jsx)(l.div,{"data-rehype-pretty-code-fragment":"",children:(0,a.jsx)(l.pre,{"data-language":"ts","data-theme":"default",children:(0,a.jsxs)(l.code,{"data-language":"ts","data-theme":"default",children:[(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"import"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" { "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"createStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" } "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"from"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'inula'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:";"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:" "}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"export"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"default"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#DCDCAA"},children:"createStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"({"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"id:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'hello'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:","})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"actions:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  },"})}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"state:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"title:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'hello'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:","})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  },"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"});"})})]})})}),"\n",(0,a.jsx)(l.p,{children:"一个比较简单的用例子，src/stores/hello.ts"}),"\n",(0,a.jsx)(l.div,{"data-rehype-pretty-code-fragment":"",children:(0,a.jsx)(l.pre,{"data-language":"ts","data-theme":"default",children:(0,a.jsxs)(l.code,{"data-language":"ts","data-theme":"default",children:[(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"import"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" { "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"createStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" } "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"from"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'inula'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:";"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:" "}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"export"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"default"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#DCDCAA"},children:"createStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"({"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"id:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'hello'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:","})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"actions:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    "}),(0,a.jsx)(l.span,{style:{color:"#DCDCAA"},children:"changeName"}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:":"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" ("}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"state"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:") "}),(0,a.jsx)(l.span,{style:{color:"#569CD6"},children:"=>"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"      "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"state"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"."}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"title"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" = "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'openinula'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:";"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    },"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  },"})}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"state:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"title:"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'inulajs'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:","})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  },"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"});"})})]})})}),"\n",(0,a.jsx)(l.p,{children:"在页面中使用"}),"\n",(0,a.jsx)(l.div,{"data-rehype-pretty-code-fragment":"",children:(0,a.jsx)(l.pre,{"data-language":"ts","data-theme":"default",children:(0,a.jsxs)(l.code,{"data-language":"ts","data-theme":"default",children:[(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"import"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" { "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"helloStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" } "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"from"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#CE9178"},children:"'inula'"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:";"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:" "}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#569CD6"},children:"const"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#DCDCAA"},children:"Page"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" = () "}),(0,a.jsx)(l.span,{style:{color:"#569CD6"},children:"=>"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#569CD6"},children:"const"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#4FC1FF"},children:"store"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" = "}),(0,a.jsx)(l.span,{style:{color:"#DCDCAA"},children:"helloStore"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"();"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"return"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" ("})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    <"}),(0,a.jsx)(l.span,{style:{color:"#4EC9B0"},children:"div"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:">"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"      "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"hello"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" {"}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"store"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"."}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"title"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"}"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"      <"}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"button"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"        "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"onClick"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"={() => {"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"          store.changeName();"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"        }}"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"      >"})}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"        "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"改名字啦"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"      </"}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"button"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:">"})]}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"    </"}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"div"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:">"})]}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"  );"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:"};"})}),"\n",(0,a.jsx)(l.span,{className:"line",children:" "}),"\n",(0,a.jsxs)(l.span,{className:"line",children:[(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"export"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#C586C0"},children:"default"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:" "}),(0,a.jsx)(l.span,{style:{color:"#9CDCFE"},children:"Page"}),(0,a.jsx)(l.span,{style:{color:"#D4D4D4"},children:";"})]})]})})})]})}}}}]);