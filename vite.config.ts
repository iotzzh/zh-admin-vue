import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import { resolve } from 'path'; // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  // 配置需要使用的插件列表
  plugins: [vue(), vueJsx()],

  define: {
    'process.env': {},
  },

  // 静态资源服务的文件夹
  publicDir: 'public',
  base: './',

  // 静态资源处理
  assetsInclude: '',
  // 控制台输出的级别 info 、warn、error、silent
  logLevel: 'info',

  // 配置文件别名，vite1.0是/@/， 2.0改为/@
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, 'src'),
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
    // 浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js1/[name]-[hash]-test.js',
        entryFileNames: 'static/js2/[name]-[hash]-test.js',
        assetFileNames: 'static/[ext]/[name]-[hash]-test.[ext]',
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
        additionalData: '$injectedColor:orange;',
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
  server: {
    host: '0.0.0.0',
    https: false, // 是否启用 http 2
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    port: 9000,
    strictPort: false, // 设为true时端口被占用则直接退出，不会尝试下一个可用端口
    force: true, // 是否强制依赖预构建
    hmr: true, 
    // 禁用或配置 HMR 连接
    // 传递给 chockidar 的文件系统监视器选项
    // watch: {
    //  ignored:["!**/node_modules/your-package-name/**"]
    // },
    // 反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://10.161.2.60:8082/ysb-admin', // 代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

});
