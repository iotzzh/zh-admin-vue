<template>
  <div class="box">
    <div>入参：useScrollContentBox</div>
    <div>是否使用滚动，默认true</div>

    <h3>固定盒子</h3>
    <div
      class="fixed-box"
      style="width: 100px; height: 100px; border: 1px solid black; padding: 10px"
    >
      <ZHBox :useScrollContentBox="false">
        <div>固定盒子</div>
        <div>固定盒子</div>
        <div>固定盒子</div>
        <div>固定盒子</div>
        <div>固定盒子</div>
        <div>固定盒子</div>
        <div>固定盒子</div>
      </ZHBox>
    </div>

    <h3>滚动盒子</h3>
    <div
      class="fixed-box"
      style="width: 100px; height: 100px; border: 1px solid black; padding: 10px"
    >
      <ZHBox @sroll="scroll">
        <div>滚动盒子</div>
        <div>滚动盒子</div>
        <div>滚动盒子</div>
        <div>滚动盒子</div>
        <div>滚动盒子</div>
        <div>滚动盒子</div>
        <div>滚动盒子</div>
      </ZHBox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ZHBox from '@/components/zh-box/index.vue';

  const scroll = (e: any) => {
    console.log('获取组件的滚动事件：', e);
  };
</script>
