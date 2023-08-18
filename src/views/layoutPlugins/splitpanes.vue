<template>
  <div class="box">
    <div class="buttons">
      <el-button type="primary" @click="setData">设置两边表格数据</el-button>
    </div>
    <splitpanes class="default-theme">
      <pane>
        <div class="table-box">
          <el-table :data="leftTableData" style="width: 100%" height="100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
          </el-table>
        </div>
      </pane>
      <pane>
        <div class="table-box">
          <el-table :data="rightTableData" style="width: 100%" height="100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
            <el-table-column prop="address" label="Address" width="130" />
          </el-table>
        </div>
      </pane>
    </splitpanes>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';

  const leftTableData = ref([]);

  const rightTableData = ref([]);

  const setData = () => {
    for (let i = 0; i < 50; i++) {
      leftTableData.value.push({ address: 'test' });
      rightTableData.value.push({ address: 'test' });
    }
  };
</script>

<style lang="scss" scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .buttons {
    height: 50px;
    background: linear-gradient(180deg, transparent, black);
    display: flex;
    align-items: center;
  }
  .default-theme {
    height: 100%;
    overflow: hidden;
    &:deep(.splitpanes__pane) {
      height: 100%;
      overflow: hidden;
    }
  }
  .table-box {
    height: 100%;
    overflow: hidden;
  }
</style>
