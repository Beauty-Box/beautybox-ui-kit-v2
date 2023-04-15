<script setup lang="ts">
import { defineAsyncComponent, computed, useCssModule, useSlots, useAttrs } from 'vue';
import { PropsColors, useColor } from '@/composables/ui/useColor';
import { PropsIcons, PropsSize, useIconSize } from '@/composables/ui/useIconSize';
import { PropsLink, useLink } from '@/composables/ui/useLink';
import { PropsVariant } from '@/composables/ui/useVariant';

const uIcon = defineAsyncComponent(() => import('@/components/kit/UIcon.vue'));

interface UBtn {
    appendIcon?: PropsIcons['appendIcon'];
    appendIconClass?: any[] | Record<string, any> | string;
    block?: boolean;
    center?: boolean;
    color?: PropsColors['color'];
    disabled?: boolean;
    href?: PropsLink['href'];
    isActive?: boolean;
    prependIcon?: PropsIcons['prependIcon'];
    prependIconClass?: any[] | Record<string, any> | string;
    size?: PropsSize['size'];
    square?: boolean;
    to?: PropsLink['to'];
    type?: string;
    variant?: PropsVariant['variant'];
}
const props = withDefaults(defineProps<UBtn>(), {
    block: false,
    color: 'primary',
    variant: 'default',
    type: 'button',
    size: 'medium',
    appendIcon: undefined,
    appendIconClass: undefined,
    href: undefined,
    prependIcon: undefined,
    prependIconClass: undefined,
    to: undefined,
    square: false,
    disabled: false,
    isActive: false,
    center: false,
});

const style = useCssModule();
const slots = useSlots();
const classes = computed(() => {
    return [
        style['btn'],
        style[`btn--${props.variant}`],
        style[`btn--${props.size}`],
        {
            [style['btn--square']]: props.square || !('default' in slots),
            [style['btn--block']]: props.block,
            [style['btn--is-active']]: props.isActive,
            [style['btn--is-disabled']]: props.disabled || props.isActive,
        },
    ];
});

const { colorVariant, colorVariantAlfa } = useColor(() => props.color);
const { isLink, isHref, isRouterLink, attrsLink } = useLink(() => props, style['btn--is-active']);
const { gap, iconSize } = useIconSize(() => props.size);
const gridTemplateColumns = computed(() => {
    const size = `${iconSize.value}px`;
    return `${props.prependIcon ? `${size} ` : ''}1fr${props.appendIcon ? ` ${size}` : ''}`;
});
const $attrs = useAttrs();
const attrs = computed(() => {
    const _attrs = { ...$attrs, ...(isLink.value && attrsLink.value) } as Record<string, any>;
    if (!isLink.value) {
        _attrs.type = props.type;
    }
    if (props.disabled || props.isActive) {
        _attrs.disabled = true;
        _attrs.tabindex = '-1';
    }

    return _attrs;
});

const component = computed(() => {
    if (isHref.value) {
        return 'a';
    }
    if (isRouterLink.value) {
        return 'router-link';
    }

    return 'button';
});
</script>

<template>
    <component v-bind="attrs" :is="component" :class="classes">
        <u-icon
            v-if="prependIcon"
            :class="[$style['btn__icon'], prependIconClass]"
            :icon="prependIcon"
            :size="iconSize"
            color="inherit"
        />
        <span
            v-if="$slots.default"
            :class="[$style['btn__content'], { [$style['btn__content--center']]: center }]"
        >
            <slot />
        </span>
        <u-icon
            v-if="appendIcon"
            :class="[$style['btn__icon'], appendIconClass]"
            :icon="appendIcon"
            :size="iconSize"
            color="inherit"
        />
    </component>
</template>

<style module lang="scss">
.btn {
    $self: &;
    box-sizing: border-box;
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    font-weight: 500;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    fill: currentColor;

    &--is-disabled {
        opacity: 0.7;
        cursor: default;
        pointer-events: none;
    }

    &__content,
    &__icon {
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
    }
    &__content {
        font-family: 'Manrope', sans-serif;
        //display: inline-flex;
        overflow: hidden;
        justify-self: flex-start;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;

        &--center {
            text-align: center;
            justify-self: center;
        }
    }

    &:not(#{$self}--text) &__icon {
        border-radius: 2px;
        //background-color: #0E72B5;
        //box-shadow: 0 0 0 4px #0E72B5;
        &:first-child:not(:last-child) {
            transform: translateX(calc(v-bind('gap') * -1));
        }
        &:last-child:not(:first-child) {
            transform: translateX(v-bind('gap'));
        }
    }

    &--small {
        font-size: 14px;
        line-height: 16px;
        min-height: 36px;
        padding: 8px 16px;

        &#{$self}--square {
            width: 36px;
            padding: 8px;
        }
    }

    &--medium {
        font-size: 16px;
        line-height: 18px;
        min-height: 44px;
        padding: 12px 24px;

        &#{$self}--square {
            width: 44px;
            padding: 12px;
        }
    }

    &--large {
        font-size: 18px;
        line-height: 20px;
        min-height: 52px;
        padding: 16px 32px;

        &#{$self}--square {
            width: 56px;
            padding: 16px;
        }
    }

    &--block {
        display: grid;
        width: 100%;
        grid-template-columns: v-bind('gridTemplateColumns');
    }

    &--default {
        border-color: v-bind('colorVariant');
        background-color: v-bind('colorVariant');
        color: #fff;
    }

    &--secondary {
        border-color: v-bind('colorVariantAlfa');
        background-color: v-bind('colorVariantAlfa');
        color: v-bind('colorVariant');
    }

    &--white {
        border-color: #fff;
        background-color: #fff;
        color: v-bind('colorVariant');
    }

    &--outline {
        border-color: currentColor;
        background-color: #fff;
        color: v-bind('colorVariant');
    }

    &--text {
        color: v-bind('colorVariant');
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        grid-gap: v-bind('gap');

        #{$self}__content {
            white-space: normal;
        }
    }

    &:where(:not(#{$self}--is-active):where(:hover, :focus-visible)) {
        &:where(#{$self}--default, #{$self}--secondary) {
            opacity: 0.8;
        }
        &:where(#{$self}--secondary, #{$self}--white, #{$self}--outline) {
            background-color: v-bind('colorVariantAlfa');
        }
        &:where(#{$self}--secondary, #{$self}--white) {
            border-color: v-bind('colorVariantAlfa');
        }
        &:where(#{$self}--text) {
            text-decoration: underline;
        }
    }

    &--is-active {
        opacity: 0.5;
        cursor: default;
    }
}
</style>
