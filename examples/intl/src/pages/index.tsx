import { addLocale, getAllLocales, getLocale, setLocale, useIntl } from 'inula';

const Page = () => {
  const intl = useIntl();
  const locals = getAllLocales();
  return (
    <div>
      <p>
        {getLocale()}:{intl.formatMessage({ id: 'navBar.lang' })}
      </p>
      <button
        onClick={() => {
          setLocale(locals[Math.floor(Math.random() * locals.length)], false);
        }}
      >
        换语言啦
      </button>
      <p>写一个不存在的 id :{intl.formatMessage({ id: 'hello.inula' })}</p>
      <button
        onClick={() => {
          const locale = getLocale();
          if (locale === 'zh-CN') {
            setLocale(locals[Math.floor(Math.random() * locals.length)], false);
            console.log(
              '如果语言是中文，先换成别的，因为 inula-intl local 没变化，message 改变的时候，不会刷新',
            );
            return;
          }
          setLocale(locals[Math.floor(Math.random() * locals.length)], false);
          addLocale('zh-CN', {
            'hello.inula': '你好，OpenInula',
          });
          setLocale('zh-CN', false);
        }}
      >
        增加一个中文的 `id: 'hello.inula'`，并将当前语言设置成中文
      </button>
    </div>
  );
};

export default Page;
