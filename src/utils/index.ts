const modules = import.meta.glob('./*.ts');

const utils: { [x: string]: any } = {};

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        if (path.indexOf('Helper') === -1) continue;
        const module: any = await modules[path]();
        if (module.default.className) {
            utils[module.default.className] = module.default;
        }
    }
}
export default utils;