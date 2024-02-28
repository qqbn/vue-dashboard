<script setup lang="ts">
import AddExpense from '../components/expanses/AddExpense.vue';
import ExpensesChart from '../components/expanses/ExpensesChart.vue';
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-6">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddExpense />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="pa-4">
                <ExpensesChart />
            </v-col>
        </v-row>
    </v-container>
</template>