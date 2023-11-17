import { helloStore } from 'inula';
import {
  createIntl,
  RawIntlProvider,
  useIntl,
} from '/Users/congxiaochen/Documents/inula/node_modules/.pnpm/inula-intl@0.0.2_inulajs@0.0.12/node_modules/inula-intl';
export const RootContainer = (props: any) => {
  const locale = 'en';
  const messages = {
    en: {
      greeting: 'Hello, {name}!',
      today: 'Today is {date}',
      amount: 'Amount: {value, number}',
    },
    fr: {
      greeting: 'Bonjour, {name} !',
      today: "Aujourd'hui, c'est le {date}",
      amount: 'Montant : {value, number}',
    },
  };

  const intl = createIntl({
    locale: locale,
    messages: messages,
  });
  return <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>;
};

const Page = () => {
  const store = helloStore();
  const intl = useIntl();
  return (
    <RootContainer>
      hello {store.title}
      <p>{intl.formatMessage({ id: 'greeting' }, { name: 'Alice' })}</p>
      <button
        onClick={() => {
          store.changeName();
        }}
      >
        改名字啦
      </button>
    </RootContainer>
  );
};

export default Page;
