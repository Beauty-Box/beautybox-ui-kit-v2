<template>
    <teleport to="body">
        <div>
            <b-overlay v-if="model" @click="onClickOverlay" />
            <transition name="dialog">
                <div v-if="model" :class="[$style.alert, { [$style['alert--bounce']]: bounce }]">
                    s
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, watch, nextTick } from 'vue';
import BOverlay from '../BOverlay.vue';

interface Props {
    modelValue: boolean;
    width?: number | string;
    persistent?: boolean;
}

interface Emits {
    (e: 'update:modelValue', modelValue: Props['modelValue']): void;
}

const props = withDefaults(defineProps<Props>(), {
    width: 320,
    persistent: false,
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

const calculatedWidth = computed(() => {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const onCloseModal = () => {
    model.value = false;
};

// persistent
const onClickOverlay = () => {
    if (props.persistent) {
        bounceClick();
    } else {
        onCloseModal();
    }
};

const bounce = ref(false) as Ref<boolean>;
const bounceTimeout = ref(undefined) as Ref<NodeJS.Timeout | undefined>;

const bounceClick = () => {
    bounce.value = false;

    nextTick(() => {
        bounce.value = true;
        clearTimeout(bounceTimeout.value);
        bounceTimeout.value = setTimeout(() => {
            bounce.value = false;
        }, 150);
    });
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
    width: v-bind('calculatedWidth');
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
    &--bounce {
        animation-duration: 0.15s;
        animation-name: bounce-dialog;
        animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    }
}

@keyframes bounce-dialog {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.03);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
