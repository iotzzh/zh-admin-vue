
/*
 * @Author: zzh
 * @Date: 2022-03-02 13:29:27
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-02 13:49:36
 * @Description: layout相关的model
 * @FilePath: \hwason-laboratory-systems\src\model\layout.ts
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