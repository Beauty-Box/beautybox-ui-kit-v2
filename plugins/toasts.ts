import { type App } from 'vue-demi';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
    closeButton: false,
    hideProgressBar: true,
    maxToasts: 5,
    position: POSITION.TOP_CENTER,
};

const toastPlugin = {
    install(app: App, options: unknown[]): any {
        app.use(Toast, toastOptions);
    },
};

export { toastPlugin };
export default toastPlugin;
