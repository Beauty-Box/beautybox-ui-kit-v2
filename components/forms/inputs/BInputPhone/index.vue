<template>
    <b-input v-maska:[phoneMaska] v-bind="customProps" v-on="inputListeners" />
</template>

<script setup lang="ts">
import { ref, Ref, reactive, computed, useAttrs, useListeners } from 'vue';
import { vMaska, MaskaDetail } from 'maska';
import BInput from '../../inputs/BInput/index.vue';
import { isNumber } from '@beautybox/core/helpers';

interface BInputPasswordProps {
    name?: string;
    label?: string;
}

interface Emits {
    (e: 'input', value?: string | number | null): void;
}

const props = withDefaults(defineProps<BInputPasswordProps>(), {
    name: 'phone',
    label: 'Телефон',
});

const emit = defineEmits<Emits>();

const $attrs = useAttrs();
const customProps = computed(() => {
    return {
        ...$attrs,
        name: props.name,
        label: props.label,
        type: 'tel',
    };
});

const $listeners = useListeners();
const inputListeners = {
    ...$listeners,
};

delete inputListeners['input'];

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
        emit('input', detail.masked);
    },
});
</script>

<style scoped lang="scss"></style>
