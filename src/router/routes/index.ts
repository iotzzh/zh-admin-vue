import { RouteRecordRaw } from 'vue-router';

import VerticalLayout from '@/layout/verticalLayout/index.vue';
import H from '@/layout/horizontalLayout/index.vue';
import ZHRequest from '@/components/zh-request';
import { convertMenuArrToTree, updateMenuToRouter } from '@/utils/dataConvert';
import { router } from '..';
import { TZHRequestParams } from '@/components/zh-request/type';
import api from '../../api/login';

export const setLayout = async (data: any, isVertical = true) => {
  // const routes:RouteRecordRaw[] = data;
  // updateMenuToRouter(routes);
  // const rou: RouteRecordRaw =  {
  //   path: '/',
  //   component: isVertical ? VerticalLayout : H,
  //   name: isVertical ? 'root' : 'root1',
  //   children: routes,
  // };

  // router!.addRoute(rou);
};

export const getBasicRoutes = async (isVertical = true) => {
  const params: TZHRequestParams = {
    url: api.getMenus,
    conditions: {},
  };

  const result = await ZHRequest.get(params);
  if (!result.success) return;
  const sortedData = result.data.sort((x:any, y:any) => (Number(x.sortNo) - Number(y.sortNo) > 0) ? 0 : -1);
  const list:RouteRecordRaw[] = convertMenuArrToTree(sortedData);
  updateMenuToRouter(list);
  return [{
    path: '/',
    component: isVertical ? VerticalLayout : H,
    name: isVertical ? 'root' : 'root1',
    children: list,
  }];
  
  // const params = {
  //   url: '/api/menu/list',
  //   conditions: {},
  // };
  // const result = await ZHRequest.post(params);
  // const routes:RouteRecordRaw[] = result.data.records;
  // updateMenuToRouter(routes);
  // return [{
  //   path: '/',
  //   component: isVertical ? VerticalLayout : H,
  //   name: isVertical ? 'root' : 'root1',
  //   children: routes,
  // }];
};

export const basicRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: '登录',
      meta: {
        title: 'login',
        affix: true
      }
    }
];
