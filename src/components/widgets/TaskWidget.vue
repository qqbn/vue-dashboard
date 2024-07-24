<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<{
    data: SelectedWidget,
    area: number,
}>()
const emit = defineEmits(['removeWidget'])

const index = ref<number>(0);

const changeTask = (value: number) => {
    if (index.value + value <= 0) {
        index.value = 0;
    } else if (index.value + value >= props.data.widgetData.length - 1) {
        index.value = props.data.widgetData.length - 1;
    } else {
        index.value = index.value + value;
    }
}

const isTaskDone = computed(() => props.data.widgetData[index.value].done ? 'Task done!' : 'Task:')
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <p v-if="!props.data.widgetData.length">There is no data in widget</p>
    <v-card class="pa-2 mb-2" v-else>
        <v-card-title>{{ isTaskDone }}</v-card-title>
        <v-card-text class="task-widget-text"
            :style="data.widgetData[index].done ? 'text-decoration: line-through;' : ''">
            {{ data.widgetData[index].content }}
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between" v-if="data.widgetData.length > 1">
            <v-btn variant="tonal" color="primary" size="x-small" @click="changeTask(-1)">Prev</v-btn>
            <v-btn variant="tonal" color="primary" size="x-small" @click="changeTask(1)">Next</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.task-widget-text {
    max-height: 400px;
    overflow-y: auto;
}
</style>