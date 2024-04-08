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
};
