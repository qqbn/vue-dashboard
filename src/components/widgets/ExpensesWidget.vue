<script setup lang="ts">
import { ref } from 'vue'
import type { WidgetProps } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';
import Chart from '../others/Chart.vue';

const props = defineProps<WidgetProps>()

const emit = defineEmits(['removeWidget'])
const value = [
    423,
    446,
    675,
    510,
    590,
    610,
    760,
];
</script>
<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="n in 5" :key="n" v-if="area === 1">
        <v-card-title class="d-flex justify-space-between align-center">Expense Title: 300$</v-card-title>
        <v-card-subtitle>Date: 12/12/2024</v-card-subtitle>
        <v-card-subtitle>Type: Food</v-card-subtitle>
    </v-card>
    <template v-else>
        <chart :value="value" />
    </template>
</template>