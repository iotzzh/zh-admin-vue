import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import config from './vite.config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (dir: string) => path.join(__dirname, dir);

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const currentTime = new Date();
const Timestamp = `${currentTime.getFullYear()}-${
  currentTime.getMonth() + 1
}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}`;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const environment = env.VITE_ENVIRONMENT;
  fs.writeFile(resolve('public/.env'), `environment: ${environment}`, () => {
    /* noop */
  });

  const updatedServer = () => {
    const newServer: any = config.server;
    const keys = Object.keys(newServer.proxy);
    keys.forEach((x: any) => {
      newServer.proxy[x].rewrite = (path: string) => path.replace(x, '');
    });
    return newServer;
  };

  return {
    plugins: [vue(), vueJsx()],

    define: {
      'process.env': {},
    },

    publicDir: 'public',
    base: `${env.VITE_PUBLIC_PATH ? '/' + env.VITE_PUBLIC_PATH + '/' : '/'}`,

    assetsInclude: '',
    logLevel: 'info',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    optimizeDeps: {
      include: ['axios'],
    },

    build: {
      chunkSizeWarningLimit: 1500,
      cssTarget: 'chrome83',
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser',
      cssCodeSplit: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: `static/js-chunk/[name]-[hash]-${Timestamp}.js`,
          entryFileNames: `static/js-entry/[name]-[hash]-${Timestamp}.js`,
          assetFileNames: `static/[ext]/[name]-[hash]-${Timestamp}.[ext]`,
        },
      },
      commonjsOptions: {},
      manifest: false,
    },

    css: {
      modules: {},
      postcss: {},
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/global.scss" as *;\n',
        },
      },
    },

    json: {
      namedExports: true,
      stringify: false,
    },

    // esbuild: {
    //   jsxFactory: 'h',
    //   jsxFragment: 'Fragment',
    //   jsxInject: 'import Vue from \'vue\'',
    // },

    server: updatedServer(),
  };
});
