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
        path: '/authorityManagement/userManagement',
        component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/userManagement.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/authorityManagement/roleManagement',
        component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/roleManagement.vue'),
        meta: {
          title: '角色管理'
        }
      },

      {
        path: '/authorityManagement/organizationalStructure',
        component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/organizationalStructure.vue'),
        meta: {
          title: '组织架构'
        }
      },
      {
        path: '/authorityManagement/menuManagement',
        component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/menuManagement.vue'),
        meta: {
          title: '菜单管理'
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
