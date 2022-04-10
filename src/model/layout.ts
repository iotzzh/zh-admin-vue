
/*
 * @Author: zzh
 * @Date: 2022-03-02 13:29:27
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:10:21
 * @Description: layout相关的model
 * @FilePath: \zh-admin\src\model\layout.ts
 */
interface RouteMetaType {
    title: string
}

interface RouteType {
    fullPath: String | undefined
    hash: String | undefined
    href: String | undefined
    matched: Array<object>
    meta: undefined | RouteMetaType
    name: string | undefined
    params: object
    path: string
    query: object
    redirectedFrom: undefined | object
}


export 
{
    RouteType
};