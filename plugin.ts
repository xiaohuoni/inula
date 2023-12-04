import { IApi } from "@aluni/types";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

export default (api: IApi) => {
  api.onBuildComplete(({ err }) => {
    //@ts-ignore
    if (!err && !existsSync(join(api.paths.absOutputPath!, "404.html"))) {
      // 如果没有 404 则复制一下 index
      setTimeout(() => {
        copyFileSync(
          join(api.paths.absOutputPath!, "index.html"),
          join(api.paths.absOutputPath!, "404.html")
        );
      }, 500);
    }
  });
  api.onGenerateFiles((args) => {
    api.writeTmpFile({
      path: "index.ts",
      content: `export { FeatureIItem } from '${join(
        api.cwd,
        "docs",
        "components",
        "Item"
      )}'`,
    });
  });
};
