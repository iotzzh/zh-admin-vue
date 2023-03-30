<template>
  <div class="box">
    <el-row class="row list" :gutter="20">
      <el-col :span="6"><div class="column">
        <img class="list-img" :src="Img1" alt="img" />
        <div class="text">今日订单数量</div>
        <div class="num">3779</div>
        <div class="tag"><span>-47%</span>同比昨日新增</div>
      </div></el-col>
      <el-col :span="6"><div class="column">
        <img class="list-img" :src="Img2" alt="img" />
        <div class="text">今日新增诊所</div>
        <div class="num">3</div>
        <div class="tag"><span>-70%</span>同比昨日新增</div>
      </div></el-col>
      <el-col :span="6"><div class="column">
        <img class="list-img" :src="Img3" alt="img" />
        <div class="text">今日就诊人数</div>
        <div class="num">3779</div>
        <div class="tag"><span>-45%</span>同比昨日新增</div>
      </div></el-col>
      <el-col :span="6"><div class="column">
        <img class="list-img" :src="Img4" alt="img" />
        <div class="text">今日退单数量</div>
        <div class="num" style="color: red;">56</div>
        <div class="tag"><span>-46%</span>同比昨日新增</div>
      </div></el-col>
    </el-row>

    <el-row class="row" :gutter="20">
      <el-col :span="12"><div class="column">
        <div v-loading="loading1" class="chart chart1"></div>
      </div></el-col>
      <el-col :span="12"><div class="column">
        <div v-loading="loading2" class="chart chart2"></div>
      </div></el-col>
    </el-row>

    <el-row class="row" :gutter="20">
      <el-col :span="12"><div class="column">
        <div v-loading="loading3" class="chart chart3"></div>
      </div></el-col>
      <el-col :span="12"><div class="column">
        <div v-loading="loading4" class="chart chart4"></div>
      </div></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Img1 from '@/assets/img/home_icon1.png';
import Img2 from '@/assets/img/home_icon2.png';
import Img3 from '@/assets/img/home_icon3.png';
import Img4 from '@/assets/img/home_icon4.png';
import Index from './index';
import { onMounted, ref, onUnmounted } from 'vue';

const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);
const loading4 = ref(false);
const index = new Index(loading1, loading2, loading3, loading4);

const drawChart = () => {
  index.drawChart1();
  index.drawChart2();
  index.drawChart3();
  index.drawChart4();
};

onMounted(() => {
  drawChart();
  window.addEventListener('resize', drawChart);
});

onUnmounted(() => {
  window.removeEventListener('resize', drawChart);
});

</script>


<style lang="scss" scoped>
@import './index.scss';
</style>