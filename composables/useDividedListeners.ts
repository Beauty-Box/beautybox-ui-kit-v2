import { computed } from 'vue-demi';
import { useListeners } from './useListeners';

export function useDividedListeners() {
    // let $listeners: Record<string, any> | unknown = {};
    // if (isVue2) {
    //     const instance = getCurrentInstance();
    //     // @ts-nocheck
    //     // @ts-ignore
    //     ({ $listeners = {} as Record<string, any> } = instance?.proxy ?? {
    //         $listeners: {} as Record<string, any>,
    //     });
    // } else {
    //     const $attrs = useAttrs();
    //     $listeners = Object.fromEntries(
    //         Object.entries($attrs).filter(([key, value]) => {
    //             return key.startsWith('on');
    //         })
    //     );
    // }

    const $listeners = useListeners();

    const listeners = computed(() => {
        //  as Record<string, any>
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
