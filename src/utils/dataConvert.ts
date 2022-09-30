/*
 * @Author: zzh
 * @Date: 2022-03-01 14:39:16
 * @LastEditors: zzh
<<<<<<< HEAD
 * @LastEditTime: 2022-03-01 16:07:20
 * @Description: 数据转换帮助类
 * @FilePath: \zh-admin\src\utils\dataConvert.ts
 */
interface MenuNode {
    id: string
    parentId: string
    children: Array<MenuNode> | undefined
    systemId: string
    permsionName: string
    menuType: number
    permsionCode: string
    sortNo: number
    url: string
    icon: string
}
=======
 * @LastEditTime: 2022-04-10 17:13:03
 * @Description: 数据转换帮助类
 * @FilePath: \zh-admin\src\utils\dataConvert.ts
 */

import { MenuNode } from '../model/menuNode';
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1

// 由于菜单数据并非一颗树，而是多棵树组成的数据，顾当成由树组成的数组的处理
const convertMenuArrToTree = (array: Array<MenuNode>) => {
    const rootMenus = array.filter(x => x.parentId === '0');
    const childrenMenus = array.filter(x => x.parentId !== '0');
    for (let i = 0; i < rootMenus.length; i++) {
        if (childrenMenus.find(x => x.parentId === rootMenus[i].id)) {
            rootMenus[i].children = getRootMenuChild(rootMenus[i].id, childrenMenus);
        } else {
            rootMenus[i].children = [];
        }
    }
    return rootMenus;
};

const getRootMenuChild = (id: string, childrenMenus: Array<MenuNode>): Array<MenuNode> => {
    const menus = childrenMenus.filter(x => x.parentId === id);
    for (let i = 0; i < menus.length; i++) {
        if (childrenMenus.find(x => x.parentId === menus[i].id)) {
            menus[i].children = getRootMenuChild(menus[i].id, childrenMenus);
        } else {
            menus[i].children = [];
        }
    }
    return menus;
};



export {
<<<<<<< HEAD
    MenuNode,
=======
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
    convertMenuArrToTree,
};
