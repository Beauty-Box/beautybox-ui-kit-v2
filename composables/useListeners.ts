import { useAttrs, isVue2, getCurrentInstance } from 'vue-demi';

export function useListeners(): Record<string, any> {
    let $listeners: Record<string, any> | unknown = {};
    if (isVue2) {
        const instance = getCurrentInstance();
        // @ts-nocheck
        // @ts-ignore
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

    return $listeners as Record<string, any>;
}

export default useListeners;
