import { IApi } from '@umijs/preset-umi';
import { dirname } from 'path';
import { resolveProjectDep } from '../utils/resolveProjectDep';

export default (api: IApi) => {
  const version = require('../../package.json').version;
  const inulaPath =
    resolveProjectDep({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: 'openinula',
    }) || dirname(require.resolve('openinula/package.json'));

  const configDefaults: Record<string, any> = {
    mfsu: false,
    // 开发使用而已，能力可以有 inula 提供 aigc
    azure: {
      apiVersion: '2023-07-01-preview',
      model: 'alita4',
      resource: 'alita',
    },
    ...api.userConfig,
  };

  api.modifyAppData((memo) => {
    memo.umi.name = 'Inula';
    memo.umi.importSource = 'inula';
    memo.umi.cliName = 'inula';
    memo.umi.version = version;
    memo.openinula ??= {};
    memo.openinula.path = inulaPath;
    memo.openinula.version = require('openinula/package.json').version;
    return memo;
  });
  api.modifyDefaultConfig((memo: any) => {
    Object.keys(configDefaults).forEach((key) => {
      if (key === 'alias') {
        memo[key] = { ...memo[key], ...configDefaults[key] };
      } else {
        memo[key] = configDefaults[key];
      }
    });
    memo.alias.inula = '@@/exports';
    memo.alias.openinula = inulaPath;
    memo.alias.react = inulaPath;
    memo.alias.openinula = inulaPath;
    memo.alias['react-dom'] = inulaPath;
    // react-dom/client 顺序要在 react-dom 之前
    if (memo.alias['react-dom/client']) {
      memo.alias['react-dom/client'] = inulaPath;
    } else {
      memo.alias = {
        'react-dom/client': inulaPath,
        ...memo.alias,
      };
    }
    // umi4 开发环境不允许配置为 './'
    if (process.env.NODE_ENV === 'development' && memo.publicPath === './') {
      console.warn('开发环境不允许配置为 "./"');
      memo.publicPath = '/';
    }
    return memo;
  });

  api.modifyBabelPresetOpts((memo) => {
    memo.presetReact = {
      runtime: 'automatic',
      importSource: 'openinula', // 新增
    };
    return memo;
  });
};
