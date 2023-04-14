<template>
    <component
        :is="component"
        :class="classes"
        :style="styles"
        :aria-labelledby="name"
        focusable="false"
        role="img"
    />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent, PropType } from 'vue';
import type { AsyncComponentLoader } from 'vue/types/v3-define-async-component';
import { isNumber } from '@beautybox/core/helpers';

export default defineComponent({
    name: 'BSvg',
    inheritAttrs: false,
    props: {
        fill: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 20,
        },
    },
    computed: {
        classes() {
            return {
                icon: true,
                ['icon-' + this.name]: this.name,
            };
        },
        styles() {
            return {
                fill: this.fill,
                '--size': this.sizeIcon,
            };
        },
    },

    setup(props, { emit }) {
        const modules: Record<string, AsyncComponentLoader> = import.meta.glob(
            '../../assets/spriteSVG/*.svg'
        );
        const component = computed(() => {
            const icon = modules[`../../assets/spriteSVG/${props.name}.svg`];
            //const icon = () => import(`../../assets/spriteSVG/${props.name}.svg?component`);
            return defineAsyncComponent(icon);
            // загрузка иконок и vue template compiler
            // @see https://github.com/jpkleemans/vite-svg-loader/issues/76
        });

        const sizeIcon = computed(() => {
            return isNumber(String(props.size)) ? `${props.size}px` : props.size;
        });

        return { component, sizeIcon };
    },
});
</script>

<style scoped lang="scss">
:where(.icon) {
    display: inline-flex;
    width: var(--size, 20px);
    height: var(--size, 20px);
} //.icon
</style>
