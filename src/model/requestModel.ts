/*
 * @Author: zzh
 * @Date: 2022-03-07 09:10:02
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:10:33
 * @Description: 异步请求涉及到的参数类型
 * @FilePath: \zh-admin\src\model\requestModel.ts
 */

interface RequestParamsModel {
    url: string // 请求路径
    conditions: any // 请求参数
    successMessage: string // 接口调用成功时抛出的信息
    notNeedBackEndErrorMessage: boolean // 不需要后端的错误信息， 只抛出前端定义的错误信息
    errorMessage: string // 抛出异常信息
    timeout: number // 超时事件
}


export 
{
    RequestParamsModel
};