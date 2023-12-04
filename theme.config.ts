// @ts-ignore
import InulaLogo from './logo.png';

export default {
  title: 'Inula',
  description: '关注业务需求，以开发体验为主，集成 openInula 全生态',
  logo: InulaLogo,
  github: 'https://gitee.com/congxiaochen/inula',
  searchHotKey: {
    macos: '⌘+k',
    windows: 'ctrl+k',
  },
  navs: [
    {
      path: '/docs',
      title: '文档',
      type: 'nav',
      children: [
        {
          title: '快速开始',
          children: ['getting-started'],
        },
        {
          title: '目录结构',
          children: ['directory-structure'],
        },
        {
          title: '配置',
          children: ['config'],
        },
        {
          title: '插件集成',
          children: [
            'x',
            'request',
            'intl',
            'antd',
            'pro-layout',
            'openapi',
            'aigc',
          ],
        },
      ],
    },
    {
      title: 'openInula',
      type: 'link',
      path: 'https://openinula.net/',
    },
  ],
};
