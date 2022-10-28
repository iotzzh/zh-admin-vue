// 当需要对接多人接口， 在开发时，用此来选择代理方，该文件与vite.config.ts配置的代理对应
const ENV = import.meta.env;
const env = ENV.VITE_ENVIRONMENT;
export const api =  env === 'dev' ? '/api' : '/proApi';