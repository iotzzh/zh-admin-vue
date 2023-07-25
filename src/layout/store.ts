import { defineStore } from 'pinia';
import { MenuNode, RouteType } from './type';
import LocalStorageHelper from '@/utils/localStorageHelper';

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    cachedViews: [] as RouteType[], // 缓存哪些界面
    collapse: true, // 侧边栏是否展开
    menuList: [] as MenuNode[],
    systemName: '',
    allMenuList: [] as any, // 所有系统的菜单
    isOpenDrawerMenu: false,
    routes: [] as any,
    layout: LocalStorageHelper?.getLayout() || import.meta.env.VITE_LAYOUT || 'vertical',
  }),

  persist: true,
  
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  
  actions: {
    addCachedViews(route: any):void {
      if (!route.name) return;
      if (!this.cachedViews.find((x:any) => x.fullPath == route.fullPath) && !route.meta.fatherPath) this.cachedViews.push(route);
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
    toggleCollapse(isCollapse:boolean | undefined = undefined) {
      if (isCollapse === undefined) {
        this.collapse = !this.collapse;
      } else {
        this.collapse = isCollapse;
      }
    },

    changeIsOpenDrawerMenu(isOpen: boolean) {
      this.isOpenDrawerMenu = isOpen;
    },

    //#region 操作选择哪一个系统的路由
    setAllSystemMenuList(allMenuList:MenuNode[]) {
      this.allMenuList = allMenuList;
    },

    setSystemName(name:string) {
      this.systemName = name;
    },

    setSystemMenuList(menuList:MenuNode[]) {
      this.menuList = menuList;
    },
    //#endregion

    //#region 路由配置数据
    setRoutes(routes:any) {
      this.routes = routes;
    },
    //#endregion

    setLayout(value: string) {
      this.layout = value;
    }, 
  }
});
