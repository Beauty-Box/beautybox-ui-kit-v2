import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
import svgLoader from 'vite-svg-loader';

// jsconfigPaths()
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            vue(),
            svgLoader({
                // defaultImport: 'component',
            }),
        ],
    };
});
