import { BaseGenerator, installWithNpmClient, yParser } from '@umijs/utils';
import { join } from 'path';

export default async ({ cwd }: { cwd: string; args: yParser.Arguments }) => {
  const generator = new BaseGenerator({
    path: join(__dirname, '..', 'templates', 'inula-antd-pro'),
    target: cwd,
    data: {
      version: '3.3.4',
    },
  });
  await generator.run();
  installWithNpmClient({ npmClient: 'pnpm' });
};
