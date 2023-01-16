// 当需要对接多人接口， 在开发时，用此来选择代理方，该文件与vite.config.ts配置的代理对应
const ENV = import.meta.env;

const isDeployed = ENV.VITE_Deployed === 'true';
export const api = isDeployed ? '/api' : '/api';
export const apiWH = isDeployed ? '/hsp-admin' : '/apiWH';
