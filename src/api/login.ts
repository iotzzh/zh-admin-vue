import { apiMock, apiSSOLocal, apiSSODev, apiUser2 } from '@/api/config';

export default {
    // 账号登录: sso
    login: apiMock + '/login/index',
    changeCal: apiMock + '/login/changeCal',
    getMenus: apiMock + '/login/getMenus', // 获取当前用户菜单列表

    // not sso
    getCalRootPermissionId: apiMock + '/permission/findCalRootPermission', // 获取系统根菜单Id
};
