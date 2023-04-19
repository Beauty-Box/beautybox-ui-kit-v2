<template>
    <v-app v-bind="$attrs">
        <v-main>
            <block-loader v-if="loading" />
            <router-view v-else :style="checkBg()" />
        </v-main>
    </v-app>
</template>

<script>
const BlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../components/blocks/BlockLoader/index.vue');
export default {
    components: { BlockLoader },
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
