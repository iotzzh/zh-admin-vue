<div align="center"> <a href="https://github.com/iotzzh/zh-admin-vue"> <img alt="ZHAdminVue Logo" width="200" height="200" src="./src/assets/img/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/anncwb/vue-vben-admin.svg)](LICENSE)

<h1>Zh Admin Vue</h1>
</div>


## Introduction

Zh Admin Vue is a free and open source middle and back-end template. Using the latest `vue3`, `vite2`, `TypeScript` and other mainstream technology development, the out-of-the-box middle and back-end front-end solutions can also be used for learning reference.

## Feature

- **State of The Art Development**：Use front-end front-end technology development such as Vue3/vite2
- **TypeScript**: Application-level JavaScript language

<!-- - **Theming**: Configurable themes
- **International**：Built-in complete internationalization program
- **Mock Server** Built-in mock data scheme
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice -->

## Preview

- [zh-admin-vue](https://zhadminvue.iotzzh.com)


Test account: any/any


## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Element-Plus](https://element-plus.org/zh-CN/) - ui basic use
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Install and use

- Get the project code

```bash
git clone https://github.com/iotzzh/zh-admin-vue.git
```

- Installation dependencies

```bash
cd zh-admin-vue

pnpm install

```

- run

```bash
pnpm serve
```

- build

```bash
pnpm build
```


## How to contribute

You are very welcome to join！[Raise an issue](https://github.com/iotzzh/zh-admin-vue/issues) Or submit a Pull Request。

**Pull Request:**

1. Fork code!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit`pull request`

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development


## Maintainer

[@iotzzh](https://github.com/anncwb)


## License

[MIT](./LICENSE.md)


## Project Info

* nrm(1.2.5, taobao) + nvm(1.1.7) + node(16.17.0) 
* vue3(3.2.31) + TS(4.5.5) + Pinia(2.0.11) + vite(2.8.4)
* eslint(8.5.0): vs code download eslint plugin and config it.
* vue-router(4.0.12)
* element plus(2.1.8)
* axios(0.26.0)
* moment.js(2.29.1), use dayjs(1.11.6) to replace momentjs
* iconfont
* pinia data persistence：https://icrc.icourban.com/crypto-https-github.com/prazdevs/pinia-plugin-persistedstate
* vs code plugin
  1. eslint： Find and fix problems in your JavaScript code
  2. vue languange features(volar): beautify vue3 code
  3. koroFileHeader: comments standard, config as below
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


## 关键字提示
NOTE：表示在使用时可能会进行修改
TODO：表示有想法为执行或者还没有时间去做的功能

## 开发注意事项

1. 定义系统路由时，name 不能相同
2. 传递时间，默认使用字符串类型
3. 表格标题不要存在换行，尽可能不留白
4. 组件名与路由定义时的name保持一致，否则界面缓存不起作用

