<<<<<<< HEAD
* vue3 + TS + Pinia + vite
* eslint
* vue-router
* iconfont
* element plus


# zh-admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
=======
- node(14.17.0) + nvm(1.1.7)
- vue3(3.2.31) + TS(4.5.5) + Pinia(2.0.11) + vite(2.8.4)
- eslint(8.5.0): vs code 需要下载 eslint 插件，eslint 配置才会生效
- vue-router(4.0.12)
- element plus(2.1.8)
- axios(0.26.0)
- moment.js(2.29.1)
- iconfont
- pinia 数据持久化：https://icrc.icourban.com/crypto-https-github.com/prazdevs/pinia-plugin-persistedstate
- vs code 插件
  1. eslint： 代码校验
  2. vue languange features(volar): 代码优化，替换（vue2 的 vetur）
  3. koroFileHeader: 规范注释, 配置方式如下
  ```javascript
  // file header
  "fileheader.customMade": { // 头部注释
      "Author": "zzh",
      "Date": "Do not edit",
      "LastEditors": "zzh",
      "LastEditTime": "Do not edit",
      "Description": "",
      "FilePath": "Do not edit" // 增加此项配置即可
  },
  "fileheader.cursorMode": { // 函数注释
      "description": "",
      "param": "params",
      "return": ""
  },
  "fileheader.configObj": {
      "autoAdd": false, // 默认开启自动添加头部注释，当文件没有设置头部注释时保存会自动添加
      "autoAlready": true, // 默认开启
      "prohibitAutoAdd": [
          "json",
          "md"
      ], // 禁止.json .md文件，自动添加头部注释
      "wideSame": false, // 设置为true开启
      "wideNum": 13 // 字段长度 默认为13
  },
  ```
  4. git 相关插件：Git History, Git Graph

## 开发注意事项

1. 定义系统路由时，name 不能相同
2. 传递时间，默认使用字符串类型
3. 表格标题不要存在换行，尽可能不留白
4. 组件名与路由定义时的name保持一致，否则界面缓存不起作用


## 部署注意事项
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
