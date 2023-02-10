// 字典帮助类
import { TZHRequestParams } from '@/components/zh-request/type';
import { ref } from 'vue';
import api from '@/api/dictionaryManagement';
import ZHRequest from '@/components/zh-request';

export default class Dictionary {
    //#region 新建时调用接口
    // 获取字典分类编码
    static getDictionariesTypeCode = async function () {
        const params: TZHRequestParams = { url: api.getDictionariesTypeQueryCode, conditions: {}, };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data;
        }
    };

    // 获取字典编码
    static getDictionariesCode = async function () {
        const params: TZHRequestParams = { url: api.getDictionariesQueryCode, conditions: {}, };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data;
        }
    };
    //#endregion

    // 获取字典类型分类列表
    static getDictionariesTypeList = async function () {
        const params: TZHRequestParams = {
            url: api.getDictionariesTypeList,
            conditions: {
                size: 1000,
                current: 1,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.name;
                return x;
            });
        }
        return null;
    };


    // 获取字典类型值列表
    static getDictionariesTypeValueList = async function (dictType: string) {
        const params: TZHRequestParams = {
            url: api.getDictionariesList,
            conditions: {
                size: 1000,
                current: 1,
                dictType,
            },
        };
        const result = await ZHRequest.post(params);
        if (result.success) {
            return result.data.records.map((x: any) => {
                x.label = x.dictName;
                return x;
            });
        }
        return null;
    };
}

