import { api, apiSSOLocal, apiSSODev, apiXXZ } from '@/api/config';

export default {
    // 账号登录
    login: apiSSOLocal + '/login/index',
    changeCal: apiSSOLocal + '/login/changeCal',
    getMenus: apiSSOLocal + '/login/getMenus', // 获取当前用户菜单列表
    getCalRootPermissionId: apiXXZ + '/permission/findCalRootPermission', // 获取系统根菜单Id
};
