import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
  },
}];

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  routes,
];
