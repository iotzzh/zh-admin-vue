// 保留 src/env.d.ts 用于 Vite 客户端类型引用

// declare module '*.svg';
// declare module '*.png';
// declare module '*.jpg';
// declare module '*.jpeg';
// declare module '*.gif';
// declare module '*.bmp';
// declare module '*.tiff';
// declare module '*.json';
// declare module '*.yaml';

// src/types/vite-config.d.ts
interface ViteConfig {
  server: {
    port: number;
    strictPort: boolean;
    host: string;
    https: boolean;
    cors: boolean;
    open: boolean;
    hmr: boolean;
    proxy: Record<
      string,
      {
        target: string;
        changeOrigin: boolean;
      }
    >;
  };
  optimizeDeps: {
    force: boolean;
  };
}
