<template>
    <span>
        {{ propsTime }}
    </span>
</template>

<script setup lang="ts">
import { ref, Ref, nextTick, onMounted, onBeforeUnmount } from 'vue';

interface TimerProps {
    time?: number | string;
}

const props = withDefaults(defineProps<TimerProps>(), {
    time: 100,
});

interface Emits {
    (e: 'end'): void;
}

const emit = defineEmits<Emits>();

const timer = ref(undefined) as Ref<undefined | NodeJS.Timer>;
const propsTime = ref(parseInt(props.time.toString())) as Ref<number>;

const startTimer = () => {
    timer.value = setInterval(() => {
        if (propsTime.value > 0) {
            propsTime.value--;
        } else {
            clearInterval(timer.value);
            emit('end');
        }
    }, 1000);
};

onMounted(() => {
    nextTick(() => {
        startTimer();
    });
});

onBeforeUnmount(() => {
    clearInterval(timer.value);
});
</script>

<style scoped lang="scss"></style>
