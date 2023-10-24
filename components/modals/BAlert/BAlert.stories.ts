import BAlert from './index.vue';
import BButton from '../../buttons/BButton/index.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    title: 'modals/alert',
    component: BAlert,
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
        successText: {
            name: 'successText',
            control: {
                type: 'text',
            },
        },
        cancelText: {
            name: 'cancelText',
            control: {
                type: 'text',
            },
        },
    },
} satisfies Meta<typeof BAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BAlert',
    render: (args, { argTypes }) => ({
        components: { BAlert, BButton },
        // props: Object.keys(argTypes),
        data() {
            return {
                isOpen: false,
                title: 'Удаление карты',
                text: 'Эта карта используется для автоматических списаний за подписку на модуль «Ручная отправка сообщений». После удаления карты, автоплатеж будет отключен.',
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
                <BAlert v-bind="args" v-model="isOpen" :title="title" :text="text">
                    
                </BAlert>
            </div>
        `,
    }),
    args: {
        modelValue: false,
        persistent: false,
        width: 320,
        successText: 'Подключить',
        cancelText: 'Оставить',
    },
};
