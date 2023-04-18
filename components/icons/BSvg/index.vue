<template>
    <span>
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
import { computed, defineAsyncComponent } from 'vue';
import type { AsyncComponentLoader } from 'vue/types/v3-define-async-component';
import { isNumber } from '@beautybox/core/helpers';
import { PropsColors, useColor } from '../../../composables/ui/useColor';

interface BSvgProps {
    fill?: PropsColors['color'];
    name: string;
    size?: number | string;
}

const props = withDefaults(defineProps<BSvgProps>(), {
    fill: 'primary',
    size: 20,
});

const classes = computed(() => {
    return ['icon', `icon-${props.name}`];
});

const { colorVariant } = useColor(() => props.fill);

const modules: Record<string, AsyncComponentLoader> = import.meta.glob(
    '../../../assets/icons/*.svg'
);
const component = computed(() => {
    const icon = modules[`../../../assets/icons/${props.name}.svg`];
    return defineAsyncComponent(icon);
    // загрузка иконок и vue template compiler
    // @see https://github.com/jpkleemans/vite-svg-loader/issues/76
});

const sizeIcon = computed(() => {
    return isNumber(String(props.size)) ? `${props.size}px` : props.size;
});
console.log('sizeIcon', sizeIcon);
</script>

<style scoped lang="scss">
:where(.icon) {
    display: inline-flex;
    width: v-bind('sizeIcon');
    height: v-bind('sizeIcon');
    fill: v-bind('colorVariant');
} //.icon
</style>
