import { useStore } from 'inula';

const Page = () => {
  const store = useStore('hello');
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
