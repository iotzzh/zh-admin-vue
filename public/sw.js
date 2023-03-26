/**
 * service worker 安装激活
 */

let dataCacheName = 'new-data-v1'
let cacheName = 'first-pwa-app-1'
let filesToCache = [
  '/',
  '/index.html',
  '/style/index.css',
  '/style/fonts/iconfont.css',
  '/style/fonts/iconfont.eot',
  '/style/fonts/iconfont.js',
  '/style/fonts/iconfont.svg',
  '/style/fonts/iconfont.ttf',
  '/style/fonts/iconfont.woff',
  '/assets/images/icons/icon_144x144.png',
  '/assets/images/icons/icon_152x152.png',
  '/assets/images/icons/icon_192x192.png',
  '/assets/images/icons/icon_512x512.png'
]

const allSource = [];

self.addEventListener('install', function (e) {
  console.log('SW Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('SW precaching')
      // return cache.addAll(filesToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  console.log('SW Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('SW Removing old cache', key)
          return caches.delete(key)
          
        }
      }))
    })
  )
  return self.clients.claim()
})

// 目前使用需要FQ，故不使用
self.addEventListener('push', function (e) {});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification
  console.log('测试 data 通知时间:' + notification.data)

  // 不适合处理当有多个notification弹出时，有不同的action的场景
  // event.waitUntil(
  //   // 获取所有clients
  //   self.clients.matchAll().then(function (clients) {
  //       if (!clients || clients.length === 0) {
  //           return;
  //       }
  //       clients.forEach(function (client) {
  //           // 使用postMessage进行通信
  //           client.postMessage(action);
  //       });
    // })
// });
  // // event.source.postMessage("点击事件触发:",  notification.data);
  // // 点击点赞
  // if (event.action === 'like') {
  //   console.log('点击了点赞按钮')
  // }
  // // 关闭通知
  // event.notification.close()
  // // 打开网页
  // if (notification.data && notification.data.url) {
  //   event.waitUntil(clients.openWindow(event.notification.data.url))
  // }
});

self.addEventListener('notificationclose', function (event) {
  console.log('测试 data 通知时间:')
})

self.addEventListener('notificationerror', function (event) {
  console.log('测试 data 通知时间:')
})

self.addEventListener('notificationshow', function (event) {
  console.log('测试 data 通知时间:')
})

// 注意：event.data.message.data传递只能是对象，且不能有currentSourceId字段
self.addEventListener("message", (event) => {
  const currentSourceId = event.source.id; // 传递到notification中
  allSource.push(event.source); // 存储在内存中
  // 扩展event.data.message.data
  if (event.data.message && event.data.message.options) {
    event.data.message.options.data ? 
    event.data.message.options.data = { currentSourceId, ...event.data.message.options.data } : event.data.message.options.data = { currentSourceId };
  }

  processReceiveMessage(event);
  // event.source.postMessage("Hi client");
});

const displayNotification = async (title, options) => {
  self.registration.showNotification(title, options);
};

const processReceiveMessage = (event) => {
  switch(event.data.type) {
    case 'notification': processReceiveMessageToNotification(event); break;
    default: 
      event.source.postMessage("Please send correct command!");
  }
};

const processReceiveMessageToNotification = (event) => {
  event.waitUntil(self.registration.showNotification(event.data.message.title, event.data.message.options));
};