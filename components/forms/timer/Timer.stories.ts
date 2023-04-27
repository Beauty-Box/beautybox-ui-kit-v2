import Timer from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'timer',
    component: Timer,
    argTypes: {
        time: {
            name: 'time',
            control: {
                type: 'number',
            },
        },
    },
} satisfies Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Timer',
    render: (args, { argTypes }) => ({
        components: { Timer },
        props: Object.keys(argTypes),
        methods: {
            onEnd() {
                console.log('end timer');
            },
        },
        template: '<Timer v-bind="$props" @end="onEnd"></Timer>',
    }),
    args: {
        time: 60,
    },
};
