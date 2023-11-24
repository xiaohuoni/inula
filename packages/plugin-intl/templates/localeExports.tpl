import EventEmitter from '{{{EventEmitterPkg}}}';
const useLocalStorage = {{{UseLocalStorage}}};

// @ts-ignore
export const event = new EventEmitter();

export const LANG_CHANGE_EVENT = Symbol('LANG_CHANGE');

{{#LocaleList}}
{{#paths}}
import lang_{{lang}}{{country}}{{index}} from "{{{path}}}";
{{/paths}}
{{/LocaleList}}

const flattenMessages=(
  nestedMessages: Record<string, any>,
  prefix = '',
) => {
  return Object.keys(nestedMessages).reduce(
    (messages: Record<string, any>, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }
      return messages;
    },
    {},
  );
}

export const localeInfo: {[key: string]: any} = {
  {{#LocaleList}}
  '{{name}}': {
    {{#paths}}...flattenMessages(lang_{{lang}}{{country}}{{index}}),{{/paths}}
  },
  {{/LocaleList}}
};

/**
 * 增加一个新的国际化语言
 * @param name 语言的 key
 * @param messages 对应的枚举对象
 */
export const addLocale = (
  name: string,
  messages: Object,
) => {
  if (!name) {
    return;
  }
  // 可以合并
  const mergeMessages = localeInfo[name]
    ? Object.assign({}, localeInfo[name], messages)
    : messages;

  localeInfo[name] = mergeMessages;
   // 如果这是的 name 和当前的locale 相同需要重新设置一下，不然更新不了
  if (name === getLocale()) {
    event.emit(LANG_CHANGE_EVENT, name);
  }
};


/**
 * 获取当前选择的语言
 * @returns string
 */
export const getLocale = () => {
  // because changing will break the app
  const lang =
      navigator.cookieEnabled && typeof localStorage !== 'undefined' && useLocalStorage
        ? window.localStorage.getItem('inula_locale')
        : '';
  // support baseNavigator, default true
  let browserLang;
  {{#BaseNavigator}}
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  browserLang = isNavigatorLanguageValid
    ? navigator.language
    : '';
  {{/BaseNavigator}}
  return lang || browserLang || {{{DefaultLocale}}};
};

/**
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @returns string
 */
export const setLocale = (lang: string, realReload: boolean = true) => {
  //const { pluginManager } = useAppContext();
  //const runtimeLocale = pluginManagerapplyPlugins({
  //  key: 'locale',
  //  workaround: 不使用 ApplyPluginsType.modify 是为了避免循环依赖，与 fast-refresh 一起用时会有问题
  //  type: 'modify',
  //  initialValue: {},
  //});

  const updater = () => {
    if (getLocale() !== lang) {
       if (navigator.cookieEnabled && typeof window.localStorage !== 'undefined' && useLocalStorage) {
          window.localStorage.setItem('inula_locale', lang || '');
       }
      if (realReload) {
        window.location.reload();
      } else {
        event.emit(LANG_CHANGE_EVENT, lang);
        // chrome 不支持这个事件。所以人肉触发一下
        if (window.dispatchEvent) {
          const event = new Event('languagechange');
          window.dispatchEvent(event);
        }
      }
    }
  }
  updater();
};

/**
 * 获取语言列表
 * @returns string[]
 */
export const getAllLocales = () => Object.keys(localeInfo);
