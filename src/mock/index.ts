import Mock from 'mockjs';
import { TMockParams } from './type';

const modulesFiles:any = import.meta.globEager('./_modules/*.ts');

const mocks = Object.keys(modulesFiles).reduce((modues:any, item:any) => {
    return [...modues, ...modulesFiles[item].default];
}, []);


//设置延时时间
Mock.setup({ timeout: '0-400' });

// 拓展mockjs
// 手机号
Mock.Random.extend({
    phone: function () {
      const phonePrefixs = ['132', '135', '189']; // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
    }
});

// 拓展mockjs
// 工号
Mock.Random.extend({
    workNumber: function () {
      const phonePrefixs = ['A-', 'B-', 'C-']; // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
    }
});

export function setupMock() {
    mocks.forEach((x: TMockParams) => { Mock.mock(new RegExp(x.url), x.type || 'get', (conditions:any)  => Mock.mock(x.response(conditions))); });
}