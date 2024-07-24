<script setup lang="ts">
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<{
    data: SelectedWidget,
    area: number,
}>()
const emit = defineEmits(['removeWidget'])
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <p v-if="!props.data.widgetData.length">There is no data in widget</p>
    <v-card v-else class="pa-2 mb-2" v-for="remind in data.widgetData" :key="remind.id">
        <v-card-title class="d-flex justify-space-between align-center">{{ remind.name }}<v-icon
                icon="mdi-clock-alert-outline" size="small" color="primary"></v-icon></v-card-title>
        <v-card-subtitle>{{ `Date: ${remind.date}` }}</v-card-subtitle>
    </v-card>
</template>