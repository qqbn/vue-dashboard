<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRemindsStore } from '@/stores/reminds';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { textRules } from "@/helpers/validation";
import { useAlertStore } from '@/stores/alert'

const store = useRemindsStore();
const { isEditing } = storeToRefs(store);
const alert = useAlertStore();

const dialog = ref<boolean>(false);
const name = ref<string>('');
const date = ref<any>();
const remindId = ref<number>(0);
const modalTitle = computed(() => store.isEditing ? 'Edit remind' : 'Add new remind');
const form = ref();
const dateValid = ref<boolean>(true);
const loading = ref<boolean>(false);
const apiUrl = import.meta.env.VITE_API_URL;


const showModal = (): void => {
    dialog.value = !dialog.value;
    name.value = '';
    date.value = new Date();
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    name.value = store.editingData.name;
    date.value = store.editingData.date;
    remindId.value = store.editingData.id;
})

const handleAddRemind = async (): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.post(apiUrl + 'reminds/addRemind/', { name: name.value, date: date.value });
        if (response.status === 200) {
            store.addRemind(response.data);
            alert.showAlert('Remind added!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const handleEditRemind = async (id: number): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.put(apiUrl + `reminds/editRemind/${id}`, { name: name.value, date: new Date(date.value) })
        if (response.status === 200) {
            store.editRemind({ id: id, name: name.value, date: new Date(date.value).toISOString().slice(0, 10) })
            alert.showAlert('Remind edited!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const btnText = computed(() => {
    return !store.isEditing ? 'Add remind' : 'Edit remind'
});

const handleSubmitForm = async (): Promise<void> => {
    const { valid } = await form.value.validate();
    if (!valid) {
        if (!date.value) {
            dateValid.value = false;
        }
        return;
    }

    if (!store.isEditing) {
        await handleAddRemind()
    } else {
        await handleEditRemind(remindId.value);
    }
}

const handleDateChange = () => {
    if (dateValid.value) return

    dateValid.value = true;
}
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Remind
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ modalTitle }}
            </v-card-title>
            <v-form @submit.prevent="handleSubmitForm" ref="form">
                <v-card-text>
                    <v-text-field label="Remind name*" type="input" v-model="name" :rules="textRules"></v-text-field>
                    <h4>Set date to remind you of something</h4>
                    <VueDatePicker v-model="date" inline auto-apply :min-date="new Date()"
                        @update:model-value="handleDateChange" style="margin-top: 10px;"></VueDatePicker>
                    <p class="custom-error-text" v-if="!dateValid">Date is required</p>
                </v-card-text>
                <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                    <v-btn variant="tonal" color="red" @click="dialog = false" :loading="loading">Close</v-btn>
                    <v-btn variant="tonal" color="primary" type="submit" :loading="loading">{{ btnText }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>