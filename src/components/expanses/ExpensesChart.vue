<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { typeItems, timeItems } from '@/helpers/constants.js';
import Chart from '../others/Chart.vue';
import { useRemoveStore } from '@/stores/remove';
import { useExpensesStore } from '@/stores/expenses';
import { storeToRefs } from 'pinia';

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

const selectedType = ref<[] | null>(null);
const selectedTime = ref<number>(1);
const selectedTimeName = computed(() => {
    return timeItems.find((el: any) => el.id === selectedTime.value)?.name;
})

const getExpenseType = (val: number): string => {
    const type = typeItems.find((el: any) => el.id === val)?.name;
    return type ? type : 'Others';
}

const expenses = [
    {
        title: 'Test expense',
        expenseValue: 599,
        type: 1,
        date: '12/12/2024'
    },
    {
        title: 'Test expense2',
        expenseValue: 333,
        type: 1,
        date: '11/11/2024'
    },
    {
        title: 'Test expense3',
        expenseValue: 1000,
        type: 2,
        date: '12/12/2024'
    },
]

const test123 = ref<boolean>(false);
const allExpenses = computed(() => store.allExpenses);

const handleLoadMore = (page: number) => {
    console.log(page);
    console.log(store.page);
}

onBeforeMount(async () => {
    await store.loadAllExpenses();
})

</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="typeItems" chips multiple class="pa-2 w-100" v-model="selectedType"
            item-title="name" item-value="id"></v-select>

        <v-select label="Period of time" :items="timeItems" chips class="pa-2 w-100" v-model="selectedTime"
            item-title="name" item-value="id"></v-select>
    </div>
    <v-row>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <Chart :value="value" :selected-time="selectedTimeName" />
        </v-col>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <v-list>
                <v-list-subheader>Expenses list:</v-list-subheader>
                <v-list-item v-for="expense in allExpenses" :key="expense.id">
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
            </v-list>
            <v-btn color="primary" variant="tonal" @click="handleLoadMore(store.page)" v-if="store.canLoadMore">Load
                more</v-btn>
        </v-col>
    </v-row>
</template>
<style scoped></style>