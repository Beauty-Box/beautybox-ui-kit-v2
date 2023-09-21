import { useToast as useToastOriginal } from 'vue-toastification';

export function useToast() {
    const toast = useToastOriginal();

    const messageSuccess = (text: string, timeout = 2000) => {
        toast.success(text, {
            timeout,
            icon: {
                iconClass: 'material-icons',
                iconChildren: 'check_circle_outline',
                iconTag: 'span',
            },
        });
    };
    const messageError = (text: string, timeout = 2000) => {
        toast.error(text, {
            timeout,
            icon: {
                iconClass: 'material-icons',
                iconChildren: 'error_outline',
                iconTag: 'span',
            },
        });
    };

    return { messageSuccess, messageError };
}

export default useToast;
