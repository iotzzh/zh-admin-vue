<!-- 
    布局6
    .........................
    .                       .
    .                       .
    .........................
    .       .        .      .
    .       .        .      .
    .........................
 -->
 <template>
    <ZHLayout :use-scroll-content-box="false">
        <el-row style="height: 50%"></el-row>
        <el-row style="height: 50%">
            <el-col :span="8" style="height: 100%; background-color: rebeccapurple;"></el-col>
            <el-col :span="8" style="height: 100%; background-color: rebeccapurple;"></el-col>
            <el-col :span="8" style="height: 100%; background-color: rebeccapurple;"></el-col>
        </el-row>
    </ZHLayout>
</template>

<script lang="ts" setup>
import ZHLayout from '@/components/zh-layout/index.vue';

</script>

<style lang="scss" scoped>

</style>