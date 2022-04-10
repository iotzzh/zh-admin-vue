import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import VerticalLayout from '@/layout/verticalLayout/Index.vue';
import HorizontalLayout from '@/layout/horizontalLayout/Index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Index.vue'),
    name: 'Login',
    meta: {
      title: 'login',
      affix: true
    }
  },
  {
    path: '/dashboard',
    component: HorizontalLayout,
    redirect: '/index',
    name: 'dashboard',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/Index.vue'),
        name: 'index',
        meta: {
          title: '首页',
        }
      },
    ],
  },
  {
    path: '/404',
    component: () =>
      import('@/views/404.vue'
      ),
    meta: {
      title: '404'
    }
  },
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: { hidden: true }
  },
  // ...constantModules
];


const router = createRouter({
  history: createWebHistory('zh-admin'),
  routes: constantRoutes
});

router.beforeEach((to, from, next) => {
  console.log('to:' + to.fullPath);
  console.log('from:' + from.fullPath);
  
  // 返回 false 以取消导航
  // if (to.fullPath == 'xxx') {
  //   // 禁止访问
  //   return false;
  // }

  // if (to.fullPath == 'yyy') {
  //   // 路由重定向
  //   router.push('xxx');
  // }
  document.title = 'zh admin';
  next();
});

export default router;
