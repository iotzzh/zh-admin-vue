import type { RouteRecordNormalized } from 'vue-router';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { close, start } from '@/utils/nporgress';
import Layout from '@/layout/index.vue';
import routerData from './routes/index';
import { convertJsonArrayToRoute } from './utils';
import type { App } from 'vue';

const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;
const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';

const router = createRouter({
  history: createWebHistory(PUBLIC_PATH ? '/' + PUBLIC_PATH : '/'),
  // history: createWebHashHistory(PUBLIC_PATH),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: '登录',
      meta: {
        title: 'login',
        affix: true
      }
    },
    {
      path: '/404',
      component: () =>
        import('@/views/404.vue'),
      meta: {
        title: '404',
      },
    },
    {
      // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
      path: '/:pathMatch(.*)',
      redirect: '/404',
      meta: { hidden: true },
    },
    {
      path: '/root',
      component: Layout,
      name: 'root',
      children: [],
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async () => { start(); });

router.afterEach(async () => { close(); });

/*
* 追加路由
* 方式有三种：根据本地配置文件追加；根据服务端放回菜单数据追加；根据本地代码的目录结构生成
* 根据本地配置文件追加：修改router/routes里面的json数据即可
* 根据服务端放回菜单数据追加：将配置文件添加到配置菜单
*/
const appendRouter = (jsonArray: any = []) => {
  const layoutRouter: RouteRecordNormalized | undefined = router.getRoutes().find((x: any) => x.path === '/root');
  const routes = [];
  convertJsonArrayToRoute(ROUTE_DATA_SOURCE === 'api' ? jsonArray : routerData, routes);
  for (let i = 0; i < routes.length; i++) {
    layoutRouter?.name && router.addRoute(layoutRouter.name, routes[i]);
  }
};

// 如果是从文件读取生成，就立即添加
if (ROUTE_DATA_SOURCE === 'file') {
  appendRouter();
}

export async function setupRouter(app: App<Element>) {
  app.use(router);
}

export {
  router,
  appendRouter,
};


