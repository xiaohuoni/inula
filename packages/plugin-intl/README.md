# @aluni/plugin-intl

See our website [inula](https://inula.cn) for more information.

[Inula-intl](https://docs.openinula.net/apis/Inula-intl)是openinula提供的生态组件，主要提供了国际化功能，涵盖了基本的国际化组件和钩子函数，便于用户构建具备国际化能力的前端界面。

在Inula-intl中，无论是组件或者Hooks，其目的就是获取当前应用程序的国际化实例，该实例提供了处理多语言文本消息、日期、时间等功能。


## 配置插件

您可以在 `.inularc.ts` 中配置国际化插件。默认值如下：

```ts
export default {
  intl: {
    default: 'zh-CN',
    localeFolder: 'locals',
  },
};
```

配置的详细介绍如下：

| 配置项 | 类型 | 默认值 | 介绍 |
| --- | --- | --- | --- |
| `default` | `String` | `zh-CN` | 项目**默认语言**。当检测不到具体语言时，使用 `default` 设置的默认语言。 |
| `localeFolder` | `String` | `locals` |  指定国际化文件存放路径 |

## 使用方式

默认会将 src/locals 下的文件挂载为国际化文件，可以通过 localeFolder 配置来指定存放目录

```tsx
import { addLocale, getAllLocales, getLocale, setLocale, useIntl } from 'inula';

const Page = () => {
  const intl = useIntl();
  const locals = getAllLocales();
  return (
    <div>
      <p>
        {getLocale()}:{intl.formatMessage({ id: 'navBar.lang' })}
      </p>
      <button
        onClick={() => {
          setLocale(locals[Math.floor(Math.random() * locals.length)], false);
        }}
      >
        换语言啦
      </button>
      <p>写一个不存在的 id :{intl.formatMessage({ id: 'hello.inula' })}</p>
      <button
        onClick={() => {
          setLocale(locals[Math.floor(Math.random() * locals.length)], false);
          addLocale(
            'zh-CN',
            {
              'hello.inula': '你好，OpenInula',
            },
          );
          setLocale('zh-CN',false);
        }}
      >
        增加一个中文的 `id: 'hello.inula'`，并将当前语言设置成中文
      </button>
    </div>
  );
};

export default Page;
```

## Api

### useIntl

获取当前应用程序的I18n实例，详见 [useIntl](https://docs.openinula.net/apis/Inula-intl#useintl)


### `addLocale` 动态添加多语言支持

无需创建并编写单独的多语言文件，使用 `addLocale()` 接口可以在运行时动态添加语言支持。它接受三个参数：

| 参数      | 类型     | 介绍                          |
| --------- | -------- | ----------------------------- |
| `name`    | `String` | 多语言的 Key                  |
| `message` | `Object` | 多语言的内容对象              |

例如，您想要动态引入繁体中文的多语言支持，可以编写代码如下：

```ts
import { addLocale } from 'inula';

addLocale(
  'zh-TW',
  {
    welcome: '歡迎！',
  },
);
```

### `getAllLocales` 获取多语言列表

通过 `getAllLocales()` 接口可以获取当前所有多语言选项的数组，包括通过 `addLocale()` 方法添加的多语言选项。该接口默认会在 `src/locales` 目录下寻找形如 `zh-CN.(js|json|ts)` 的文件，并返回多语言的 Key。

```ts
import { getAllLocales } from 'inula';

getAllLocales();
// [en-US, zh-CN, ...]
```

### `getLocale` 获取当前选择的语言

通过 `getLocale()` 接口可以获取当前选择的语言：

```ts
import { getLocale } from 'inula';

getLocale();
// zh-CN
```

### `setLocale` 设置语言

通过 `setLocale()` 接口可以使用编程的方法动态设置当前的语言。它有两个参数：

| 参数         | 类型      | 介绍                                       |
| ------------ | --------- | ------------------------------------------ |
| `lang`       | `String`  | 切换到的语言                               |
| `realReload` | `Boolean` | 切换时是否刷新页面，默认为 `true` 刷新页面 |

```ts
import { setLocale } from 'inula';

// 切换时刷新页面
setLocale('en-US');

// 切换时不刷新页面
setLocale('en-US', false);
```

## 生成器

命令 `inula g intl filename` 会生成一个国际化文件。

###  [试验性功能] 使用 AIGC 对国际化文本进行翻译 --create

命令 `inula g intl --create` ，会根据用户选择，将默认的国际化文本翻译成指定语言并生成文件。
