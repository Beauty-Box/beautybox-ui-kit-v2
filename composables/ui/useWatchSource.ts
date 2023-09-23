import { computed, type WatchSource, type Ref, type ComputedRef } from 'vue';

export function useWatchSource<T>(source: WatchSource<T>): Ref<T> | ComputedRef<T> {
    return typeof source === 'function' ? computed(source) : source;
}

export default useWatchSource;
