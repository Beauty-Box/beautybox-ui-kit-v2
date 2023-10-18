<template>
    <div class="d-flex flex-column">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue-demi';
interface Props {
    modelValue: unknown;
}

interface Emits {
    (e: 'update:modelValue', value: Props['modelValue']): void;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<Emits>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

provide('tabs-items-active', model);
</script>

<style module lang="scss"></style>
