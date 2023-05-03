<template>
    <component
        :is="tag"
        class="b-list-item"
        :class="{
            'b-list-item--active': isActive,
            'b-list-item--error': error,
            'b-list-item--disabled': disabled,
        }"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <div v-if="'avatar' in $scopedSlots" class="b-list-item__avatar">
            <slot name="avatar" v-bind="{ isActive }" />
        </div>
        <div class="b-list-item__body">
            <slot v-bind="{ isActive }" />
        </div>
        <div v-if="'actions' in $scopedSlots" class="b-list-item__actions">
            <slot name="actions" v-bind="{ isActive }" />
        </div>
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    model: {
        prop: 'inputValue',
        event: 'input',
    },
});
</script>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import { PropsColors, useColor } from '../../../composables/ui/useColor';
import { deepEqual } from '@beautybox/core/helpers';

interface RoleItemProps {
    value?: any;
    inputValue?: any;
    tag?: string;
    borderColor?: PropsColors['color'];
    disabled?: boolean;
    error?: boolean;
}

const props = withDefaults(defineProps<RoleItemProps>(), {
    value: undefined,
    inputValue: undefined,
    tag: 'li',
    borderColor: 'info',
    disabled: false,
    error: false,
});

interface Emits {
    (e: 'input', value: RoleItemProps['inputValue']): void;
}

const emit = defineEmits<Emits>();

const { colorVariant } = useColor(() => props.borderColor);

const isActive = computed(() => {
    return deepEqual(props.inputValue, props.value);
});
</script>

<style scoped lang="scss">
.b-list-item {
    background-color: $color-bg--secondary;
    padding: $base-indent;
    display: flex;
    align-items: center;
    column-gap: $base-indent;
    border-radius: $border-radius;
    border-width: 1px;
    border-style: solid;
    border-color: $color-bg--secondary;
    cursor: pointer;

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
    &--error {
        border-color: map-get($colors, 'error');
    }

    &--disabled {
        pointer-events: none;
        opacity: 0.5;
        cursor: default;
    }
}
</style>
