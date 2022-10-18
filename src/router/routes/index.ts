import { RouteRecordRaw } from 'vue-router';

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/d',
  },
{
  path: '/d',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
  },
},
{
  path: '/dashboard',
  name: 'Dashboard1',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: 'Dashboard1',
  },
}
];
