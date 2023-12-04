# Inula-request

[Inula-request](https://docs.openinula.net/apis/Inula-request/) openinula 提供的一个请求库。

## 配置

在运行时配置中，配置的将是全局的默认配置，如下配置，会给所有的请求增加前缀 url 和 headers。

```ts
import { IrRequestConfig } from 'inula';

export const request: IrRequestConfig = {
  baseURL: '/api',
  headers: {
    inula: 'haha',
  },
};
```

## 使用方式

提供 ir 对象，可以使用 `ir.get`， `ir.post`， `ir.delete`， `ir.put`等方法，详见 [Inula-request 全局 API](https://docs.openinula.net/apis/Inula-request#inula-request-%E5%85%A8%E5%B1%80-api)。

> 请注意从全局引出的对象，都将使用上诉配置中配置的默认值，如果在你的项目中需要两个不同的请求实例，你可以使用 [ir.create](https://docs.openinula.net/apis/Inula-request#ircreateconfig) 来创建一个新的实体对象。

> 请注意以下为用法示例，并非是唯一用法

创建一个 services 将接口 api 地址转化成变量在组件中使用，很像我们将长字符串写成一个静态常量的开发习惯。

```ts
import { ir } from 'inula';

export async function sayHi(params: Record<string, any>): Promise<any> {
  return ir.get('/hello', {
    params,
  });
}
```

在页面中使用 

```ts
import { sayHi } from '@/services/api';
import { useState } from 'inula';

const Page = () => {
  const [title, setTitle] = useState();
  return (
    <div
      onClick={async () => {
        const { data } = await sayHi({});
        setTitle(data?.text);
      }}
    >
      inula-request {title}
    </div>
  );
};

export default Page;
```

也可以与 ahooks 一起使用，开发时会更加的便利，无需反复的 setData

> 内置了 useRequest 来自 ahooks 吧，如果你需要特定版本的 ahooks ，你只需要在项目中安装特定版本，框架会自动变更引用。

```ts
import { sayHi } from '@/services/api';
import { useRequest } from 'inula';

const Page = () => {
  const { data, error } = useRequest(sayHi,{});
  console.log(data)
  console.log(error)
  return (
    <div>
      inula-request {data.title}
    </div>
  );
};

export default Page;
```

对于一些需要动态轮询的实时数据刷新能力的接口，可以使用 useIR hook 来完成，详见 [请求实时刷新 API](https://docs.openinula.net/apis/Inula-request#%E8%AF%B7%E6%B1%82%E5%AE%9E%E6%97%B6%E5%88%B7%E6%96%B0-api)

```ts
import { useIR, } from 'inula';

const Page = () => {
  const { data, error } = useIR('/hello');
  console.log(data)
  console.log(error)
  return (
    <div>
      inula-request {data.title}
    </div>
  );
};

export default Page;
```

## TODO

根据接口文档地址，生成 services 文件。（等 openinula 官方实践完成，再实现此功能）