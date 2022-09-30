/*
 * @Author: zzh
 * @Date: 2022-03-03 10:26:35
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 13:51:09
 * @Description: 病理系统路由
 * @FilePath: \hwason-laboratory-systems\src\router\pathologicalSystem.ts
 */
import { RouteRecordRaw } from 'vue-router';
// import VerticalLayout from '@/layout/verticalLayout/Index.vue';
import VerticalLayout from '@/layout/verticalLayout/Index.vue';

const pathologicalSystemRouter: Array<RouteRecordRaw> = [
  {
    path: '/pathologicalSystem',
    component: VerticalLayout,
    redirect: '/pathologicalSystem/dashboard',
    name: 'pathologicalSystem',
    meta: {
      title: '病理系统',
    },
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_dashboard" */ '@pathologicalSystem/views/dashboard/Index.vue'
          ),
        name: 'pathologicalSystemDashboard',
        meta: {
          title: 'dashboard',
        }
      },
      //#region 权限管理
      {
        path: '/pathologicalSystem/authorityManagement/userManagement',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_userManagement" */ '@pathologicalSystem/views/authorityManagement/userManagement.vue'
          ),
        name: 'pathologicalSystemUserManagement',
        meta: {
          title: '用户管理',
        }
      },
      {
        path: '/pathologicalSystem/authorityManagement/roleManagement',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_roleManagement" */ '@pathologicalSystem/views/authorityManagement/roleManagement.vue'
          ),
        name: 'pathologicalSystemRoleManagement',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: '/pathologicalSystem/authorityManagement/organizationalStructure',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_organizationalStructure" */ '@pathologicalSystem/views/authorityManagement/organizationalStructure.vue'
          ),
        name: 'pathologicalSystemOrganizationalStructure',
        meta: {
          title: '组织管理 ',
        }
      },
      {
        path: '/pathologicalSystem/authorityManagement/menuManagement',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_menuManagement" */ '@pathologicalSystem/views/authorityManagement/menuManagement.vue'
          ),
        name: 'pathologicalSystemMenuManagement',
        meta: {
          title: '菜单管理 ',
        }
      },
      //#endregion

      //#region 报告项目管理
      {
        path: '/pathologicalSystem/reportProjectManagement/reportItem',
        component: () =>
          import(
            /* webpackChunkName: "pathologicalSystem_reportItem" */ '@pathologicalSystem/views/reportProjectManagement/reportItem.vue'
          ),
        name: 'pathologicalSystemReportItem',
        meta: {
          title: '报告项目',
        }
      },
      //#endregion
    ]
  }
];

export default pathologicalSystemRouter;