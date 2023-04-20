import { ref, computed, ComputedRef } from 'vue';

export function useMobile(mediaQuery: string): { isMobile: ComputedRef<boolean> } {
    const mobile = ref(false);
    const isMobile = computed(() => mobile.value);

    const onChangeMatchMedia = (matchMediaEvent: MediaQueryList | MediaQueryListEvent): void => {
        mobile.value = Boolean(matchMediaEvent.matches);
    };

    if (typeof window.matchMedia === 'undefined') {
        return { isMobile };
    }

    const matchMedia = window.matchMedia(mediaQuery);
    onChangeMatchMedia(matchMedia);
    matchMedia.addEventListener('change', onChangeMatchMedia);
    return { isMobile };
}
