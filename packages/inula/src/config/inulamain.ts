import { IApi } from '@aluni/preset-inula';

export default (api: IApi) => {
  api.modifyConfig((memo: any) => {
    memo.block = {
      defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
      npmClient: 'pnpm',
      closeFastGithub: true,
      homedir: false,
      useUI: true,
      ...memo.block,
    };
    // mock 增加
    memo.mock = {
      include: ['src/pages/**/_mock.ts'],
    };
    return memo;
  });
  // block 提供的 api
  // @ts-ignore
  api?._modifyBlockFile?.((memo) => {
    // TODO: block 生成 还有什么操作，都可以在这里处理
    return memo.replaceAll('request', 'ir');
  });
};
