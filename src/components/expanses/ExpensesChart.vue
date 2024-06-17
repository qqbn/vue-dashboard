<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { typeItems, timeItems } from '@/helpers/constants.js';
import Chart from '../others/Chart.vue';
import { useRemoveStore } from '@/stores/remove';
import { useExpensesStore } from '@/stores/expenses';
import { storeToRefs } from 'pinia';
import type { ExpenseData } from '@/helpers/interfaces';

const removeStore = useRemoveStore();
const removingId = ref<number>();
const { isRemoved } = storeToRefs(removeStore);
const store = useExpensesStore()

const value = [
    423,
    446,
    675,
    510,
    590,
    610,
    760,
];

const selectedType = ref<number>(0);
const selectedTime = ref<number>(0);
const selectedTimeName = computed((): string => {
    const name: string = timeItems.find((el: { id: number, name: string }) => el.id === selectedTime.value)!.name;
    return name;
})
const displayExpenses = ref<any>([]);


const getExpenseType = (val: number): string => {
    const type = typeItems.find((el: any) => el.id === val)?.name;
    return type ? type : 'Others';
}

const handleFiltersChange = (): void => {
    const typeFilter = createTypeFilter(selectedType.value);
    const dateFilter = createDateFilter();

    displayExpenses.value = store.allExpenses.filter((expense: ExpenseData) => {
        const typeCondition = selectedType.value ? typeFilter(expense.type) : true;
        const dateConditon = selectedTime.value ? dateFilter(expense.date) : true;
        return typeCondition && dateConditon;
    })
}

const createTypeFilter = (type: number): Function => {
    return (value: number) => value === type;
}

const createDateFilter = (): Function => {
    return (date: any) => new Date(date) >= getPeriodLimit(selectedTimeName.value);
}

const getPeriodLimit = (period: string): any => {
    const now = new Date();

    switch (period) {
        case 'Today':
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        case 'Last Week':
            return new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 6);
        case 'Last Month':
            return new Date(now.getFullYear(), now.getMonth() - 1, 1);
        case 'Last Year':
            return new Date(now.getFullYear() - 1, 0, 1);
    }
}

const handleLoadMore = async (page: number): Promise<void> => {
    await store.loadMoreExpenses();
    displayExpenses.value = store.allExpenses;
}

onBeforeMount(async () => {
    await store.loadAllExpenses();
    displayExpenses.value = store.allExpenses;
})
</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="typeItems" chips class="pa-2 w-100" v-model="selectedType"
            item-title="name" item-value="id" @update:modelValue="handleFiltersChange"></v-select>

        <v-select label="Period of time" :items="timeItems" chips class="pa-2 w-100" v-model="selectedTime"
            item-title="name" item-value="id" @update:modelValue="handleFiltersChange"></v-select>
    </div>
    <v-row>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" v-show="selectedTime">
            <Chart :value="value" :selected-time="selectedTimeName" :selected-type="selectedType"
                :get-expense-type="getExpenseType" />
        </v-col>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <v-list v-if="displayExpenses.length > 0">
                <v-list-subheader>Expenses list:</v-list-subheader>
                <v-list-item v-for="expense in displayExpenses" :key="expense.id">
                    <v-list-item-title class="d-flex justify-space-between">
                        <span> {{ expense.title }} - {{ expense.value + '$' }}</span>
                        <v-btn class="ml-2" icon="mdi-bucket-outline" color="primary" variant="tonal" size="x-small"
                            @click="removeStore.removeItem(true, { id: 5, type: 4 })"></v-btn>
                    </v-list-item-title>
                    <v-list-item-subtitle class="mb-2">
                        {{ expense.date }} {{ getExpenseType(expense.type) }}
                    </v-list-item-subtitle>
                    <v-divider></v-divider>
                </v-list-item>
                <div class="d-flex justify-center">
                    <v-btn class="mt-2" color="primary" variant="tonal" @click="handleLoadMore(store.page)"
                        v-if="store.canLoadMore">Load
                        more</v-btn>
                </div>
            </v-list>
            <h3 v-else>There is no expenses</h3>
        </v-col>
    </v-row>
</template>
<style scoped></style>