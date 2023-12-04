import { IrRequestConfig } from 'inula';

export const request: IrRequestConfig = {
  baseURL: '',
  headers: {
    inula: 'haha',
  },
};

export const proLayout = {
  proLayout: {
    title: 'openinula',
    logo: '/favicon.ico',
  },
  proCard: {
    style: {
      height: '200vh',
      minHeight: 800,
    },
  },
  settingDrawer: {
    fixSiderbar: false,
    layout: 'top',
    splitMenus: false,
  },
};
