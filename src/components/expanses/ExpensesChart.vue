<script setup lang="ts">
import { ref, computed } from 'vue';
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
const typeItems = [
    { id: 1, name: 'Bills' },
    { id: 2, name: 'Food' },
    { id: 3, name: 'Shopping' },
    { id: 4, name: 'Outside' },
    { id: 5, name: 'Others' }
]

const timeItems = [
    {
        id: 1,
        name: 'Today'
    },
    {
        id: 2,
        name: 'Week'
    },
    {
        id: 3,
        name: 'Month'
    },
    {
        id: 4,
        name: 'Year'
    }
]
const selectedType = ref<[] | null>(null);
const selectedTime = ref<number>(1);
const selectedTimeName = computed(() => {
    return timeItems.find(el => el.id === selectedTime.value)?.name;
})

</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="typeItems" chips multiple class="pa-2 w-100" v-model="selectedType"
            item-title="name" item-value="id"></v-select>

        <v-select label="Period of time" :items="timeItems" chips class="pa-2 w-100" v-model="selectedTime"
            item-title="name" item-value="id"></v-select>
    </div>
    <chart :value="value" :selected-time="selectedTimeName" />
</template>
<style scoped></style>