import { ChromeFilled, CrownFilled, SmileFilled } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <SmileFilled />,
      },
      {
        path: '/test',
        name: '测试页面',
        icon: <CrownFilled />,
      },
      {
        path: 'https://openinula.net/',
        name: 'OpenInula 官网外链',
        icon: <ChromeFilled />,
      },
    ],
  },
  appList: [
    {
      icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
      title: 'umi',
      desc: '插件化的企业级前端应用框架。',
      url: 'https://umijs.org/zh-CN/docs',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
      title: 'dumi',
      desc: '为组件开发场景而生的文档工具',
      url: 'https://d.umijs.org/zh-CN',
    },
  ],
};
