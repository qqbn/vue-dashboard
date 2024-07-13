<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectedWidget, WidgetProps } from '@/helpers/interfaces';
import { typeItems } from '@/helpers/constants.js';
import RemoveWidget from './RemoveWidget.vue';
import Chart from '../others/Chart.vue';

const props = defineProps<{
    data: SelectedWidget,
    area: number,
}>()

const getExpenseType = (val: number) => {
    return typeItems.find((el: any) => el.id === val)?.name;;
}
const expensesValues = computed((): number[] => props.data.widgetData?.map((expense: any) => expense.value))

const emit = defineEmits(['removeWidget'])
</script>
<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="expense in data.widgetData" :key="expense.id" v-if="area === 1">
        <v-card-title class="d-flex justify-space-between align-center">{{ `${expense.title}: ${expense.value}$`
            }}</v-card-title>
        <v-card-subtitle>{{ `Date: ${expense.date}` }}</v-card-subtitle>
        <v-card-subtitle>{{ `Type: ${getExpenseType(expense.type)}` }}</v-card-subtitle>
    </v-card>
    <template v-else>
        <Chart :values="expensesValues" />
    </template>
</template>