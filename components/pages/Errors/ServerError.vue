<template>
    <b-app class="l-not-found">
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
                        <b-button
                            v-if="checkHistory"
                            color="white"
                            class="l-not-found__button"
                            @click="back"
                        >
                            Назад
                        </b-button>
                        <b-button v-else class="l-not-found__button" @click="goHome">
                            На главную
                        </b-button>
                        <b-button class="l-not-found__button" @click="reload"> Повторить </b-button>
                    </div>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">500</div>
        <div class="l-not-found__block-shadow" />
    </b-app>
</template>

<script>
import BApp from '../BApp.vue';
const BBlockEmpty = () => import('../../blocks/BlockEmpty/index.vue');
const BButton = () => import('../../buttons/BButton/index.vue');
const BSvg = () => import('../../../components/icons/BSvg/index.vue');

export default {
    components: {
        BApp,
        BBlockEmpty,
        BSvg,
        BButton,
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
