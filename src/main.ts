import './assets/iconfont/iconfont.css';
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


async function boostrap() {
  const app = createApp(App);

  // 配置 store
  app.use(createPinia());

  // 注册Icons 全局组件，element plus icon
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key]);
  });

  // 多语言配置

  // 配置路由
  setupRouter(app);

    // router-guard
  // 路由守卫
  setupRouterGuard(router);

  // 加载Element Plus
  app.use(ElementPlus);

  app.mount('#app');
}

boostrap();
