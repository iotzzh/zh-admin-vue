import { genMessage } from '../helper';
// import antdLocale from 'ant-design-vue/es/locale/en_US';
import en from 'element-plus/dist/locale/en.mjs';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    // antdLocale,
    en,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
