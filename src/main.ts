import './styles/element-override.css';
import './styles/iconfont-override.css';
import 'element-plus/dist/index.css';
import './styles/global.css';
import './assets/iconfont/iconfont.css';
import 'aos/dist/aos.css';
import 'splitpanes/dist/splitpanes.css';

import { createApp } from 'vue';
import { setupStore } from '@/stores/index';

import Particles from "vue3-particles";
import { setupRouter } from '@/router/index';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import locale from 'element-plus/dist/locale/zh-cn.mjs';
import { setupMock } from '@/mock/index';
import { setupI18n } from './locales/setupI18n';
import 'default-passive-events';

// vex-table
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import App from './App.vue';
import utils from '@/utils/index';

async function boostrap() {
  const app = createApp(App);

  setupStore(app);

  setupMock();
  // if (process.env.NODE_ENV === 'dev') { setupMock(); }

  // 注册Icons 全局组件，element plus icon
  Object.keys(Icons).forEach((key: string) => {
    app.component(key, Icons[key]);
  });

  // 多语言配置
  await setupI18n(app);

  // 配置路由
  await setupRouter(app);

  // router-guard
  // 路由守卫
  // setupRouterGuard(router);

  // 加载Element Plus
  app.use(ElementPlus, { locale });

  app.use(VXETable);

  app.use(Particles);

  // AOS.init();

  // app.use(AOS);
  // app.config.globalProperties.$utils = utils;
  globalThis.$utils = utils;
  app.mount('#app');
}

boostrap();
