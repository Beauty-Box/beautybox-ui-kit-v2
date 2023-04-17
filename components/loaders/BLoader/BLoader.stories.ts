import BLoader from './BLoader.vue';
import { colors } from '../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'base loader',
    component: BLoader,
    argTypes: {
        color: {
            name: 'color',
            control: {
                type: 'select',
            },
            options: colors,
        },
        size: {
            name: 'size',
            control: {
                type: 'number',
            },
        },
        width: {
            name: 'width',
            control: {
                type: 'number',
            },
        },
        value: {
            name: 'value',
            control: {
                type: 'range',
                min: 0,
                max: 100,
                step: 1,
            },
        },
        rotate: {
            name: 'rotate',
            control: {
                type: 'range',
                min: 0,
                max: 360,
                step: 1,
            },
        },
        indeterminate: {
            name: 'indeterminate',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BLoader',
    render: (args, { argTypes }) => ({
        components: { BLoader },
        props: Object.keys(argTypes),
        template: '<BLoader v-bind="$props" >text</BLoader>',
    }),
    args: {
        color: 'primary',
        rotate: 0,
        size: 60,
        width: 4,
        value: 40,
        indeterminate: false,
    },
};
