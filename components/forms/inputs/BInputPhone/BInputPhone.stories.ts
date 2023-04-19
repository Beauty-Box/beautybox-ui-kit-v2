import BInputPhone from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'input phone',
    component: BInputPhone,
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
        autocomplete: {
            name: 'autocomplete',
            control: {
                type: 'select',
            },
            options: ['off', 'new-password'],
        },
    },
} satisfies Meta<typeof BInputPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BInputPhone',
    render: (args, { argTypes }) => ({
        components: { BInputPhone },
        props: Object.keys(argTypes),
        methods: {
            onInput(value) {
                console.log(value);
            },
        },
        template: '<BInputPhone v-bind="$props" @input="onInput"></BInputPhone>',
    }),
    args: {
        value: '',
        label: 'Телефон',
        id: undefined,
        name: 'phone',
        placeholder: undefined,
        disabled: false,
        errorMessage: undefined,
        autocomplete: 'off',
    },
};
