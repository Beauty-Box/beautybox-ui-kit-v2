<template>
    <v-app id="app" class="l-not-found" data-server-rendered="true">
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
            <b-block-empty title="Доступ запрещен" class="l-not-found__empty">
                <template #text>
                    К сожалению, у вас нет прав для просмотра данной страницы
                </template>
                <template #buttons>
                    <b-button
                        v-if="checkHistory"
                        class="l-not-found__button"
                        color="white"
                        @click="back"
                    >
                        Вернуться назад
                    </b-button>
                    <b-button v-else class="l-not-found__button" @click="goHome">
                        Перейти на главную
                    </b-button>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">403</div>
        <div class="l-not-found__block-shadow" />
    </v-app>
</template>

<script>
const BBlockEmpty = () => import('../../blocks/BlockEmpty/index.vue');
const BButton = () => import('../../buttons/BButton/index.vue');
const BSvg = () => import('../../../components/icons/BSvg/index.vue');

export default {
    components: {
        BBlockEmpty,
        BButton,
        BSvg,
    },
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    methods: {
        back() {
            // window.history.back();
            window.location.reload();
        },
        goHome() {
            window.location.replace(window.location.origin);
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
