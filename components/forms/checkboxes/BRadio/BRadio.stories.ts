import BRadio from './index.vue';

import BSvg from '../../../icons/BSvg/index.vue';
import { colors } from '../../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'base radio button',
    component: BRadio,
    argTypes: {
        value: {
            name: 'value',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        label: {
            name: 'label',
            control: {
                type: 'select',
            },
            options: [undefined, 'Согласен'],
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
        color: {
            name: 'color',
            control: {
                type: 'select',
            },
            options: colors,
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
        hideDetails: {
            name: 'hide details',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        bindLabel: {
            name: 'bindLabel',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
    },
} satisfies Meta<typeof BRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BRadio',
    render: (args, { argTypes }) => ({
        components: { BRadio, BSvg },
        props: Object.keys(argTypes),
        data() {
            return {
                isAgree: false,
            };
        },
        methods: {},
        template: '<BRadio v-bind="$props" v-model="isAgree"></BRadio>',
    }),
    args: {
        // value: false,
        label: 'Согласен',
        id: undefined,
        name: 'radio',
        color: 'info',
        disabled: false,
        errorMessage: undefined,
        hideDetails: false,
        bindLabel: false,
    },
};

export const Array: Story = {
    name: 'BRadio array',
    render: (args, { argTypes }) => ({
        components: { BRadio, BSvg },
        props: Object.keys(argTypes),
        data() {
            return {
                service: 'Маникюр',
            };
        },
        methods: {},
        template: `
        <div>
            <pre>
                {{ service }}
            </pre>
            <BRadio v-bind="$props" v-model="service" value="Маникюр"></BRadio>
            <BRadio v-bind="$props" v-model="service" value="Педикюр"></BRadio>
            <BRadio v-bind="$props" v-model="service" value="Волосы"></BRadio>
        </div>`,
    }),
    args: {
        // value: false,
        label: 'Согласен',
        id: undefined,
        name: 'radio',
        color: 'info',
        disabled: false,
        errorMessage: undefined,
        hideDetails: false,
        bindLabel: false,
    },
};
