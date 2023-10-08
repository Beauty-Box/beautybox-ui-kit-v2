<template>
    <b-input v-maska:[phoneMaska] v-bind="customProps" />
</template>

<script setup lang="ts">
import { reactive, computed, useAttrs } from 'vue-demi';
import { vMaska, MaskaDetail } from 'maska';
import BInput from '../../inputs/BInput/index.vue';
import { useListeners } from '../../../../composables/useListeners';
import { isNumber } from '@beautybox/core/helpers';

interface BInputPhoneProps {
    name?: string;
    label?: string;
}

interface Emits {
    (e: 'update:modelValue', value?: string | number | null): void;
}

const props = withDefaults(defineProps<BInputPhoneProps>(), {
    name: 'phone',
    label: 'Телефон',
});

const emit = defineEmits<Emits>();

const $attrs = useAttrs();

const $listeners = useListeners();
const inputListeners = {
    ...$listeners,
};

delete inputListeners['update:modelValue'];

const customProps = computed(() => {
    return {
        ...$attrs,
        ...inputListeners,
        name: props.name,
        label: props.label,
        type: 'tel',
    };
});

const phoneMaska = reactive({
    mask: '+Y (###) ###-##-##',
    tokens: {
        Y: {
            pattern: /\d/,
            transform: (v: string) => {
                if (v != '7') {
                    if (v == '8') {
                        return (v = '7');
                    } else {
                        if (isNumber(v)) {
                            return `7 (${v}`;
                        } else {
                            return v;
                        }
                    }
                } else {
                    return v;
                }
            },
        },
        '#': { pattern: /\d/ },
    },
    onMaska: (detail: MaskaDetail) => {
        emit('update:modelValue', detail.masked);
    },
});
</script>

<style scoped lang="scss"></style>
