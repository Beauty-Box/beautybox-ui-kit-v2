import BInput from './index.vue';

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
    },
} satisfies Meta<typeof BInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BInput',
    render: (args, { argTypes }) => ({
        components: { BInput },
        props: Object.keys(argTypes),
        methods: {
            onInput(value) {
                console.log(value);
            },
        },
        template: '<BInput v-bind="$props" @input="onInput"></BInput>',
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
    },
};
