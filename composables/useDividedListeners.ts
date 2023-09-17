import { computed, useAttrs, isVue2, getCurrentInstance } from 'vue-demi';

export function useDividedListeners() {
    let $listeners: Record<string, any>;
    if (isVue2) {
        const instance = getCurrentInstance();
        ({ $listeners = {} } = instance?.proxy ?? { $listeners: {} });
    } else {
        const $attrs = useAttrs();
        $listeners = Object.fromEntries(
            Object.entries($attrs).filter(([key, value]) => {
                return key.startsWith('on');
            })
        );
    }

    const listeners = computed(() => {
        return Object.keys($listeners).reduce<{
            prepend: Record<string, any>;
            append: Record<string, any>;
            content: Record<string, any>;
        }>(
            (acc, key) => {
                if (key.endsWith(':prepend')) {
                    const newKey = key.replace(/:prepend$/, '');
                    acc['prepend'][newKey] = $listeners[key];
                    return acc;
                }
                if (key.endsWith(':append')) {
                    const newKey = key.replace(/:append$/, '');
                    acc['append'][newKey] = $listeners[key];
                    return acc;
                }
                acc['content'][key] = $listeners[key];
                return acc;
            },
            { prepend: {}, append: {}, content: {} }
        );
    });
    return { listeners };
}

export default useDividedListeners;
