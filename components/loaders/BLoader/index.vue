<template>
    <div
        v-intersect="onObserve"
        class="b-loader"
        role="progressbar"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="indeterminate ? undefined : normalizedValue"
        :class="classes"
        :style="styles"
        v-on="$listeners"
    >
        <svg
            :style="svgStyles"
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`"
        >
            <circle
                v-if="!indeterminate"
                class="b-loader__underlay"
                fill="transparent"
                :cx="2 * viewBoxSize"
                :cy="2 * viewBoxSize"
                :r="RADIUS"
                :stroke-width="strokeWidth"
                :stroke-dasharray="strokeDashArray"
                :stroke-dashoffset="0"
            />
            <circle
                class="b-loader__overlay"
                fill="transparent"
                :cx="2 * viewBoxSize"
                :cy="2 * viewBoxSize"
                :r="RADIUS"
                :stroke-width="strokeWidth"
                :stroke-dasharray="strokeDashArray"
                :stroke-dashoffset="strokeDashOffset"
            />
        </svg>
        <div v-if="!!$slots.default" class="b-loader__info">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { PropsColors, useColor } from '../../../composables/ui/useColor';
// Directives
import intersect from '../../../directives/intersect';

const vIntersect = { ...intersect };

interface BLoaderProps {
    color?: PropsColors['color'];
    indeterminate?: boolean;
    rotate?: number | string;
    size?: number | string;
    width?: number | string;
    value?: number | string;
}

const props = withDefaults(defineProps<BLoaderProps>(), {
    color: 'primary',
    indeterminate: false,
    rotate: 0,
    size: 32,
    width: 4,
    value: 0,
});

const { colorVariant } = useColor(() => props.color);

const RADIUS = 20;
const isVisible = ref(true) as Ref<boolean>;

const circumference = computed(() => {
    return 2 * Math.PI * RADIUS;
});

const normalizedValue = computed(() => {
    const value = typeof props.value === 'string' ? parseFloat(props.value) : props.value;
    if (value < 0) {
        return 0;
    }

    if (value > 100) {
        return 100;
    }

    return value;
});

const strokeDashArray = computed(() => {
    return Math.round(circumference.value * 1000) / 1000;
});

const strokeDashOffset = computed(() => {
    return ((100 - normalizedValue.value) / 100) * circumference.value + 'px';
});

const strokeWidth = computed(() => {
    return (Number(props.width) / +props.size) * viewBoxSize.value * 2;
});

const viewBoxSize = computed(() => {
    return RADIUS / (1 - Number(props.width) / +props.size);
});

const onObserve = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
) => {
    isVisible.value = isIntersecting;
};

const styles = computed(() => {
    const size = Number(props.size);
    return {
        height: `${size}px`,
        width: `${size}px`,
    };
});

const svgStyles = computed(() => {
    return {
        transform: `rotate(${Number(props.rotate)}deg)`,
    };
});

const classes = computed(() => {
    return {
        'b-loader--visible': isVisible.value,
        'b-loader--indeterminate': props.indeterminate,
    };
});
</script>

<style scoped lang="scss">
$b-loader-rotate-animation: progress-circular-rotate 1.4s linear infinite !default;
$b-loader-rotate-dash: progress-circular-dash 1.4s ease-in-out infinite !default;
$b-loader-intermediate-svg-transition: all 0.2s ease-in-out !default;
$b-loader-underlay-stroke: map-get($colors-alpha, 'gray-alpha') !default;
$b-loader-overlay-transition: all 0.6s ease-in-out !default;
.b-loader {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    color: v-bind('colorVariant');

    > svg {
        width: 100%;
        height: 100%;
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
    }

    &--indeterminate {
        > svg {
            animation: $b-loader-rotate-animation;
            transform-origin: center center;
            transition: $b-loader-intermediate-svg-transition;
        }

        .b-loader__overlay {
            animation: $b-loader-rotate-dash;
            stroke-linecap: round;
            stroke-dasharray: 80, 200;
            stroke-dashoffset: 0px;
        }
    }

    &--indeterminate:not(&--visible) {
        > svg,
        .b-loader__overlay {
            animation-play-state: paused !important;
        }
    }

    &__info {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    &__underlay {
        stroke: $b-loader-underlay-stroke;
        z-index: 1;
    }
    &__overlay {
        stroke: currentColor;
        z-index: 2;
        transition: $b-loader-overlay-transition;
    }
}
@keyframes progress-circular-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0px;
    }
    50% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -15px;
    }
    100% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes progress-circular-rotate {
    100% {
        transform: rotate(360deg);
    }
}
</style>
