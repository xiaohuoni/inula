import { IApi } from '@umijs/preset-umi';

export default (api: IApi) => {
  api.registerCommand({
    name: 'version',
    alias: 'v',
    description: 'show inula version',
    configResolveMode: 'loose',
    fn({ args }) {
      const version = require('../../package.json').version;
      if (!args.quiet) {
        console.log(`inula@${version}`);
      }
      return version;
    },
  });
};
