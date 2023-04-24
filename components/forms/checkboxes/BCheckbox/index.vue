<template>
    <div class="b-checkbox__wrapper">
        <div class="b-checkbox__inner">
            <div class="b-checkbox__check">
                <input
                    :id="_id"
                    v-model="inputValue"
                    type="checkbox"
                    class="b-checkbox"
                    :class="{ 'b-checkbox--disabled': disabled }"
                />
                <div v-show="!value" class="b-checkbox__custom b-checkbox__custom--off" />
                <div
                    v-show="value && !inputIndeterminate"
                    class="b-checkbox__custom b-checkbox__custom--on"
                >
                    <b-svg name="check" fill="white" :size="10" />
                </div>
                <div
                    v-show="inputIndeterminate"
                    class="b-checkbox__custom b-checkbox__custom--indeterminate"
                >
                    <b-svg name="minus" fill="white" :size="10" />
                </div>
            </div>
            <div v-if="'label' in $slots || !!label" class="b-checkbox__label text-3">
                <slot name="label">
                    <label v-if="!!label" :for="bindLabel && !disabled ? _id : ''">
                        {{ label }}
                    </label>
                </slot>
            </div>
        </div>
        <div v-if="!hideDetails" class="b-checkbox__error">
            {{ messages }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    model: {
        prop: 'value',
        event: 'change',
    },
});
</script>

<script setup lang="ts">
import { ref, Ref, watch, computed, useListeners, useSlots, nextTick } from 'vue';
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
    bindLabel?: boolean;
}

interface Emits {
    (e: 'change', value: BCheckboxProps['value']): void;
    (e: 'update:indeterminate', value: BCheckboxProps['indeterminate']): void;
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

const inputValue = computed({
    get: () => props.value,
    set: (value) => {
        emit('change', value);
    },
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

// indeterminate

const inputIndeterminate = ref(props.indeterminate) as Ref<boolean>;

watch(
    () => props.indeterminate,
    (val) => {
        nextTick(() => (inputIndeterminate.value = val));
    }
);
watch(inputIndeterminate, (val) => {
    emit('update:indeterminate', val);
});

watch(
    () => props.value,
    () => {
        if (!props.indeterminate) {
            return;
        }
        inputIndeterminate.value = false;
    }
);
</script>

<style scoped lang="scss">
@import '../../../../scss/base/typography';
.b-checkbox {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: relative;
    z-index: z(default);
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
        // padding: 0 $base-indent;
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

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        &--off {
            border: 2px solid $color-border--lighten;
        }

        &--on {
            background-color: v-bind('colorVariant');
        }

        &--indeterminate {
            background-color: v-bind('colorVariant');
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
    }
}
</style>
