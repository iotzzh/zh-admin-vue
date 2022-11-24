import { genMessage } from '../helper';
// import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    zhCn,
  },
};
