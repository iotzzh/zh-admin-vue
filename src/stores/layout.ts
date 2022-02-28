/*
 * @Author: zzh
 * @Date: 2022-02-25 09:56:46
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-28 15:03:04
 * @Description: 布局相关store
 * @FilePath: \zh-admin\src\stores\layout.ts
 */
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    cachedViews: [] as string[], // 缓存哪些界面
    collapse: true, // 侧边栏是否展开

  }),
  
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  
  actions: {
    addCachedViews(title: string):void {
        this.cachedViews.push(title);
    },

    removeCachedViewsByTitle(title: string):void {
        this.cachedViews = this.cachedViews.filter(x => x != title);
    },
    
    removeCachedViewsByIndex(index: number): void {
        this.cachedViews = this.cachedViews.splice(index, 1);
    },

    // 开启/关闭左侧tab栏函数
    toggleCollapse() {
      this.collapse = !this.collapse;
    }
  }
});
