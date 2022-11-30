import { RouteRecordRaw } from 'vue-router';

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/examples',
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/examples/index.vue'),
    meta: {
      title: 'examples',
    },
    children: [
      {
        path: '/d',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
    ],
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
    path: '/treeExample1',
    name: 'treeExample1',
    component: () => import('@/examples/zh-tree-examples/example1.vue'),
    meta: {
      title: 'treeExample1',
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
];
