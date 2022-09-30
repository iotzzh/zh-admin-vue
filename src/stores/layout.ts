/*
 * @Author: zzh
 * @Date: 2022-02-25 09:56:46
 * @LastEditors: zzh
<<<<<<< HEAD
 * @LastEditTime: 2022-03-02 14:03:33
=======
 * @LastEditTime: 2022-04-10 17:11:40
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
 * @Description: 布局相关store
 * @FilePath: \hwason-laboratory-systems\src\stores\layout.ts
 */
import { defineStore } from 'pinia';
import { RouteType } from '../model/layout';
<<<<<<< HEAD
=======
import { MenuNode } from '../model/menuNode';
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1

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
<<<<<<< HEAD
    },

    removeCachedView(cachedView: RouteType):void {
        this.cachedViews = this.cachedViews.filter(x => x.fullPath != cachedView.fullPath);
    },

    // 开启/关闭左侧tab栏函数
    toggleCollapse() {
      this.collapse = !this.collapse;
    }
=======
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
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
  }
});
