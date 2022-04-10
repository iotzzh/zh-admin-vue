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
}