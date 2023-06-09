<template>
    <div class="b-radio__wrapper">
        <component :is="labelComponent" class="b-radio__inner">
            <div class="b-radio__check">
                <input
                    :id="_id"
                    type="radio"
                    class="b-radio"
                    :class="{ 'b-radio--disabled': disabled }"
                    :value="value"
                    :name="name"
                    :checked="isActive"
                    @change="onChange"
                    v-on="inputListeners"
                />
                <div
                    v-show="isActive"
                    class="b-radio__custom b-radio__custom--on"
                    :class="{
                        'b-radio__custom--disabled': disabled,
                    }"
                >
                    <b-svg :name="activeIcon" :fill="color" :size="16" />
                </div>
                <div
                    v-show="!isActive"
                    class="b-radio__custom b-radio__custom--off"
                    :class="{
                        'b-radio__custom--error': hasError,
                        'b-radio__custom--disabled': disabled,
                    }"
                />
            </div>
            <div v-if="'label' in $slots || !!label" class="b-radio__label text-3">
                <slot name="label">
                    <span v-if="!!label">
                        {{ label }}
                    </span>
                </slot>
            </div>
        </component>
        <p v-if="!hideDetails" class="b-radio__error">
            {{ messages }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    model: {
        prop: 'inputValue',
        event: 'change',
    },
});
</script>

<script setup lang="ts">
import { ref, Ref, watch, computed, useListeners, useSlots } from 'vue';
import { v4 } from 'uuid';
import { ErrorObject } from '@vuelidate/core';
import { deepEqual } from '@beautybox/core/helpers';
import BSvg from '../../../icons/BSvg/index.vue';
import { PropsColors, useColor } from '../../../../composables/ui/useColor';

export interface BCheckboxProps {
    label?: string;
    id?: string;
    value?: any;
    inputValue?: any;
    name?: string;
    color?: PropsColors['color'];
    disabled?: boolean;
    errorMessage?: string | ErrorObject[];
    hideDetails?: boolean;
    activeIcon?: string;
    bindLabel?: boolean;
}

interface Emits {
    (e: 'change', value: BCheckboxProps['inputValue']): void;
}

const props = withDefaults(defineProps<BCheckboxProps>(), {
    label: undefined,
    id: undefined,
    value: undefined,
    inputValue: undefined,
    name: undefined,
    color: 'info',
    indeterminate: false,
    disabled: false,
    errorMessage: undefined,
    hideDetails: false,
    activeIcon: 'radio-circle',
    indeterminateIcon: 'minus',
    bindLabel: true,
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

const lazyValue = ref(props.value) as Ref<BCheckboxProps['value']>;

const internalValue = computed({
    get(): any {
        return lazyValue.value;
    },
    set(val: any) {
        lazyValue.value = val;
        emit('change', val);
    },
});

const onChange = (eventValue: BCheckboxProps['inputValue']) => {
    let input = props.inputValue;
    const value = props.value;

    if (Array.isArray(input)) {
        const oldLength = input.length;

        input = input.filter((item) => !deepEqual(item, value));

        if (input.length === oldLength) {
            input.push(value);
        }
    } else if (value) {
        input = deepEqual(input, value) ? null : value;
    } else {
        input = !input;
    }

    internalValue.value = input;
};

const $listeners = useListeners();
const inputListeners = {
    ...$listeners,
};

delete inputListeners['change'];

const isActive = computed(() => {
    const input = props.inputValue;
    if (Array.isArray(input)) {
        return input.some((item) => deepEqual(item, props.value));
    }
    return props.value ? deepEqual(props.value, input) : Boolean(input);
});

const labelComponent = computed(() => {
    if (props.bindLabel && !props.disabled) {
        return 'label';
    } else {
        return 'div';
    }
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

watch(
    () => props.inputValue,
    (val) => {
        lazyValue.value = val;
    }
);
</script>

<style scoped lang="scss">
@import '../../../../scss/base/typography';
.b-radio {
    $self: &;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: relative;
    z-index: z(default);
    cursor: pointer;
    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: $spacer;

        & > {
            label {
                cursor: pointer;
            }

            span {
                cursor: default;
            }
        }
    }

    // блок с ошибками
    &__error {
        color: map-get($colors, 'error');
        margin-bottom: $base-indent / 2;
        min-height: 12px;
        @extend .caption-2;
    }

    &__check {
        flex-grow: 0;
        flex-shrink: 0;
        position: relative;
        width: 16px;
        height: 16px;
    }

    &__custom {
        width: 100%;
        height: 100%;
        border-radius: $border-radius / 4;
        line-height: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        &--off {
            border-width: 2px;
            border-style: solid;
            border-color: $color-border--lighten;
        }

        &--error {
            border-color: map-get($colors, 'error');
        }

        &--on {
            // border-color: v-bind('colorVariant');
        }

        &--disabled {
            opacity: 0.5;
        }
    }
    &__inner {
        display: flex;
        align-items: flex-start;
    }

    &__label {
        flex-grow: 1;
        margin-left: $spacer * 2;
    }

    &--disabled {
        pointer-events: none;
        cursor: default;
    }
}
</style>
