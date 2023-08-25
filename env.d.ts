/// <reference types="vite/client" />
interface window {
    event: { keyCode: number }
}

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'js-pinyin';

declare module 'aos';

declare module 'electron';

declare module 'element-plus/dist/locale/zh-cn.mjs';

declare module 'splitpanes';

declare module 'nprogress';
