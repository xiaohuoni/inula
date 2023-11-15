import { helloStore } from 'inula';

const Page = () => {
  const store = helloStore();
  return (
    <div>
      hello {store.title}
      <button
        onClick={() => {
          store.changeName();
        }}
      >
        改名字啦
      </button>
    </div>
  );
};

export default Page;
