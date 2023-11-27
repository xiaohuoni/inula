import { defineConfig } from 'inula';

export default defineConfig({
  title: 'antd',
  antd: {},
  // TODO: ??? 为什么 esbuild 压缩会报错？？？
  jsMinifier: 'terser',
  plugins: [require.resolve('@aluni/plugin-antd')],
});
