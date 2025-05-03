// 导入所有界面下的文件，主要用作生成路由时，获取文件路径
const modules = import.meta.glob('../views/**');

/**
 * 递归：将路由数据，生成路由
 * @param jsonArray
 * @param route
 */
export const convertJsonArrayToRoute = (jsonArray: any, route: any) => {
  for (let i = 0; i < jsonArray.length; i++) {
    route[i] = {
      name: jsonArray[i].routeName,
      path: jsonArray[i].url || '/',
      meta: { title: jsonArray[i].routeName, ...jsonArray[i].meta },
    };
    // 如果是菜单，就添加路由文件
    if (jsonArray[i].menuType === 2) {
      route[i].component = modules['../views' + jsonArray[i].filePath + '.vue'];
    }
    if (jsonArray[i].children) {
      route[i].children = [];
      convertJsonArrayToRoute(jsonArray[i].children, route[i].children);
    }
  }
};
