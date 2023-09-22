<template>
    <div class="logo">
        <img class="logo-img" :src="Logo" alt="logo" />
        <span v-if="collapse" class="logo-text">{{ t('layout.title') }}</span>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/img/logo.png';
import { useI18n } from 'vue-i18n';
import { useLayoutStore } from '@/layout/store';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const store = useLayoutStore();
const { collapse } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.logo {
    height: 45px;
    line-height: 22px;
    text-align: center;
    vertical-align: middle;
    background-color: rgb(12, 33, 53) !important;
    color: white;
    display: flex;
    padding-left: 7px;
    align-items: center;

    .logo-img {
        width: 40px;
        height: 40px;
        filter: brightness(1.5);
    }

    .logo-text {
        font-size: 22px;
        padding-left: 7px;
        letter-spacing: 3px;
        font-family: cursive;
        font-weight: bolder;
    }
}
</style>