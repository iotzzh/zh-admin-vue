/**
 * service worker 安装激活
 */

let dataCacheName = 'new-data-v1';
let cacheName = 'first-pwa-app-1';

//#region service worker 事件监听与方法
self.addEventListener('install', function (e) {
  console.log('SW Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('SW precaching');
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('SW Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('SW Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 目前使用需要FQ，故不使用
self.addEventListener('push', function (e) {});

// 注意：event.data.message.data传递只能是对象，且不能有currentSourceId字段
self.addEventListener('message', (event) => {
  const currentSourceId = event.source.id; // 传递到notification中
  // 扩展event.data.message.data
  if (event.data.message && event.data.message.options) {
    if (event.data.message.options.data) {
      event.data.message.options.data = {
        currentSourceId,
        ...event.data.message.options.data,
      };
    } else {
      event.data.message.options.data = { currentSourceId };
    }
  }

  processReceiveMessage(event);
  // event.source.postMessage("Hi client");
});

const displayNotification = async (title, options) => {
  self.registration.showNotification(title, options);
};

const processReceiveMessage = (event) => {
  switch (event.data.type) {
    case 'notification':
      processReceiveMessageToNotification(event);
      break;
    case '':
      event.source.postMessage('Please send correct command!');
      break;
    default:
      event.source.postMessage('Please send correct command!');
  }
};

const processReceiveMessageToNotification = (event) => {
  event.waitUntil(
    self.registration.showNotification(
      event.data.message.title,
      event.data.message.options
    )
  );
};
//#endregion

//#region notification 事件监听与方法
self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  console.log('测试 data 通知时间:' + notification.data.currentSourceId);

  event.waitUntil(
    self.clients.matchAll().then(function (clients) {
      if (!clients || clients.length === 0) return;
      const notificationClient = clients.find(
        (x) => x.id === notification.data.currentSourceId
      );
      if (!notificationClient) return;
      event.action &&
        notificationClient.postMessage(
          JSON.stringify({
            action: event.action,
            data: event.notification.data,
            reply: event.reply,
          })
        );
    })
  );
  // 关闭通知
  event.notification.close();
});

self.addEventListener('notificationclose', function (event) {
  console.log('测试 data 通知时间:');
});

self.addEventListener('notificationerror', function (event) {
  console.log('测试 data 通知时间:');
});

self.addEventListener('notificationshow', function (event) {
  console.log('测试 data 通知时间:');
});
//#endregion
