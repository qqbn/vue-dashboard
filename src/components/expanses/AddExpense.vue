<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { useExpensesStore } from '@/stores/expenses';
import { typeItems } from '@/helpers/constants.js';

const store = useExpensesStore();
const dialog = ref<boolean>(false);
const date = ref<any>('');
const selectedType = ref<number | null>(null);
const title = ref<string>('');
const value = ref<number>(0);
const expenseTypes = typeItems.filter(el => el.id != 0);

const handleAddNote = async (): Promise<void> => {
    try {
        const response = await axios.post(apiUrl + `expenses/addExpense/`, { title: title.value, value: Number(value.value), type: selectedType.value, date: date.value });
        if (response.status === 200) {
            store.addExpense(response.data);
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }
}

const showDialog = () => {
    selectedType.value = null;
    date.value = '';
    title.value = '';
    dialog.value = true;
    value.value = 0;
}
</script>
<template>
    <v-btn color="primary" @click="showDialog">
        Add Expense
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new expense
            </v-card-title>
            <v-card-text>
                <v-text-field label="Expense Title" type="input" v-model="title"></v-text-field>
                <v-text-field label="Expense Value" type="number" v-model="value"></v-text-field>
                <v-select label="Type of expense" :items="expenseTypes" v-model="selectedType" item-title="name"
                    item-value="id"></v-select>
                <VueDatePicker v-model="date" inline auto-apply></VueDatePicker>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleAddNote" type="button">Add Expense</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>