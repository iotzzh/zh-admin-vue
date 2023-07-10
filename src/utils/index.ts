const modules = import.meta.glob('./*.ts');

const utils:{ [x:string]:any } = {};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        if (path.indexOf('Helper') === -1) continue;
        const module:any = await modules[path]();
        utils[module.default.name] = module.default;
    }
}

window.utils = utils;
export default utils;