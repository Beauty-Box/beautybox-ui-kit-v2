<template>
    <teleport to="body">
        <div>
            <b-overlay v-if="model" @click="onCloseModal" />
            <transition name="bottom-sheet">
                <div v-if="model" class="bottom-sheet">
                    <slot />
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BOverlay from './BOverlay.vue';

interface Props {
    modelValue: boolean;
}

interface Emits {
    (e: 'update:modelValue', modelValue: Props['modelValue']): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const onCloseModal = () => {
    model.value = false;
};
</script>

<style scoped lang="scss">
.bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transition: transform 0.3s ease-in-out;
    z-index: z(modal);
    background-color: var(--color-background, #fff);
    border-radius: $border-radius-large $border-radius-large 0 0;
}

.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
    transform: translateY(0);
}

.bottom-sheet-enter,
.bottom-sheet-leave-to {
    transform: translateY(100%);
}
</style>
