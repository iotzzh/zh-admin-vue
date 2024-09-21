/// <reference types="vite/client" />
interface window {
    event: { keyCode: number }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}


declare module '@vue/reactivity';

declare module '@vue/reactivity';

declare module 'js-pinyin';

declare module 'aos';

declare module 'electron';

declare module 'element-plus/dist/locale/zh-cn.mjs';

declare module 'splitpanes';

declare module 'nprogress';

declare module 'dayjs';


declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
