<template>
    <div class="b-input__wrapper">
        <input
            :id="_id"
            v-model="inputValue"
            :disabled="disabled"
            :placeholder="placeholder"
            :name="name"
            :type="type"
            :autocomplete="autocomplete"
            class="b-input"
            v-bind="$attrs"
            :class="{
                'b-input--error': hasError,
                'b-input--raised': isLabelRaised,
                'b-input--lowered': isLabelExists,
            }"
        />
        <label
            v-if="isLabelExists"
            class="b-input__label"
            :class="{ 'b-input__label--raised': isLabelRaised }"
            :for="_id"
        >
            {{ label }}
        </label>
        <div class="b-input__error">
            {{ messages }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { v4 } from 'uuid';
import { ErrorObject } from '@vuelidate/core';

export interface BInputProps {
    label?: string;
    id?: string;
    value?: string | number | null;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    errorMessage?: string | ErrorObject[];
    autocomplete?: string;
    type?: string;
}

interface Emits {
    (e: 'input', value: BInputProps['value']): void;
}

const props = withDefaults(defineProps<BInputProps>(), {
    label: undefined,
    id: undefined,
    value: null,
    name: undefined,
    placeholder: undefined,
    disabled: false,
    errorMessage: undefined,
    autocomplete: 'off',
    type: 'text',
});

const emit = defineEmits<Emits>();

const _id = computed(() => {
    return typeof props.id === 'undefined' ? v4() : props.id;
});

const isLabelRaised = computed(() => Boolean(props.value));
const isLabelExists = computed(() => typeof props.label !== 'undefined');

const hasError = computed(
    () =>
        typeof props.errorMessage === 'string' ||
        (Array.isArray(props.errorMessage) && props.errorMessage.length)
);

const inputValue = computed({
    get: () => props.value,
    set: (value) => emit('input', value),
});

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

$input-height: $spacer * 14;
.b-input {
    $self: &;
    padding: $half-indent $base-indent;
    border-radius: $border-radius;
    height: $input-height;
    border-width: 1px;
    border-style: solid;
    border-color: $color-border--lighten;
    @extend .text-2;

    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: $spacer * 2;
    }

    &__label {
        position: absolute;
        left: $base-indent;
        top: 0;
        transition: all 0.2s ease-in-out;
        transform: translateY(#{$half-indent});
        line-height: 2;
        cursor: text;
        color: map-get($colors, 'secondary');
        @extend .text-2;
        &--raised {
        }
    }
    // блок с ошибками
    &__error {
        color: map-get($colors, 'error');
        margin-left: $base-indent;
        @extend .caption-2;
    }

    &:where(:focus, :focus-visible, :placeholder-shown)#{$self}--lowered {
        padding-top: $gutter;
    }

    &--raised#{$self}--lowered {
        padding-top: $gutter;
    }

    &:where(:focus, :focus-visible, :placeholder-shown) + &__label,
    &__label--raised {
        @extend .caption-2;
        line-height: 1;
    }
    // выделение самого блока
    &--error {
        border-color: map-get($colors, 'error');

        &:where(:focus, :focus-visible, :placeholder-shown) + #{$self}__label,
        + #{$self}__label--raised {
            color: map-get($colors, 'error');
        }
    }
}
</style>
