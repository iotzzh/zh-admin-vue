// 获取数据列表操作集合，可以是接口i请求，也可以是静态数据，目前多为数据请求
// 这里请求1000条数据，当数据大于一千条数据时，请考虑模糊搜索远程加载/分段加载等其他方式进行查询
import { TZHRequestParams } from '@/components/zh-request/type';
import { ref } from 'vue';
import api from '@/api/common';
import ZHRequest from '@/components/zh-request';

export default class dataListHelper {

    // 获取收款主体列表
    static getCollectionSubjectLibraryList = async function () {
        const params: TZHRequestParams = { url: api.getCollectionSubjectLibraryList, conditions: {}, };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.coslName;
                return x;
            });
        }
    };

    // 获取省市区
    static getAllRegionList = async function () {
        const params: TZHRequestParams = {
            url: api.getAllRegionList,
            conditions: {
                organizationcode: 'OR022',
                rdCode: 'rd001',
                orgCode: 'OR022'
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data;
        }
    };

    // 获取客户类别列表
    static getClientClassList = async function () {
        const params: TZHRequestParams = {
            url: api.getClientClassList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data;
        }
    };

    // 获取合作商列表
    static getPartnerList = async function () {
        const params: TZHRequestParams = {
            url: api.getPartnerList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.palName;
                return x;
            });
        }
    };

    // 获取客户(医院)列表
    static getClientList = async function () {
        const params: TZHRequestParams = {
            url: api.getClientList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.calName;
                return x;
            });
        }
    };

    // 获取用户客户(医院)列表（用户关联的机构列表）
    static getUserClientList = async function (appoint = true, userId: null | string = null) {
        const params: TZHRequestParams = {
            url: api.getUserCalList,
            conditions: {
                size: 1000,
                current: 1,
                appoint,
                userId,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.map((x: any) => {
                x.label = x.calName;
                return x;
            });
        }
        return null;
    };

    // 获取用户客户(医院)列表（用户创建的机构列表）
    static getUserCreatedClientList = async function (userId: null | string = null, calCode: string, calName: string) {
        const params: TZHRequestParams = {
            url: api.getUserCreatedCalList,
            conditions: {
                size: 1000,
                current: 1,
                createId: userId,
                calCode,
                calName,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.map((x: any) => {
                x.label = x.calName;
                return x;
            });
        }
        return null;
    };

    // 获取角色列表
    static getRoleList = async function () {
        const params: TZHRequestParams = {
            url: api.getRoleList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.roleName;
                return x;
            });
        }
    };

    // 获取当前用户创建的角色列表
    static getUserCreatedRoleList = async function () {
        const params: TZHRequestParams = {
            url: api.getUserCreatedRoleList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.map((x: any) => {
                x.label = x.roleName;
                return x;
            });
        }
    };

    // 获取用户角色列表
    static getUserRoleList = async function (userId: string) {
        const params: TZHRequestParams = {
            url: api.getUserRoleList,
            conditions: {
                userId,
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.map((x: any) => {
                x.label = x.roleName;
                return x;
            });
        }
    };

    // 获取收款主体编码
    static getDictionariesCode = async function () {
        const params: TZHRequestParams = { url: api.getCollectionSubjectCode, conditions: { coslCode: 'COSL' }, };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data;
        }
    };

    // // 获取用户列表
    // static getUserList = async function () {
    //     const params = {
    //         url: apiDEVCloudlabadmin + '/organizingStaff/list',
    //         conditions: {
    //             current: 1,
    //             size: 10000,
    //             isShowSign: false
    //         },
    //         errorMessage: '获取用户列表失败'
    //     } as any;

    //     const result = await post(params);
    //     if (result.success) {
    //         return result.data.records.map((x: any) => {
    //             x.label = x.orgstaFullName;
    //             return x;
    //         });
    //     }
    // };

}

// 树状图递归方法
const toTree = function (data: any) {
    data.forEach(function (item: any) {
        delete item.children;
    });
    const map = {};
    data.forEach(function (item: any) {
        map[item.orgCode] = item;
    });
    const val = [] as any;
    data.forEach(function (item: any) {
        const parent = map[item.orgSuperior];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            val.push(item);
        }
    });
    return val;
};

const getTree = (data: any) => {
    data.forEach(function (item: any) {
        delete item.children;
    });
    const map = {};
    data.forEach(function (item: any) {
        map[item.id] = item;
    });
    const treeData = ref([]) as any; //定义数组为空
    data.forEach(function (item: any) {
        const parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
            parent.children.forEach(
                (i: any) => {
                    if (i.level === 2) {
                        i.totalCode = parent.classficationCode.substring(0, parent.classficationCode.length - 1) + i.classficationCode;
                    } else {
                        i.totalCode = parent.totalCode.substring(0, parent.totalCode.length - 1) + i.classficationCode;
                    }
                }
            );
        } else {
            treeData.value.push(item);
        }
    });
    return treeData;
};

const getTreeMethod = (data: any) => {
    data.forEach(function (item: any) {
        delete item.children;
    });
    const map = {};
    data.forEach(function (item: any) {
        map[item.id] = item;
    });
    const treeData: any = []; //定义数组为空
    data.forEach(function (item: any) {
        const parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            treeData.push(item);
        }
    });
    return treeData;
};