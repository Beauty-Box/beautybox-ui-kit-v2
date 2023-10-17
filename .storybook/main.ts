import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'path';

export const config: StorybookConfig =  {
    stories: ['../components/**/*.stories.ts'],
    //addons: ['@storybook/addon-docs', '@storybook/addon-jest/register', '@storybook/addon-viewport/register',
    
//],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials',  {
        name: '@storybook/addon-storysource',
        options: {
            rule: {
                test: /\.stories\.ts$/,
                include: [resolve(__dirname, '../components')]
            }
        }
    }],
    docs: {
        autodocs: 'tag'
    },
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },
    core: {
        builder: '@storybook/builder-vite',
    },
};

export default config;