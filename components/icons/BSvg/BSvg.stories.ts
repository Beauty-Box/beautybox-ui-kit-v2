import BSvg from './index.vue';
import { colors } from '../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'svg icon',
    component: BSvg,
    argTypes: {
        fill: {
            name: 'fill',
            control: {
                type: 'select',
            },
            options: [...colors, '#111eee'],
        },
        name: {
            name: 'svg name',
            control: {
                type: 'text',
            },
        },
        size: {
            name: 'size',
            control: {
                type: 'text',
            },
        },
    },
} satisfies Meta<typeof BSvg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BSvg',
    render: (args, { argTypes }) => ({
        components: { BSvg },
        props: Object.keys(argTypes),
        setup() {
            return { args };
        },
        template: '<BSvg v-bind="args" ></BSvg>',
    }),
    args: {
        fill: 'primary',
        size: '24px',
        name: 'eye',
    },
};
