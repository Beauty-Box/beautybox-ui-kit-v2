<template>
    <div class="d-flex align-center photos-container" :class="containerClasses">
        <div
            v-if="!!photos.length"
            class="photos d-flex align-center"
            :class="containerClasses"
            :style="containerStyles"
        >
            <div
                v-for="(photo, index) in photos"
                :key="index"
                class="photos__item"
                :style="photoStyles(index)"
            >
                <image-user-avatar :size="size" class="photos__avatar-wrapper" :image="photo" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed } from 'vue';
const ImageUserAvatar = defineAsyncComponent(() => import('../ImageUserAvatar/index.vue'));

type Direction = 'left' | 'right';

interface Props {
    photos: string[];
    size?: number;
    indent?: number;
    border?: number;
    direction?: Direction;
}

const props = withDefaults(defineProps<Props>(), {
    size: 28,
    indent: 12,
    border: 1,
    direction: 'left',
});

const getIndentPhoto = (index: number) => {
    const indexFromEndPhotos = props.photos.length - 1 - index;
    return indexFromEndPhotos * props.indent;
};

const getPaddingAllPhoto = computed(() => {
    return props.indent * (props.photos.length - 1) + props.size;
});

const photoStyles = (index: number) => {
    const property = props.direction === 'left' ? 'left' : 'right';
    return {
        [property]: `${getIndentPhoto(index)}px`,
    };
};

const containerStyles = computed(() => {
    const property = props.direction === 'left' ? 'paddingLeft' : 'paddingRight';
    return { [property]: `${getPaddingAllPhoto.value}px` };
});

const containerClasses = computed(() => {
    return {
        'justify-start': props.direction === 'left',
        'justify-end': props.direction === 'right',
    };
});
</script>

<style scoped lang="scss">
.photos {
    position: relative;
    height: 100%;
    &-container {
        width: 100%;
        height: 100%;
    }
    &__item {
        position: absolute;
    }
    &__avatar-wrapper {
        border-width: v-bind('border') + px;
        border-style: solid;
        border-color: var(--color-background);
    }
}
</style>
