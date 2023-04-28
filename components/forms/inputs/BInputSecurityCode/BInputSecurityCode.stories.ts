import BInputSecurityCode from './index.vue';
import { colors } from '../../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'input security code',
    component: BInputSecurityCode,
    argTypes: {
        value: {
            name: 'value',
            control: {
                type: 'text',
            },
        },
        blurOnComplete: {
            name: 'blur on complete',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        securityCodeLength: {
            name: 'security code length',
            control: {
                type: 'number',
            },
        },
        isArray: {
            name: 'is array',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        type: {
            name: 'type',
            control: {
                type: 'select',
            },
            options: ['text', 'tel'],
        },
        bg: {
            name: 'background',
            control: {
                type: 'select',
            },
            options: [undefined, '#f7f7f8'],
        },
        hideDetails: {
            name: 'hide details',
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
            options: [undefined, 'Введен неверный код'],
        },
    },
} satisfies Meta<typeof BInputSecurityCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BInputSecurityCode',
    render: (args, { argTypes }) => ({
        components: { BInputSecurityCode },
        props: Object.keys(argTypes),
        methods: {
            onInput(value) {
                console.log(value);
            },
            onComplete() {
                console.log('completed');
            },
            onClearErrors() {
                console.log('errors cleared');
            },
            onFocus() {
                console.log('focused');
            },
        },
        template: `<BInputSecurityCode v-bind="$props" @input="onInput" @complete="onComplete" @clear-errors="onClearErrors" @focus="onFocus">
        </BInputSecurityCode>`,
    }),
    args: {
        value: '',
        blurOnComplete: false,
        securityCodeLength: 4,
        isArray: false,
        type: 'tel',
        bg: undefined,
        hideDetails: false,
        errorMessage: undefined,
    },
};
