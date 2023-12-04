# 配置

约定 `config/config.j|ts` 或者 `.inularc.j|ts` 为项目配置文件。

业务能力集成的配置在对应插件的文档中会有更加详细的说明，使用相应能力的时候，直接去插件对应插件文档即可，此处列出一些常用的基础配置，也是 umi 系列通用的一些配置。

### 开发相关配置

#### alias

* 类型：`Record<string, string>`
* 默认值：`{}`

配置别名，对 import 语句的 source 做隐射。

比如：

```ts
import { defineConfig } from 'inu la';

export default defineConfig({
  alias: { 
    foo: '/tmp/to/foo',
  } 
});
```

然后代码里 `import 'foo'` 实际上会 `import '/tmp/to/foo'`。

有几个 Tip。

1、alias 的值最好用绝对路径，尤其是指向依赖时，记得加 `require.resolve`，比如，

```ts
import { defineConfig } from 'inula';

// ⛔
export default defineConfig({
  alias: { 
    foo: 'foo', 
  } 
});

// ✅
export default defineConfig({
  alias: { 
    foo: require.resolve('foo'), 
  } 
});
```

2、如果不需要子路径也被隐射，记得加 `$` 后缀，比如

`import 'foo/bar'` 会被隐射到 `import '/tmp/to/foo/bar'`

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  alias: { 
    foo: '/tmp/to/foo',
  } 
});
```
`import 'foo/bar'` 还是 `import 'foo/bar'`，不会被修改

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  alias: { 
    foo$: '/tmp/to/foo'
  } 
});
```

#### define

* 类型：`Record<string, string>`
* 默认值：`{ process.env.NODE_ENV: 'development' | 'production' }`

设置代码中的可用变量（全局变量）。

注意：属性值会经过一次 `JSON.stringify` 转换。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  define: { 
    FOO: 'bar' 
  }
});
```

项目中的 `console.log(hello, FOO)` 会被编译成 `console.log(hello, 'bar')`。

#### forkTSChecker

* 类型：`object`
* 默认值：`null`

开启 TypeScript 的类型检查。基于 fork-ts-checker-webpack-plugin，配置项可参考 [fork-ts-checker-webpack-plugin 的 Options](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)。

#### mock

* 类型：`{ exclude: string[], include: string[] }`
* 默认值：`{}`

配置 mock 功能。

参数：
* `exclude` 用于排除不需要的 mock 文件；
* `include` 用于额外添加 mock 目录之外的 mock 文件。

示例：

让所有 pages 下的 _mock.ts 文件成为 mock 文件。

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  mock: {
    include: ['src/pages/**/_mock.ts']
  }
});
```

注意：此功能默认开。配置 `mock: false` 关闭。

#### proxy

* 类型：`object`
* 默认值：`{}`

配置代理功能。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  }
});
```

然后访问 `/api/users` 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。

注意：proxy 功能仅在开发环境时有效。

#### theme

* 类型：`object`
* 默认值：`{}`

配置 less 变量主题。

示例：
```ts
import { defineConfig } from 'inula';

export default defineConfig({
  theme: { '@primary-color': '#1DA57A' }
});
```

#### plugins

* 类型：`string[]`
* 默认值：`[]`

配置额外的 umi 插件。

数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  plugins: [
    // npm 依赖
    'umi-plugin-hello',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
});
```

### 构建相关配置

#### chainWebpack

* 类型：`(memo, args) => void`
* 默认值：`null`

用链式编程的方式修改 webpack 配置，基于 webpack-chain，具体 API 可参考 [webpack-api 的文档](https://github.com/mozilla-neutrino/webpack-chain)。

参数：

* `memo` 是现有 webpack 配置
* `args` 包含一些额外信息和辅助对象，目前有 `env` 和 `webpack`。`env` 为当前环境，值为 `development` 或 `production`；`webpack` 为 webpack 对象，可从中获取 webpack 内置插件等

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  chainWebpack(memo, { env, webpack }) {
    // 设置 alias
    memo.resolve.alias.set('foo', '/tmp/to/foo');

    // 添加额外插件
    memo.plugin('hello').use(Plugin, [...args]);

    // 删除 umi 内置插件
    memo.plugins.delete('hmr');
  }
});
```

#### deadCode

* 类型：`{}`
* 默认值：`false`

检测未使用的文件和导出，仅在 build 阶段开启。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  deadCode: {} 
});
```

然后执行 build，如有发现，会有类似信息抛出。

```
Warning: There are 3 unused files:
 1. /mock/a.ts
 2. /mock/b.ts
 3. /pages/index.module.less
 Please be careful if you want to remove them (¬º-°)¬.
```

#### externals

* 类型：`Record<string, string> | Function`
* 默认值：`{}`

设置哪些模块不打包，转而通过 `<script>` 或其他方式引入，通常需要搭配 `headScripts` 配置使用。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  externals: { react: 'React' },
  headScripts: ['https://unpkg.com/react@17.0.1/umd/react.production.min.js'],
});
```

注意：不要轻易设置 antd 的 externals，由于依赖教多，使用方式复杂，可能会遇到较多问题，并且一两句话很难解释清楚。

#### hash

* 类型：`boolean`
* 默认值：`false`

开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  hash: true,
});
```

启用后，产物通常是这样：

```
+ dist
  - logo.sw892d.png
  - umi.df723s.js
  - umi.8sd8fw.css
  - index.html
```

注意：HTML 文件始终没有 hash 后缀。

#### ignoreMomentLocale

* 类型：`boolean`
* 默认值：`true`

忽略 moment 的 locale 文件，用于减少产物尺寸。

注意：此功能默认开。

可配置关闭，示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  ignoreMomentLocale: false
});
```

#### monorepoRedirect

* 类型：`{ srcDir?: string[], exclude?: RegExp[] }`
* 默认值：`false`

在 monorepo 中使用 umi 时，你可能需要引入其他子包的组件、工具等，通过开启此选项来重定向这些子包的导入到他们的源码位置（默认为 `src` 文件夹），这也可以解决 `MFSU` 场景改动子包不热更新的问题。

通过配置 `srcDir` 来调整识别源码文件夹的优先位置，通过 `exclude` 来设定不需要重定向的依赖范围。

示例：

默认重定向到子包的 src 文件夹

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  monorepoRedirect: {}
});
```

优先定向到 libs 文件夹

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  monorepoRedirect: { srcDir: ['libs', 'src'] }
});
```

不重定向 @scope/* 的子包

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  monorepoRedirect: { exclude: [/^@scope\/.+/] }
});
```

#### outputPath

* 类型：`string`
* 默认值：`dist`

配置输出路径。

注意：不允许设定为 src、public、pages、mock、config、locales、models 等约定式功能相关的目录。

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  outputPath: 'lib'
});
```

执行`pnpm build`，会生成一个 lib 文件。

### 部署相关配置

#### base

* 类型：`string`
* 默认值：`/`

设置路由 base，部署项目到非根目录下时使用。

比如有路由 `/` 和 `/users`，设置 base 为 `/foo/` 后就可通过 `/foo/` 和 `/foo/users` 访问到之前的路由。


####  history
* 类型：`{ type: 'browser' | 'hash' | 'memory' }`
* 默认值：`{ type: 'hash' }`

设置路由 history 类型。

##### FAQ

Q：如何去掉路由上的 # 字符

A： 配置 `history:{ type: 'browser' }`

Q: 去掉 # 字符之后，最长遇到的问题是在非根目录部署 html 

A: 

> 为什么我本地开发是好的，部署后就没反应了，而且没有报错？

没有报错！ 这是应用部署在非根路径的典型现象。为啥会有这个问题？因为路由没有匹配上，比如你把应用部署在 /xxx/ 下，然后访问 /xxx/hello，而代码里匹配的是 /hello，那就匹配不上了，而又没有定义 fallback 的路由，比如 404，那就会显示空白页。

怎么解决？

可通过配置 base 解决。

```
export default {
  base: '/path/to/your/app/root',
};
```

#### publicPath

* 类型：`string`
* 默认值：`/`

配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 publicPath 设置成 ./ 相对路径。

> 相对路径 ./ 有一些限制，例如不支持多层路由 /foo/bar，只支持单层路径 /foo

如果你的应用部署在域名的子路径上，例如 https://xxx/foo/，你需要设置 publicPath 为 /foo/，如果同时要兼顾开发环境正常调试，你可以这样配置：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/foo/' : '/',
});
```

#### runtimePublicPath

* 类型：`boolean`
* 默认值：`false`

启用运行时 publicPath。

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  publicPath: {},
});
```
开启后，可以构建产物中的 index.html 文件中，新增

```
<head>
  <script>
    window.publicPath = '/foo/'
  </script>
</head>
```
后会使用 window.publicPath 作为资源动态加载的起始路径，相当 webpack 的 publicPath 的值为 `/foo/`。


### 产物相关配置

#### favicon

* 类型：`string`
* 默认值：`null`

配置 favicon 路径。可以是绝对路径，也可以是基于项目根目录的相对路径。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  favicon: '/assets/favicon.ico',
});
```

HTML 中会生成 `<link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />`。






#### headScripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置build后生成的 HTML 中 `<head></head>`标签中的额外 script。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  headScripts: [`alert(1);`, `https://a.com/b.js`]
});
```

build 后生成的 HTML：

```html
<head>
  <script>alert(1);</script>
  <script src="https://a.com/b.js"></script>
</head>
```

如果需要额外属性，切换到对象格式，示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  headScripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
  ]
});
```

build 后生成的 HTML：

```html
<head>
  <script defer="true" src="/foo.js"></script>
  <script charset="utf-8">alert('你好');</script>
</head>
```

#### scripts

* 类型：`string[] | Script[]`
* 默认值：`[]`

配置build后生成的 HTML 中 `<body></body>`标签中的额外 script。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  scripts: [`alert(1);`, `https://a.com/b.js`]
});
```

build 后生成的 HTML：

```html
<body>
  <script>alert(1);</script>
  <script src="https://a.com/b.js"></script>
</body>
```

如果需要额外属性，切换到对象格式，示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  scripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
  ]
});
```

build 后生成的 HTML：

```html
<body>
  <script defer="true" src="/foo.js"></script>
  <script charset="utf-8">alert('你好');</script>
</body>
```

#### metas

* 类型：`Meta[]`
* 默认值：`[]`

配置 build 后生成的 HTML 中额外的 `<meta/>` 标签。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  metas: [
    { name: 'keywords', content: 'umi, umijs' },
    { name: 'description', content: 'React framework.' },
  ]
});
```

build 后生成的 HTML：

```html
<meta name="keywords" content="umi, umijs" />
<meta name="description" content="React framework." />
```

#### styles

* 类型：`string[]`
* 默认值：`[]`

配置额外的 CSS。

配置项支持内联样式和外联样式路径，后者通过是否以 https?:// 开头来判断。

示例：

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  styles: [`body { color: red; }`, `https://a.com/b.css`]
});
```

build 后生成的 HTML：

```html
<style>
  body {
    color: red;
  }
</style>
<link rel="stylesheet" href="https://a.com/b.css" />
```

