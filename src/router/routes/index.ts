const modules = import.meta.glob('./*.json');
const ENV = import.meta.env;

const route:Array<any> = [];

for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
        const module:any = await modules[path]();

        // TODO: Validate repeat

        route.push(module);
    }
}

export default route;