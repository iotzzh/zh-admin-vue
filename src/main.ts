import './styles/element-override.css';
import './styles/iconfont-override.css';
import 'element-plus/dist/index.css';
import './styles/global.css';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { setupMock } from '@/mock/index';
import { setupI18n } from './locales/setupI18n';
import 'default-passive-events';

// vex-table
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';


async function boostrap() {
  const app = createApp(App);

  // 配置 store
  app.use(createPinia());

  // 注册Icons 全局组件，element plus icon
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key]);
  });

  // 多语言配置
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  if (process.env.NODE_ENV === 'dev') { setupMock(); }

  // 加载Element Plus
  app.use(ElementPlus, { locale });

  app.use(VXETable);

  app.mount('#app');
}

boostrap();
