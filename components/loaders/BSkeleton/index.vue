<template>
    <div class="b-skeleton" :style="styles" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '@beautybox/core/helpers';

interface SkeletonProps {
    width: string | number;
    height: string | number;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
    width: '100%',
    height: 'auto',
});

const calculatedWidth = computed(() => {
    return isNumber(String(props.width)) ? `${props.width}px` : props.width;
});
const calculatedHeight = computed(() => {
    return isNumber(String(props.height)) ? `${props.height}px` : props.height;
});

const styles = computed(() => {
    return {
        width: calculatedWidth.value,
        height: calculatedHeight.value,
    };
});
</script>

<style scoped lang="scss">
.b-skeleton {
    border-radius: $border-radius;
    background-color: $color-bg--skeleton;
}
</style>
