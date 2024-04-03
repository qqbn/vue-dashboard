<script lang="ts" setup>
import { ref } from 'vue';
const dialog = ref<boolean>(false);
const date = null;
const typeItems = [
    { id: 1, name: 'Bills' },
    { id: 2, name: 'Food' },
    { id: 3, name: 'Shopping' },
    { id: 4, name: 'Outside' },
    { id: 5, name: 'Others' }
]
const selectedType = ref<[] | null>(null);
</script>
<template>
    <v-btn color="primary" @click="dialog = true">
        Add Expense
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new expense
            </v-card-title>
            <v-card-text>
                <v-text-field label="Expense Title" type="input"></v-text-field>
                <v-text-field label="Expense Value" type="number"></v-text-field>
                <v-select label="Type of expense" :items="typeItems" v-model="selectedType" item-title="name"
                    item-value="id"></v-select>
                <VueDatePicker v-model="date" inline auto-apply></VueDatePicker>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="dialog = false" type="button">Add Expense</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>