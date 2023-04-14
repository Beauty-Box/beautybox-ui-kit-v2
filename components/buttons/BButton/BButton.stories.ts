import BButton from './BButton.vue';

console.log(BButton);

import type { Meta, StoryObj } from '@storybook/vue';

const meta: Meta<typeof BButton> = {
    title: 'base button',
    component: BButton,
};

export default meta;

type Story = StoryObj<typeof BButton>;

export const Primary: Story = {
    name: 'BButton',
    render: (args, { argTypes }) => ({
        components: { BButton },
        props: Object.keys(argTypes),
        template: '<BButton v-bind="$props" />',
    }),
    args: {
        color: 'primary',
    },
};
