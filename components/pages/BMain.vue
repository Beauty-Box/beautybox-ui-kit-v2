<template>
    <main class="b-main">
        <div class="b-main__wrap">
            <slot />
        </div>
    </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.b-main {
    display: flex;
    flex: 1 0 auto;
    max-width: 100%;
    padding: 0;

    &__wrap {
        flex: 1 1 auto;
        max-width: 100%;
        position: relative;
    }
}
</style>
