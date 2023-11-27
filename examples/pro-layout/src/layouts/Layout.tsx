import { getPluginManager } from '@@/core/plugin';
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
              <ProCard {...(proCard || {})}>12123{outlet}</ProCard>
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
