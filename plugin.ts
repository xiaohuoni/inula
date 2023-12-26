import { IApi } from '@aluni/types';
import { winPath } from '@umijs/utils';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export default (api: IApi) => {
  api.onStart(() => {
    // 修复当配置 base 时， @umijs/plugin-docs 首页判断 bug
    const layoutPath = winPath(
      join(
        dirname(require.resolve('@umijs/plugin-docs')),
        '..',
        'client/theme-doc/Layout.tsx',
      ),
    );
    // window.location.pathname === '/'
    let context = readFileSync(layoutPath, 'utf-8');
    context = context.replace(
      "window.location.pathname === '/'",
      `window.location.pathname === '${api.config.base ?? '/'}'`,
    );
    writeFileSync(layoutPath, context, 'utf-8');
  });
  api.onBuildComplete(({ err }) => {
    //@ts-ignore
    if (!err && !existsSync(join(api.paths.absOutputPath!, '404.html'))) {
      // 如果没有 404 则复制一下 index
      setTimeout(() => {
        copyFileSync(
          join(api.paths.absOutputPath!, 'index.html'),
          join(api.paths.absOutputPath!, '404.html'),
        );
      }, 500);
    }
  });
  api.onGenerateFiles((args) => {
    api.writeTmpFile({
      path: 'index.ts',
      content: `export { FeatureIItem } from '${join(
        api.cwd,
        'docs',
        'components',
        'Item',
      )}'`,
    });
  });
};
