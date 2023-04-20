import BButton from './index.vue';
import { colors } from '../../../composables/ui/useColor';
import { variants } from '../../../composables/ui/useVariant';
import { sizes } from '../../../composables/ui/useSize';

import type { Meta, StoryObj } from '@storybook/vue';
import StoryRouter from 'storybook-vue-router';

const meta = {
    title: 'base button',
    component: BButton,
    decorators: [StoryRouter()],
    argTypes: {
        color: {
            name: 'color',
            control: {
                type: 'select',
            },
            options: colors,
        },
        block: {
            name: 'block',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        disabled: {
            name: 'disabled',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        variant: {
            name: 'variant',
            control: {
                type: 'select',
            },
            options: variants,
        },
        size: {
            name: 'size',
            control: {
                type: 'select',
            },
            options: sizes,
        },
        type: {
            name: 'type',
            control: {
                type: 'select',
            },
            options: ['button', 'submit', 'reset'],
        },
        href: {
            name: 'href',
            control: {
                type: 'text',
            },
        },
        to: {
            name: 'to',
            control: {
                type: 'object',
            },
        },
        loading: {
            name: 'loading',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BButton',
    render: (args, { argTypes }) => ({
        components: { BButton },
        props: Object.keys(argTypes),
        template: '<BButton v-bind="$props" >Text text</BButton>',
    }),
    args: {
        color: 'primary',
        block: false,
        disabled: false,
        loading: false,
        variant: 'fill',
        size: 'medium',
        type: 'button',
        // href: 'https://beautybox-stage.ru/',
        // to: { name: 'calendar' },
    },
};
