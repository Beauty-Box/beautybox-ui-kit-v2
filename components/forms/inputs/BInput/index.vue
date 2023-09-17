<template>
    <div class="b-input__wrapper">
        <div
            class="b-input__inner"
            :class="{ 'b-input__inner--error': hasError, 'b-input__inner--disabled': disabled }"
        >
            <!-- 
                1. препенд и аппенд иконки могут быть проброшены слотами, но если слота нет
                то можно пробросить название. по аналогии с block empty
                2. слоты для иконки и для суффикса должны быть разными слотами, суффикс лучше прокинуть строкой с необходимыми стилями
                3. лучше разделить все события на три группы 1. инпут 2. препед 3. аппенд по наличию постфикса в конце имени события
                4. v-on в vue 3 deprecated, лучше использовать события вида onClick внутри $attrs
                Пример:
                Object.keys($listeners).reduce((acc, key) => {
                    if (key.endWith(':append')) {
                        acc['append'][key] = $listeners[key];
                    }
                    // и далее
                    return acc;
                }, { 'append': {}, 'input': {}, 'prepend': {}, });
                 -->
            <span
                v-if="'prepend' in slots || !!prependIcon"
                class="b-input__prepend"
                :class="{ 'b-input__prepend--clickable': !disabled }"
            >
                <slot name="prepend" v-bind="{ disabled }">
                    <span
                        v-if="prependIcon"
                        class="b-input__icon"
                        v-bind="!disabled && listeners['prepend']"
                    >
                        <b-svg :name="prependIcon" :size="22" :fill="prependIconFill" />
                    </span>
                    <!--  @click.native="onClickPrepend" -->
                </slot>
            </span>
            <div class="b-input__textfield">
                <input
                    :id="_id"
                    v-model="inputValue"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :name="name"
                    :type="type"
                    :autocomplete="autocomplete"
                    class="b-input"
                    v-bind="inputAttrs"
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
            </div>
            <span
                v-if="'append' in slots || !!appendIcon"
                class="b-input__append"
                :class="{ 'b-input__append--clickable': !disabled }"
            >
                <slot name="append" v-bind="{ disabled }">
                    <span
                        v-if="appendIcon"
                        class="b-input__icon"
                        v-bind="!disabled && listeners['append']"
                    >
                        <b-svg :name="appendIcon" :size="22" :fill="appendIconFill" />
                    </span>
                    <!-- @click.native="onClickAppend" -->
                </slot>
            </span>
        </div>
        <p v-if="!hideDetails" class="b-input__error">
            {{ messages }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue-demi';
import { v4 } from 'uuid';
import { ErrorObject } from '@vuelidate/core';
import BSvg from '../../../icons/BSvg/index.vue';
import { PropsColors } from '../../../../composables/ui/useColor';
import { useDividedListeners } from '../../../../composables/useDividedListeners';

export interface BInputProps {
    label?: string;
    id?: string;
    modelValue?: string | number | null;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    errorMessage?: string | ErrorObject[];
    autocomplete?: string;
    type?: string;
    hideDetails?: boolean;
    prependIcon?: string;
    prependIconFill?: PropsColors['color'];
    appendIcon?: string;
    appendIconFill?: PropsColors['color'];
}

interface Emits {
    (e: 'update:modelValue', value: BInputProps['modelValue']): void;
    // (e: 'click:prepend'): void;
    // (e: 'click:append'): void;
}

const props = withDefaults(defineProps<BInputProps>(), {
    label: undefined,
    id: undefined,
    modelValue: null,
    name: undefined,
    placeholder: undefined,
    disabled: false,
    errorMessage: undefined,
    autocomplete: 'off',
    type: 'text',
    hideDetails: false,
    prependIcon: undefined,
    appendIcon: undefined,
    prependIconFill: 'secondary',
    appendIconFill: 'secondary',
});

const emit = defineEmits<Emits>();

// input and label control
const _id = computed(() => {
    return typeof props.id === 'undefined' ? v4() : props.id;
});

const isLabelRaised = computed(() => Boolean(props.modelValue));
const isLabelExists = computed(() => typeof props.label !== 'undefined');

const hasError = computed(
    () =>
        typeof props.errorMessage === 'string' ||
        (Array.isArray(props.errorMessage) && props.errorMessage.length)
);

const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

// prepend and append icons slots
// const onClickPrepend = () => {
//     if (!props.disabled) {
//         emit('click:prepend');
//     }
// };
// const onClickAppend = () => {
//     if (!props.disabled) {
//         emit('click:append');
//     }
// };
// const $listeners = useListeners();
// const inputListeners = {
//     ...$listeners,
// };

// delete inputListeners['input'];
// delete inputListeners['click:prepend'];
// delete inputListeners['click:append'];

const { listeners } = useDividedListeners();
const attrs = useAttrs();
const inputAttrs = computed(() => {
    return { ...attrs, ...listeners.value['content'] };
});
const slots = useSlots();

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

$input-height: $spacer * 14;
.b-input {
    $self: &;
    padding: $half-indent 0;

    height: $input-height;
    border: 0;
    color: inherit;
    outline: 0;
    @extend .text-2;

    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: $spacer;
    }

    &__inner {
        display: flex;
        flex-grow: 1;
        align-items: center;
        border-width: 1px;
        border-style: solid;
        border-color: $color-border--lighten;
        border-radius: $border-radius;
        padding: 0 $base-indent;
    }
    &__icon {
        display: flex;
        align-items: center;
    }
    &__prepend {
        margin-right: $spacer;
    }

    &__append {
        margin-left: $spacer;
    }
    &__prepend,
    &__append {
        line-height: 1;
        &--clickable {
            cursor: pointer;
        }
    }

    &__textfield {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        position: relative;
    }

    &__label {
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.2s ease-in-out;
        transform: translateY(#{$half-indent});
        line-height: 2;
        cursor: text;
        color: map-get($colors, 'secondary');
        pointer-events: none;
        @extend .text-2;
        &--raised {
        }
    }
    // блок с ошибками
    &__error {
        color: map-get($colors, 'error');
        padding: 0 $base-indent;
        margin-bottom: $base-indent / 2;
        min-height: 12px;
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
        cursor: default;
    }
    // выделение самого блока

    &__inner {
        &--error {
            border-color: map-get($colors, 'error');
        }
        &--disabled {
            opacity: 0.5;
        }
    }
    &--error {
        &:where(:focus, :focus-visible, :placeholder-shown) + #{$self}__label,
        + #{$self}__label--raised {
            color: map-get($colors, 'error');
        }

        + #{$self}__label {
            animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
        }
    }
}

@keyframes v-shake {
    59% {
        margin-left: 0;
    }

    60%,
    80% {
        margin-left: 2px;
    }

    70%,
    90% {
        margin-left: -2px;
    }
}
</style>
