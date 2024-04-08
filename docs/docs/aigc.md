# AIGC


## 配置

配置中需要提供三个变量

```ts
import { defineConfig } from 'inula';

export default defineConfig({
  azure: {
    apiVersion: '2023-07-01-preview',
    model: 'alita4',
    resource: 'alita',
  },
});
```

环境变量中必须提供 AZURE_OPENAI_API_KEY

如 `.env.local` 中

```sh
AZURE_OPENAI_API_KEY=azureee754027ac362ec351d6bd93
```

## 使用 

### 项目中使用 

从 alita 中导出 sendOpenAI 和 openai

```tsx
import { sendOpenAI, openai } from 'alita';
import { useState } from 'react';

export default () => {
  const [message, setMessage] = useState<string | null>();
  return (
    <>
      {message}
      <button
        onClick={async () => {
          const result = await sendOpenAI('你好');
          setMessage(result.choices[0]!.message?.content);
        }}
      >
        点我向 GPT 打招呼
      </button>
    </>
  );
};
```

### 命令 why

当服务异常退出时，可以使用 why 命令，尝试查询一下原因

