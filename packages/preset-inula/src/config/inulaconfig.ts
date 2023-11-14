import { IApi } from '@umijs/preset-umi';

export default (api: IApi) => {
  const version = require('../../package.json').version;
  const configDefaults: Record<string, any> = {
    mfsu: false,
    ...api.userConfig,
  };

  api.modifyAppData((memo) => {
    memo.umi.name = 'Inula';
    memo.umi.importSource = 'inula';
    memo.umi.cliName = 'inula';
    memo.umi.version = version;
    return memo;
  });
  api.modifyConfig((memo: any) => {
    memo.alias.inula = 'umi';
    Object.keys(configDefaults).forEach((key) => {
      if (key === 'alias') {
        memo[key] = { ...memo[key], ...configDefaults[key] };
      } else {
        memo[key] = configDefaults[key];
      }
    });
    // umi4 开发环境不允许配置为 './'
    if (process.env.NODE_ENV === 'development' && memo.publicPath === './') {
      console.warn('开发环境不允许配置为 "./"');
      memo.publicPath = '/';
    }
    return memo;
  });
};
