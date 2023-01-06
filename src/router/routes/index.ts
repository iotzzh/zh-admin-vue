import { RouteRecordRaw } from 'vue-router';

import VerticalLayout from '@/layout/verticalLayout/index.vue';
import H from '@/layout/horizontalLayout/index.vue';
import ZHRequest from '@/components/zh-request';
import { updateMenuToRouter } from '@/utils/dataConvert';

export const getBasicRoutes = async (isVertical = true) => {
  const params = {
    url: '/api/menu/list',
    conditions: {},
  };
  const result = await ZHRequest.post(params);
  const routes:RouteRecordRaw[] = result.data.records;
  updateMenuToRouter(routes);
  return [{
    path: '/',
    component: isVertical ? VerticalLayout : H,
    name: isVertical ? 'root' : 'root1',
    children: routes,
  }];
};

export const basicRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login/Index.vue'),
      name: '登录',
      meta: {
        title: 'login',
        affix: true
      }
    },
];
