<script setup lang="ts">
import type { WidgetProps } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<WidgetProps>()
const emit = defineEmits(['removeWidget'])
console.log(props);
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2">
        <v-card-title>Task Title</v-card-title>
        <v-card-text class="task-widget-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ullamcorper neque. Suspendisse molestie
            convallis sem sit amet ullamcorper. Fusce eget viverra ipsum, sed vestibulum neque. Nulla diam libero,
            tempor et
            ultrices eu, commodo vel ipsum. Nullam eget posuere enim, vitae finibus magna. In sit amet luctus nulla.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse
            eget
        </v-card-text>
    </v-card>
</template>

<style scoped>
.task-widget-text {
    max-height: 400px;
    overflow-y: auto;
}
</style>