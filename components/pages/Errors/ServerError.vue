<template>
    <v-app class="l-not-found">
        <div class="l-not-found__inner">
            <i class="l-not-found__icon l-not-found__icon--left">
                <b-svg name="404_broken" :size="56" />
            </i>
            <i class="l-not-found__icon l-not-found__icon--top">
                <b-svg name="404_calendar" :size="56" />
            </i>
            <i class="l-not-found__icon l-not-found__icon--right">
                <b-svg name="404_staff" :size="56" />
            </i>
            <b-block-empty title="Что-то пошло не так" class="l-not-found__empty">
                <template #text>
                    Мы уже исправляем ошибку. Вернитесь назад или повторите попытку
                </template>
                <template #buttons>
                    <div class="button-box">
                        <v-btn
                            v-if="checkHistory"
                            min-width="150"
                            large
                            color="white"
                            @click="back"
                        >
                            Назад
                        </v-btn>
                        <v-btn v-else min-width="150" large color="primary" @click="goHome">
                            На главную
                        </v-btn>
                        <v-btn min-width="150" large color="primary" @click="reload">
                            Повторить
                        </v-btn>
                    </div>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">500</div>
        <div class="l-not-found__block-shadow" />
    </v-app>
</template>

<script>
const BBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../blocks/BlockEmpty/index.vue');
const BSvg = () => import('../../../components/icons/BSvg/index.vue');

export default {
    components: {
        BBlockEmpty,
        BSvg,
    },
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    methods: {
        back() {
            history.go(-1);
        },
        goHome() {
            window.location.replace(window.location.origin);
        },
        reload() {
            window.location.reload();
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
