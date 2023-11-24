import { IApi } from '@aluni/preset-inula';
import { prettyPrintEsBuildErrors } from '@umijs/bundler-utils';
import * as Babel from '@umijs/bundler-utils/compiled/babel/core';
import * as parser from '@umijs/bundler-utils/compiled/babel/parser';
import traverse from '@umijs/bundler-utils/compiled/babel/traverse';
import * as t from '@umijs/bundler-utils/compiled/babel/types';
import {
  Loader,
  transformSync,
  type TransformResult,
} from '@umijs/bundler-utils/compiled/esbuild';
import { glob, winPath } from '@umijs/utils';
import { readFileSync } from 'fs';
import { basename, dirname, extname, format, join, relative } from 'path';
import { getIdentifierDeclaration } from './astUtils';
import { INULA_KEYS } from './constants';

interface IOpts {
  contentTest?: (content: string) => Boolean;
  astTest?: (opts: { node: t.Node; content: string }) => Boolean;
}

export function getNamespace(absFilePath: string, absSrcPath: string) {
  const relPath = winPath(relative(winPath(absSrcPath), winPath(absFilePath)));
  const parts = relPath.split('/');
  const dirs = parts.slice(0, -1);
  const file = parts[parts.length - 1];
  // src/pages/foo/stores/bar > foo/bar
  const validDirs = dirs.filter(
    (dir) => !['src', 'pages', 'stores'].includes(dir),
  );
  let normalizedFile = file;
  normalizedFile = basename(file, extname(file));
  // foo.store > foo
  if (normalizedFile.endsWith('.store')) {
    normalizedFile = normalizedFile.split('.').slice(0, -1).join('.');
  }
  return [...validDirs, normalizedFile].join('.');
}

export class Store {
  file: string;
  namespace: string;
  id: string;
  exportName: string;
  deps: string[];
  constructor(
    file: string,
    absSrcPath: string,
    sort: {} | undefined,
    id: number,
    namesCache: any,
  ) {
    let namespace;
    let exportName;
    const [_file, meta] = file.split('#');
    if (meta) {
      const metaObj: Record<string, string> = JSON.parse(meta);
      namespace = metaObj.namespace;
      exportName = metaObj.exportName;
    }
    this.file = _file;
    this.id = `store_${id}`;
    this.namespace =
      namespace || namesCache[file] || getNamespace(_file, absSrcPath);
    if (INULA_KEYS.includes(this.namespace)) {
      const error = new Error(
        `Store 导出命名为 ${this.namespace}，${this.namespace}Store 为 openinula 保留关键字`,
      );
      throw error;
    }
    this.exportName = exportName || 'default';
    this.deps = sort ? this.findDeps(sort) : [];
  }

  findDeps(sort: object) {
    const content = readFileSync(this.file, 'utf-8');

    // transform with esbuild first
    // to reduce unexpected ast problem
    const loader = extname(this.file).slice(1) as Loader;
    const result = transformSync(content, {
      loader,
      sourcemap: false,
      minify: false,
    });

    // transform with babel
    const deps = new Set<string>();
    const ast = parser.parse(result.code, {
      sourceType: 'module',
      sourceFilename: this.file,
      plugins: [],
    });
    // TODO: use sort
    sort;
    traverse(ast, {
      CallExpression: (path: Babel.NodePath<t.CallExpression>) => {
        if (
          t.isIdentifier(path.node.callee, { name: 'useStore' }) &&
          t.isStringLiteral(path.node.arguments[0])
        ) {
          deps.add(path.node.arguments[0].value);
        }
      },
    });
    return [...deps];
  }
}

export class StoreUtils {
  api: IApi;
  opts: IOpts = {};
  count: number = 1;
  namespaceCache: any = {};
  constructor(api: IApi | null, opts?: IOpts) {
    this.api = api as IApi;
    this.opts = opts || {};
  }

  getAllStores(opts: { sort?: object; extraStores: string[] }) {
    // reset count
    this.count = 1;
    const stores = [
      ...this.getStores({
        base: join(this.api.paths.absSrcPath, 'stores'),
        pattern: '**/*.{ts,tsx,js,jsx}',
      }),
      ...this.getStores({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/stores/**/*.{ts,tsx,js,jsx}',
      }),
      ...this.getStores({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/store.{ts,tsx,js,jsx}',
      }),
      ...opts.extraStores,
    ].map((file: string) => {
      return new Store(
        file,
        this.api.paths.absSrcPath,
        opts.sort,
        this.count++,
        this.namespaceCache,
      );
    });
    return stores;
  }

  getStores(opts: { base: string; pattern?: string }) {
    return glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath)
      .filter((file) => {
        if (/\.d.ts$/.test(file)) return false;
        if (/\.(test|e2e|spec).([jt])sx?$/.test(file)) return false;
        const content = readFileSync(file, 'utf-8');
        return this.isStoreValid({ content, file });
      });
  }

  isStoreValid(opts: { content: string; file: string }) {
    const { file, content } = opts;

    // if (this.opts.contentTest && this.opts.contentTest(content)) {
    //   return true;
    // }

    let result: TransformResult | null = null;
    try {
      // transform with esbuild first
      // to reduce unexpected ast problem
      const ext = extname(file).slice(1);
      const loader = ext === 'js' ? 'jsx' : (ext as Loader);
      result = transformSync(content, {
        loader,
        sourcemap: false,
        minify: false,
        sourcefile: file,
      });
    } catch (e: any) {
      if (e.errors?.length) {
        prettyPrintEsBuildErrors(e.errors, { path: file, content });
        delete e.errors;
      }
      throw e;
    }

    // transform with babel
    let ret = false;
    const ast = parser.parse(result!.code, {
      sourceType: 'module',
      sourceFilename: file,
      plugins: [],
    });
    traverse(ast, {
      ExportDefaultDeclaration: (
        path: Babel.NodePath<t.ExportDefaultDeclaration>,
      ) => {
        let node: any = path.node.declaration;
        node = getIdentifierDeclaration(node, path);
        // TODO: 强制写法 export default createStore()，后续调整是否需要修改
        ret =
          t.isCallExpression(node) &&
          t.isIdentifier(node.callee) &&
          node.callee.name === 'createStore';
      },
      ObjectExpression: (path: Babel.NodePath<t.ObjectExpression>) => {
        let node: any = path.node;
        if (t.isObjectExpression(node)) {
          node.properties.some((property) => {
            if ((property as any).key.name === 'id') {
              //  将 id 取出来当 namespace
              this.namespaceCache[file] = (property as any).value.value;
            }
            return [
              'state',
              'reducers',
              'subscriptions',
              'effects',
              'namespace',
            ].includes((property as any).key.name);
          });
        }
      },
    });

    return ret;
  }
  static getStoresContent(stores: Store[]) {
    const imports: string[] = [];
    const namespace: any = {};
    stores.forEach((store) => {
      const fileWithoutExt = winPath(
        format({
          dir: dirname(store.file),
          base: basename(store.file, extname(store.file)),
        }),
      );
      if (store.exportName !== 'default') {
        if (namespace[store.exportName]) {
          const error = new Error(
            `Store 导出命名重复：${
              namespace[store.exportName]
            } 和 ${fileWithoutExt}`,
          );
          throw error;
        }
        namespace[store.exportName] = fileWithoutExt;
        imports.push(
          `export { ${store.exportName} } from '${fileWithoutExt}';`,
        );
      } else {
        if (namespace[store.namespace]) {
          const error = new Error(
            `Store 导出命名重复：${
              namespace[store.namespace]
            } 和 ${fileWithoutExt}`,
          );
          throw error;
        }
        namespace[store.namespace] = fileWithoutExt;
        imports.push(
          `export { default as ${store.namespace}Store } from '${fileWithoutExt}';`,
        );
      }
    });
    return `
${imports.join('\n')}
`;
  }
}
