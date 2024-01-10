import { logger } from '@umijs/utils';
import getGitRepoInfo from 'git-repo-info';
import 'zx/globals';
import { getPkgs } from './.internal/utils';

(async () => {
  const { branch } = getGitRepoInfo();
  logger.info(`branch: ${branch}`);
  const pkgs = getPkgs();
  logger.info(`pkgs: ${pkgs.join(', ')}`);
  // pnpm publish
  logger.event('pnpm publish');
  $.verbose = false;
  const innerPkgs = pkgs.filter((pkg) => !['inula'].includes(pkg));

  // check 2fa config
  let otpArg: string[] = [];
  if (
    (await $`npm profile get "two-factor auth"`).toString().includes('writes')
  ) {
    let code = '';
    do {
      // get otp from user
      code = await question('This operation requires a one-time password: ');
      // generate arg for zx command
      // why use array? https://github.com/google/zx/blob/main/docs/quotes.md
      otpArg = ['--otp', code];
    } while (code.length !== 6);
  }
  //
  let tag = 'latest';
  await Promise.all(
    innerPkgs.map(async (pkg) => {
      await $`cd packages/${pkg} && pnpm publish --no-git-checks --tag ${tag} ${otpArg}`;
      logger.info(`+ ${pkg}`);
    }),
  );
  await $`cd packages/inula && pnpm publish --no-git-checks --tag ${tag} ${otpArg}`;
  logger.info(`+ inula`);
  $.verbose = true;
})();
