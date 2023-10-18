<template>
    <div @click="onClickTab">
        <slot :value="value" :active="isActive">
            <b-button
                v-if="text"
                size="small"
                class="u-text-size--small"
                :class="[
                    $style.button,
                    { [$style['button--active']]: isActive, [$style['button--rounded']]: rounded },
                ]"
                block
            >
                {{ text }}
            </b-button>
        </slot>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    type ComputedRef,
    type WritableComputedRef,
    inject,
    defineAsyncComponent,
} from 'vue';
const BButton = defineAsyncComponent(() => import('../buttons/BButton/index.vue'));

const active = inject<WritableComputedRef<unknown>>('tabs-active');
const rounded = inject<ComputedRef<boolean>>('tabs-rounded');

interface Props {
    value: unknown;
    text?: string;
}

const props = withDefaults(defineProps<Props>(), {
    text: undefined,
});

const isActive = computed(() => {
    if (!active) {
        return false;
    }
    return props.value === active.value;
});

const onClickTab = () => {
    if (active) {
        active.value = props.value;
    }
};
</script>

<style module lang="scss">
.button {
    &.button.button.button {
        padding-left: $spacer * 2;
        padding-right: $spacer * 2;
        &--rounded {
            border-radius: $border-radius-largest;
        }
        background-color: transparent;
        color: var(--color-text--light);
        border-color: transparent;
        box-shadow: none;

        &--active {
            background-color: var(--color-control--secondary);
            color: var(--color-text);
            border-color: var(--color-background--lighten);
        }
    }
}
</style>
