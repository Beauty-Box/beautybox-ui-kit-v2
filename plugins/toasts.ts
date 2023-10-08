import { type App } from 'vue-demi';
import Toast, { type PluginOptions } from 'vue-toastification';
// @ts-ignore
import * as AllToast from 'vue-toastification/dist/index.mjs';
const { POSITION } = AllToast;
import '../scss/ui/_toasts.scss';

const toastOptions: PluginOptions = {
    closeButton: false,
    hideProgressBar: true,
    maxToasts: 5,
    position: POSITION.TOP_CENTER,
    containerClassName: 'toasts-container',
};

const toastPlugin = {
    install(app: App, ...options: unknown[]): any {
        app.use(Toast, toastOptions);
    },
};

export { toastPlugin };
export default toastPlugin;
