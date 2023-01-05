// 由于菜单数据并非一颗树，而是多棵树组成的数据，顾当成由树组成的数组的处理
const convertMenuArrToTree = (array: Array<any>) => {
    const rootMenus = array.filter(x => x.parentId === '');
    const childrenMenus = array.filter(x => x.parentId !== '');
    for (let i = 0; i < rootMenus.length; i++) {
        rootMenus[i].component = () => import('/src/' + rootMenus[i].componentPath);
    }

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

const updateMenuToRouter = (array: Array<any>) => {
    for (let i = 0; i < array.length; i++) {
        array[i].meta = { ...array[i].meta };
        array[i].meta.title = array[i].permsionName;
        array[i].path = array[i].url || '/';

        if (array[i].menuType === 2) {
            array[i].component = () => import('/src/' + array[i].filePath + '.vue');
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (!array[i].children) continue;
        for (let j = 0;  j < array[i].children.length; j++) {
            updateMenuToRouter(array[i].children);
        }
        // if (childrenMenus.find(x => x.parentId === rootMenus[i].id)) {
        //     rootMenus[i].children = getRootMenuChild(rootMenus[i].id, childrenMenus);
        // } else {
        //     rootMenus[i].children = [];
        // }
    }
    // return rootMenus;
};

export {
    convertMenuArrToTree,
    updateMenuToRouter
};
