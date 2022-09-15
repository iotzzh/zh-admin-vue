import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import VerticalLayout from '@/layout/verticalLayout/Index.vue';
import HorizontalLayout from '@/layout/horizontalLayout/Index.vue';
import { useLayoutStore } from '@/stores';

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
    }
  },
  {
    path: '/dashboard',
    component: VerticalLayout,
    redirect: '/index',
    name: 'Dashboard',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/Index.vue'),
        name: 'index',
        meta: {
          title: '首页',
          cached: true
        }
      },
      {
        path: '/charts/charts1',
        component: () => import('@/views/charts/charts1.vue'),
        name: 'charts1',
        meta: {
          title: 'charts1',
          cached: true
        }
      },
      {
        path: '/charts/charts2',
        component: () => import('@/views/charts/charts2.vue'),
        name: 'charts2',
        meta: {
          title: 'charts2',
          cached: true
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
  history: createWebHistory(),
  routes: constantRoutes
});

router.beforeEach((to, from, next) => {
  console.log('to:' + to.fullPath);
  console.log('from:' + from.fullPath);
  if (to.meta.cached) {
    const store = useLayoutStore();
    store.addCachedViews(to);
}

  
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
