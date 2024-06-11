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

const selectedType = ref<number>(0);
const selectedTime = ref<number | null>(null);
const selectedTimeName = computed(() => {
    const name = timeItems.find((el: any) => el.id === selectedTime.value)?.name
    return name ? name : null;
})
const allExpenses = computed(() => store.allExpenses);

const handleLoadMore = (page: number) => {
    console.log(page);
    console.log(store.page);
}

onBeforeMount(async () => {
    await store.loadAllExpenses();
})

const getExpenseType = (val: number): string => {
    const type = typeItems.find((el: any) => el.id === val)?.name;
    return type ? type : 'Others';
}

const handleTimeChange = (): void => {
    console.log('handle time change');
}

const handleTypeChange = (): void => {
    console.log('handle type change');
}

</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="typeItems" chips class="pa-2 w-100" v-model="selectedType"
            item-title="name" item-value="id"></v-select>

        <v-select label="Period of time" :items="timeItems" chips class="pa-2 w-100" v-model="selectedTime"
            item-title="name" item-value="id" @change="handleTimeChange"></v-select>
    </div>
    <v-row>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <Chart v-show="selectedTime" :value="value" :selected-time="selectedTimeName" :selected-type="selectedType"
                :get-expense-type="getExpenseType" />
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