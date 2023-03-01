
* nrm(1.2.5, taobao) + nvm(1.1.7) + node(16.17.0) 
* vue3(3.2.31) + TS(4.5.5) + Pinia(2.0.11) + vite(2.8.4)
* eslint(8.5.0): vs code 需要下载 eslint 插件，eslint 配置才会生效
* vue-router(4.0.12)
* element plus(2.1.8)
* axios(0.26.0)
* moment.js(2.29.1), dayjs(1.11.6)替换momentjs
* iconfont
* pinia 数据持久化：https://icrc.icourban.com/crypto-https-github.com/prazdevs/pinia-plugin-persistedstate
* vs code 插件
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
  1. git 相关插件：Git History, Git Graph

## 开发注意事项

1. 定义系统路由时，name 不能相同
2. 传递时间，默认使用字符串类型
3. 表格标题不要存在换行，尽可能不留白
4. 组件名与路由定义时的name保持一致，否则界面缓存不起作用

