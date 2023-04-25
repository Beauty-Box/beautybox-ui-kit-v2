<template>
    <component :is="tag" class="b-list-item" :class="{ 'b-list-item--active': active }">
        <div class="b-list-item__avatar">
            <slot name="avatar" />
        </div>
        <div class="b-list-item__body">
            <slot />
        </div>
        <div class="b-list-item__actions">
            <slot name="actions" />
        </div>
    </component>
</template>

<script setup lang="ts">
import { PropsColors, useColor } from '../../../composables/ui/useColor';

interface RoleItemProps {
    tag?: string;
    active?: boolean;
    borderColor?: PropsColors['color'];
}

const props = withDefaults(defineProps<RoleItemProps>(), {
    tag: 'li',
    active: false,
    borderColor: 'info',
});

const { colorVariant } = useColor(() => props.borderColor);
</script>

<style scoped lang="scss">
.b-list-item {
    background-color: $color-bg--secondary;
    padding: $base-indent;
    display: flex;
    column-gap: $base-indent;
    border-radius: $border-radius;
    border-width: 1px;
    border-style: solid;
    border-color: $color-bg--secondary;

    &__avatar {
        flex-shrink: 0;
    }

    &__body {
        flex-grow: 1;
    }

    &__actions {
        flex-shrink: 0;
    }

    &--active {
        border-color: v-bind('colorVariant');
    }
}
</style>
