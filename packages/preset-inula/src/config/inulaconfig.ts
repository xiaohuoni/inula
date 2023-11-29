import { IApi } from "@umijs/preset-umi";
import { copyFileSync } from "fs";
import { dirname, join } from "path";
import { DEFAULT_FAVICON_FILE, DEFAULT_FAVICON_FILE_NAME } from "../constants";
import { resolveProjectDep } from "../utils/resolveProjectDep";

export default (api: IApi) => {
  const version = require("../../package.json").version;
  const inulaPath =
    resolveProjectDep({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: "openinula",
    }) || dirname(require.resolve("openinula/package.json"));

  const openAPI = api.userConfig?.openAPI ?? [];
  const configDefaults: Record<string, any> = {
    mfsu: false,
    // 开发使用而已，能力可以有 inula 提供 aigc
    azure: {
      apiVersion: "2023-07-01-preview",
      model: "alita4",
      resource: "alita",
    },
    ...api.userConfig,
    openAPI: openAPI.map((i: any) => ({
      requestLibPath: "import { ir as request } from 'inula'",
      ...i,
    })),
  };

  api.modifyAppData((memo) => {
    memo.umi.name = "Inula";
    memo.umi.importSource = "inula";
    memo.umi.cliName = "inula";
    memo.umi.version = version;
    memo.openinula ??= {};
    memo.openinula.path = inulaPath;
    memo.openinula.version = require("openinula/package.json").version;
    return memo;
  });

  api.addBeforeMiddlewares(() => [
    (req, res, next) => {
      // 开发的时候，用户没有设置 favicon ，我们塞了一个
      if (
        !(req.path === `${api.config.publicPath}${DEFAULT_FAVICON_FILE_NAME}`)
      ) {
        next();
      } else {
        res.sendFile(DEFAULT_FAVICON_FILE);
      }
    },
  ]);

  api.modifyHTMLFavicon((memo) => {
    // 用户没有设置，要赛一个
    if (!api.appData.faviconFiles.length) {
      memo.push(`${api.config.publicPath}${DEFAULT_FAVICON_FILE_NAME}`);
    }
    return memo;
  });

  api.onBuildComplete(({ err }) => {
    if (err) return;
    // 用户没有设置，要拷贝一个
    if (!api.appData.faviconFiles || !api.appData.faviconFiles.length) {
      copyFileSync(
        DEFAULT_FAVICON_FILE,
        join(api.paths.absOutputPath, DEFAULT_FAVICON_FILE_NAME)
      );
    }
  });
  api.modifyDefaultConfig((memo: any) => {
    Object.keys(configDefaults).forEach((key) => {
      if (key === "alias") {
        memo[key] = { ...memo[key], ...configDefaults[key] };
      } else {
        memo[key] = configDefaults[key];
      }
    });
    memo.alias.inula = "@@/exports";
    memo.alias.openinula = inulaPath;
    memo.alias.react = inulaPath;
    memo.alias.openinula = inulaPath;
    memo.alias["react-dom"] = inulaPath;
    // react-dom/client 顺序要在 react-dom 之前
    if (memo.alias["react-dom/client"]) {
      memo.alias["react-dom/client"] = inulaPath;
    } else {
      memo.alias = {
        "react-dom/client": inulaPath,
        ...memo.alias,
      };
    }
    // umi4 开发环境不允许配置为 './'
    if (process.env.NODE_ENV === "development" && memo.publicPath === "./") {
      console.warn('开发环境不允许配置为 "./"');
      memo.publicPath = "/";
    }
    return memo;
  });

  api.modifyBabelPresetOpts((memo) => {
    memo.presetReact = {
      runtime: "automatic",
      importSource: "openinula", // 新增
    };
    return memo;
  });
};
