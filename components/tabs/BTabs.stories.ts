import BTabs from './BTabs.vue';
import BTab from './BTab.vue';

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
        components: { BTabs, BTab },
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
                    </BTabs>`,
    }),
    args: {
        modelValue: 0,
        rounded: true,
        grow: true,
    },
};
