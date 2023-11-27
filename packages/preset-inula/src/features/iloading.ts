import { IApi } from '@aluni/types';
import { cheerio } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';

const assetsDir = join(__dirname, '../../assets');

export default (api: IApi) => {
  api.register({
    key: 'modifyDevToolLoadingHTML',
    fn: () =>
      cheerio.load(
        readFileSync(join(assetsDir, 'bundle-status.html'), 'utf-8'),
      ),
  });
};
