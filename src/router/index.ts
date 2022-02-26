import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/Index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: '#icondashboard',
          affix: true
        }
      },

      {
        path: 'page1',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/page1/Index.vue'),
        name: 'Page1',
        meta: {
          title: 'page1',
          icon: '#icondashboard',
          affix: true
        }
      },

      {
        path: 'page2',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/page2/Index.vue'),
        name: 'Page2',
        meta: {
          title: 'page2',
          icon: '#icondashboard',
          affix: true
        }
      },

    ]
  },
  // ...constantModules
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  // ...permissionModules
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
