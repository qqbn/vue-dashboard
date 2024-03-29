<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
import { storeToRefs } from 'pinia';
const store = useEditNoteStore();
const { isEditing } = storeToRefs(store);
const title = ref<string>('')
const date = ref<any>('')
const note = ref<string>("")
const important = ref<boolean>(true);
const dialog = ref<boolean>(false);

const handleSave = (): void => {
    dialog.value = false;
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
    title.value = ''
    note.value = '';
    important.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    title.value = store.editingData.title;
    note.value = store.editingData.note;
    important.value = store.editingData.isImportant;
})
</script>
<template>
    <v-btn color="primary" @click="dialog = true">
        Add Note
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new contact to list
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent>
                    <v-text-field label="Note Title" type="input" v-model="title"></v-text-field>
                    <v-textarea label="Note" auto-grow v-model="note"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-item>
                <v-checkbox label="Important" color="primary" v-model="important"></v-checkbox>
            </v-card-item>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button">Add Note</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>