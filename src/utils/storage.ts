<<<<<<< HEAD
/**
 * 该文件统一管理整站的storage管理，包括sessionStorage/localStorage
 * 
 */
// const userRoleInfoKey = 'userRoleInfo';
// const userIdKey = 'userId';
// const userNameKey = 'userName';

export default class storage {
    //#region localStorage, 该部分包含整站的localStorage操作
    //#region userRoleInfoKey(当前登录用户的角色信息)
    // 设置当前登录用户的角色信息
    // static setUserRoleInfo = function (params) {
    //     let value = '';
    //     if (typeof params == 'string') {
    //         value = params;
    //     } else {
    //         value = JSON.stringify(params);
    //     }
    //     localStorage.setItem(userRoleInfoKey, value);
    // };   
    //#endregion


    //#region sessionStorage，该部分包含整站的sessionStorage操作
    //#endregion

=======
/*
 * @Author: zzh
 * @Date: 2022-04-10 09:29:01
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:16:07
 * @Description: 该文件统一管理整站的storage管理，包括sessionStorage/localStorage
 * @FilePath: \zh-admin\src\utils\storage.ts
 */
export default class storage {
    //#region 清除所有storage
    static clearAllStorage = function () {
        localStorage.clear();
        sessionStorage.clear();
    };
    //#endregion
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
}