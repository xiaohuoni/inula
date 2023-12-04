import { query } from '@/services/api';
import { Alert, Button, Space } from 'antd';
import {
  countStore,
  getLocale,
  setLocale,
  useIntl,
  useRequest,
  useState,
} from 'inula';
import styles from './index.css';

export default function ({}) {
  const [showMessage, setShowMessage] = useState(false);
  const count = countStore();
  const intl = useIntl();
  const { data } = useRequest(query);
  console.log(data);
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <p className={styles.description}>
        {intl.formatMessage({ id: 'description' })}
        <code>src/pages/index.tsx</code>
        {intl.formatMessage({ id: 'suffix' })}
      </p>
      <Space>
        <span>
          {intl.formatMessage({ id: 'count' })} {count.number}
        </span>
        <Button size="large" type="primary" onClick={() => count.addition()}>
          {intl.formatMessage({ id: 'addition' })}
        </Button>
        <Button size="large" type="primary" onClick={() => count.subtraction()}>
          {intl.formatMessage({ id: 'subtraction' })}
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            const locale = getLocale();
            if (locale === 'zh-CN') {
              setLocale('en-US', false);
            } else {
              setLocale('zh-CN', false);
            }
          }}
        >
          {intl.formatMessage({ id: 'change' })}
        </Button>
      </Space>
      {data && (
        <Alert
          message={`${intl.formatMessage({ id: 'mockAlert' })}${JSON.stringify(
            data?.data,
          )}`}
          type="success"
          action={
            <Space direction="vertical">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  setShowMessage(!showMessage);
                }}
              >
                {showMessage
                  ? intl.formatMessage({ id: 'close' })
                  : intl.formatMessage({ id: 'open' })}
              </Button>
            </Space>
          }
        ></Alert>
      )}

      {showMessage && JSON.stringify(data)}
    </div>
  );
}
