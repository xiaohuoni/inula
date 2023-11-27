import { defineConfig } from 'inula';
import { join } from 'path';
export default defineConfig({
  title: 'pro-layout',
  antd: {},
  proLayout: {
    tmpPath: join(__dirname, 'src', 'layouts', 'Layout.tsx'),
    reWriteTmp: false,
  },
  // TODO: ??? 为什么 esbuild 压缩会报错？？？
  jsMinifier: 'terser',
});
