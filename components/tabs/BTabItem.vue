<template>
    <div v-if="isActive || wasVisible || eager" v-show="isActive">
        <slot :value="value" />
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, type WritableComputedRef, watch, inject } from 'vue';
const active = inject<WritableComputedRef<unknown>>('tabs-items-active');

interface Props {
    value: unknown;
    eager?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    eager: false,
});

const isActive = computed(() => {
    if (!active) {
        return false;
    }
    return props.value === active.value;
});

const wasVisible = ref(false) as Ref<boolean>;

watch(
    isActive,
    (value) => {
        if (value && !wasVisible.value) {
            wasVisible.value = true;
        }
    },
    {
        immediate: true,
    }
);
</script>

<style module lang="scss"></style>
