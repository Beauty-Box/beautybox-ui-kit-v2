<template>
    <div class="c-empty" :class="{ 'c-empty--centre': center, 'c-empty--big': bigSize }">
        <slot name="image">
            <b-svg
                v-if="!!icon"
                class="icon c-empty__icon"
                :class="['icon-' + icon]"
                :name="icon"
                fill="primary"
                :size="56"
            />
        </slot>
        <h4
            v-if="title.length"
            class="c-empty__title"
            :class="{ 'c-empty__title--normal': titleNormal }"
            :style="{
                maxWidth: calculatedTextWidth,
            }"
        >
            {{ title }}
        </h4>
        <p
            v-if="text.length"
            class="c-empty__text"
            :style="{
                maxWidth: calculatedTextWidth,
            }"
        >
            {{ text }}
        </p>
        <slot name="buttons" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { isNumber } from '@beautybox/core/helpers';
const BSvg = defineAsyncComponent(() => import('../../icons/BSvg/index.vue'));

interface BlockEmptyProps {
    icon?: string;
    title?: string;
    text?: string;
    center?: boolean;
    bigSize?: boolean;
    textWidth?: string | number;
    titleNormal?: boolean;
}

const props = withDefaults(defineProps<BlockEmptyProps>(), {
    icon: '',
    title: '',
    text: '',
    center: false,
    bigSize: false,
    textWidth: '35',
    titleNormal: false,
});

const calculatedTextWidth = computed(() => {
    return isNumber(String(props.textWidth)) ? `${props.textWidth}ch` : props.textWidth;
});
</script>

<style scoped lang="scss">
.c-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px 0;
    text-align: center;

    @include max(xs) {
        margin: auto;
        padding: 30px 10px;
    }

    &__icon {
        margin-bottom: 20px;
    } //.empty__icon

    &__title {
        display: block;
        color: $color-text;
        font-size: 21px;
        font-weight: 500;
        text-align: center;

        @include max(xs) {
            font-size: 21px;
        }
        &--normal {
            font-size: 16px;
        }
        & + .c-empty__text {
            margin-top: math.div($base-indent, 2);
        }
    } //.empty__title

    &__text {
        display: block;
        margin-right: auto;
        margin-bottom: 0 !important;
        margin-left: auto;
        color: $color-text--light;

        font-size: 14px;

        @include max(xs) {
            font-size: 16px;
            line-height: 1.5;

            .v-btn {
                font-size: 16px !important;
                line-height: inherit !important;
            }
        } //.empty__text

        & + .empty__text {
            margin-top: 15px;
        }

        &--medium {
            max-width: 61ch;
        } //.empty__text--medium

        &--full {
            max-width: 100%;
        } //.empty__text--full
    } //.empty__text

    &__btn,
    button,
    a {
        margin-top: 30px;
    } //.empty__btn

    &--centre {
        flex: 1;
        margin: auto;
    } //.empty--centre

    &--big {
        .c-empty {
            &__icon {
                margin-bottom: 21px;
            }
            &__title {
                margin-bottom: math.div($base-indent, 2);
                font-size: 24px;
                font-weight: 500;
            }
            &__text {
                font-size: 16px;
            }
            &__btn {
                min-width: 300px !important;
            }
        }
    }
} //.empty
</style>
