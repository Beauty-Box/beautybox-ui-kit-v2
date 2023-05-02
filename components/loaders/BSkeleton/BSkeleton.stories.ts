import BSkeleton from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'skeleton',
    component: BSkeleton,
    argTypes: {
        width: {
            name: 'width',
            control: {
                type: 'text',
            },
        },
        height: {
            name: 'height',
            control: {
                type: 'text',
            },
        },
    },
} satisfies Meta<typeof BSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BSkeleton',
    render: (args, { argTypes }) => ({
        components: { BSkeleton },
        props: Object.keys(argTypes),
        template: '<BSkeleton v-bind="$props" ></BSkeleton>',
    }),
    args: {
        width: '100%',
        height: '56',
    },
};
