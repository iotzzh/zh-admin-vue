/*
 * @Author: zzh
 * @Date: 2022-02-25 09:56:46
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-02 14:03:33
 * @Description: 布局相关store
 * @FilePath: \hwason-laboratory-systems\src\stores\layout.ts
 */
import { defineStore } from 'pinia';
import { RouteType } from '../model/layout';

export const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    cachedViews: [] as RouteType[], // 缓存哪些界面
    collapse: true, // 侧边栏是否展开

  }),
  
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  
  actions: {
    addCachedViews(route: any):void {
      !this.cachedViews.some(x => x.fullPath == route.fullPath && !route.meta.fatherPath) && this.cachedViews.push(route);
    },

    removeCachedView(cachedView: RouteType):void {
        this.cachedViews = this.cachedViews.filter(x => x.fullPath != cachedView.fullPath);
    },

    // 开启/关闭左侧tab栏函数
    toggleCollapse() {
      this.collapse = !this.collapse;
    }
  }
});
