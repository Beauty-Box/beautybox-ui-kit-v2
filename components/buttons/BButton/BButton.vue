<template>
    <div>
        <button>test</button>
    </div>
</template>

<script setup lang="ts">
import { PropsColors } from '../../../composables/ui/useColor';

interface BButtonProps {
    color: PropsColors['color'];
}

const props = withDefaults(defineProps<BButtonProps>(), {
    color: 'primary',
});
</script>

<style scoped lang="scss"></style>
