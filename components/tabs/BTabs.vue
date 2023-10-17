<template>
    <div :class="[$style.tabs, { [$style['tabs--rounded']]: rounded }]">
        {{ model }}
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
}

interface Emits {
    (e: 'update:modelValue', value: Props['modelValue']): void;
}

const props = withDefaults(defineProps<Props>(), {
    rounded: false,
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

provide('active', model);
</script>

<style module lang="scss">
.tabs {
    background-color: var(--color-background--light);
    padding: $spacer;
    &--rounded {
        border-radius: $border-radius-largest;
    }
}
</style>
