export default {
  analytics: {
    ga: "G-ET6VJN7XQ8",
    baidu: "5a66c03cb0ae986f876184554f2b9e13",
  },
  plugins: ["@umijs/plugin-docs", "@umijs/plugins/dist/analytics"],
  favicons: ["/logo.png"],
  mfsu: false,
  conventionRoutes: {
    exclude: [/\/components\//],
  },
  styles: [`.py-36 { padding-bottom: 0rem !important; }`],
  // TODO: ??? 为什么 esbuild 压缩会报错？？？
  jsMinifier: "terser",
};