import type { PluginOption } from 'vite';

export const vitePluginSvgPath = ({ path }: { path: string }) => {
    return {
        name: 'svg-path',
        config: () => ({
            resolve: {
                alias: [
                    {
                        find: '@svg-path',
                        replacement: path,
                    },
                ],
            },
        }),
    } as PluginOption;
};

export default vitePluginSvgPath;
