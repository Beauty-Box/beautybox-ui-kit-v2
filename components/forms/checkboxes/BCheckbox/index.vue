<template>
    <div class="b-checkbox__wrapper">
        <div class="b-checkbox__inner" :class="{ 'b-checkbox__inner--disabled': disabled }" />
        <div v-if="!hideDetails" class="b-checkbox__error">
            {{ messages }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useListeners, useSlots } from 'vue';
import { v4 } from 'uuid';
import { ErrorObject } from '@vuelidate/core';
import BSvg from '../../../icons/BSvg/index.vue';
import { PropsColors, useColor } from '../../../../composables/ui/useColor';

export interface BCheckboxProps {
    label?: string;
    id?: string;
    value?: boolean;
    name?: string;
    color?: PropsColors['color'];
    indeterminate?: boolean;
    disabled?: boolean;
    errorMessage?: string | ErrorObject[];
    hideDetails?: boolean;
    activeIcon?: string;
    indeterminateIcon?: string;
}

interface Emits {
    (e: 'input', value: BCheckboxProps['value']): void;
}

const props = withDefaults(defineProps<BCheckboxProps>(), {
    label: undefined,
    id: undefined,
    value: false,
    name: undefined,
    color: 'info',
    indeterminate: false,
    disabled: false,
    errorMessage: undefined,
    hideDetails: false,
    activeIcon: '',
    indeterminateIcon: '',
});

const emit = defineEmits<Emits>();

// input and label control
const _id = computed(() => {
    return typeof props.id === 'undefined' ? v4() : props.id;
});

const { colorVariant } = useColor(() => props.color);

const hasError = computed(
    () =>
        typeof props.errorMessage === 'string' ||
        (Array.isArray(props.errorMessage) && props.errorMessage.length)
);

const inputValue = computed({
    get: () => props.value,
    set: (value) => emit('input', value),
});

// error message
const messages = computed(() => {
    if (!hasError.value) {
        return '';
    }

    if (!Array.isArray(props.errorMessage)) {
        return props.errorMessage;
    }

    if (props.errorMessage.length) {
        return props.errorMessage[0].$message;
    }

    return '';
});
</script>

<style scoped lang="scss">
@import '../../../../scss/base/typography';
.b-checkbox {
    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: $spacer;
    }

    // блок с ошибками
    &__error {
        color: map-get($colors, 'error');
        padding: 0 $base-indent;
        margin-bottom: $base-indent / 2;
        min-height: 12px;
        @extend .caption-2;
    }
}
</style>
