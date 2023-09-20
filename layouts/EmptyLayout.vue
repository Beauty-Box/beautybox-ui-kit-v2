<template>
    <b-app v-bind="$attrs">
        <b-main>
            <block-loader v-if="loading" />
            <router-view v-else :style="checkBg()" />
        </b-main>
    </b-app>
</template>

<script>
import { defineAsyncComponent } from 'vue-demi';
import BApp from '../components/pages/BApp.vue';
import BMain from '../components/pages/BMain.vue';
const BlockLoader = defineAsyncComponent(() =>
    import('../components/blocks/BlockLoader/index.vue')
);

export default {
    components: { BlockLoader, BApp, BMain },
    data: () => ({
        loading: true,
    }),
    beforeRouteUpdate(to, from, next) {
        this.loading = true;
        this.$nextTick(() => {
            this.loading = false;
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.loading = false;
        });
    },
    methods: {
        checkBg() {
            if (this.$route.meta.bg) {
                return {
                    'background-image': `url(${this.$route.meta.bg})`,
                    'background-size': 'cover',
                    'background-position': '50%',
                };
            }
        },
    },
};
</script>
