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
            <b-block-empty title="Страница не найдена" class="l-not-found__empty">
                <template #text>
                    К сожалению, такой страницы не существует. Пожалуйста, вернитесь на главную
                </template>
                <template #buttons>
                    <div class="button-box">
                        <b-button class="l-not-found__button" @click="goHome">
                            Перейти на главную
                        </b-button>
                    </div>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">404</div>
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
        BButton,
        BSvg,
    },
    methods: {
        goHome() {
            window.location.replace(
                window.location.origin + '/' + window.location.pathname.split('/')[1]
            );
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
