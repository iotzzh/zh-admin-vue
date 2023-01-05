import { RouteRecordRaw } from 'vue-router';

import VerticalLayout from '@/layout/verticalLayout/index.vue';
import H from '@/layout/horizontalLayout/index.vue';
import ZHRequest from '@/components/zh-request';
import { convertMenuArrToTree, updateMenuToRouter } from '@/utils/dataConvert';

export const getBasicRoutes = async (isVertical = true) => {
  const params = {
    url: '/api/menu/list',
    conditions: {},
  };
  const result = await ZHRequest.post(params);
  console.log(result);
  // RouteRecordRaw[]
  const routes:RouteRecordRaw[] = result.data.records;
  updateMenuToRouter(routes);
  return [{
    path: '/',
    component: isVertical ? VerticalLayout : H,
    name: isVertical ? 'root' : 'root1',
    children: routes,
  }];
};

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: H,
    name: 'root',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/layoutExamplesExample1',
        name: 'layoutExamplesExample1',
        component: () => import('@/examples/zh-layout-examples/eaxmple1.vue'),
        meta: {
          title: 'layoutExamplesExample1',
        },
      },
      {
        path: '/tableExample1',
        name: 'tableExample1',
        component: () => import('@/examples/zh-table-examples/example1.vue'),
        meta: {
          title: 'tableExample1',
        },
      },
      {
        path: '/tableExample2',
        name: 'tableExample2',
        component: () => import('@/examples/zh-virtual-scroll-table-examples/example1.vue'),
        meta: {
          title: 'tableExample2',
        },
      }
    ],
  },
  // {
  //   path: '/examples',
  //   name: 'examples',
  //   component: () => import('@/examples/index.vue'),
  //   meta: {
  //     title: 'examples',
  //   },
  //   children: [
  //     {
  //       path: '/d',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index.vue'),
  //       meta: {
  //         title: 'Dashboard',
  //       },
  //     },

  //   ],
  // },
  // {
  //   path: '/d',
  //   name: 'Dashboard',
  //   component: () => import('@/views/dashboard/index.vue'),
  //   meta: {
  //     title: 'Dashboard',
  //   },
  // },
  // {
  //   path: '/layoutExamplesExample1',
  //   name: 'layoutExamplesExample1',
  //   component: () => import('@/examples/zh-layout-examples/eaxmple1.vue'),
  //   meta: {
  //     title: 'layoutExamplesExample1',
  //   },
  // },
  // {
  //   path: '/tableExample1',
  //   name: 'tableExample1',
  //   component: () => import('@/examples/zh-table-examples/example1.vue'),
  //   meta: {
  //     title: 'tableExample1',
  //   },
  // },
  // {
  //   path: '/treeExample1',
  //   name: 'treeExample1',
  //   component: () => import('@/examples/zh-tree-examples/example1.vue'),
  //   meta: {
  //     title: 'treeExample1',
  //   },
  // }
  // {
  //   path: '/tableExample2',
  //   name: 'tableExample2',
  //   component: () => import('@/examples/zh-virtual-scroll-table-examples/example1.vue'),
  //   meta: {
  //     title: 'tableExample2',
  //   },
  // }
];
