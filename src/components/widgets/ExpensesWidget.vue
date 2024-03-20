<script setup lang="ts">
import type { WidgetProps } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<WidgetProps>()
console.log(props.area);
const emit = defineEmits(['removeWidget'])
</script>
<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="n in 5" :key="n">
        <v-card-title class="d-flex justify-space-between align-center">Expense Title: 300$</v-card-title>
        <v-card-subtitle>Date: 12/12/2024</v-card-subtitle>
        <v-card-subtitle>Type: Food</v-card-subtitle>
    </v-card>
</template>