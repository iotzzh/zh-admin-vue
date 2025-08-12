import { genMessage } from '../helper';
// import antdLocale from 'ant-design-vue/es/locale/en_US';
import en from 'element-plus/dist/locale/en.mjs';

const modules: any = import.meta.glob('./en/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'en'),
    // antdLocale,
    en,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
