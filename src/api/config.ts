// 当需要对接多人接口， 在开发时，用此来选择代理方，该文件与vite.config.ts配置的代理对应
const ENV = import.meta.env;

const isDeployed = ENV.VITE_Deployed === 'true';
export const apiMock = '/apiMock';
export const apiUser1 = isDeployed ? '/admin' : '/apiUser1';
export const apiUser2 = isDeployed ? '/admin' : '/apiUser2';
export const apiSSODev = isDeployed ? '/sso' : '/apiSSODev';
export const apiSSOLocal = isDeployed ? '/sso' : '/apiSSOLocal';
