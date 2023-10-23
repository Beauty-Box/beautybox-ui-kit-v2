import BSkeleton from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

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
        rounded: {
            name: 'rounded',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        boilerplate: {
            name: 'boilerplate',
            control: {
                type: 'select',
            },
            options: [true, false],
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
        setup() {
            return { args };
        },
        template: '<BSkeleton v-bind="args" ></BSkeleton>',
    }),
    args: {
        width: '100%',
        height: '56',
        rounded: false,
        boilerplate: false,
    },
};
