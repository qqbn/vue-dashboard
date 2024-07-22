<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { useExpensesStore } from '@/stores/expenses';
import { typeItems } from '@/helpers/constants.js';
import { textRules, expenseValueRules, fieldRequired } from '@/helpers/validation';
import { useAlertStore } from '@/stores/alert'

const store = useExpensesStore();
const alert = useAlertStore();
const dialog = ref<boolean>(false);
const date = ref<any>('');
const selectedType = ref<number | null>(null);
const title = ref<string>('');
const value = ref<number>(0);
const expenseTypes = typeItems.filter(el => el.id != 0);
const form = ref();
const dateValid = ref<boolean>(true);
const loading = ref<boolean>(false);

const handleAddNote = async (): Promise<void> => {
    loading.value = true;
    const { valid } = await form.value.validate();
    if (!valid) {
        if (!date.value) {
            dateValid.value = false;
            loading.value = false;
        }
        return;
    }

    try {
        const response = await axios.post(apiUrl + `expenses/addExpense/`, { title: title.value, value: Number(value.value), type: selectedType.value, date: date.value });
        if (response.status === 200) {
            store.addExpense(response.data);
            alert.showAlert('Expense added!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const showDialog = () => {
    selectedType.value = null;
    date.value = '';
    title.value = '';
    dialog.value = true;
    value.value = 0;
}

const handleDateChange = () => {
    if (dateValid.value) return

    dateValid.value = true;
}
</script>
<template>
    <v-btn color="primary" @click="showDialog">
        Add Expense
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new expense
            </v-card-title>
            <v-form @submit.prevent="handleAddNote" ref="form">
                <v-card-text>
                    <v-text-field label="Expense Title" type="input" v-model="title" :rules="textRules"></v-text-field>
                    <v-text-field label="Expense Value" type="input" v-model="value"
                        :rules="expenseValueRules"></v-text-field>
                    <v-select label="Type of expense" :items="expenseTypes" v-model="selectedType" item-title="name"
                        item-value="id" :rules="fieldRequired"></v-select>
                    <VueDatePicker v-model="date" inline auto-apply style="margin-top: 10px;"
                        @update:model-value="handleDateChange">
                    </VueDatePicker>
                    <p class="custom-error-text" v-if="!dateValid">Date is required</p>
                </v-card-text>
                <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                    <v-btn variant="tonal" color="red" @click="dialog = false" :loading="loading">Close</v-btn>
                    <v-btn variant="tonal" color="primary" type="submit" :loading="loading">Add Expense</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>