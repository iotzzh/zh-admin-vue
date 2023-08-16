<template>
  <iframe
    src="https://www.iotzzh.com"
    style="width: 100%; height: 100%"
    frameborder="0"
    scrolling="auto"
  ></iframe>
</template>

<!-- window.addEventListener('message', function(event) {
  // 监听来自内部页面的消息
  if (event.data === 'loaded') {
    console.log('收到加载完成消息: ', (new Date()).toDateString());
    // 内部 Next.js 页面加载完成后执行的逻辑
    const iframe = document.getElementById('iframe');
    const contentWindow = iframe.contentWindow;
    contentWindow.window.setJson('{"name":"zzh","age":18}');
  }
}); -->
