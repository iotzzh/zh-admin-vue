import { apiMock } from '@/api/config';

export default {
    // 用户管理
    getUserList: apiMock + '/user/list',
    addUser: apiMock + '/user/add',
    updateUser: apiMock + '/user/modify',
    deleteUser: apiMock + '/user/remove',
    batchDeleteUser: apiMock + '/user/remove',

    // 菜单管理
    getMenuList: apiMock + '/menu/list',
    addMenu: apiMock + '/menu/add',
    updateMenu: apiMock + '/menu/modify',
    deleteMenu: apiMock + '/menu/remove',
    batchDeleteMenu: apiMock + '/menu/remove',
    // getCalRootPermissionId: apiMock + '/permission/findCalRootPermission', // 获取系统根菜单Id

    // 角色管理
    getRoleList: apiMock + '/role/list',
    addRole: apiMock + '/role/add',
    updateRole: apiMock + '/role/modify',
    deleteRole: apiMock + '/role/remove',
    batchDeleteRole: apiMock + '/role/remove',

    // 用户角色
    getUserRoleList: apiMock + '/userRole/userHaveRoles',
    updateUserRole: apiMock + '/userRole/modify',
    getPermisionByRoleId: apiMock + '/rolePermission/getPermisionByRoleId', // 获取角色下的菜单ids
    getUserCreatePermision: apiMock + '/rolePermission/userHaveAndCreatePermision', // 获取当前用户创建所有菜单列表
    authorizeByRole: apiMock + '/rolePermission/authorizeByRole', // 修改角色的授权

    // 用户机构
    updateUserCal: apiMock + '/userCal/modify',  // 更新用户机构



    // 组织管理
    // getOrgList: api + '/org/list',
    // addOrg: api + '/org/add',
    // updateOrg: api + '/org/update',
    // deleteOrg: api + '/org/delete',
};