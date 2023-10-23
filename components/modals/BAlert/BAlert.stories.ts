import BAlert from './index.vue';
import BButton from '../../buttons/BButton/index.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'modals/alert',
    component: BAlert,
    argTypes: {},
} satisfies Meta<typeof BAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BAlert',
    render: (args, { argTypes }) => ({
        components: { BAlert, BButton },
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
                <BAlert v-bind="args" v-model="isOpen">
                
                </BAlert>
            </div>
        `,
    }),
    args: {
        modelValue: false,
    },
};
