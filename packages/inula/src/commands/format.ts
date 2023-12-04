import { IApi } from '@aluni/preset-inula';
import { logger } from '@umijs/utils';
import { sync } from '@umijs/utils/compiled/cross-spawn';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
const CONFIG_FILES = ['.prettierrc', '.prettierrc.js'];

function getConfigFiles(p: string): string[] | undefined {
  return CONFIG_FILES.filter((f) => existsSync(join(p, f)));
}

export default (api: IApi) => {
  api.registerCommand({
    name: 'format',
    alias: 'prettier',
    description: 'prettier --write .',
    configResolveMode: 'loose',
    fn({ args }) {
      let defaultPrettierConfig = join(__dirname, '..', '..', 'prettier.js');
      const configFiles = getConfigFiles(api.paths.absSrcPath);
      if (configFiles && configFiles[0]) {
        defaultPrettierConfig = configFiles[0];
      }
      logger.info(`prettier config`, defaultPrettierConfig);
      const prettier = join(
        dirname(require.resolve('prettier/package.json')),
        'bin-prettier',
      );
      const spawn = sync(
        'node',
        [
          prettier,
          `--config ${defaultPrettierConfig}`,
          `--write ${api.cwd}`,
          ...args._,
        ],
        {
          env: process.env,
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
      );

      if (spawn.status !== 0) {
        console.log(`prettier-scripts run fail`);
      }
    },
  });
};
