import { IApi } from '@aluni/types';
import { BaseGenerator, installWithNpmClient, prompts } from '@umijs/utils';
import { join } from 'path';

export default (api: IApi) => {
  api.describe({
    key: 'init',
    config: {
      schema({ zod }) {
        return zod.object({}).partial();
      },
    },
  });

  api.registerCommand({
    name: 'init',
    description: '初始化项目',
    fn: async ({ args }) => {
      const cwd = api.cwd;
      const [name] = args._;
      console.log('初始化项目', name);
      let npmClient = 'pnpm' as any;
      let registry = 'https://registry.npmjs.org/';
      // test ignore prompts
      if (!args.default) {
        const response = await prompts([
          {
            type: 'select',
            name: 'npmClient',
            message: 'Pick Npm Client',
            choices: [
              { title: 'npm', value: 'npm' },
              { title: 'cnpm', value: 'cnpm' },
              { title: 'tnpm', value: 'tnpm' },
              { title: 'yarn', value: 'yarn' },
              { title: 'pnpm', value: 'pnpm', selected: true },
            ],
          },
          {
            type: 'select',
            name: 'registry',
            message: 'Pick Bpm Registry',
            choices: [
              {
                title: 'npm',
                value: 'https://registry.npmjs.org/',
                selected: true,
              },
              { title: 'taobao', value: 'https://registry.npmmirror.com' },
            ],
          },
        ]);
        npmClient = response.npmClient;
        registry = response.registry;
      }

      const generator = new BaseGenerator({
        path: join(__dirname, '..', 'templates', 'app'),
        target: name ? join(cwd, name) : cwd,
        data: {
          version: require('../package').version,
          npmClient,
          registry,
        },
      });
      await generator.run();

      if (!args.default) {
        // install
        installWithNpmClient({ npmClient, cwd: name ? join(cwd, name) : cwd });
      }
    },
  });
};
