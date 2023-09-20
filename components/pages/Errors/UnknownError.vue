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
                <template #text> Мы уже исправляем ошибку. Пожалуйста, вернитесь назад </template>
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
        <div class="l-not-found__title">???</div>
        <div class="l-not-found__block-shadow" />
    </b-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import BApp from '../BApp.vue';
const BBlockEmpty = defineAsyncComponent(() => import('../../blocks/BlockEmpty/index.vue'));
const BButton = defineAsyncComponent(() => import('../../buttons/BButton/index.vue'));
const BSvg = defineAsyncComponent(() => import('../../../components/icons/BSvg/index.vue'));

export default {
    components: {
        BApp,
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
            history.go(-1);
        },
        goHome() {
            window.location.replace(window.location.origin);
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
