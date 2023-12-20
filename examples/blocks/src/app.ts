import { ir, IrRequestConfig } from 'inula';

// 定义成功处理函数
const fulfilledHandler = (response) => {
  // 修改响应内容
  return response?.data?.data ?? response?.data;
};

// 定义失败处理函数
const rejectedHandler = (error) => {
  console.error('请求失败:', error);
  return Promise.reject(error);
};

// 定义拦截器选项
const options = {
  synchronous: true, // 选择同步执行拦截器，默认为异步执行
};

// 使用ir.interceptors.response.use方法
const interceptorId = ir.interceptors.response.use(
  fulfilledHandler,
  rejectedHandler,
  options,
);

export const request: IrRequestConfig = {
  // TODO: 如果有些要加，有些不加怎么办？
  baseURL: '',

  headers: {
    inula: 'haha',
  },
};
