<template>
    <div id="app" class="b-app">
        <div class="b-app__wrapper">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.b-app {
    color: inherit;

    &__wrapper {
        flex: 1 1 auto;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-width: 100%;
        position: relative;
    }
}
</style>
