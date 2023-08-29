import { chalk, logger } from '@umijs/utils';
// @ts-ignore
import pkg from '../package.json';
// TODO: preser 应该独立出去
export default (api: any) => {
  api.onStart(() => {
    logger.info(chalk.bold(chalk.cyan(`inula v${pkg?.version}`)));
  });

  return {
    plugins: [require.resolve('./version')],
  };
};
