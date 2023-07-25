import path from 'path';
import fs from 'fs';
import config from './vite.config.json';
// const fs = require('fs');
const resolve = dir => {
    return path.join(__dirname, dir);
};

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
const currentTime = new Date();
const Timestamp = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}`;

// https://vitejs.dev/config/
export default ({ mode }) => {
  // const config = JSON.parse(viteConfig);
  const env = loadEnv(mode, process.cwd());
  const environment = env.VITE_ENVIRONMENT;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile(resolve('public/.env'), `environment: ${environment}`, err => {});
  const updatedServer = () => {
    const newServer = config.server;
    // 更新proxy
    const keys = Object.keys(newServer.proxy);
    keys.forEach((x:any) => {
      newServer.proxy[x].rewrite =  (path) => path.replace(x, '');
    });

    return newServer;
  };

  return defineConfig({
    // 配置需要使用的插件列表
    plugins: [
      vue(), 
      vueJsx(), 
    ],
  
    define: {
      'process.env': {},
    },
  
    // 静态资源服务的文件夹
    publicDir: 'public',
    // base: environment === 'cloud' ? '/test1/' :  '/test2/',
    // base: '/admin/',
    base: `${env.VITE_PUBLIC_PATH ? '/' + env.VITE_PUBLIC_PATH + '/' : './'}`,
    // 静态资源处理
    assetsInclude: '',
    // 控制台输出的级别 info 、warn、error、silent
    logLevel: 'info',
  
    // 配置文件别名，vite1.0是/@/， 2.0改为/@
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      }
    },
  
    // 强制预构建插件包
    optimizeDeps: {
      // 默认情况下，不在 node_modules 中的，链接的包不会预构建
      include: ['axios'],
      // exclude:['your-package-name'] //排除在优化之外
    },
  
    // 打包配置
    build: {
      chunkSizeWarningLimit: 1500, // 打包文件很大是报警 1500kb
      cssTarget:'chrome83',
      // 浏览器兼容性  "esnext"|"modules"
      target: 'esnext',
      outDir: 'dist', // 指定输出路径
      assetsDir: 'assets', // 指定生成静态资源的存放路径
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: false,
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: `static/js-chunk/[name]-[hash]-${Timestamp}.js`,
          entryFileNames: `static/js-entry/[name]-[hash]-${Timestamp}.js`,
          assetFileNames: `static/[ext]/[name]-[hash]-${Timestamp}.[ext]`,
        },
      },
      // @rollup/plugin-commonjs 插件的选项
      commonjsOptions: {
      },
      // 构建的库
      // lib: {},
      // 当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
    },
  
    // css
    css: {
      // 配置 css modules 的行为
      modules: {},
      // postCss 配置
      postcss: {
      },
      // 指定传递给 css 预处理器的选项
      preprocessorOptions: {
        scss: {
          additionalData:'@import "./src/styles/global.scss";',
        },
      },
    },
  
    json: {
      // 是否支持从 .json 文件中进行按名导入
      namedExports: true,
      // 若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
      stringify: false,
    },
  
    // 继承自 esbuild 转换选项，最常见的用例是自定义 JSX
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import Vue from \'vue\'',
    },
  
    // 本地运行配置，及反向代理配置
    server: updatedServer(),
    // server: {
    //   host: '0.0.0.0',
    //   https: false, // 是否启用 http 2
    //   cors: true, // 默认启用并允许任何源
    //   open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //   port: 8000,
    //   strictPort: false, // 设为true时端口被占用则直接退出，不会尝试下一个可用端口
    //   force: true, // 是否强制依赖预构建
    //   hmr: true, // 禁用或配置 HMR 连接
    //   // 反向代理配置，注意rewrite写法
    //   // proxy: config.server.proxy.,
    //   proxy: {
    //     '/apiUser1': {
    //       target: 'http://localhost:9000/', // 后端1
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/apiUser1/, ''),
    //     },
    //   },
    // },
  
  });
};

