import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useErrorsStore = defineStore('app-errors', () => {
    const error = ref(false) as Ref<boolean>;
    const type = ref('') as Ref<string>;

    const setError = (payload: string) => {
        error.value = true;
        type.value = payload;
    };

    const clearError = () => {
        error.value = false;
        type.value = '';
    };

    return {
        error,
        type,
        setError,
        clearError,
    };
});
export default useErrorsStore;
