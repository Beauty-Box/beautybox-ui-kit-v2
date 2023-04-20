<template>
    <b-input v-bind="customProps" v-on="$listeners">
        <template #append="{ disabled }">
            <b-svg
                v-show="hidePassword"
                name="eye"
                fill="secondary"
                :size="22"
                @click.native="onHidePasswordToggle(disabled)"
            />
            <b-svg
                v-show="!hidePassword"
                name="eye-off"
                fill="secondary"
                :size="22"
                @click.native="onHidePasswordToggle(disabled)"
            />
        </template>
    </b-input>
</template>

<script setup lang="ts">
import { ref, Ref, computed, useAttrs } from 'vue';
import BInput from '../../inputs/BInput/index.vue';
import BSvg from '../../../icons/BSvg/index.vue';

interface BInputPasswordProps {
    name?: string;
    label?: string;
}

const props = withDefaults(defineProps<BInputPasswordProps>(), {
    name: 'password',
    label: 'Пароль',
});

const hidePassword = ref(true) as Ref<boolean>;

const inputType = computed(() => {
    return hidePassword.value ? 'password' : 'text';
});

const onHidePasswordToggle = (disabled: boolean) => {
    if (!disabled) {
        hidePassword.value = !hidePassword.value;
    }
};

// const iconName = computed(() => {
//     return hidePassword.value ? 'eye' : 'eye-off';
// });

const $attrs = useAttrs();
const customProps = computed(() => {
    return {
        ...$attrs,
        name: props.name,
        label: props.label,
        type: inputType.value,
    };
});
</script>

<style scoped lang="scss"></style>
