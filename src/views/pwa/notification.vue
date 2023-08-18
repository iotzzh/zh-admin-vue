<template>
  <Box :use-scroll-content-box="true">
    <h1>notification 测试页面</h1>
    <span id="text"></span>
    <div class="button-box">
      <ZHLightButton
        text="普通提示"
        color="red"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '普通提示', options: { body: '这是一个普通提示！' } }}) 
}"
      >
      </ZHLightButton>

      <ZHLightButton
        text="点击才能关闭的提示"
        color="blue"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '点击才能关闭的提示', 
                options: { body: '点击才能关闭的提示内容', requireInteraction: true } }}) 
}"
      >
      </ZHLightButton>

      <ZHLightButton
        text="带ICON的提示"
        color="pink"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '带ICON的提示', 
                options: { body: '带ICON的提示内容', icon: ICON } }}) 
}"
      >
      </ZHLightButton>

      <ZHLightButton
        text="带IMG的提示"
        color="yellow"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '带IMG的提示', 
                options: { body: '带IMG的提示内容', icon: ICON, image: IMG } }}) 
}"
      >
      </ZHLightButton>

      <ZHLightButton
        text="带按钮的提示"
        color="gold"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '带按钮的提示', 
                options: { body: '带按钮的提示内容', icon: ICON, image: IMG, 
                actions: [{ action: 'cancel', title: '取消' }, { action: 'confirm', title: '确认'}] } }}) 
}"
      >
      </ZHLightButton>

      <ZHLightButton
        text="带输入框的提示"
        color="green"
        @click="(e:any) => {
 sendMessageToWorkerJS({ type: 'notification', message: { title: '带输入框的提示', 
                options: { body: '带输入框的提示内容', icon: ICON, image: IMG,
                actions: [{ action: 'cancel', title: '取消', type: 'text' }, { action: 'confirm', title: '确认'}] } }}) 
}"
      >
      </ZHLightButton>
    </div>
  </Box>
</template>

<script lang="ts" setup>
  import WebSocketClass from '@/utils/websocket';
  import { stringLiteral } from '@babel/types';
  import { onMounted, ref, onUnmounted } from 'vue';
  import Typed from 'typed.js';
  import ZHLightButton from '@/components/zh-light-button/index.vue';
  import ICON from '@/assets/img/zhihu.png';
  import IMG from '@/assets/img/notification1.jpg';
  import { popSuccessMessage } from '@/components/zh-message';
  import Box from '@/components/zh-box/index.vue';

  // 注册当前页面的全局的registration
  const registration = ref();
  const printDesc = () => {
    const options = {
      strings: [
        `
        <span style="font-weight: bolder;">注意事项</span><br/>&emsp;&emsp;
        <span>系统不能关了通知功能，win11：系统 ——> 通知</span><br/>&emsp;&emsp;
        <span>浏览器需要授权，点击url左侧的感叹号可以查看</span><br/>&emsp;&emsp;
        <span>win11：当有多个通知同时弹出时，右下角会有数量提示，请打开，逐个处理</span>`,
      ],
      typeSpeed: 50,
      fadeOut: true,
      // loop: true, // 是否循环
    };

    const typed = new Typed('#text', options);
    typed.start();
  };

  onMounted(async () => {
    printDesc();
    registSocket(); // socket连接
    await registWorker(); // 注册sw
    await askNotificationPermission(); // 请求权限
  });

  onUnmounted(() => {
    registration.value.unregister();
    navigator.serviceWorker.removeEventListener('message', receiveWorkerJSMessage);
  });

  const receiveWorkerJSMessage = (event: MessageEvent<any>) => {
    console.log(`The service worker sent me a message: ${event.data}`);
    popSuccessMessage(`The service worker sent me a message: ${event.data}`);
  };

  interface TMessage {
    type: string;
    message: { [x: string]: any };
    [x: string]: any;
  }

  const sendMessageToWorkerJS = (message: TMessage) => {
    registration.value.active.postMessage(message); // post message to service workerjs
  };

  const registWorker = async () => {
    if (!('serviceWorker' in navigator)) return;
    registration.value = await navigator.serviceWorker.register('/sw.js');

    // reigster onmessage event
    navigator.serviceWorker.addEventListener('message', receiveWorkerJSMessage);
    // console.log('ServiceWorker registration successful with scope: ', registration);
    // 注册部分
    //   const subscription = await registration.pushManager.getSubscription();
    //   console.log('subscription', subscription);
  };

  // 请求notification授权
  const askNotificationPermission = async () => {
    if (
      typeof Notification === 'undefined' ||
      Notification.permission === 'granted' ||
      Notification.permission === 'denied'
    )
      return;
    const permission = await Notification.requestPermission();
    switch (permission) {
      case 'granted':
        // eslint-disable-next-line no-case-declarations
        const notification = new Notification('恭喜，你已经开启的桌面提供功能~');
        break;
      case 'denied':
        console.log('Notification 权限已被禁用');
        break;
      default:
        console.log('Notification 权限尚未授权');
    }
  };

  // 模拟真实场景，一般这种web桌面提示，触发时机都是后端利用socket传递消息过来的
  const registSocket = () => {
    //   const ws = new WebSocketClass('ws://127.0.0.1:1809', null);
    //   setInterval(() => { if (!ws.isConnection) ws.reconnection(); }, 3000); // 防止中断后无相应
  };
</script>

<style lang="scss" scoped>
  .button-box {
    background: #050901;
    padding: 30px;
  }
</style>
