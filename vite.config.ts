import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
// import svgLoader from 'vite-svg-loader';
// временное решение для vue 2.7 из-за багов с vue/sfc-compiler и сторибук
import { createSvgPlugin } from '@kingyue/vite-plugin-vue2-svg';

// jsconfigPaths()
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            vue(),
            // svgLoader({
            // defaultImport: 'component',
            //}),
            createSvgPlugin(),
        ],

        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./scss/variables.scss";',
                },
                // // @see working vite sass styles override
                // // https://stackoverflow.com/questions/70656230/overriding-vuetify-variables-when-building-a-vue2vuetify-app-with-vite
                // sass: {
                //     additionalData: ['@import "./scss/variables.scss"', ''].join('\n'),
                // },
            },
        },
    };
});
