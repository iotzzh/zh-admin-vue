import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/Index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      //#region 首页
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
      //#endregion
      
      //#region 权限管理
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
      //#endregion
      
      //#region 前处理
      {
        path: '/preProcessing/departmentManagement',
        component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/departmentManagement.vue'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: '/preProcessing/abnormalHandoff',
        component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/abnormalHandoff.vue'),
        meta: {
          title: '异常交接'
        }
      },
      {
        path: '/preProcessing/barcodeManagement',
        component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/barcodeManagement.vue'),
        meta: {
          title: '条码管理'
        }
      },
      {
        path: '/preProcessing/dataDictionary',
        component: () => import( /* webpackChunkName: "donate" */ '../views/preProcessing/dataDictionary.vue'),
        meta: {
          title: '数据字典'
        }
      },
      //#endregion

    ]
  },
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
