import BlockLoader from './index.vue';
import { colors } from '../../../composables/ui/useColor';
import { positions } from '../../../composables/ui/usePosition';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'block loader',
    component: BlockLoader,
    argTypes: {
        bgc: {
            name: 'background color',
            control: {
                type: 'color',
            },
        },
        color: {
            name: 'color',
            control: {
                type: 'select',
            },
            options: colors,
        },
        position: {
            name: 'position',
            control: {
                type: 'select',
            },
            options: positions,
        },
        size: {
            name: 'size',
            control: {
                type: 'number',
            },
        },
        minHeight: {
            name: 'minHeight',
            control: {
                type: 'text',
            },
        },
        maxHeight: {
            name: 'maxHeight',
            control: {
                type: 'text',
            },
        },
        zIndex: {
            name: 'z index',
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
        indeterminate: {
            name: 'indeterminate',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BlockLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BlockLoader',
    render: (args, { argTypes }) => ({
        components: { BlockLoader },
        props: Object.keys(argTypes),
        template: '<BlockLoader v-bind="$props" >text</BlockLoader>',
    }),
    args: {
        bgc: '#eeeeee',
        color: 'primary',
        position: 'absolute',
        minHeight: 'auto',
        maxHeight: 'auto',
        zIndex: 10,
        size: 50,
        width: 3,
        indeterminate: true,
    },
};
