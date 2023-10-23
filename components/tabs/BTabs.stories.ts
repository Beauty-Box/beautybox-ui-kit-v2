import BTabs from './BTabs.vue';
import BTab from './BTab.vue';
import BTabsItems from './BTabsItems.vue';
import BTabItem from './BTabItem.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'base tabs',
    component: BTabs,
    argTypes: {
        rounded: {
            name: 'rounded',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        grow: {
            name: 'grow',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BTabs',
    render: (args, { argTypes }) => ({
        components: { BTabs, BTab, BTabsItems, BTabItem },
        props: Object.keys(argTypes),
        data() {
            return {
                active: 0,
            };
        },
        setup() {
            return {
                args,
            };
        },
        template: `
        <div>
           {{ active }}
        </div>
        <BTabs v-bind="args" v-model="active">
            <BTab :value="0" text="test 0"></BTab>
            <BTab :value="1" text="test 1"></BTab>
            <BTab :value="2" text="test 2"></BTab>
        </BTabs>
        <BTabsItems v-model="active">
            <BTabItem :value="0" eager>
                content 0
            </BTabItem>
            <BTabItem :value="1" eager>
                content 1
            </BTabItem>
            <BTabItem :value="2" eager>
                content 2
            </BTabItem>
        </BTabsItems>
        `,
    }),
    args: {
        modelValue: 0,
        rounded: true,
        grow: false,
    },
};
