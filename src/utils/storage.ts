/**
 * 该文件统一管理整站的storage管理，包括sessionStorage/localStorage
 * 
 */

export default class storage {
    //#region 清除所有storage
    static clearAllStorage = function () {
        localStorage.clear();
        sessionStorage.clear();
    };
    //#endregion

    //#region session storage
    // 登录设备是否是手机端
    static setIsMobile = function (data: boolean) {
        sessionStorage.setItem('isMobile', JSON.stringify(data));
    };

    static getIsMobile = function() {
        const data = sessionStorage.getItem('isMobile');
        if(data) return JSON.parse(data);
        else return false;
    };




    // 存入isCloud
    static setIsCloud = function (data: Boolean) {
        sessionStorage.setItem('isCloud', JSON.stringify(data));
    };

    static getIsCloud = function () {
        const data = sessionStorage.getItem('isCloud');
        if (data) return JSON.parse(data);
        else return false;
    };

    // 登录表单信息存取
    static setLoginFormInfo = function (formInfo: object) {
        sessionStorage.setItem('loginForm', JSON.stringify(formInfo));
    };

    static getLoginFormInfo = function () {
        const data = sessionStorage.getItem('loginForm');
        if (data) return JSON.parse(data);
        else return null;
    };

    // token存取
    static setToken = function (token: string) {
        sessionStorage.setItem('token', token);
    };

    static getToken = function () {
        return sessionStorage.getItem('token');
    };

    // 登录表单信息存取
    static setUserInfo = function (userInfo: object) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    static getUserInfo = function () {
        const data = sessionStorage.getItem('userInfo');
        if (data) return JSON.parse(data);
        else return null;
    };

    static getUserPathologicalCode = function () {
        let userInfo:any = {};
        const data = sessionStorage.getItem('userInfo');
        if (!data) return false;
        userInfo = JSON.parse(data);
        const count = userInfo.orgstaDepartmentName.split('|').length;
        if (count > 1) {
            const index = userInfo.orgstaDepartmentName.split('|').findIndex((x:any) => x === '病理实验室');
            return userInfo.orgstaDepartmentCode.split(',')[index];
        } else {
            return userInfo.orgstaDepartmentCode;
        }

    };

    // 设置通用参数
    static setCommonParams = function (commonParams: object) {
        sessionStorage.setItem('commonParams', JSON.stringify(commonParams));
    };
    static getCommonParams = function () {
        const data = sessionStorage.getItem('commonParams');
        if (data) return JSON.parse(data);
        else return {};
    };
    //#endregion
}