<template>
    <b-avatar
        :size="size"
        :color="color"
        class="c-avatar"
        :class="{ 'c-avatar--square': square, 'c-avatar--shadow': shadow }"
        v-bind="$attrs"
    >
        <img
            v-if="image && !error"
            :src="hashedAvatar"
            alt="avatar"
            class="c-avatar__img"
            @error="error = true"
        />
        <span v-else-if="name" class="c-avatar__letter" :style="{ '--size': size + 'rem' }">
            {{ initials }}
        </span>
        <b-svg v-else name="avatar-empty" :size="size" class="c-avatar__empty" />
    </b-avatar>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, defineAsyncComponent } from 'vue';
import { PropsColors, useColor } from '../../../composables/ui/useColor';
import BAvatar from '../BAvatar/index.vue';
const BSvg = defineAsyncComponent(() => import('../../icons/BSvg/index.vue'));

interface ImageUserAvatarProps {
    size?: number | string;
    color?: PropsColors['color'];
    letterColor?: PropsColors['color'];
    square?: boolean;
    shadow?: boolean;
    image?: string | null;
    name?: string | null;
    emptyTwoLetters?: boolean;
}

const props = withDefaults(defineProps<ImageUserAvatarProps>(), {
    size: 60,
    color: 'secondary',
    letterColor: 'primary',
    square: false,
    shadow: false,
    image: null,
    name: null,
    emptyTwoLetters: false,
});

const { colorVariant: colorVariantLetter } = useColor(() => props.letterColor);

const error = ref(false) as Ref<boolean>;

/**
 * Если image это base64 строка, то возвращается эта строка без изменений,
 * если это ссылка на изображение, то к ней дописывается hash, иначе придет
 * старое изображение из кеша
 */
const hashedAvatar = computed(() => {
    if (!!props.image) {
        if (!props.image.startsWith('http')) {
            return props.image;
        } else {
            return `${props.image}?hash=${Math.random().toString(16)}`;
        }
    } else {
        return '';
    }
});

const initials = computed(() => {
    let letters = '';
    if (!!props.name) {
        letters = props.name
            .split(' ')
            .map((word) => word[0])
            .join('');

        if (props.emptyTwoLetters && letters.length > 1) {
            return letters[0] + letters[1];
        } else {
            return letters[0];
        }
    }
    return letters;
});
</script>

<style lang="scss" scoped>
.c-avatar {
    &__letter {
        margin: auto;
        font-size: calc(var(--size, 75rem) / 40);
        font-weight: 600;
        color: v-bind('colorVariantLetter');
    }

    &__empty {
        line-height: 0;
    }
    &--square {
        border-radius: 8px;
    }

    &--shadow {
        //box-shadow: 0 8px 16px #00000029;
        box-shadow: rgba(16, 25, 40, 0.08) 0 8px 16px 0;
    }
}
</style>
