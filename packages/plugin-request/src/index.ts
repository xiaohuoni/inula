import type { IApi } from '@aluni/types';
import { resolve, winPath } from '@umijs/utils';
import { dirname } from 'path';
import { withTmpPath } from './withTmpPath';

export default (api: IApi) => {
  api.describe({
    key: 'request',
    config: {
      schema(zod) {
        return zod.object();
      },
    },
  });
  api.addRuntimePluginKey(() => ['request']);

  // only dev or build running
  if (!['dev', 'build', 'dev-config', 'preview', 'setup'].includes(api.name))
    return;

  api.onGenerateFiles(() => {
    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import { getPluginManager } from '../core/plugin';
import ir from '${winPath(dirname(require.resolve('inula-request/package')))}'

export function rootContainer(container) {
  const irconfig = getPluginManager().applyPlugins({ key: 'request',type: 'modify', initialValue: {} });
  Object.keys(irconfig).forEach(key=>{
    // TODO: inula-request 的怪异传参方式
    ir.defaults[key] = irconfig[key];
  })
  return container;
}
`,
    });
    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
        export { default as ir, useIR } from '${winPath(
          dirname(require.resolve('inula-request/package')),
        )}';
        export { useRequest } from '${winPath(
          dirname(require.resolve('ahooks/package')),
        )}';
      `,
    });

    // types.ts
    api.writeTmpFile({
      path: 'types.d.ts',
      tpl: `export { IrRequestConfig } from '${winPath(
        dirname(require.resolve('inula-request/package')),
      )}';`,
      context: {},
    });
  });
  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });

  api.chainWebpack((memo) => {
    function getUserLibDir({ library }: { library: string }) {
      if (
        // @ts-ignore
        (api.pkg.dependencies && api.pkg.dependencies[library]) ||
        // @ts-ignore
        (api.pkg.devDependencies && api.pkg.devDependencies[library]) ||
        // egg project using `clientDependencies` in ali tnpm
        // @ts-ignore
        (api.pkg.clientDependencies && api.pkg.clientDependencies[library])
      ) {
        return winPath(
          dirname(
            // 通过 resolve 往上找，可支持 lerna 仓库
            // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
            resolve.sync(`${library}/package.json`, {
              basedir: api.paths.cwd,
            }),
          ),
        );
      }
      return null;
    }
    // 用户也可以通过显示安装 antd-mobile-v2，升级版本
    memo.resolve.alias.set(
      'ahooks',
      getUserLibDir({ library: 'ahooks' }) ||
        dirname(require.resolve('ahooks/package.json')),
    );

    return memo;
  });
};
