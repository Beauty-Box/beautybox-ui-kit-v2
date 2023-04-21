import BInputPassword from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue';
import { colors } from '../../../../composables/ui/useColor';

const meta = {
    title: 'input password',
    component: BInputPassword,
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
            options: [undefined, 'Придумайте пароль'],
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
            options: [undefined, 'Пароль не может быть короче 6 символов'],
        },
        autocomplete: {
            name: 'autocomplete',
            control: {
                type: 'select',
            },
            options: ['off', 'new-password'],
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
        appendIcon: {
            name: 'append icon',
            control: {
                type: 'text',
            },
        },
        appendIconFill: {
            name: 'append icon fill',
            control: {
                type: 'select',
            },
            options: colors,
        },
    },
} satisfies Meta<typeof BInputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BInputPassword',
    render: (args, { argTypes }) => ({
        components: { BInputPassword },
        props: Object.keys(argTypes),
        methods: {
            onInput(value) {
                console.log(value);
            },
        },
        template: '<BInputPassword v-bind="$props" @input="onInput"></BInputPassword>',
    }),
    args: {
        value: '',
        label: 'Придумайте пароль',
        id: undefined,
        name: 'password',
        placeholder: undefined,
        disabled: false,
        errorMessage: undefined,
        autocomplete: 'off',
        prependIcon: undefined,
        appendIcon: undefined,
    },
};
