import { IApi } from '@aluni/preset-inula';
import { fsExtra, logger } from '@umijs/utils';
import { join } from 'path';
import { StoreUtils } from './storesUtils';

export enum GeneratorType {
  generate = 'generate',
  enable = 'enable',
}

export default (api: IApi) => {
  api.describe({
    key: 'stores',
    config: {
      schema({ zod }) {
        return zod.boolean();
      },
    },
  });

  api.modifyAppData((memo) => {
    const stores = getAllStores(api);
    memo.pluginX = {
      stores,
    };
    return memo;
  });

  api.onGenerateFiles((args) => {
    const stores = args.isFirstTime
      ? api.appData.pluginX.stores
      : getAllStores(api);
    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: StoreUtils.getStoresContent(stores),
    });
  });
  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, 'stores')];
  });

  api.registerGenerator({
    key: 'x',
    name: 'Enable Store',
    description: '新建一个 Store',
    type: GeneratorType.generate,
    fn: async ({ args }) => {
      const name = args?._?.[1];
      const storesPath = join(api.paths.absSrcPath, 'stores');
      fsExtra.outputFileSync(
        join(storesPath, `${name}.ts`),
        `
import { createStore } from '${api.appData.umi.importSource}';

export default  createStore({
  id: '${name}',
  actions: {
  },
  state: {
    title: '${name}',
  },
});`,
      );
      logger.info('生成 store 完成');
    },
  });
};

function getStoreUtil(api: IApi | null) {
  return new StoreUtils(api);
}

function getAllStores(api: IApi) {
  return getStoreUtil(api).getAllStores({
    extraStores: [],
  });
}
