export const executeFunctionBody = async (functionBody: string, params: { [x: string]: any } | undefined) => {
    if (!functionBody) return;
    let func: Function | null = null;
    if (params) {
        func = new Function('params', functionBody);
        return await func(params);
    } else {
        func = new Function(functionBody);
        return await func();
    }
};