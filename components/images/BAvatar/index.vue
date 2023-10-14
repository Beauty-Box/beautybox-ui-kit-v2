<template>
    <div class="b-avatar" :style="styles" v-bind="$attrs">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '@beautybox/core/helpers';
import { PropsColors, useColor } from '../../../composables/ui/useColor';

interface BAvatarProps {
    size?: number | string;
    color?: PropsColors['color'];
}

const props = withDefaults(defineProps<BAvatarProps>(), {
    size: 60,
    color: 'secondary',
});

const { colorVariantAlphaLow: colorVariantBackground } = useColor(() => props.color);

const computedSize = computed(() => {
    return isNumber(String(props.size)) ? `${props.size}px` : props.size;
});

const styles = computed(() => {
    return {
        width: computedSize.value,
        height: computedSize.value,
    };
});
</script>

<style scoped lang="scss">
.b-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    line-height: normal;
    border-radius: 50%;

    background-color: v-bind('colorVariantBackground');

    img,
    svg {
        border-radius: inherit;
        display: flex;
        height: inherit;
        width: inherit;
    }
}
</style>
