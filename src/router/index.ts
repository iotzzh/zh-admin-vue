<<<<<<< HEAD
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import publicSystemsRouter from './publicSystems';
import pathologicalSystemRouter from './pathologicalSystem';

export const constantRoutes: Array<RouteRecordRaw> = [
  //#region 登录页
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Index.vue'),
    name: 'Login',
    meta: {
      title: 'login',
      affix: true
    }
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "login" */ '@/views/dashboard/Index.vue'),
    name: 'Dashboard',
    meta: {
      title: '首页',
      affix: true
    }
  },
  ...publicSystemsRouter,
  ...pathologicalSystemRouter,
  // //#endregion
  // {
  //   path: '/dashboard1',
  //   component: Layout,
  //   redirect: '/dashboard1',
  //   children: [
  //     //#region 首页
  //     {
  //       path: 'dashboard1',
  //       component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
  //       name: 'Dashboard1',
  //       meta: {
  //         title: 'dashboard1',
  //         icon: '#icondashboard1',
  //         affix: true
  //       }
  //     },
  //     //#endregion
      
  //     //#region 权限管理
  //     {
  //       path: '/authorityManagement/userManagement',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/userManagement.vue'),
  //       meta: {
  //         title: '用户管理'
  //       }
  //     },
  //     {
  //       path: '/authorityManagement/roleManagement',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/roleManagement.vue'),
  //       meta: {
  //         title: '角色管理'
  //       }
  //     },

  //     {
  //       path: '/authorityManagement/organizationalStructure',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/organizationalStructure.vue'),
  //       meta: {
  //         title: '组织架构'
  //       }
  //     },
  //     {
  //       path: '/authorityManagement/menuManagement',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/authorityManagement/menuManagement.vue'),
  //       meta: {
  //         title: '菜单管理'
  //       }
  //     },
  //     //#endregion
      
  //     //#region 前处理
  //     {
  //       path: '/preProcessing/departmentManagement',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/departmentManagement.vue'),
  //       meta: {
  //         title: '部门管理'
  //       }
  //     },
  //     {
  //       path: '/preProcessing/abnormalHandoff',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/abnormalHandoff.vue'),
  //       meta: {
  //         title: '异常交接'
  //       }
  //     },
  //     {
  //       path: '/preProcessing/barcodeManagement',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/barcodeManagement.vue'),
  //       meta: {
  //         title: '条码管理'
  //       }
  //     },
  //     {
  //       path: '/preProcessing/dataDictionary',
  //       component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/dataDictionary.vue'),
  //       meta: {
  //         title: '数据字典'
  //       }
  //     },
  //     //#endregion

  //   ]
  // },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

// router.beforeEach((to, from) => {
//   console.log('to:' + to.fullPath);
//   console.log('from:' + from.fullPath);
//   // 返回 false 以取消导航
//   // if (to.fullPath == '/authorityManagement/userManagement') {
//   //   // 禁止访问
//   //   return false;
//   // }

//   // if (to.fullPath == '/preProcessing/abnormalHandoff') {
//   //   // 路由重定向
//   //   router.push('/preProcessing/barcodeManagement');
//   // }
// });

export default router;
=======
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
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
