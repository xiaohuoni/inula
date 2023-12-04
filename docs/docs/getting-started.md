import { Tabbed } from 'umi';

# 快速上手


我们提供了一个脚手架 ，可以轻松快速创建一个项目：

```base
npx inula init [dir]
```

初始化一个 Inula 项目，目录可选，一般操作是新建一个空白文件夹，再执行 `npx inula init` 即可。


这个命令会安装脚手架，运行后提供了两个可选项可以选择：

1. Pick Npm Client - 选择 Npm 客户端

你可以从以下几个选项中选择习惯的 Node 依赖管理工具：

- [npm](https://www.npmjs.com/)
- [cnpm](https://github.com/cnpm/cnpm)
- [tnpm](https://web.npm.alibaba-inc.com/)
- [yarn](https://yarnpkg.com/)
- [pnpm](https://pnpm.io/) (alita 官方推荐)

2. Pick Npm Registry - 选择 Npm 源

- [npm](https://www.npmjs.com/)
- [taobao](https://npmmirror.com/)

选择后会自动生成一个最基本的 alita 项目，并根据选中的客户端和镜像源安装依赖：

```text
.
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc.js
├── README.md
├── config
│   └── config.ts
├── mock
│   └── app.ts
├── package.json
├── src
│   ├── app.tsx
│   ├── assets
│   │   └── yay.jpg
│   ├── favicon.ico
│   ├── global.css
│   ├── locales
│   │   ├── en-US.ts
│   │   └── zh-CN.ts
│   ├── pages
│   │   └── index
│   │       ├── index.css
│   │       └── index.tsx
│   ├── services
│   │   └── api.ts
│   └── stores
│       └── count.ts
├── tsconfig.json
└── typings.d.ts
```

这样就一键完成 inula 项目的初始化了。

跟着首页文字引导可以快速入门 inula 提供的每一个功能。

![](./zh.jpg)
![](./en.png)
![](./en2.png)
