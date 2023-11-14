// TODO: 这里有一个 ts 错误
// JSX 元素隐式具有类型 "any"，因为不存在接口 "JSX.IntrinsicElements"。ts(7026
// 安装 @types/react 18.2.37 解决，但是感觉 inula 还要依赖 react 很怪
const Page = () => {
  return <div>hello inula</div>;
};

export default Page;
