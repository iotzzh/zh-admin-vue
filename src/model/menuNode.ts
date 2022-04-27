/*
 * @Author: zzh
 * @Date: 2022-03-04 15:44:31
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:10:27
 * @Description: 菜单所需的node
 * @FilePath: \zh-admin\src\model\menuNode.ts
 */

interface MenuNode {
    id: string
    parentId: string
    children: Array<MenuNode> | undefined
    systemId: string
    menuName: string
    menuType: number
    permsionCode: string
    sortNo: number
    url: string
    icon: string
}

export 
{
    MenuNode
};
