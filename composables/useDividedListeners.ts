import { computed, useAttrs, isVue2, getCurrentInstance } from 'vue-demi';

export function useDividedListeners() {
    let $listeners: Record<string, any> | unknown = {};
    if (isVue2) {
        const instance = getCurrentInstance();
        // @ts-nocheck
        ({ $listeners = {} as Record<string, any> } = instance?.proxy ?? {
            $listeners: {} as Record<string, any>,
        });
    } else {
        const $attrs = useAttrs();
        $listeners = Object.fromEntries(
            Object.entries($attrs).filter(([key, value]) => {
                return key.startsWith('on');
            })
        );
    }

    const listeners = computed(() => {
        return Object.keys($listeners as Record<string, any>).reduce<{
            prepend: Record<string, any>;
            append: Record<string, any>;
            content: Record<string, any>;
        }>(
            (acc, key) => {
                if (key.endsWith(':prepend')) {
                    const newKey = key.replace(/:prepend$/, '');
                    acc['prepend'][newKey] = ($listeners as Record<string, any>)[key];
                    return acc;
                }
                if (key.endsWith(':append')) {
                    const newKey = key.replace(/:append$/, '');
                    acc['append'][newKey] = ($listeners as Record<string, any>)[key];
                    return acc;
                }
                acc['content'][key] = ($listeners as Record<string, any>)[key];
                return acc;
            },
            { prepend: {}, append: {}, content: {} }
        );
    });
    return { listeners };
}

export default useDividedListeners;
