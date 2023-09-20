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
            <b-block-empty title="Ошибка при запросе" class="l-not-found__empty">
                <template #text>
                    <div>Вы сделали слишком много запросов к серверу.</div>
                    <div v-if="timer !== 0">Сайт будет доступен через {{ timer }} сек.</div>
                </template>
                <template #buttons>
                    <b-button class="l-not-found__button" :disabled="timer !== 0" @click="update">
                        Продолжить работу
                    </b-button>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">429</div>
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
    data: () => ({
        timer: 60,
    }),
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    mounted() {
        this.setTimer();
    },
    methods: {
        setTimer() {
            const interval = setInterval(() => {
                this.timer--;
                if (this.timer === 0) {
                    clearInterval(interval);
                    setTimeout(this.update, 5000);
                }
            }, 1000);
        },
        update() {
            window.location.reload(true);
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
