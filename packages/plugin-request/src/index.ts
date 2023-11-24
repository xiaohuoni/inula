import type { IApi } from '@aluni/preset-inula';
import { winPath } from '@umijs/utils';
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
};
