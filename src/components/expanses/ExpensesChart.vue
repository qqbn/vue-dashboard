<script setup lang="ts">
import { ref, computed } from 'vue';
import { typeItems, timeItems } from '@/helpers/constants.js';
import Chart from '../others/Chart.vue';
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

</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="typeItems" chips multiple class="pa-2 w-100" v-model="selectedType"
            item-title="name" item-value="id"></v-select>

        <v-select label="Period of time" :items="timeItems" chips class="pa-2 w-100" v-model="selectedTime"
            item-title="name" item-value="id"></v-select>
    </div>
    <v-row>
        <v-col cols="2" xl="2" lg="2" md="2" sm="12" xs="12">
            <v-list>
                <v-list-subheader>Expenses list:</v-list-subheader>
                <v-list-item v-for="expense in expenses" :key="expense.type">
                    <v-list-item-title>
                        {{ expense.title }}
                    </v-list-item-title>
                    <v-divider></v-divider>
                    <v-list-item-subtitle>
                        {{ expense.expenseValue + '$' }}
                    </v-list-item-subtitle>
                    <v-divider></v-divider>
                    <v-list-item-subtitle>
                        {{ expense.date }} {{ getExpenseType(expense.type) }}
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="8" xl="8" lg="8" md="8" sm="12" xs="12">
            <chart :value="value" :selected-time="selectedTimeName" />
        </v-col>
    </v-row>
</template>
<style scoped></style>