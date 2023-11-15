# @aluni/plugin-x


See our website [inula]() for more information.

[Inula-X](https://docs.openinula.net/apis/Inula-X/) 是集成在openinula框架中用于状态管理的库。它能集中式地存储、管理应用中所有组件的状态，并通过相应的规则(actions)保证状态(state)以可预测的方式发生变化。

## 使用方式

默认会将 src/stores 下的 store 定义自动挂载，你只需要在 stores 文件夹中新建文件即可新增一个 store 用来管理组件状态。详细的 store 写法和用法，请参考 [Inula-X](https://docs.openinula.net/apis/Inula-X/)  文档。

store 文件将会被自动挂为 `${store.id}Store` ，然后可以直接从 inula 中导出使用 import { helloStore } from 'inula'; 

> 注意 createStore 是 openinula 导出的功能，所以无法创建一个id 为 create 的 store

对于某个 pages 文件夹下面的 store 也会默认挂载

> 请注意使用约定式路由时你无法创建一个名为 /store 路径的页面

新建一个 store 文件，可以使用 inula g x storeName 快速创建模版文件，如 `npx inula g x hello`

```ts
import { createStore } from 'inula';

export default  createStore({
  id: 'hello',
  actions: {
  },
  state: {
    title: 'hello',
  },
});
```

一个比较简单的用例子，src/stores/hello.ts

```ts
import { createStore } from 'inula';

export default  createStore({
  id: 'hello',
  actions: {
    changeName: (state) => {
      state.title = 'openinula';
    },
  },
  state: {
    title: 'inulajs',
  },
});
```

在页面中使用 

```ts
import { helloStore } from 'inula';

const Page = () => {
  const store = helloStore();
  return (
    <div>
      hello {store.title}
      <button
        onClick={() => {
          store.changeName();
        }}
      >
        改名字啦
      </button>
    </div>
  );
};

export default Page;
```