export default {
  plugins: ['@umijs/plugin-docs'],
  mfsu: false,
  conventionRoutes: {
    exclude: [/\/components\//],
  },
  azure: false,
  styles: [`.py-36 { padding-bottom: 0rem !important; }`],
  // TODO: ??? 为什么 esbuild 压缩会报错？？？
  jsMinifier: 'terser',
  // 等后续升级 gitee page pro 需要移除这些配置
  publicPath: process.env.NODE_ENV === 'production' ? '/inula/' : '/',
  base: process.env.NODE_ENV === 'production' ? './inula/' : '/',
};
