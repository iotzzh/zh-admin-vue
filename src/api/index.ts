const modules = import.meta.glob('./*.json');
const ENV = import.meta.env;

let api:{ [x:string]:any } = {};
const getPrefix = (module:any, api:any) => {
    if (module.useCommonConfig) {
        return module.useMock ? 'apiMock' :  ENV.MODE === 'development' ? module.localPrefix : module.prefix;
    } else {
        return api.useMock ? 'apiMock' : ENV.MODE === 'development' ?  api.localPrefix :  api.prefix;
    }

};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        const module:any = await modules[path]();
        const subApi = {};
        module.default.api.forEach(element => {
            if (element.name in api || element.name in subApi) console.error(`api 定义异常：${element.name}重复定义，请换个名字`);

            const prefix = getPrefix(module.default, element);
            subApi[element.name] = '/' + prefix + element.url;
        });

        api = { ...api, ...subApi };
    }
}

export default api;