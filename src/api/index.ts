// import * as apiLogin from './login';
// import * as apiAuthorityManagement from './authorityManagement';
// import * as apiCommon from './common';
// import * as apiClientManagement from './clientManagement';
// import * as apiLayout from './layout';


// const api = {
//     ...apiLogin.default,
//     ...apiAuthorityManagement.default,
//     ...apiCommon.default,
//     ...apiClientManagement.default,
//     ...apiLayout.default,
// };

// export default api;

const modules = import.meta.glob('./*.ts');

let api:{ [x:string]:any } = {};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        const module:any = await modules[path]();
        api = { ...api, ...module.default};
    }
}

export default api;