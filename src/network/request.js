import axios from "axios";
export function request(config) {
  // 1、创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/z8",
    timeout: 5000
  });

  // 2、axios的拦截器(也可以拦截全局axios这里是拦截instance实例)
  // 请求拦截、响应拦截
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      return config;
    },
    error => {
      console.log(error);
    }
  );
  instance.interceptors.response.use(
    value => {
      // console.log(value);
      return value.data;
    },
    error => {
      console.log(error);
    }
  );

  // 3、发送真正的网络请求
  return instance(config);
}
