<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';

const store = useEditNoteStore();
const { isEditing } = storeToRefs(store);

const noteId = ref<number>(0);
const title = ref<string>('')
const date = ref<any>('')
const content = ref<string>("")
const important = ref<boolean>(true);
const dialog = ref<boolean>(false);
const modalTitle = computed(() => store.isEditing ? 'Editing task' : 'Add new task')

const handleSave = (): void => {
    dialog.value = false;
}

const handleEdit = async (id: number): Promise<void> => {
    try {
        const response = await axios.put(apiUrl + `notes/editNote/${id}`, { title: title.value, content: content.value, important: important.value });
        if (response.status === 200) {
            store.editNote({ id: id, title: title.value, date: date.value, content: content.value, important: important.value })
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
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
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Note
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ modalTitle }}
            </v-card-title>
            <v-card-text>
                <v-text-field label="Note Title" type="input" v-model="title"></v-text-field>
                <v-textarea label="Note" auto-grow v-model="content"></v-textarea>
            </v-card-text>
            <v-card-item>
                <v-checkbox label="Important" color="primary" v-model="important"></v-checkbox>
            </v-card-item>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-if="!store.isEditing">Add
                    Note</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleEdit(noteId)" type="button" v-else>Edit
                    Note</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>