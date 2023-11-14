import { IServicePluginAPI, PluginAPI } from '@umijs/core';

export { run } from './cli';
export { defineConfig } from './defineConfig';
export * from './service';
export type IApi = PluginAPI & IServicePluginAPI;
