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

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification
  console.log('测试 data 通知时间:' + notification.data)
  // event.source.postMessage("点击事件触发:",  notification.data);
  // 点击点赞
  if (event.action === 'like') {
    console.log('点击了点赞按钮')
  }
  // 关闭通知
  event.notification.close()
  // 打开网页
  if (notification.data && notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})

self.addEventListener("message", (event) => { 
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`);

  event.source.postMessage("Hi client");

  const title = 'Notification 1 of 3';
  const options = {
    // requireInteraction: true, // 必须点击才能关闭
    body: "With 'tag' of 'message-group-1'",
    tag: 'message-group-1',
  };

  const title1 = 'Notification 2 of 3';
  const options1 = {
    body: "With 'tag' of 'message-group-2'",
    tag: 'message-group-2',
  };

  const title2 = 'Notification 3 of 3';;
  const options2 = {
    body: "With 'tag' of 'message-group-1'",
    tag: 'message-group-1',
  };

  const preCache = async () => {
    self.registration.showNotification(title, options);
    self.registration.showNotification(title1, options1);
    self.registration.showNotification(title2, options2);
  };

  event.waitUntil(preCache());
});