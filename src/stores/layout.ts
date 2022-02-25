/*
 * @Author: zzh
 * @Date: 2022-02-25 09:56:46
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-25 12:14:42
 * @Description: 布局相关store
 * @FilePath: \zh-admin\src\stores\layout.ts
 */
import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
  id: 'layout',

  state: () => ({
    cachedViews: [] as string[],
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
    }
  }
});
