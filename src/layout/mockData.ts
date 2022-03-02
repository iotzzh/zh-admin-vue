/*
 * @Author: zzh
 * @Date: 2022-03-01 14:54:11
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-01 17:53:36
 * @Description: layout mock data
 * @FilePath: \zh-admin\src\layout\mockData.ts
 */
const menuListData = [
    {
        'id': '83065105051861056',
        'systemId': '83065105051861056',
        'parentId': '0',
        'permsionName': '权限管理',
        'url': '/authority ',
        'menuType': 1,
        'permsionCode': 'authority',
        'sortNo': 2,
        'icon': 'iconfont iconquanxian'
    },
    {
        'id': '83065799775404096',
        'systemId': '83065105051861056',
        'parentId': '83065105051861056',
        'permsionName': '用户管理',
        'url': '/authorityManagement/userManagement',
        'menuType': 2,
        'permsionCode': 'userManagement',
        'sortNo': 1,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '83066220518621248',
        'systemId': '83065105051861056',
        'parentId': '83065105051861056',
        'permsionName': '角色管理',
        'url': '/authorityManagement/roleManagement',
        'menuType': 2,
        'permsionCode': 'roleManagement',
        'sortNo': 2,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '83066395060387904',
        'systemId': '83065105051861056',
        'parentId': '83065105051861056',
        'permsionName': '组织架构',
        'url': '/authorityManagement/organizationalStructure',
        'menuType': 2,
        'permsionCode': 'organizationalStructure',
        'sortNo': 3,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '83066537318596672',
        'systemId': '83065105051861056',
        'parentId': '83065105051861056',
        'permsionName': '菜单管理',
        'url': '/authorityManagement/menuManagement',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '83065799817347136111',
        'systemId': '83065105051861056',
        'parentId': '83065799775404096',
        'permsionName': '测试三级菜单',
        'menuType': 3,
        'permsionCode': 'userManagement:add',
        'sortNo': 1
    },
    {
        'id': '830657998173471371111',
        'systemId': '83065105051861056',
        'parentId': '83065799775404096',
        'permsionName': '测试三级菜单111',
        'menuType': 3,
        'permsionCode': 'userManagement:add111',
        'sortNo': 1
    },
    {
        'id': '83065799817347137111111111',
        'systemId': '83065105051861056',
        'parentId': '830657998173471371111',
        'permsionName': '测试四级菜单111',
        'menuType': 3,
        'permsionCode': 'userManagement:add11111111',
        'sortNo': 1
    },
    {
        'id': '83065105051861057',
        'systemId': '83065105051861057',
        'parentId': '0',
        'permsionName': '权限管理1',
        'url': '/authority ',
        'menuType': 1,
        'permsionCode': 'authority',
        'sortNo': 3,
        'icon': 'iconfont iconquanxian'
    },
    {
        'id': '830651050518610571',
        'systemId': '83065105051861057',
        'parentId': '83065105051861057',
        'permsionName': '用户管理1',
        'url': '/authorityManagement/userManagement',
        'menuType': 2,
        'permsionCode': 'userManagement',
        'sortNo': 1,
        'icon': 'iconfont icondingdan'
    },

];


export {
    menuListData,
};