const EmptyLayout = () =>
    import(/* webpackChunkName: "EmptyLayout" */ './../layouts/EmptyLayout.vue');
const ErrorLayout = () =>
    import(/* webpackChunkName: "ErrorLayout" */ './../layouts/ErrorLayout.vue');
const Forbidden = () =>
    import(/* webpackChunkName: "Forbidden" */ './../components/pages/Errors/Forbidden.vue');
const NotFound = () =>
    import(/* webpackChunkName: "NotFound" */ './../components/pages/Errors/NotFound.vue');
const ServerError = () =>
    import(/* webpackChunkName: "ServerError" */ './../components/pages/Errors/ServerError.vue');
const BadRequest = () =>
    import(/* webpackChunkName: "BadRequest" */ './../components/pages/Errors/BadRequest.vue');
const UnknownError = () =>
    import(/* webpackChunkName: "UnknownError" */ './../components/pages/Errors/UnknownError.vue');

import { mapGetters } from 'vuex';

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
        ...mapGetters(['ERROR', 'TYPE']),
        layout() {
            if (this.ERROR) {
                return this.TYPE;
            } else {
                return (this.$route.meta.layout || 'empty') + '-layout';
            }
        },
    },
};

export { app };
export default app;
