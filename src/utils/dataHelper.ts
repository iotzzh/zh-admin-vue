

// export default class NewDataHelper {
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
//     };

//     static getRootChild = (id: string, childs: Array<any>) => {
//         for (let i = 0; i < childs.length; i++) {
//             if (childs.find(x => x.parentId === childs[i].id)) {
//                 childs[i].children = this.getRootChild(childs[i].id, childs);
//             } else {
//                 childs[i].children = [];
//             }
//         }
//     };    

// }


// DOM操作
export default class DataHelper {
    static convertArrayToTree = (arrayData: Array<{ [x: string]: any }>) => {
        const roots = arrayData.filter(x => !x.parentId);
        const childs = arrayData.filter(x => x.parentId);
        for (let i = 0; i < roots.length; i++) {
            if (childs.find(x => x.parentId === roots[i].id)) {
                // roots[i].children = this.getRootChild(roots[i].id, childs);
            } else {
                roots[i].children = [];
            }

        }
    };

    // static getRootChild = (id: string, childs: Array<any>) => {
    //     for (let i = 0; i < childs.length; i++) {
    //         if (childs.find(x => x.parentId === childs[i].id)) {
    //             childs[i].children = this.getRootChild(childs[i].id, childs);
    //         } else {
    //             childs[i].children = [];
    //         }
    //     }
    // };  
}