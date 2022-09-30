<<<<<<< HEAD
/// <reference types="vite/client" />
interface window {
    event: { keyCode: number }
}
=======
/// <reference types="vite/client" />
interface window {
    event: { keyCode: number }
}

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'js-pinyin';
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
