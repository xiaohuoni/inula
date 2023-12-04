import { Service as CoreService } from '@umijs/core';
import { existsSync } from 'fs';
import { dirname, isAbsolute, join } from 'path';
import * as process from 'process';
import { DEFAULT_CONFIG_FILES, FRAMEWORK_NAME } from './constants';

export class Service extends CoreService {
  constructor(opts?: any) {
    process.env.UMI_DIR = dirname(require.resolve('../package'));

    let cwd = process.cwd();
    const appRoot = process.env.APP_ROOT;

    if (appRoot) {
      cwd = isAbsolute(appRoot) ? appRoot : join(cwd, appRoot);
    }

    super({
      ...opts,
      env: process.env.NODE_ENV,
      cwd,
      defaultConfigFiles: DEFAULT_CONFIG_FILES,
      frameworkName: FRAMEWORK_NAME,
      presets: [require.resolve('@aluni/preset-inula')],
      plugins: [
        require.resolve('./commands/format'),
        existsSync(join(cwd, 'plugin.ts')) && join(cwd, 'plugin.ts'),
        existsSync(join(cwd, 'plugin.js')) && join(cwd, 'plugin.js'),
      ].filter(Boolean),
    });
  }

  async run2(opts: { name: string; args?: any }) {
    let name = opts.name;
    if (opts?.args.version || name === 'v') {
      name = 'version';
    } else if (opts?.args.help || !name || name === 'h') {
      name = 'help';
    }

    return await this.run({ ...opts, name });
  }
}
