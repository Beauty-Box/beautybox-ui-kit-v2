import ImageUserAvatar from './index.vue';

import { colors } from '../../../composables/ui/useColor';

import type { Meta, StoryObj } from '@storybook/vue';

const meta = {
    title: 'image user avatar',
    component: ImageUserAvatar,
    argTypes: {
        size: {
            name: 'size',
            control: {
                type: 'text',
            },
        },
        color: {
            name: 'color',
            control: {
                type: 'select',
            },
            options: colors,
        },
        letterColor: {
            name: 'letterColor',
            control: {
                type: 'select',
            },
            options: colors,
        },
        square: {
            name: 'square',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        shadow: {
            name: 'shadow',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
        image: {
            name: 'image',
            control: {
                type: 'select',
            },
            options: [
                null,
                'https://bb-avatar.storage.yandexcloud.net/users/ac/e4/ace463c5cc2fad0b9acc5ffff83285e9/ace463c5cc2fad0b9acc5ffff83285e9_200x200.jpg?hash=0.76d759460ed03',
            ],
        },
        name: {
            name: 'name',
            control: {
                type: 'select',
            },
            options: [null, 'Дмитрий', 'Дмитрий Шляхта'],
        },
        emptyTwoLetters: {
            name: 'emptyTwoLetters',
            control: {
                type: 'select',
            },
            options: [true, false],
        },
    },
} satisfies Meta<typeof ImageUserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'ImageUserAvatar',
    render: (args, { argTypes }) => ({
        components: { ImageUserAvatar },
        props: Object.keys(argTypes),
        template: '<ImageUserAvatar v-bind="$props"></ImageUserAvatar>',
    }),
    args: {
        size: '60',
        color: 'secondary',
        letterColor: 'primary',
        square: false,
        shadow: false,
        image: null,
        name: null,
        emptyTwoLetters: false,
    },
};
