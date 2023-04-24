import BCheckbox from './index.vue';

import BSvg from '../../../icons/BSvg/index.vue';
import { colors } from '../../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'base checkbox',
    component: BCheckbox,
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
        indeterminate: {
            name: 'indeterminate',
            control: {
                type: 'select',
            },
            options: [true, false],
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
} satisfies Meta<typeof BCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BCheckbox',
    render: (args, { argTypes }) => ({
        components: { BCheckbox, BSvg },
        props: Object.keys(argTypes),
        data() {
            return {
                isAgree: false,
            };
        },
        methods: {},
        template: '<BCheckbox v-bind="$props" v-model="isAgree"></BCheckbox>',
    }),
    args: {
        // value: false,
        label: 'Согласен',
        id: undefined,
        name: 'checkbox',
        color: 'info',
        indeterminate: false,
        disabled: false,
        errorMessage: undefined,
        hideDetails: false,
        bindLabel: false,
    },
};

export const Array: Story = {
    name: 'BCheckbox array',
    render: (args, { argTypes }) => ({
        components: { BCheckbox, BSvg },
        props: Object.keys(argTypes),
        data() {
            return {
                services: [],
            };
        },
        methods: {},
        template: `
        <div>
            <pre>
                {{ services }}
            </pre>
            <BCheckbox v-bind="$props" v-model="services" value="Маникюр"></BCheckbox>
            <BCheckbox v-bind="$props" v-model="services" value="Педикюр"></BCheckbox>
            <BCheckbox v-bind="$props" v-model="services" value="Волосы"></BCheckbox>
        </div>`,
    }),
    args: {
        // value: false,
        label: 'Согласен',
        id: undefined,
        name: 'checkbox',
        color: 'info',
        indeterminate: false,
        disabled: false,
        errorMessage: undefined,
        hideDetails: false,
        bindLabel: false,
    },
};
