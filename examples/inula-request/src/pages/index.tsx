import { currentUser } from "@/services/antdpro/api";
import { sayHi } from "@/services/api";
import { useRequest, useState } from "inula";

const Page = () => {
  const [title, setTitle] = useState();
  const { data, error } = useRequest(currentUser, {});
  console.log(data);
  console.log(error);
  return (
    <div
      onClick={async () => {
        const { data } = await sayHi({});
        setTitle(data?.text);
      }}
    >
      inula-request {title}
    </div>
  );
};

export default Page;
