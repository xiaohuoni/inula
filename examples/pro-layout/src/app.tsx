import _defaultProps from '@/layouts/_defaultProps';
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { history } from 'inula';

export const proLayout = {
  root: {
    id: 'inula-pro-layout',
    style: {
      height: '100vh',
      overflow: 'auto',
    },
  },
  proConfigProvider: {
    hashed: false,
  },
  configProvider: {
    getTargetContainer: () => {
      return document.getElementById('inula-pro-layout') || document.body;
    },
  },
  proLayout: {
    title: 'openinula',
    logo: '/favicon.ico',
    token: {
      header: {
        colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
      },
    },

    avatarProps: {
      src: '/favicon.ico',
      size: 'small',
      title: 'inula',
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    actionsRender: (props) => {
      return [
        <InfoCircleFilled key="InfoCircleFilled" />,
        <QuestionCircleFilled key="QuestionCircleFilled" />,
        <GithubFilled key="GithubFilled" />,
      ];
    },
    menuFooterRender: (props) => {
      if (props?.collapsed) return undefined;
      return (
        <div
          style={{
            textAlign: 'center',
            paddingBlockStart: 12,
          }}
        >
          <div>© 2023</div>
          <div>by xiaohuoni</div>
        </div>
      );
    },
    onMenuHeaderClick: (e) => console.log(e),
    menuItemRender: (item, dom) => (
      <div
        onClick={() => {
          if (!item.path.startsWith('http')) {
            history.push(item.path || '/');
          }
        }}
      >
        {dom}
      </div>
    ),
    ..._defaultProps,
  },
  pageContainer: {
    footer: [
      <Button key="3">重置</Button>,
      <Button key="2" type="primary">
        提交
      </Button>,
    ],
  },
  proCard: {
    style: {
      height: '200vh',
      minHeight: 800,
    },
  },
  settingDrawer: {
    fixSiderbar: false,
    layout: 'top',
    splitMenus: false,
  },
};
