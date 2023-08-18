<template>
  <div class="sidebar-logo-container" :class="[props.collapse ? 'collapse' : 'notitle']">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/dashboard">
        <img class="sidebar-logo" :src="logoSrc" />
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs, watch } from 'vue';
  import logo from '@/assets/img/logo1.png';
  import foldLogo from '@/assets/img/foldIcon.png';

  const props = defineProps({
    collapse: {
      type: Boolean,
      default: true,
    },
  });

  const logoSrc = ref('');
  logoSrc.value = props.collapse ? logo : foldLogo;
  const { collapse } = toRefs(props);
  watch(collapse, (newVal) => {
    logoSrc.value = newVal ? logo : foldLogo;
  });
</script>

<style lang="scss" scoped>
  @import '../../index.scss';
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: $topBarHeight;
    line-height: $topBarHeight;
    text-align: center;
    overflow: hidden;
    // margin-bottom: 20px;
    // background-color: #6196ea;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      & .sidebar-logo {
        display: inline-block;
        height: 100%;
        // background-color: #435ebe;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #435ebe;
        font-weight: 600;
        line-height: $topBarHeight;
        font-size: 22px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 12px;
      }
    }

    &.notitle {
      .sidebar-title {
        display: none;
      }

      & .sidebar-logo {
        height: 60%;
      }
    }
  }
</style>
