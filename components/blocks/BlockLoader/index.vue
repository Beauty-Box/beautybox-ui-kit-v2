<template>
    <div class="c-loader">
        <div>
            <b-loader :color="color" :indeterminate="indeterminate" :size="size" :width="width">
                <slot />
            </b-loader>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BLoader from '../../loaders/BLoader/index.vue';
import { computed } from 'vue';
import { PropsColors } from '../../../composables/ui/useColor';
import { PropsPositions } from '../../../composables/ui/usePosition';

interface BlockLoaderProps {
    bgc?: string;
    color?: PropsColors['color'];
    position?: PropsPositions['position'];
    minHeight?: number | string;
    maxHeight?: number | string;
    zIndex?: number | string;
    size?: number | string;
    width?: number;
    indeterminate?: boolean;
}

const props = withDefaults(defineProps<BlockLoaderProps>(), {
    bgc: 'transparent',
    color: 'primary',
    position: 'absolute',
    minHeight: 'auto',
    maxHeight: 'auto',
    zIndex: 10,
    size: 50,
    width: 3,
    indeterminate: true,
});

const calculatedMinHeight = computed(() => {
    return typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight;
});
const calculatedMaxHeight = computed(() => {
    return typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
});
</script>

<style scoped lang="scss">
.c-loader {
    position: v-bind('position');
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: v-bind('zIndex');
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    width: 100%;
    //height: 100%;
    min-height: v-bind('calculatedMinHeight');
    background-color: v-bind('bgc');

    @include min(md) {
        max-height: v-bind('calculatedMaxHeight');
    }

    & > div {
        margin: auto;
    }
} //.c-loader
</style>
