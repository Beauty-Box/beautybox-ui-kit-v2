<template>
    <div @click="onClickTab">
        <slot :value="value" />
    </div>
</template>

<script setup lang="ts">
import { ref, type WritableComputedRef, inject, VNode } from 'vue';

const active = inject<WritableComputedRef<unknown>>('active');

interface Props {
    value: unknown;
}

const props = defineProps<Props>();

const onClickTab = () => {
    if (active) {
        active.value = props.value;
    }
};
</script>

<style module lang="scss"></style>
