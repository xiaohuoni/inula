import { sayHi } from '@/services/api';
import { useState } from 'inula';

// TODO: useIR 报错
const Page = () => {
  const [title, setTitle] = useState();
  return (
    <div
      onClick={async () => {
        const { data } = await sayHi();
        setTitle(data?.text);
      }}
    >
      inula-request {title}
    </div>
  );
};

export default Page;
