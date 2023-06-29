import './styles/element-override.css';
import './styles/iconfont-override.css';
import 'element-plus/dist/index.css';
import './styles/global.css';
import './assets/iconfont/iconfont.css';
import 'aos/dist/aos.css';
import 'splitpanes/dist/splitpanes.css';

import { createApp } from 'vue';
import { setupStore } from '@/stores/index';

import { setupRouter } from '@/router';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { setupMock } from '@/mock/index';
import { setupI18n } from './locales/setupI18n';
import 'default-passive-events';

import AOS from 'aos';

// vex-table
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import App from './App.vue';

async function boostrap() {
  const app = createApp(App);

  setupStore(app);
  
  setupMock();
  // if (process.env.NODE_ENV === 'dev') { setupMock(); }

  // 注册Icons 全局组件，element plus icon
  Object.keys(Icons).forEach(key => {
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

  // AOS.init();
  
  // app.use(AOS);
  app.mount('#app');
}

boostrap();
