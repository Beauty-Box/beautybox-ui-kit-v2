<template>
    <span class="d-flex">
        <component
            :is="component"
            :class="classes"
            :aria-labelledby="name"
            focusable="false"
            role="img"
        />
    </span>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type AsyncComponentLoader } from 'vue-demi';
import { isNumber } from '@beautybox/core/helpers';
import { PropsColors, useColor } from '../../../composables/ui/useColor';

const ICON_PATH = import.meta.env.VITE_ICON_PATH;

interface BSvgProps {
    fill?: PropsColors['color'];
    name: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
}

const props = withDefaults(defineProps<BSvgProps>(), {
    fill: 'primary',
    size: 20,
    width: undefined,
    height: undefined,
});

const classes = computed(() => {
    return ['icon', `icon-${props.name}`];
});

const { colorVariant } = useColor(() => props.fill);

const modules: Record<string, AsyncComponentLoader> = import.meta.glob('@svg-path/*.svg');
const component = computed(() => {
    const icon = modules[`/${ICON_PATH}/${props.name}.svg`];
    return defineAsyncComponent(icon);
    // загрузка иконок и vue template compiler
    // @see https://github.com/jpkleemans/vite-svg-loader/issues/76
});

const sizeIcon = computed(() => {
    return isNumber(String(props.size)) ? `${props.size}px` : props.size;
});

const widthIcon = computed(() => {
    if (props.width !== undefined) {
        return isNumber(String(props.width)) ? `${props.width}px` : props.width;
    } else {
        return sizeIcon.value;
    }
});

const heightIcon = computed(() => {
    if (props.height !== undefined) {
        return isNumber(String(props.height)) ? `${props.height}px` : props.height;
    } else {
        return sizeIcon.value;
    }
});
</script>

<style scoped lang="scss">
:where(.icon) {
    display: inline-flex;
    width: v-bind('widthIcon');
    height: v-bind('heightIcon');
    fill: v-bind('colorVariant');
} //.icon
</style>
