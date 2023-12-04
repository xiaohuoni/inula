export * from '@aluni/types';

export default () => {
  return {
    plugins: [
      // registerMethods
      require.resolve('@umijs/preset-umi/dist/registerMethods'),

      require.resolve('@umijs/preset-umi/dist/features/404/404'),
      require.resolve('@umijs/preset-umi/dist/features/appData/appData'),
      require.resolve('@umijs/preset-umi/dist/features/appData/umiInfo'),
      require.resolve('@umijs/preset-umi/dist/features/check/check'),
      require.resolve('@umijs/preset-umi/dist/features/check/babel722'),
      require.resolve(
        '@umijs/preset-umi/dist/features/codeSplitting/codeSplitting',
      ),
      require.resolve(
        '@umijs/preset-umi/dist/features/configPlugins/configPlugins',
      ),
      require.resolve(
        '@umijs/preset-umi/dist/features/crossorigin/crossorigin',
      ),
      require.resolve(
        '@umijs/preset-umi/dist/features/depsOnDemand/depsOnDemand',
      ),
      require.resolve('@umijs/preset-umi/dist/features/devTool/devTool'),
      require.resolve(
        '@umijs/preset-umi/dist/features/esbuildHelperChecker/esbuildHelperChecker',
      ),
      require.resolve('@umijs/preset-umi/dist/features/esmi/esmi'),
      require.resolve(
        '@umijs/preset-umi/dist/features/exportStatic/exportStatic',
      ),
      require.resolve('@umijs/preset-umi/dist/features/favicons/favicons'),
      require.resolve('@umijs/preset-umi/dist/features/helmet/helmet'),
      require.resolve('@umijs/preset-umi/dist/features/icons/icons'),
      require.resolve('@umijs/preset-umi/dist/features/mock/mock'),
      require.resolve('@umijs/preset-umi/dist/features/mpa/mpa'),
      require.resolve('@umijs/preset-umi/dist/features/okam/okam'),
      require.resolve('@umijs/preset-umi/dist/features/overrides/overrides'),
      require.resolve(
        '@umijs/preset-umi/dist/features/phantomDependency/phantomDependency',
      ),
      require.resolve('@umijs/preset-umi/dist/features/polyfill/polyfill'),
      require.resolve(
        '@umijs/preset-umi/dist/features/polyfill/publicPathPolyfill',
      ),
      require.resolve('@umijs/preset-umi/dist/features/prepare/prepare'),
      require.resolve(
        '@umijs/preset-umi/dist/features/routePrefetch/routePrefetch',
      ),
      require.resolve('@umijs/preset-umi/dist/features/terminal/terminal'),

      // 1. generate tmp files
      // @umijs/preset-umi/dist/features/tmpFiles/tmpFiles 使用 umi 形成循环依赖
      // require.resolve('@umijs/preset-umi/dist/features/tmpFiles/tmpFiles'),
      require.resolve('./features/tmpFiles'),

      // 2. `clientLoader` and `routeProps` depends on `tmpFiles` files
      require.resolve(
        '@umijs/preset-umi/dist/features/clientLoader/clientLoader',
      ),
      require.resolve('@umijs/preset-umi/dist/features/routeProps/routeProps'),
      // 3. `ssr` needs to be run last
      require.resolve('@umijs/preset-umi/dist/features/ssr/ssr'),

      require.resolve('@umijs/preset-umi/dist/features/tmpFiles/configTypes'),
      require.resolve('@umijs/preset-umi/dist/features/transform/transform'),
      require.resolve('@umijs/preset-umi/dist/features/lowImport/lowImport'),
      require.resolve('@umijs/preset-umi/dist/features/vite/vite'),
      require.resolve('@umijs/preset-umi/dist/features/apiRoute/apiRoute'),
      require.resolve('@umijs/preset-umi/dist/features/monorepo/redirect'),
      require.resolve('@umijs/preset-umi/dist/features/test/test'),
      require.resolve(
        '@umijs/preset-umi/dist/features/clickToComponent/clickToComponent',
      ),
      require.resolve('@umijs/preset-umi/dist/features/legacy/legacy'),
      require.resolve(
        '@umijs/preset-umi/dist/features/classPropertiesLoose/classPropertiesLoose',
      ),
      require.resolve('@umijs/preset-umi/dist/features/webpack/webpack'),
      require.resolve('@umijs/preset-umi/dist/features/swc/swc'),
      require.resolve('@umijs/preset-umi/dist/features/ui/ui'),
      require.resolve(
        '@umijs/preset-umi/dist/features/hmrGuardian/hmrGuardian',
      ),

      // commands
      // require.resolve('@umijs/preset-umi/dist/commands/build'),
      require.resolve('./commands/build'),
      require.resolve('@umijs/preset-umi/dist/commands/config/config'),
      // require.resolve('@umijs/preset-umi/dist/commands/dev/dev'),
      require.resolve('./commands/dev'),
      require.resolve('@umijs/preset-umi/dist/commands/help'),
      require.resolve('@umijs/preset-umi/dist/commands/lint'),
      require.resolve('@umijs/preset-umi/dist/commands/setup'),
      require.resolve('@umijs/preset-umi/dist/commands/deadcode'),
      // require.resolve('@umijs/preset-umi/dist/commands/version'),
      require.resolve('./commands/version'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/page'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/prettier'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/tsconfig'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/jest'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/tailwindcss'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/dva'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/component'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/mock'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/cypress'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/api'),
      // require.resolve('@umijs/preset-umi/dist/commands/generators/precommit'),
      require.resolve('@umijs/preset-umi/dist/commands/plugin'),
      require.resolve('@umijs/preset-umi/dist/commands/verify-commit'),
      require.resolve('@umijs/preset-umi/dist/commands/preview'),
      // require.resolve('@umijs/preset-umi/dist/commands/mfsu/mfsu'),
      // require.resolve('@umijs/plugin-run'),
      require.resolve('@alita/plugin-azure'),
      require.resolve('./config/inulaconfig'),
      require.resolve('./features/iloading'),

      // business
      // 国际化插件要在前面，因为它提供了 api 供 antd 插件使用
      require.resolve('@aluni/plugin-intl'),
      require.resolve('@aluni/plugin-antd'),
      require.resolve('@aluni/plugin-antd-layout'),
      require.resolve('@aluni/plugin-request'),
      require.resolve('@aluni/plugin-x'),
      require.resolve('@aluni/plugin-openapi'),
    ].filter(Boolean),
  };
};
