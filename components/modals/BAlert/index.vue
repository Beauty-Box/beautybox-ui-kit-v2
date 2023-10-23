<template>
    <teleport to="body">
        <div>
            <b-overlay v-if="model" @click="onCloseModal" />
            <transition name="dialog">
                <div v-if="model" :class="$style.alert">s</div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, watch } from 'vue';
import BOverlay from '../BOverlay.vue';

interface Props {
    modelValue: boolean;
}

interface Emits {
    (e: 'update:modelValue', modelValue: Props['modelValue']): void;
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

const onCloseModal = () => {
    model.value = false;
};
</script>

<style scoped lang="scss">
.dialog-enter-active,
.dialog-leave-active {
    transform: translate(-50%, -50%) scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
    transform: translate(-50%, -50%) scale(1);
}
</style>

<style module lang="scss">
.alert {
    width: 320px;
    height: 173px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // transition: transform 0.3s ease-in-out;
    transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: z(modal);
    background-color: var(--color-background, #fff);
    border-radius: $border-radius;
}
</style>
