<script setup lang="ts">
import { ref } from 'vue';
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<{
    data: SelectedWidget,
    area: number,
}>()
const important = ref<boolean>(true);
const emit = defineEmits(['removeWidget'])
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', data?.widgetId)" />
    <p v-if="!props.data.widgetData.length">There is no data in widget</p>
    <v-card v-else class="pa-2 mb-2" v-for="note in props.data.widgetData" :key="note.id"
        style="border: 2px solid #6200EE;">
        <v-card-title>{{ note.title }}</v-card-title>
        <v-card-subtitle>{{ `Date: ${note.date}` }}</v-card-subtitle>
    </v-card>
</template>