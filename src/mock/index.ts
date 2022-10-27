import Mock from 'mockjs';
import { MockParams } from './type';

const modulesFiles:any = import.meta.globEager('./_modules/*.ts');

const mocks = Object.keys(modulesFiles).reduce((modues:any, item:any) => {
    return [...modues, ...modulesFiles[item].default];
}, []);


//设置延时时间
Mock.setup({ timeout: '3000-10000' });

export function setupMock() {
    mocks.forEach((x: MockParams) => { Mock.mock(new RegExp(x.url), x.type || 'get', x.response); });
}