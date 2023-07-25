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

interface MenuNode {
    id: string
    name: string
    routeName: string
    parentId: string
    children: Array<MenuNode> | undefined
    systemId: string
    menuType: number
    permsionCode: string
    sortNo: number
    url: string
    icon: string
}


export 
{
    RouteType,
    MenuNode
};