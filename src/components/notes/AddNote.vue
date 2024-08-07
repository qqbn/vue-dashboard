<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { textRules } from '@/helpers/validation';
import { useAlertStore } from '@/stores/alert'

const store = useEditNoteStore();
const { isEditing } = storeToRefs(store);
const alert = useAlertStore();

const noteId = ref<number>(0);
const title = ref<string>('')
const date = ref<any>('')
const content = ref<string>("")
const important = ref<boolean>(true);
const dialog = ref<boolean>(false);
const loading = ref<boolean>(false);
const modalTitle = computed(() => store.isEditing ? 'Editing note' : 'Add new note')
const form = ref();
const apiUrl = import.meta.env.VITE_API_URL;

const noteDataObj = () => {
    const obj = {
        title: title.value,
        content: content.value,
        important: important.value
    }

    return obj;
}

const handleAddNote = async (): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.post(apiUrl + `notes/addNote/`, noteDataObj());
        if (response.status === 200) {
            store.addNote(response.data);
            alert.showAlert('Note added!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const handleEditNote = async (id: number): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.put(apiUrl + `notes/editNote/${id}`, noteDataObj());
        if (response.status === 200) {
            const obj = noteDataObj();
            store.editNote({ id: id, date: date.value, ...obj })
            alert.showAlert('Note edited!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    title.value = '';
    date.value = '';
    content.value = '';
    important.value = false;
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    noteId.value = store.editingData.id;
    title.value = store.editingData.title;
    date.value = store.editingData.date;
    content.value = store.editingData.content;
    important.value = store.editingData.important;
})

const btnText = computed(() => {
    return !store.isEditing ? 'Add note' : 'Edit note'
});

const handleSubmitForm = async (): Promise<void> => {
    const { valid } = await form.value.validate();
    if (!valid) return;

    if (!store.isEditing) {
        await handleAddNote()
    } else {
        await handleEditNote(noteId.value);
    }
}
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Note
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ modalTitle }}
            </v-card-title>
            <v-form @submit.prevent="handleSubmitForm" ref="form">
                <v-card-text>
                    <v-text-field label="Note Title*" type="input" v-model="title" :rules="textRules"></v-text-field>
                    <v-textarea label="Note" auto-grow v-model="content"></v-textarea>
                </v-card-text>
                <v-card-item>
                    <v-checkbox label="Important" color="primary" v-model="important"></v-checkbox>
                </v-card-item>
                <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                    <v-btn variant="tonal" color="red" @click="dialog = false" :loading="loading">Close</v-btn>
                    <v-btn variant="tonal" color="primary" type="submit" :loading="loading">{{ btnText }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>