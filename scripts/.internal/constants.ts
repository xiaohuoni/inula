import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  EXAMPLES: join(ROOT, './examples'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
  JEST_TURBO_CONFIG: join(ROOT, './jest.turbo.config.ts'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: 'inula-scripts bundleDeps',
  DEV: 'inula-scripts father dev',
  BUILD: 'inula-scripts father build',
  TEST_TURBO: 'inula-scripts jest-turbo',
} as const;
