import BAvatarGroup from './index.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'b avatar group',
    component: BAvatarGroup,
    argTypes: {},
} satisfies Meta<typeof BAvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BAvatarGroup',
    render: (args, { argTypes }) => ({
        components: { BAvatarGroup },
        props: Object.keys(argTypes),
        setup() {
            return { args };
        },
        template: `
        <div :style="{
            height: '64px',
        }" >
            <BAvatarGroup v-bind="args"></BAvatarGroup>
        </div>
        `,
    }),
    args: {
        photos: ['/images/man.webp', '/images/happy-woman.webp', '/images/pointing-woman.webp'],
        size: 64,
        border: 2,
        indent: 42,
        direction: 'left',
    },
};
