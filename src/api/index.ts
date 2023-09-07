const modules = import.meta.glob('./*.json');
const ENV = import.meta.env;
import rootJson from './index.json';
/**
 * 注释：useMock | localUseMock: 取值为true, false, '', 当''时为继承上一级选择
 * 当useMock | localUseMock 本身或者继承到的值为true时，前缀设置将不生效，只能取apiMock
 */
const isEmpty = (str: string) => {
    return str === undefined || str === null || str === '';
};

let api: { [x: string]: any } = {};
// NOTE: 正式使用时，注意调换判断顺序，部署后禁用mock，由于我这里只是前端项目，所以mock优先~
const getPrefix = (module: any, api: any) => {
    const isLocal = ENV.MODE === 'development';
    if (isLocal) {
        if (api.localUseMock ||
            (isEmpty(api.localUseMock) && module.localUseMock) ||
            (isEmpty(api.localUseMock) && isEmpty(module.localUseMock) && rootJson.localUseMock)) {
            return '/apiMock';
        } else {
            return api.localPrefix || module.localPrefix || rootJson.localPrefix;
        }
    } else {
        if (api.useMock || (isEmpty(api.useMock) && module.useMock) || (isEmpty(api.useMock) && isEmpty(module.useMock) && rootJson.useMock)) {
            return '/apiMock';
        } else {
            return api.localPrefix || module.prefix || rootJson.prefix;
        }
    }
};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        const module: any = await modules[path]();
        const subApi = {};

        if (!module?.default?.api) continue;
        module.default.api.forEach(element => {
            if (element.name in api || element.name in subApi) console.error(`api 定义异常：${element.name}重复定义，请换个名字`);

            const prefix = getPrefix(module.default, element);
            subApi[element.name] = prefix + element.url;
        });

        api = { ...api, ...subApi };
    }
}

export default api;