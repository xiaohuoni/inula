import { IApi } from '@aluni/preset-inula';
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
  let pkgPath: string;
  try {
    pkgPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'antd',
      }) || dirname(require.resolve('antd/package.json'));
  } catch (e) {}

  api.describe({
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
    const version = require(`${pkgPath}/package.json`).version;
    memo.antd = {
      pkgPath,
      version,
    };
    return memo;
  });

  api.modifyConfig((memo) => {
    // antd import
    memo.alias.antd = pkgPath;
    memo.alias[`${api.appData.framework}/antd`] = pkgPath;
    return memo;
  });

  api.onGenerateFiles(() => {});
};
