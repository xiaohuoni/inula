import { glob, lodash, winPath } from '@umijs/utils';
import { existsSync } from 'fs';
import { basename, join } from 'path';

export interface IGetLocaleFileListOpts {
  localeFolder: string;
  separator?: string;
  absSrcPath?: string;
  absPagesPath?: string;
}

export interface IGetLocaleFileListResult {
  lang: string;
  country: string;
  name: string;
  paths: string[];
}

export const getLocaleList = async (
  opts: IGetLocaleFileListOpts,
): Promise<IGetLocaleFileListResult[]> => {
  const {
    localeFolder,
    separator = '-',
    absSrcPath = '',
    absPagesPath = '',
  } = opts;
  const localeFileMath = new RegExp(
    `^([a-z]{2})${separator}?([A-Z]{2})?\.(js|json|ts)$`,
  );

  const localeFiles = glob
    .sync('*.{ts,js,json}', {
      cwd: winPath(join(absSrcPath, localeFolder)),
    })
    .map((name) => winPath(join(absSrcPath, localeFolder, name)))
    .concat(
      glob
        .sync(`**/${localeFolder}/*.{ts,js,json}`, {
          cwd: absPagesPath,
        })
        .map((name) => winPath(join(absPagesPath, name))),
    )
    .filter((p) => localeFileMath.test(basename(p)) && existsSync(p))
    .map((fullName) => {
      const fileName = basename(fullName);
      const fileInfo = localeFileMath
        .exec(fileName)
        ?.slice(1, 3)
        ?.filter(Boolean);
      return {
        name: (fileInfo || []).join(separator),
        path: fullName,
      };
    });

  const groups = lodash.groupBy(localeFiles, 'name');

  const promises = Object.keys(groups).map(async (name) => {
    const [lang, country = ''] = name.split(separator);

    return {
      lang,
      name,
      // react-intl Function.supportedLocalesOf
      // Uncaught RangeError: Incorrect locale information provided
      locale: name.split(separator).join('-'),
      country,
      paths: groups[name].map((item) => winPath(item.path)),
    };
  });
  return Promise.all(promises);
};

export const exactLocalePaths = (
  data: IGetLocaleFileListResult[],
): string[] => {
  return lodash.flatten(data.map((item) => item.paths));
};

export function isNeedPolyfill(targets = {}) {
  // data come from https://caniuse.com/#search=intl
  // you can find all browsers in https://github.com/browserslist/browserslist#browsers
  const polyfillTargets = {
    ie: 10,
    firefox: 28,
    chrome: 23,
    safari: 9.1,
    opera: 12.1,
    ios: 9.3,
    ios_saf: 9.3,
    operamini: Infinity,
    op_mini: Infinity,
    android: 4.3,
    blackberry: Infinity,
    operamobile: 12.1,
    op_mob: 12.1,
    explorermobil: 10,
    ie_mob: 10,
    ucandroid: Infinity,
  };
  return (
    Object.keys(targets).find((key) => {
      const lowKey = key.toLocaleLowerCase();
      // @ts-ignore
      return polyfillTargets[lowKey] && polyfillTargets[lowKey] >= targets[key];
    }) !== undefined
  );
}
