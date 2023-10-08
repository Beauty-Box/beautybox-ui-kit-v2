import { computed } from 'vue-demi';
import { useListeners } from './useListeners';

export function useDividedListeners() {
    const $listeners = useListeners();

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
