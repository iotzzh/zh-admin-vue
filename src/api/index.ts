// 使用 ES6 的动态导入功能，通过 import.meta.glob 动态加载所有以 ".json" 结尾的模块
const modules = import.meta.glob('./*.json');

// 获取当前模块的环境变量，通常用于区分不同的运行环境，如开发、测试、生产等
// import.meta.env 是 Vite 和 Vue3 中提供的特性，可以获取到编译时的环境信息
const ENV = import.meta.env;

// 使用常规的 ES6 模块导入语句，从当前目录下的 'index.json' 文件中导入数据
// 这个数据会被解析成 JavaScript 对象并赋值给变量 rootJson
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

    // 检查环境变量 VITE_ENVIRONMENT 是否等于 'local' 来判断是否处于本地开发环境
    const isLocal = ENV.VITE_ENVIRONMENT === 'local';

    // 如果是本地环境
    if (isLocal) {

        // 判断是否使用本地模拟数据
        if (api.localUseMock ||
            (isEmpty(api.localUseMock) && module.localUseMock) ||
            (isEmpty(api.localUseMock) && isEmpty(module.localUseMock) && rootJson.localUseMock)) {

            // 如果任一条件满足，则返回 '/apiMock' 作为前缀
            return '/apiMock';
        } else {

            // 否则，返回 "api.localPrefix", "module.localPrefix" 或 "rootJson.localPrefix" 中的第一个非空值作为前缀
            return api.localPrefix || module.localPrefix || rootJson.localPrefix;
        }

    // 如果不是本地环境
    } else {

        // 判断是否使用模拟数据
        if (api.useMock || (isEmpty(api.useMock) && module.useMock) || (isEmpty(api.useMock) && isEmpty(module.useMock) && rootJson.useMock)) {

            // 如果任一条件满足，则返回 '/apiMock' 作为前缀
            return '/apiMock';
        } else {

            // 否则，返回 "api.localPrefix", "module.prefix" 或 "rootJson.prefix" 中的第一个非空值作为前缀
            return api.localPrefix || module.prefix || rootJson.prefix;
        }
    }
};

// 开始遍历模块对象中的每个属性，这些属性通常代表不同的模块路径
for (const path in modules) {
    // 检查当前遍历的属性是否直接存在于模块对象上，避免原型链上的属性干扰
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        // 异步加载模块，这里的模块应该是一个动态导入的函数
        const module: any = await modules[path]();

        // 创建一个空对象用于存放当前模块的子API
        const subApi = {};

        // 如果模块没有默认导出的 'api' 属性，则跳过此模块
        if (!module?.default?.api) continue;

        // 遍历模块中定义的API数组
        module.default.api.forEach(element => {
            // 检查是否有同名API存在，如果有则输出错误信息，防止API名称冲突
            if (element.name in api || element.name in subApi) 
                console.error(`api 定义异常：${element.name}重复定义，请换个名字`);

            // 获取当前API的前缀，这个前缀可能与模块配置有关
            const prefix = getPrefix(module.default, element);

            // 构造API的完整URL并存入子API对象中
            subApi[element.name] = prefix + element.url;
        });

        // 将当前模块的子API合并到主API对象中，扩展其功能
        api = { ...api, ...subApi };
    }
}


export default api;