import { apiMock, apiXXZ } from '@/api/config';

export default {
    // 角色管理
    getRoleList: apiXXZ + '/role/list',
    addRole: apiXXZ + '/role/add',
    updateRole: apiXXZ + '/role/modify',
    deleteRole: apiXXZ + '/role/remove',
    batchDeleteRole: apiXXZ + '/role/remove',

    // 用户管理
    getUserList: apiXXZ + '/user/list',
    addUser: apiXXZ + '/user/add',
    updateUser: apiXXZ + '/user/modify',
    deleteUser: apiXXZ + '/user/remove',
    batchDeleteUser: apiXXZ + '/user/remove',

    // 用户角色
    getUserRoleList: apiXXZ + '/userRole/userHaveRoles',
    updateUserRole: apiXXZ + '/userRole/modify',
    getPermisionByRoleId: apiXXZ + '/rolePermission/getPermisionByRoleId', // 获取角色下的菜单ids
    getUserCreatePermision: apiXXZ + '/rolePermission/userHaveAndCreatePermision', // 获取当前用户创建所有菜单列表
    authorizeByRole: apiXXZ + '/rolePermission/authorizeByRole', // 修改角色的授权

    // 用户机构
    updateUserCal: apiXXZ + '/userCal/modify',  // 更新用户机构

    // 菜单管理
    getMenuList: apiXXZ + '/permission/list',
    getPermisMenuList: apiXXZ + '/permission/getPermisModules',
    getPermisMenuChildList: apiXXZ + '/permission/getPermisTreeByModle',
    addMenu: apiXXZ + '/permission/add',
    updateMenu: apiXXZ + '/permission/modify',
    deleteMenu: apiXXZ + '/permission/remove',
    batchDeleteMenu: apiXXZ + '/permission/remove',
    getCalRootPermissionId: apiXXZ + '/permission/findCalRootPermission', // 获取系统根菜单Id

    // 组织管理
    // getOrgList: api + '/org/list',
    // addOrg: api + '/org/add',
    // updateOrg: api + '/org/update',
    // deleteOrg: api + '/org/delete',
};