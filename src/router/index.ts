import type { RouteRecordNormalized } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { close, start } from '@/utils/nporgress';
import VLayout from '@/layout/verticalLayout/index.vue';
import HLayout from '@/layout/horizontalLayout/index.vue';
import LocalStorageHelper from '@/utils/localStorageHelper';
import routerData from './router.json';
import { convertJsonArrayToRoute } from './utils';

const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;
const LAYOUT = LocalStorageHelper?.getLayout() || import.meta.env.VITE_LAYOUT || 'vertical';
const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';

const router = createRouter({
  history: createWebHistory(PUBLIC_PATH),
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
      redirect: '/login',
      meta: { hidden: true },
    },
    {
    path: '/root',
    component: LAYOUT === 'vertical' ? VLayout : HLayout,
    name: LAYOUT === 'vertical' ? 'rootV' : 'rootH',
    children: [],
    }
],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async () => { start(); });

router.afterEach(async () => { close(); });

const appendRouter = (jsonArray:any = []) => {
  const layoutRouter: RouteRecordNormalized | undefined = router.getRoutes().find((x:any) => x.path === '/root');
  const routes = [];
  convertJsonArrayToRoute(ROUTE_DATA_SOURCE === 'api' ? jsonArray : routerData, routes);
  for (let i = 0; i< routes.length; i++) {
    layoutRouter?.name && router.addRoute(layoutRouter.name, routes[i]);
  }
};

// TODO: directory的方式暂时不想写
if (ROUTE_DATA_SOURCE === 'file' || ROUTE_DATA_SOURCE === 'directory') {
  appendRouter();
}

export async function setupRouter(app: App<Element>) {
  app.use(router);
}

export {
  router,
  appendRouter
};


