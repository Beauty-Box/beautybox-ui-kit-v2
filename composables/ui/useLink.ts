import { computed, type WatchSource } from 'vue';
import { useWatchSource } from './useWatchSource';
import { type RawLocation } from 'vue-router';
export interface PropsLink {
    href?: string;
    to?: RawLocation;
}
export function useLink<T extends PropsLink>(source: WatchSource<T>) {
    const props = useWatchSource(source);

    const isHref = computed(() => {
        return props.value.href !== undefined;
    });
    const isRouterLink = computed(() => {
        return props.value.to !== undefined;
    });

    const isLink = computed(() => {
        return isHref.value || isRouterLink.value;
    });

    const attrsLink = computed(() => {
        const attrs: Record<string, any> = {};
        if (isHref.value) {
            attrs.href = props.value.href;
        }
        if (isRouterLink.value) {
            attrs.to = props.value.to;
        }
        return attrs;
    });
    return { isLink, isHref, isRouterLink, attrsLink };
}

export default useLink;
