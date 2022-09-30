/*
 * @Author: zzh
 * @Date: 2022-03-21 15:50:36
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:15:31
 * @Description: 常用的数据列表请求
 * @FilePath: \zh-admin\src\utils\dataListHelper.ts
 */
import { post } from '@/utils/request';
import { popErrorMessage } from '@/components/hs-message';

export default class dataListHelper {
    // 获取下拉列表
    static getDropList = async function () {
        return [
            { label: '条件1', value: '条件1' },
            { label: '条件2', value: '条件2' },
        ];
    };
}
