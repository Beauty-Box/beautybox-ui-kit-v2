// @ts-ignore
import * as Toast from 'vue-toastification/dist/index.mjs';

const { useToast: useToastOriginal } = Toast;

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
            toastClassName: 'toast-message',
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
            toastClassName: 'toast-message',
        });
    };

    return { messageSuccess, messageError };
}

export default useToast;
