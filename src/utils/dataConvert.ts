// 数据转换工具

import storage from './storage';

// 由于菜单数据并非一颗树，而是多棵树组成的数据，顾当成由树组成的数组的处理
const convertMenuArrToTree = (array: Array<any>) => {
    const rootId = storage.getRootId();
    const rootMenus = array.filter(x => x.parentId === rootId);
    const childrenMenus = array.filter(x => x.parentId !== '');
    // for (let i = 0; i < rootMenus.length; i++) {
    //     // rootMenus[i].component = () => import(/* @vite-ignore */'/src/' + rootMenus[i].filePath);

    //     rootMenus[i].meta = { ...rootMenus[i].meta };
    //     rootMenus[i].meta.title = rootMenus[i].permsionName;
    //     // array[i].meta.fatherPath = array[i].fatherPath;

    //     rootMenus[i].name = rootMenus[i].routeName;
    //     rootMenus[i].path = rootMenus[i].url || '/';

    //     if (rootMenus[i].filePath) {
    //         rootMenus[i].component = () => import(/* @vite-ignore */'/src/' + rootMenus[i].filePath + '.vue');
    //     }
    // }

    for (let i = 0; i < rootMenus.length; i++) {
        if (childrenMenus.find(x => x.parentId === rootMenus[i].id)) {
            rootMenus[i].children = getRootMenuChild(rootMenus[i].id, childrenMenus);
        } else {
            rootMenus[i].children = [];
        }
    }
    return rootMenus;
};

const getRootMenuChild = (id: string, childrenMenus: Array<any>): Array<any> => {
    const menus = childrenMenus.filter(x => x.parentId === id && x.menuType !== 3);
    for (let i = 0; i < menus.length; i++) {
        if (childrenMenus.find(x => x.parentId === menus[i].id)) {
            menus[i].children = getRootMenuChild(menus[i].id, childrenMenus);
        } else {
            menus[i].children = [];
        }
    }
    return menus;
};

const modules = import.meta.glob('../views/**');

const updateMenuToRouter = (array: Array<any>) => {
    for (const element of array) {
        element.meta = { ...element.meta };
        element.meta.title = element.permsionName;
        // array[i].meta.fatherPath = array[i].fatherPath;

        element.name = element.routeName;
        element.path = element.url || '/';

        if (element.filePath) {
            // array[i].component = () => import(/* @vite-ignore */'/src/' + array[i].filePath + '.vue');
            // array[i].component = () => import(/* @vite-ignore */'../' + array[i].filePath + '.vue');
            element.component = modules['../' + element.filePath + '.vue'];
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (!array[i].children) continue;
        for (let j = 0;  j < array[i].children.length; j++) {
            updateMenuToRouter(array[i].children);
        }
    }
};

export {
    convertMenuArrToTree,
    updateMenuToRouter
};
