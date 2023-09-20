import { defineAsyncComponent } from 'vue-demi';

const EmptyLayout = defineAsyncComponent(() => import('./../layouts/EmptyLayout.vue'));
const ErrorLayout = defineAsyncComponent(() => import('./../layouts/ErrorLayout.vue'));
const Forbidden = defineAsyncComponent(() => import('./../components/pages/Errors/Forbidden.vue'));
const NotFound = defineAsyncComponent(() => import('./../components/pages/Errors/NotFound.vue'));
const ServerError = defineAsyncComponent(() =>
    import('./../components/pages/Errors/ServerError.vue')
);
const BadRequest = defineAsyncComponent(() =>
    import('./../components/pages/Errors/BadRequest.vue')
);
const UnknownError = defineAsyncComponent(() =>
    import('./../components/pages/Errors/UnknownError.vue')
);

import { mapState } from 'pinia';
import { useErrorsStore } from '../stores/errors';

const app = {
    components: {
        EmptyLayout,
        ErrorLayout,
        Forbidden,
        NotFound,
        ServerError,
        BadRequest,
        UnknownError,
    },
    computed: {
        ...mapState(useErrorsStore, {
            error: 'error',
            type: 'type',
        }),
        layout() {
            if (this.error) {
                return this.type;
            } else {
                return (this.$route.meta.layout || 'empty') + '-layout';
            }
        },
    },
};

export { app };
export default app;
