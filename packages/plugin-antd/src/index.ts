import { IApi } from '@aluni/types';
import { resolve } from '@umijs/utils';
import { dirname } from 'path';

export function resolveProjectDep(opts: {
  pkg: any;
  cwd: string;
  dep: string;
}) {
  if (
    opts.pkg.dependencies?.[opts.dep] ||
    opts.pkg.devDependencies?.[opts.dep]
  ) {
    return dirname(
      resolve.sync(`${opts.dep}/package.json`, {
        basedir: opts.cwd,
      }),
    );
  }
}

export default (api: IApi) => {
  let antdPath: string;
  let iconsPath: string;
  let emotionPath: string;
  try {
    antdPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'antd',
      }) || dirname(require.resolve('antd/package.json'));
    iconsPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: '@ant-design/icons',
      }) || dirname(require.resolve('@ant-design/icons/package.json'));
    emotionPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: '@emotion/css',
      }) || dirname(require.resolve('@emotion/css/package.json'));
  } catch (e) {}

  api.describe({
    key: 'antd',
    config: {
      schema({ zod }) {
        return zod.object({}).deepPartial();
      },
    },
    enableBy({ userConfig }) {
      // 由于本插件有 api.modifyConfig 的调用，以及 Umi 框架的限制
      // 在其他插件中通过 api.modifyDefaultConfig 设置 antd 并不能让 api.modifyConfig 生效
      // 所以这里通过环境变量来判断是否启用
      return process.env.UMI_PLUGIN_ANTD_ENABLE || userConfig.antd;
    },
  });

  api.modifyAppData((memo) => {
    const version = require(`${antdPath}/package.json`).version;
    memo.antd = {
      antdPath,
      version,
    };
    return memo;
  });

  api.modifyTSConfig((memo) => {
    memo.compilerOptions.paths.antd = [antdPath];
    memo.compilerOptions.paths['@ant-design/icons'] = [iconsPath];
    memo.compilerOptions.paths['@emotion/css'] = [emotionPath];
    memo.compilerOptions.paths['inula/antd'] = [antdPath];
    return memo;
  });

  api.modifyConfig((memo) => {
    memo.alias.antd = antdPath;
    memo.alias['@ant-design/icons'] = iconsPath;
    memo.alias['@emotion/css'] = emotionPath;
    memo.alias = {
      'inula/antd': antdPath,
      ...memo.alias,
    };
    return memo;
  });

  api.onGenerateFiles(() => {});
};
