<template>
    <b-dialog v-model="model" :width="width" :persistent="persistent" @click:overlay="onCancel">
        <div class="d-flex flex-column">
            <div class="px-4 py-4">
                <header v-if="title || $slots.title">
                    <slot name="title">
                        <h4 class="h4 u-text-align--center" :class="$style['alert__title']">
                            {{ title }}
                        </h4>
                    </slot>
                </header>
                <div v-if="text || $slots.text" class="mt-4">
                    <slot name="text">
                        <p class="text-3 u-text-align--center" :class="$style['alert__text']">
                            {{ text }}
                        </p>
                    </slot>
                </div>
            </div>
            <template v-if="actions">
                <div :class="$style.divider" />
                <footer class="d-flex">
                    <div class="flex-grow-1">
                        <b-button
                            :color="successColor"
                            variant="text"
                            block
                            :loading="loadingBtn"
                            :class="$style['alert__button']"
                            class="u-text-weight--bold"
                            @click="onSuccess"
                        >
                            {{ successText }}
                        </b-button>
                    </div>
                    <div :class="[$style.divider, $style['divider--vertical']]" />
                    <div class="flex-grow-1">
                        <b-button
                            :color="calculatedCancelColor"
                            variant="text"
                            block
                            :class="$style['alert__button']"
                            class="u-text-weight--bold"
                            @click="onCancel"
                        >
                            {{ cancelText }}
                        </b-button>
                    </div>
                </footer>
            </template>
        </div>
    </b-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BDialog from '../BDialog/index.vue';
import BButton from '../../buttons/BButton/index.vue';
import { useDarkTheme } from '../../../composables/useDarkTheme';
import { PropsColors } from '../../../composables/ui/useColor';

interface Props {
    modelValue: boolean;
    width?: number | string;
    persistent?: boolean;
    title?: string;
    text?: string;
    actions?: boolean;
    successText: string;
    cancelText: string;
    successColor?: PropsColors['color'];
    cancelColor?: PropsColors['color'];
    loadingBtn?: boolean;
}

interface Emits {
    (e: 'update:modelValue', modelValue: Props['modelValue']): void;
    (e: 'cancel'): void;
    (e: 'success'): void;
}

const props = withDefaults(defineProps<Props>(), {
    width: 320,
    persistent: false,
    title: undefined,
    text: undefined,
    actions: true,
    successColor: 'error',
    cancelColor: undefined,
    loadingBtn: false,
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

const { isDark } = useDarkTheme();

const calculatedCancelColor = computed(() => {
    if (props.cancelColor) {
        return props.cancelColor;
    }

    return isDark.value ? 'white' : 'primary';
});

const onCancel = () => {
    emit('cancel');
};
const onSuccess = () => {
    emit('success');
};
</script>

<style module lang="scss">
.alert {
    &__title {
        color: var(--color-text);
    }
    &__text {
        color: var(--color-text--light);
    }
    &__button {
        min-height: 40px;
        &:hover {
            text-decoration: none;
        }
    }
}

.divider {
    background-color: var(--color-border);

    &--vertical {
        width: 1px;
    }

    &:not(&--vertical) {
        width: 100%;
        height: 1px;
    }
}
</style>
