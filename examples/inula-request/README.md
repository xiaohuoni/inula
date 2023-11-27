
# 代码组织疑问

## 当前支持的用法

允许使用 hook useIR 和 异步的 ir.xxx 方法，如下代码都可正常运行

```ts
import ir, { useIR } from 'inula-request';
import { useState } from 'openinula';

const Page = () => {
  const [title, setTitle] = useState();
  const { data, error } = useIR('https://www.example.com');
  console.log(data);
  console.log(error);
  return (
    <div
      onClick={async () => {
        const { data } = await ir.get('/hello');
        setTitle(data?.text);
      }}
    >
      inula-request {title}
    </div>
  );
};

export default Page;
```

## 代码组织

项目开发经验上，习惯将如 `ir.get('/hello');` 封装到一个文件中，这样方便排查接口，和统一修改前缀，如 api.ts

```ts
import ir, { useIR } from 'inula-request';

export async function sayHi(params: Record<string, any>): Promise<any> {
  return ir.get('/hello', {
    params,
  });
}
```

> 为什么要这么做，因为通常 get 和 post 方法的传参方式不同，都封装完，在组件中，其实不在乎是 post 请求还是 get 请求。

如改成 post 

```ts
import ir, { useIR } from 'inula-request';

export async function sayHi(params: Record<string, any>): Promise<any> {
  return ir.post('/hello', params);
}
```

然后在项目中就是  `await sayHi(params)` 使用。

然后如果是同一个接口使用 useIR

```ts
useIR('/hello',{params})
```

写法上不太一致，

问：如果同一个接口，不确定(因为这部分代码可以是脚本根据接口文档生成的)是在 hooks 中用还是在异步中使用，那它的代码应该被组织在哪里，如何组织？

如果是 ahooks.useRequest 没有这个问题，传入的是 Promise，如：

```ts
import ir, { useIR } from 'inula-request';
import { useRequest } from 'ahooks';

export async function sayHi(params: Record<string, any>): Promise<any> {
  return ir.post('/hello', params);
}

useRequest(sayHi);
```