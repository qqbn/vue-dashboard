<script setup lang="ts">
import { ref } from 'vue';
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
const selectedType = ref<[string] | null>(null);
const selectedTime = ref<string | null>('Today');
</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="['Bills', 'Food', 'Shopping', 'Outside', 'Others']" chips multiple
            class="pa-2 w-100" v-model="selectedType"></v-select>

        <v-select label="Period of time" :items="['Today', 'Week', 'Month', 'Year']" chips class="pa-2 w-100"
            v-model="selectedTime"></v-select>
    </div>
    <chart :value="value" :selected-time="selectedTime" />
</template>
<style scoped></style>