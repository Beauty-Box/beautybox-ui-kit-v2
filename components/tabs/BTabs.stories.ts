import BTabs from './BTabs.vue';
import BTab from './BTab.vue';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'base tabs',
    component: BTabs,
    argTypes: {},
} satisfies Meta<typeof BTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BTabs',
    render: (args, { argTypes }) => ({
        components: { BTabs, BTab },
        props: Object.keys(argTypes),
        data() {
            return {
                active: 0,
            };
        },
        template: `<BTabs v-bind="$props" v-model="active">
                        <BTab :value="1">1</BTab>
                        <BTab :value="2">2</BTab>
                        <BTab :value="3">3</BTab>
                    </BTabs>`,
    }),
    args: {},
};
