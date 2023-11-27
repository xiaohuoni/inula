export type { IAzureSend } from '@alita/plugin-azure';
export type {
  IConfig,
  IRoute,
  UmiApiRequest,
  UmiApiResponse,
  webpack,
} from '@umijs/preset-umi';
import type { IOnIntlAzure } from '@alita/plugin-azure';
import { IApi as UmiIApi } from '@umijs/preset-umi';
// 增加 azure api
export type IApi = UmiIApi & { onIntlAzure: IOnIntlAzure };
