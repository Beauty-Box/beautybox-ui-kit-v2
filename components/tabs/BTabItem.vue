<template>
    <div v-if="isActive">
        <slot :value="value" />
    </div>
</template>

<script setup lang="ts">
import { computed, type WritableComputedRef, inject } from 'vue';
const active = inject<WritableComputedRef<unknown>>('tabs-items-active');

interface Props {
    value: unknown;
}

const props = withDefaults(defineProps<Props>(), {});

const isActive = computed(() => {
    if (!active) {
        return false;
    }
    return props.value === active.value;
});
</script>

<style module lang="scss"></style>
