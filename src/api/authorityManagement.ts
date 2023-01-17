import { api, apiXXZ } from '@/api/config';

export default {
    // 角色管理
    getRoleList: apiXXZ + '/userRole/userHaveRoles',
    addRole: apiXXZ + '/role/add',
    updateRole: apiXXZ + '/role/modify',
    deleteRole: apiXXZ + '/role/remove',
    batchDeleteRole: apiXXZ + '/role/remove',

    // 用户管理
    getUserList: api + '/user/list',
    addUser: api + '/user/add',
    updateUser: api + '/user/modify',
    deleteUser: api + '/user/remove',
    batchDeleteUser: api + '/user/remove',

    // 菜单管理
    getMenuList: api + '/menu/list',
    addMenu: api + '/menu/add',
    updateMenu: api + '/menu/update',
    deleteMenu: api + '/menu/delete',
    batchDeleteMenu: api + '/menu/batchDelete',

    // 组织管理
    getOrgList: api + '/org/list',
    addOrg: api + '/org/add',
    updateOrg: api + '/org/update',
    deleteOrg: api + '/org/delete',
};