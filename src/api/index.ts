const modules = import.meta.glob('./*.ts');

let api:{ [x:string]:any } = {};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        const module:any = await modules[path]();
        api = { ...api, ...module.default};
    }
}

export default api;