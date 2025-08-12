import { genMessage } from '../helper';
// import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const modules: any = import.meta.glob('./zh-CN/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    zhCn,
  },
};
