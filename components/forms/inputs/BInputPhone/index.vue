<template>
    <b-input v-maska:[phoneMaska] v-bind="customProps" v-on="$listeners" />
</template>

<script setup lang="ts">
import { ref, Ref, reactive, computed, useAttrs } from 'vue';
import { vMaska } from 'maska';
import BInput from '../../inputs/BInput/index.vue';
import { isNumber } from '@beautybox/core/helpers';

interface BInputPasswordProps {
    name?: string;
    label?: string;
}

const props = withDefaults(defineProps<BInputPasswordProps>(), {
    name: 'phone',
    label: 'Телефон',
});

const $attrs = useAttrs();
const customProps = computed(() => {
    return {
        ...$attrs,
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
                            return (v = `7 (${v}`);
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
});
</script>

<style scoped lang="scss"></style>
