export const convertJsonArrayToRoute = (jsonArray:any, route:any) => {
    for (let i = 0; i < jsonArray.length; i++) {
        route[i] = {
            name: jsonArray[i].routeName,
            path: jsonArray[i].url || '/',
            meta: { title: jsonArray[i].routeName, ...jsonArray[i].meta  },
        };
        if (jsonArray[i].menuType === 2) route[i].component = () => import(/* @vite-ignore */'/src/views' + jsonArray[i].filePath + '.vue');
        if (jsonArray[i].children) {
            route[i].children = [];
            convertJsonArrayToRoute(jsonArray[i].children, route[i].children);
        }
    }
};


// const convertMenuArrToTree = (array: Array<any>) => {
//     // const rootId = storage.getRootId();
//     const rootMenus = array.filter(x => x.parentId === 0);
//     const childrenMenus = array.filter(x => x.parentId !== '');
//     // for (let i = 0; i < rootMenus.length; i++) {
//     //     // rootMenus[i].component = () => import(/* @vite-ignore */'/src/' + rootMenus[i].filePath);

//     //     rootMenus[i].meta = { ...rootMenus[i].meta };
//     //     rootMenus[i].meta.title = rootMenus[i].routeName;
//     //     // array[i].meta.fatherPath = array[i].fatherPath;

//     //     rootMenus[i].name = rootMenus[i].routeName;
//     //     rootMenus[i].path = rootMenus[i].url || '/';

//     //     if (rootMenus[i].filePath) {
//     //         rootMenus[i].component = () => import(/* @vite-ignore */'/src/' + rootMenus[i].filePath + '.vue');
//     //     }
//     // }

//     for (let i = 0; i < rootMenus.length; i++) {
//         if (childrenMenus.find(x => x.parentId === rootMenus[i].id)) {
//             rootMenus[i].children = getRootMenuChild(rootMenus[i].id, childrenMenus);
//         } else {
//             rootMenus[i].children = [];
//         }
//     }
//     return rootMenus;
// };

// const getRootMenuChild = (id: string, childrenMenus: Array<any>): Array<any> => {
//     const menus = childrenMenus.filter(x => x.parentId === id && x.menuType !== 3);
//     for (let i = 0; i < menus.length; i++) {
//         if (childrenMenus.find(x => x.parentId === menus[i].id)) {
//             menus[i].children = getRootMenuChild(menus[i].id, childrenMenus);
//         } else {
//             menus[i].children = [];
//         }
//     }
//     return menus;
// };

// const modules = import.meta.glob('../views/**');

// const updateMenuToRouter = (array: Array<any>) => {
//     for (const element of array) {
//         element.meta = { ...element.meta };
//         element.meta.title = element.routeName;
//         // array[i].meta.fatherPath = array[i].fatherPath;

//         element.name = element.routeName;
//         element.path = element.url || '/';

//         if (element.filePath) {
//             // array[i].component = () => import(/* @vite-ignore */'/src/' + array[i].filePath + '.vue');
//             // array[i].component = () => import(/* @vite-ignore */'../' + array[i].filePath + '.vue');
//             element.component = modules['../' + element.filePath + '.vue'];
//         }
//     }

//     for (let i = 0; i < array.length; i++) {
//         if (!array[i].children) continue;
//         for (let j = 0;  j < array[i].children.length; j++) {
//             updateMenuToRouter(array[i].children);
//         }
//     }
// };


// export default class DataHelper {
//     static classname = 'DataHelper';
//     static getRootChild = (id: string, childs: Array<any>) => {
//         for (let i = 0; i < childs.length; i++) {
//             if (childs.find(x => x.parentId === id)) {
//                 childs[i].children = this.getRootChild(childs[i].id, childs.find(x => x.parentId === id));
//             } else {
//                 childs[i].children = [];
//             }
//         }
//         return childs;
//     };  

//     static convertArrayToTree = (arrayData: Array<{ [x: string]: any }>) => {
//         const roots = arrayData.filter(x => !x.parentId);
//         const childs = arrayData.filter(x => x.parentId);
//         for (let i = 0; i < roots.length; i++) {
//             if (childs.find(x => x.parentId === roots[i].id)) {
//                 roots[i].children = this.getRootChild(roots[i].id, childs);
//             } else {
//                 roots[i].children = [];
//             }
//         }
        
//         return roots;
//     };
// }