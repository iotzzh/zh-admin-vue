import { api } from '@/api/config';

export default {
    // 用户管理
    getUserList: api + '/user/list',
    addUser: api + '/user/add',
    updateUser: api + '/user/update',
    deleteUser: api + '/user/delete',
    batchDeleteUser: api + '/user/batchDelete',

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