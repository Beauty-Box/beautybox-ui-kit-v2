<template>
    <teleport to="body">
        <div>
            <b-overlay v-if="model" @click="onCloseModal" />
            <transition name="bottom-sheet">
                <div
                    v-if="model"
                    ref="bottomSheet"
                    class="bottom-sheet"
                    :style="touchScroll.isTouched ? touchStyles : {}"
                >
                    <div
                        class="bottom-sheet__inner d-flex flex-column"
                        :class="{ 'bottom-sheet__inner--hide-padding': hidePadding }"
                    >
                        <div
                            class="btn-for-draggable"
                            @touchmove="onTouchMove"
                            @touchend="onTouchEnd"
                            @touchstart="onTouchStart"
                        />
                        <slot />
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import BOverlay from './BOverlay.vue';

interface Props {
    modelValue: boolean;
    hidePadding?: boolean;
}

interface Emits {
    (e: 'update:modelValue', modelValue: Props['modelValue']): void;
}

const props = withDefaults(defineProps<Props>(), {
    hidePadding: false,
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

const onCloseModal = () => {
    model.value = false;
};

// slide to scroll
interface ITouchScroll {
    blockHeight: number | null;
    isTouched: boolean;
    scrollHeight: number | null;
    initialYPosition: number;
    currentY: number;
    lastY: number;
    windowHeight: number;
    offset: number;
    shouldClose: boolean;
}
const bottomSheet = ref(null) as Ref<HTMLElement | null>;
const touchScroll = ref({
    blockHeight: null,
    isTouched: false,
    scrollHeight: null,
    initialYPosition: 0,
    currentY: 0,
    lastY: 0,
    windowHeight: window.innerHeight,
    offset: 0,
    shouldClose: false,
}) as Ref<ITouchScroll>;

const touchStyles = computed(() => {
    return {
        transition: 'none 0s ease 0s',
        transform: `scale3d(1, 1, 1) translate3d(0, ${touchScroll.value.offset}px, 0)`,
    };
});

const onTouchStart = () => {
    touchScroll.value.isTouched = true;
    touchScroll.value.shouldClose = false;
    touchScroll.value.offset = 0;

    if (bottomSheet.value) {
        touchScroll.value.blockHeight = bottomSheet.value.offsetHeight;
    }
};
const onTouchMove = (event: TouchEvent) => {
    touchScroll.value.currentY = event.changedTouches[0].clientY;
    touchScroll.value.scrollHeight = event.changedTouches[0].pageY;
    if (!touchScroll.value.initialYPosition) {
        touchScroll.value.initialYPosition = touchScroll.value.currentY;
    }
    touchScroll.value.offset = 0;
    if (touchScroll.value.blockHeight !== null && bottomSheet.value) {
        if (touchScroll.value.currentY > touchScroll.value.initialYPosition) {
            touchScroll.value.offset =
                touchScroll.value.blockHeight -
                (touchScroll.value.windowHeight - touchScroll.value.currentY);
        }

        if (touchScroll.value.blockHeight * 0.5 < touchScroll.value.offset) {
            touchScroll.value.shouldClose = true;
        } else {
            touchScroll.value.shouldClose = false;
        }
    }
    touchScroll.value.lastY = touchScroll.value.currentY;
};
const onTouchEnd = () => {
    if (bottomSheet.value) {
        if (touchScroll.value.shouldClose) {
            model.value = false;
        }

        touchScroll.value.isTouched = false;
        touchScroll.value.shouldClose = false;
    }
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
    max-height: 90%;

    &__inner {
        position: relative;
        padding-left: $base-indent;
        padding-right: $base-indent;
        padding-bottom: $base-indent;

        &--hide-padding {
            padding-left: 0;
            padding-right: 0;
            padding-bottom: 0;
        }
    }
}

.btn-for-draggable {
    position: absolute;
    top: 0;
    left: 0;
    z-index: z(default);
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    padding-top: 10px;

    &::before {
        content: '';
        display: block;
        width: 40px;
        height: 4px;
        border-radius: $border-radius-large;
        background-color: var(
            --color-background--lighten,
            #{map-deep-get($theme, 'light', 'background--lighten')}
        );
    }
}

.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
    transform: translateY(0);
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
    transform: translateY(100%);
}
</style>
