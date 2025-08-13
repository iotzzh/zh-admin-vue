/// <reference types="vite/client" />

// src/@types/global.d.ts - 全局类型声明
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明模块类型，使得 TypeScript 可以识别并处理以 '.svg' 结尾的文件作为模块
declare module '*.svg';

// 同上，但针对的是 '.png' 图像文件
declare module '*.png';

// 针对 '.jpg' 图像文件的模块声明
declare module '*.jpg';

// 针对 '.jpeg' 图像文件的模块声明
declare module '*.jpeg';

// 针对 '.gif' 图像文件的模块声明
declare module '*.gif';

// 针对 '.bmp' 图像文件的模块声明
declare module '*.bmp';

// 针对 '.tiff' 图像文件的模块声明
declare module '*.tiff';

// 声明模块类型以处理 '.yaml' 格式的配置文件
declare module '*.yaml';

// 处理 JSON 文件，使 TypeScript 能够识别并导入 '.json' 文件
declare module '*.json';

// 第三方库声明
declare module 'js-pinyin';
declare module 'aos';
declare module 'splitpanes';
declare module 'nprogress';
declare module 'dayjs';
declare module 'vue-count-to';
declare module '$utils';
