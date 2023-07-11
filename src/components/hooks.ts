import { createApp } from 'vue';

export const createVueComponent = (conmponentName: string, template: string, props: any, data:any = {}, methods:any = {}, onMounted:any = {}) => {
    const app = createApp({});
    app.component(conmponentName, {
        template: template,
        data: () => data,
        props,
        methods,
        onMounted,
    });
    return app.component(conmponentName);
};