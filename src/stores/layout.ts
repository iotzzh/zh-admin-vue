/*
 * @Author: zzh
 * @Date: 2022-02-25 09:56:46
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:11:40
 * @Description: 布局相关store
 * @FilePath: \zh-admin\src\stores\layout.ts
 */
import { defineStore } from 'pinia';
import { RouteType } from '../model/layout';
import { MenuNode } from '../model/menuNode';

export const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    cachedViews: [] as RouteType[], // 缓存哪些界面
    collapse: true, // 侧边栏是否展开
    menuList: [] as MenuNode[],
  }),

  persist: true,
  
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

    updateCachedViews(cachedViews: RouteType[]):void {
      this.cachedViews = cachedViews;
    },

    clearCachedViews():void {
      this.cachedViews = [];
    },


    // 开启/关闭左侧tab栏函数
    toggleCollapse() {
      this.collapse = !this.collapse;
    },

    //#region 操作选择哪一个系统的路由
    setSystemMenuList(menuList:MenuNode[]) {
      this.menuList = menuList;
    },
    //#endregion
  }
});
