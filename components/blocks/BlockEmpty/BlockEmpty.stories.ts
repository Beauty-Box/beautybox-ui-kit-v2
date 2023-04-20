import BlockEmpty from './index.vue';
import BButton from '../../buttons/BButton/index.vue';
import BSvg from '../../icons/BSvg/index.vue';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'block empty',
    component: BlockEmpty,
    argTypes: {
        icon: {
            name: 'icon',
            control: {
                type: 'select',
            },
            options: [undefined, '404_calendar', 'eye', 'services-none'],
        },
        title: {
            name: 'title',
            control: {
                type: 'text',
            },
        },
        text: {
            name: 'text',
            control: {
                type: 'text',
            },
        },
        center: {
            name: 'center',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        bigSize: {
            name: 'bigSize',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
        textWidth: {
            name: 'textWidth',
            control: {
                type: 'text',
            },
        },
        titleNormal: {
            name: 'titleNormal',
            control: {
                type: 'select',
            },
            options: [false, true],
        },
    },
} satisfies Meta<typeof BlockEmpty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'BlockEmpty',
    render: (args, { argTypes }) => ({
        components: { BlockEmpty, BButton, BSvg },
        props: Object.keys(argTypes),
        template: `<BlockEmpty v-bind="$props" >
        <template #image>
            <b-svg name="services-none" :size="190" :style="{ position: 'relative', marginBottom: '-60px',
                marginRight: '-55px', pointerEvents: 'none' }" />
        </template>
        <template #buttons>
            <b-button>Button</b-button>
        </template>
        </BlockEmpty>`,
    }),
    args: {
        icon: '404_calendar',
        title: 'Test',
        text: 'test test test',
        center: false,
        bigSize: false,
        textWidth: '35',
        titleNormal: false,
    },
};
