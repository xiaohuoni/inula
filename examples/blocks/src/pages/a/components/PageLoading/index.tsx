import { Spin } from 'antd';

// loading components from code split
// https://inulajs.org/plugin/inula-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
