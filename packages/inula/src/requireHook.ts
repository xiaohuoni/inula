import { join } from 'path';

const hookPropertyMap = new Map([
  ['inula', join(__dirname, './index.js')],
  // why? 有些插件会引这个路径，但是 inula 没有依赖 umi 所以需要在这里改一下
  ['umi/plugin-utils', join(__dirname, '../plugin-utils.js')],
]);

const mod = require('module');
const resolveFilename = mod._resolveFilename;
mod._resolveFilename = function (
  request: string,
  parent: any,
  isMain: boolean,
  options: any,
) {
  const hookResolved = hookPropertyMap.get(request);
  if (hookResolved) request = hookResolved;
  return resolveFilename.call(mod, request, parent, isMain, options);
};
