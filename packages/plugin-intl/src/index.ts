import { IApi } from '@aluni/preset-inula';
import { resolve } from '@umijs/utils';
import { dirname, join } from 'path';
import { withTmpPath } from './withTmpPath';

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
  api.describe({
    key: 'intl',
    config: {
      schema({ zod }) {
        return zod
          .object({
            // 默认的 语言
            default: zod.string(),
            // 默认
            localeFolder: zod.string(),
          })
          .partial();
      },
      default: {
        default: 'zh-ch',
        localeFolder: 'locales',
      },
    },
  });

  api.onGenerateFiles(() => {
    const intlPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'inula-intl',
      }) || dirname(require.resolve('inula-intl/package.json'));
    // intl.tsx
    api.writeTmpFile({
      path: 'intl.tsx',
      tpl: `
    // inula-intl
    import {IntlProvider} from '${intlPath}';
    export function RootContainer(props: any) {
      const locale = 'en';
  const messages = {
    en: {
      greeting: 'Hello, {name}!',
      today: 'Today is {date}',
      amount: 'Amount: {value, number}',
    },
    fr: {
      greeting: 'Bonjour, {name} !',
      today: "Aujourd'hui, c'est le {date}",
      amount: 'Montant : {value, number}',
    },
  };
      // return <IntlProvider locale={locale} messages={messages[locale]}>{props.children}</IntlProvider>;
      return <>{props.children}</>;
    }
          `,
      context: {},
    });
    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import { RootContainer } from './intl';

export function i18nProvider(container, opts) {
return React.createElement(RootContainer, opts, container);
}
    `,
    });
    // index.ts for export
    // api.writeTmpFile({
    //   path: 'index.ts',
    //   content: '123',
    // });
  });
  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, api.config?.intl.localeFolder)];
  });
};
