<template>
    <div
        class="d-flex"
        :class="[$style.tabs, { [$style['tabs--rounded']]: rounded, [$style['tabs--grow']]: grow }]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    type Ref,
    computed,
    onMounted,
    nextTick,
    useSlots,
    provide,
    type VNode,
} from 'vue-demi';
interface Props {
    modelValue: number;
    rounded?: boolean;
    grow?: boolean;
}

interface Emits {
    (e: 'update:modelValue', value: Props['modelValue']): void;
}

const props = withDefaults(defineProps<Props>(), {
    rounded: false,
    grow: false,
});

const emit = defineEmits<Emits>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const rounded = computed(() => {
    return props.rounded;
});

provide('tabs-active', model);
provide('tabs-rounded', rounded);
</script>

<style module lang="scss">
.tabs {
    background-color: var(--color-background--light);
    padding: $spacer;
    column-gap: $spacer;
    flex-grow: 0;
    width: min-content;
    border-radius: $border-radius;

    &--rounded {
        border-radius: $border-radius-largest;
    }
    &--grow {
        flex-grow: 1;
        width: 100%;
        & > * {
            flex-grow: 1;
        }
    }
}
</style>
