import { IApi } from '@aluni/types';
import { fsExtra, resolve } from '@umijs/utils';
import { existsSync, writeFileSync } from 'fs';
import { dirname } from 'path';
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
  const defaultTmpPath = withTmpPath({ api, path: 'Layout.tsx' });
  api.describe({
    key: 'proLayout',
    config: {
      schema({ zod }) {
        return zod
          .object({
            // 可以把文件写到项目中
            tmpPath: zod.string(),
            // 当 layout 文件存在时，不更新，用户可以保留自己的修改
            reWriteTmp: zod.boolean(),
          })
          .deepPartial();
      },
      default: {
        tmpPath: defaultTmpPath,
        reWriteTmp: true,
      },
    },
    enableBy({ userConfig }) {
      // 使用这个插件的，必须开启 antd 插件
      return userConfig.antd && userConfig.proLayout;
    },
  });
  api.addRuntimePluginKey(() => ['proLayout']);

  let pkgPath: string;
  try {
    pkgPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: '@ant-design/pro-components',
      }) || dirname(require.resolve('@ant-design/pro-components/package.json'));
  } catch (e) {}

  api.modifyTSConfig((memo) => {
    memo.compilerOptions.paths['@ant-design/pro-components'] = [pkgPath];
    return memo;
  });

  api.modifyConfig((memo) => {
    memo.alias['@ant-design/pro-components'] = pkgPath;
    return memo;
  });

  api.onGenerateFiles(() => {
    const tmpPath = api.config.proLayout.tmpPath || defaultTmpPath;
    if (api.config.proLayout.reWriteTmp === false && existsSync(tmpPath)) {
      return;
    }
    fsExtra.mkdirpSync(dirname(tmpPath));
    writeFileSync(
      tmpPath,
      `import { getPluginManager } from '@@/core/plugin';
    import type { ProSettings } from '@ant-design/pro-components';
    import {
      PageContainer as _PageContainer,
      ProCard as _ProCard,
      ProConfigProvider as _ProConfigProvider,
      ProLayout as _ProLayout,
      SettingDrawer,
    } from '@ant-design/pro-components';
    import { ConfigProvider as _ConfigProvider } from 'antd';
    import { Fragment, useLocation, useOutlet, useState } from 'inula';
    
    export default () => {
      const proConfig = getPluginManager().applyPlugins({
        key: 'proLayout',
        type: 'modify',
        initialValue: {},
      });
      const {
        proConfigProvider,
        configProvider,
        root = {
          id: 'inula-pro-layout',
          style: {
            height: '100vh',
            overflow: 'auto',
          },
        },
        proLayout,
        pageContainer,
        proCard,
        settingDrawer = {
          layout: 'top',
        },
      } = proConfig;
      const ProConfigProvider = !!proConfigProvider ? _ProConfigProvider : Fragment;
      const ConfigProvider = !!configProvider ? _ConfigProvider : Fragment;
      const ProLayout = !!proLayout ? _ProLayout : Fragment;
      const PageContainer = !!pageContainer ? _PageContainer : Fragment;
      const ProCard = !!proCard ? _ProCard : Fragment;
      const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
        settingDrawer,
      );
      const outlet = useOutlet();
      const location = useLocation();
      const { pathname } = location;
      if (typeof document === 'undefined') {
        return <div />;
      }
      return (
        <div {...root}>
          <ProConfigProvider {...(proConfigProvider || {})}>
            <ConfigProvider {...(configProvider || {})}>
              <ProLayout
                location={{
                  pathname,
                }}
                {...settings}
                {...(proLayout || {})}
              >
                <PageContainer {...(pageContainer || {})}>
                  <ProCard {...(proCard || {})}>{outlet}</ProCard>
                </PageContainer>
                <SettingDrawer
                  pathname={pathname}
                  enableDarkTheme
                  hideHintAlert
                  getContainer={(e: any) => {
                    if (typeof window === 'undefined') return e;
                    return document.getElementById('inula-pro-layout');
                  }}
                  settings={settings}
                  onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                  }}
                  disableUrlParams={false}
                />
              </ProLayout>
            </ConfigProvider>
          </ProConfigProvider>
        </div>
      );
    };
    `,
      'utf-8',
    );
  });
  api.addLayouts(() => {
    return [
      {
        id: 'ant-design-pro-layout',
        file: api.config.proLayout.tmpPath || defaultTmpPath,
      },
    ];
  });
};
