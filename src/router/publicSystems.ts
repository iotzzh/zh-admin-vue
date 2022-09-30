/*
 * @Author: zzh
 * @Date: 2022-03-03 10:26:35
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 13:50:53
 * @Description: 公共系统路由
 * @FilePath: \hwason-laboratory-systems\src\router\publicSystems.ts
 */
import { RouteRecordRaw } from 'vue-router';
// import VerticalLayout from '@/layout/verticalLayout/Index.vue';
import HorizontalLayout from '@/layout/horizontalLayout/Index.vue';

const publicSystemsRouter: Array<RouteRecordRaw> = [
  {
    path: '/publicSystems',
    component: HorizontalLayout,
    redirect: '/publicSystems/dashboard',
    name: 'publicSystems',
    meta: {
      title: '公共系统',
    },
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_dashboard" */ '@publicSystems/views/dashboard/Index.vue'
          ),
        name: 'publicSystemsDashboard',
        meta: {
          title: 'dashboard',
        }
      },
      //#region 权限管理
      {
        path: '/publicSystems/authorityManagement/userManagement',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_userManagement" */ '@publicSystems/views/authorityManagement/userManagement.vue'
          ),
        name: 'publicSystemsUserManagement',
        meta: {
          title: '用户管理',
        }
      },
      {
        path: '/publicSystems/authorityManagement/roleManagement',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_roleManagement" */ '@publicSystems/views/authorityManagement/roleManagement.vue'
          ),
        name: 'publicSystemsRoleManagement',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: '/publicSystems/authorityManagement/roleManagement',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_roleManagement" */ '@publicSystems/views/authorityManagement/roleManagement.vue'
          ),
        name: 'publicSystemsRoleManagement',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: '/publicSystems/authorityManagement/organizationalStructure',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_organizationalStructure" */ '@publicSystems/views/authorityManagement/organizationalStructure.vue'
          ),
        name: 'publicSystemsOrganizationalStructure',
        meta: {
          title: '组织管理 ',
        }
      },
      {
        path: '/publicSystems/authorityManagement/menuManagement',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_menuManagement" */ '@publicSystems/views/authorityManagement/menuManagement.vue'
          ),
        name: 'publicSystemsMenuManagement',
        meta: {
          title: '菜单管理 ',
        }
      },
      //#endregion

      //#region 报告项目管理
      {
        path: '/publicSystems/reportProjectManagement/reportItem',
        component: () =>
          import(
            /* webpackChunkName: "publicSystems_reportItem" */ '@publicSystems/views/reportProjectManagement/reportItem.vue'
          ),
        name: 'publicSystemsReportItem',
        meta: {
          title: '报告项目',
        }
      },
      //#endregion
    ]
  }
];

export default publicSystemsRouter;