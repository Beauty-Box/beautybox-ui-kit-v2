<template>
    <component
        :is="tag"
        class="b-skeleton"
        :class="{ 'b-skeleton--rounded': rounded }"
        :style="styles"
    >
        <div v-if="!boilerplate" class="b-skeleton__inner" />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '@beautybox/core/helpers';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    tag?: string;
    rounded?: boolean;
    boilerplate?: boolean;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
    width: '100%',
    height: 'auto',
    tag: 'div',
    rounded: false,
    boilerplate: false,
});

const calculatedWidth = computed(() => {
    return isNumber(String(props.width)) ? `${props.width}px` : props.width;
});
const calculatedHeight = computed(() => {
    return isNumber(String(props.height)) ? `${props.height}px` : props.height;
});

const calculatedRounded = computed(() => {
    return `calc(${calculatedHeight.value} / 2)`;
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
    // background-color: $color-bg--skeleton;
    background-color: var(--color-background--lighten);
    position: relative;
    overflow: hidden;
    &__inner {
        width: 100%;
        height: 100%;
        &::after {
            -webkit-animation: loading 1.5s infinite;
            animation: loading 1.5s infinite;
            content: '';
            height: 100%;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(-100%);
            z-index: 1;
            background: linear-gradient(
                90deg,
                rgba($color-white, 0),
                rgba($color-white, 0.3),
                rgba($color-white, 0)
            );
            .dark & {
                background: linear-gradient(
                    90deg,
                    rgba($color-white, 0),
                    rgba($color-white, 0.05),
                    rgba($color-white, 0)
                );
            }
        }
    }

    &--rounded {
        border-radius: v-bind('calculatedRounded');
    }
}
@keyframes loading {
    100% {
        transform: translateX(100%);
    }
}
</style>
