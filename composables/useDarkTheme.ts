import { useDark } from '@vueuse/core';

export function useDarkTheme() {
    const isDark = useDark({
        selector: 'body',
        valueDark: 'dark',
        storageKey: null,
    });
    return { isDark };
}

export default useDarkTheme;
