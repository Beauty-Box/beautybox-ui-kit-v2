<template>
    <div>
        <button>test</button>
    </div>
</template>

<script lang="ts">
// const props = defineProps<{
//     color: string;
// }>();
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        color: {
            type: String as PropType<string>,
            default: 'primary',
        },
    },
});
</script>

<style scoped lang="scss"></style>
