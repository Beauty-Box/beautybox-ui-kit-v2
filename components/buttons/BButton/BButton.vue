<template>
    <component v-bind="attrs" :is="component" :class="classes">
        <span v-if="$slots.default" class="b-button__content">
            <slot />
        </span>
    </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { PropsColors, useColor } from '../../../composables/ui/useColor';
import { PropsLink, useLink } from '../../../composables/ui/useLink';
import { PropsVariant } from '../../../composables/ui/useVariant';
import { PropsSize } from '../../../composables/ui/useSize';

interface BButtonProps {
    block?: boolean;
    color?: PropsColors['color'];
    disabled?: boolean;
    href?: PropsLink['href'];
    to?: PropsLink['to'];
    type?: string;
    variant?: PropsVariant['variant'];
    size?: PropsSize['size'];
    loading?: boolean;
}

const props = withDefaults(defineProps<BButtonProps>(), {
    color: 'primary',
    href: undefined,
    to: undefined,
    type: 'button',
    variant: 'fill',
    size: 'medium',
    disabled: false,
    loading: false,
});

const slots = useSlots();
const classes = computed(() => {
    return [
        'b-button',
        `b-button--${props.variant}`,
        `b-button--${props.size}`,
        `b-button--${props.color}`,
        {
            ['b-button--block']: props.block,
            ['b-button--is-loading']: props.loading,
            ['b-button--is-disabled']: props.disabled || props.loading,
        },
    ];
});

const { colorVariant, colorVariantAlpha } = useColor(() => props.color);
const { isHref, isLink, isRouterLink, attrsLink } = useLink(() => props);

const $attrs = useAttrs();
const attrs = computed(() => {
    const _attrs = { ...$attrs, ...(isLink.value && attrsLink.value) } as Record<string, any>;
    if (!isLink.value) {
        _attrs.type = props.type;
    }
    if (props.disabled || props.loading) {
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

<style scoped lang="scss">
.b-button {
    $self: &;
    -webkit-appearance: button;
    appearance: button;
    box-sizing: border-box;
    display: inline-flex;
    border-radius: $border-radius;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;

    font-weight: 700;
    line-height: 1.2;

    &--is-disabled {
        cursor: default;
        pointer-events: none;
    }

    &__content {
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        max-width: 100%;
        overflow: hidden;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &--small {
        font-size: 16px;
        min-height: 28px; // TODO обсудить с дизайнером размеры кнопок
        padding: 0 $base-indent;
    }

    &--medium {
        font-size: 16px;
        min-height: 44px;
        padding: $half-indent - 1 $base-indent;
    }

    &--large {
        font-size: 16px;
        min-height: 56px;
        padding: $half-indent - 1 $base-indent;
    }

    &:not(&--white) {
        border-color: v-bind('colorVariant');
        background-color: v-bind('colorVariant');
        color: #fff;
    }

    &--white {
        border-color: #fff;
        background-color: #fff;
        color: v-bind('colorVariant');
    }

    &#{$self}--outline {
        border-color: currentColor;
        background-color: #fff;
        color: v-bind('colorVariant');
    }

    &#{$self}--text {
        color: v-bind('colorVariant');
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        min-height: min-content;

        #{$self}__content {
            white-space: normal;
        }
    }

    &--block {
        width: 100%;
    }

    &:where(:hover, :focus-visible) {
        &:where(#{$self}--text) {
            text-decoration: underline;
        }
    }
}
</style>
