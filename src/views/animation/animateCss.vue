<template>
    <Box :use-scroll-content-box="true" class="scroll-box">
        <div class="box">
            <div class="animate__animated animate__bounce animate__infinite">
                <div
                    style="width: 200px; height: 200px; border-radius: 200px; background: linear-gradient(red, green, transparent);">
                </div>
            </div>

            <div class="animate__animated animate__fadeInLeft animate__infinite">
                <div
                    style="width: 200px; height: 200px; border-radius: 200px; background:radial-gradient(yellow, green, transparent);">
                </div>
            </div>

            <div class="animate__animated animate__pulse animate__infinite">
                <div
                    style="width: 200px; height: 200px; border-radius: 200px; background:radial-gradient(white, green, transparent);">
                </div>
            </div>
        </div>



    </Box>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Box from '@/components/zh-box/index.vue';
import 'animate.css';


</script>

<style lang="scss" scoped>
.scroll-box {
    background-image: url(https://michalsnik.github.io/aos/img/bg.jpg);
    backdrop-filter: blur(1px);
}

.box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 100px;
}
</style>