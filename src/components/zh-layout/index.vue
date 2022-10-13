<template>
    <component :is="useScrollContentBox ? ScrollContentBox : ContentBox">
        
    </component>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import ContentBox from './ContentBox.vue';
import ScrollContentBox from './ScrollContentBox.vue';

const props = defineProps({
  useScrollContentBox: {
    type: Boolean,
    required: false,
  },
});

const {
    useScrollContentBox,
} = toRefs(props);

</script>

<style lang="scss" scoped>
</style>