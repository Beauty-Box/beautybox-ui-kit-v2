import BInput from './index.vue';

import BSvg from '../../../icons/BSvg/index.vue';
import { colors } from '../../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'base input',
    component: BInput,
    argTypes: {
        value: {
            name: 'value',
            control: {
                type: 'text',
            },
        },
        label: {
            name: 'label',
            control: {
                type: 'select',
            },
            options: [undefined, 'Телефон'],
        },
        id: {
            name: 'id',
            control: {
                type: 'select',
            },
            options: [undefined, '555'],
        },
        name: {
            name: 'name',
            control: {
                type: 'text',
            },
        },
        placeholder: {
            name: 'placeholder',
            control: {
                type: 'select',
            },
            options: [undefined, '777'],
        },
        disabled: {
            name: 'disabled',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        errorMessage: {
            name: 'error message',
            control: {
                type: 'select',
            },
            options: [undefined, 'Пользователь с таким телефоном не найден'],
        },
        type: {
            name: 'type',
            control: {
                type: 'select',
            },
            options: ['text', 'password'],
        },
        autocomplete: {
            name: 'autocomplete',
            control: {
                type: 'select',
            },
            options: ['off', 'new-password'],
        },
        hideDetails: {
            name: 'hide details',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        prependIcon: {
            name: 'prepend icon',
            control: {
                type: 'text',
            },
        },
        prependIconFill: {
            name: 'prepend icon fill',
            control: {
                type: 'select',
            },
            options: colors,
        },
    },
} satisfies Meta<typeof BInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BInput',
    render: (args, { argTypes }) => ({
        components: { BInput, BSvg },
        props: Object.keys(argTypes),
        methods: {
            onInput(value) {
                console.log(value);
            },
            onClickPrepend() {
                console.log('clickPrepend');
            },
            onClickAppend() {
                console.log('clickAppend');
            },
        },
        template: `<BInput v-bind="$props" @input="onInput" @click:prepend="onClickPrepend">
            <template #append>
                <BSvg name="eye-off" @click="onClickAppend"/>
            </template>
        </BInput>`,
    }),
    args: {
        value: '',
        label: 'Телефон',
        id: undefined,
        name: 'phone',
        placeholder: undefined,
        disabled: false,
        errorMessage: undefined,
        type: 'text',
        autocomplete: 'off',
        hideDetails: false,
        prependIcon: 'eye',
        prependIconFill: 'secondary',
    },
};
