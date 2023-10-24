import BDialog from './index.vue';
import BButton from '../../buttons/BButton/index.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'modals/dialog',
    component: BDialog,
    argTypes: {
        width: {
            name: 'width',
            control: {
                type: 'range',
                min: 0,
                max: 900,
            },
        },
        persistent: {
            name: 'persistent',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BDialog',
    render: (args, { argTypes }) => ({
        components: { BDialog, BButton },
        props: Object.keys(argTypes),
        data() {
            return {
                isOpen: false,
            };
        },
        methods: {
            onOpenModal() {
                this.isOpen = true;
            },
        },
        setup() {
            return {
                args,
            };
        },
        template: `
            <div>
                <BButton @click="onOpenModal">open</BButton>
                <BDialog v-bind="args" v-model="isOpen">
                    test
                </BDialog>
            </div>
        `,
    }),
    args: {
        modelValue: false,
        persistent: false,
        width: 320,
    },
};
