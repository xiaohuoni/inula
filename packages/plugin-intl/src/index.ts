import { IApi, IAzureSend } from '@aluni/preset-inula';
import esbuild from '@umijs/bundler-utils/compiled/esbuild';
import {
  fsExtra,
  logger,
  Mustache,
  prompts,
  register,
  resolve,
  winPath,
} from '@umijs/utils';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { DefaultLangUConfigMap, LangCnLabel, TEMPLATES_DIR } from './constants';
import { getLocaleList, IGetLocaleFileListResult } from './localeUtils';
import { withTmpPath } from './withTmpPath';

export enum GeneratorType {
  generate = 'generate',
  enable = 'enable',
}

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
            // 默认的文件路径
            localeFolder: zod.string(),
          })
          .partial();
      },
      default: {
        default: 'zh-CN',
        localeFolder: 'locales',
      },
    },
  });
  const getList = async (): Promise<IGetLocaleFileListResult[]> => {
    const { paths } = api;
    return getLocaleList({
      localeFolder: 'locales',
      separator: api.config.intl?.baseSeparator,
      absSrcPath: paths.absSrcPath,
      absPagesPath: paths.absPagesPath,
    });
  };
  api.onGenerateFiles(async () => {
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
import { getPluginManager } from '../core/plugin';
import {IntlProvider} from '${intlPath}';
import { localeInfo, getLocale, event, LANG_CHANGE_EVENT  } from './localeExports';
import Inula from '${api.appData.openinula.path}';
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
      ? Inula.useLayoutEffect
      : Inula.useEffect
let cacheIntlConfig = null;

const getIntlConfig = () => {
  if(!cacheIntlConfig){
    cacheIntlConfig = getPluginManager().applyPlugins({
      key: 'modifyIntlData',
      type: '${api.ApplyPluginsType.modify}',
      initialValue: localeInfo,
    });
  }
  return cacheIntlConfig;
}

export function RootContainer(props: any) {
  
  const [locale,setLocale] = Inula.useState(getLocale());
  const messages = getIntlConfig();
  const handleLangChange = (locale:string) => {
    setLocale(locale);
  };

  useIsomorphicLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);
  return <IntlProvider locale={locale} messages={messages[locale]}>{props.children}</IntlProvider>;
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
    api.writeTmpFile({
      path: 'index.ts',
      content: `export { useIntl } from '${intlPath}';
export { addLocale, setLocale, getLocale, getAllLocales } from './localeExports';
`,
    });

    const localeExportsTpl = readFileSync(
      join(TEMPLATES_DIR, 'localeExports.tpl'),
      'utf-8',
    );
    const localeDirName = 'locales';
    const localeDirPath = join(api.paths!.absSrcPath!, localeDirName);
    const EventEmitterPkg = winPath(
      dirname(require.resolve('event-emitter/package')),
    );
    const defaultLocale = api.config.intl?.default || `zh-CN`;
    const localeList = await getList();
    const reactIntlPkgPath = winPath(
      dirname(require.resolve('inula-intl/package')),
    );
    api.writeTmpFile({
      path: 'localeExports.ts',
      content: Mustache.render(localeExportsTpl, {
        EventEmitterPkg,
        BaseSeparator: '-',
        BaseNavigator: true,
        UseLocalStorage: true,
        LocaleDir: localeDirName,
        ExistLocaleDir: existsSync(localeDirPath),
        LocaleList: localeList.map((locale) => ({
          ...locale,
          paths: locale.paths.map((path, index) => ({
            path,
            index,
          })),
        })),
        DefaultLocale: JSON.stringify(defaultLocale),
        reactIntlPkgPath,
      }),
    });
  });
  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, api.config?.intl.localeFolder)];
  });
  // 增加 api 供其他的插件使用
  api.registerMethod({ name: 'modifyIntlData' });
  let sendAi: IAzureSend;
  api.onIntlAzure(async ({ send }) => {
    sendAi = send;
  });
  api.registerGenerator({
    key: 'intl',
    name: 'Generate Intl',
    description: '新建一个 Intl 文件',
    type: GeneratorType.generate,
    fn: async ({ args }) => {
      const name = args?._?.[1];
      let defaultCode = `
      export default {
        'navBar.lang': '语言',
      };`;
      let defaultPath = name;
      if (args?.create) {
        logger.info('[试验性方案] 使用 aigc 自动翻译');
        const localeList = await getList();
        const defaultLocaleLang = api.config.intl?.default || `zh-CN`;
        // 把现在所有的语言记录下来
        const allLocales: string[] = [];
        const defaultLocale = localeList
          .map((local) => {
            allLocales.push(local.name ?? '');
            return local;
          })
          .filter((local) => local.name === defaultLocaleLang);
        if (!defaultLocale || defaultLocale.length === 0) {
          logger.error('未找到默认国际化语言文本，请检查配置');
          return;
        }

        register.register({
          implementor: esbuild,
          exts: ['.ts', '.mjs'],
        });
        register.clearFiles();
        let ret;
        try {
          ret = require(defaultLocale[0].paths[0]);
        } catch (e: any) {
          throw new Error(
            `Register ${defaultLocale[0].paths[0]} failed, since ${e.message}`,
            { cause: e },
          );
        } finally {
          register.restore();
        }
        // 找到翻译的所有文本
        const tfData = ret.__esModule ? ret.default : ret;
        // 找到可以翻译的语言
        const canUseLocale = Object.keys(DefaultLangUConfigMap).filter(
          (i) => !allLocales.includes(i),
        );
        const { gType } = await prompts({
          type: 'select',
          name: 'gType',
          message: 'Pick generator type',
          choices: canUseLocale.map((key) => {
            const item = DefaultLangUConfigMap[key];
            return {
              title: LangCnLabel[item.lang],
              value: item.lang,
            };
          }),
        });
        const msg = `请求 AIGC 对国际化文本进行翻译`;
        logger.profile(msg);
        const result = await sendAi(
          `请将以下代码中的所有中文替换成${
            LangCnLabel[gType]
          },无需任何解释，请直接返回修改后的代码。代码如下:${JSON.stringify(
            tfData,
          )}`,
        );
        logger.profile(msg);
        const content = result.choices[0]!.message?.content || '{}';
        if (content) {
          const regex = /{([^}]*)}/;
          // 加个保险，以防 AIGC 心情好加了文字说明
          // @ts-ignore
          const res = content?.match(regex)[0];
          defaultCode = `export default ${res}`;
          defaultPath = gType;
        }
      }
      const localesPath = join(
        api.paths.absSrcPath,
        api.config.intl.localeFolder,
      );
      fsExtra.outputFileSync(
        join(localesPath, `${defaultPath}.ts`),
        defaultCode,
      );
      logger.info('生成 intl 完成');
    },
  });
};
