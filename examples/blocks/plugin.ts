import { IApi } from 'inula';

export default (api: IApi) => {
  api?._modifyBlockFile?.((memo) => {
    // TODO: 还有什么操作，都可以在这里处理
    return memo.replaceAll('request', 'ir');
  });
};
