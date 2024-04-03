<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
import { storeToRefs } from 'pinia';

const store = useEditNoteStore();
const { isEditing } = storeToRefs(store);

const title = ref<string>('')
const date = ref<any>('')
const note = ref<string>("")
const important = ref<boolean>(true);
const dialog = ref<boolean>(false);
const modalTitle = computed(() => store.isEditing ? 'Editing task' : 'Add new task')

const handleSave = (): void => {
    dialog.value = false;
}

const handleEdit = (): void => {
    dialog.value = false;
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    title.value = '';
    date.value = '';
    note.value = '';
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
    title.value = store.editingData.title;
    note.value = store.editingData.note;
    important.value = store.editingData.isImportant;
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
                <v-textarea label="Note" auto-grow v-model="note"></v-textarea>
            </v-card-text>
            <v-card-item>
                <v-checkbox label="Important" color="primary" v-model="important"></v-checkbox>
            </v-card-item>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-if="!store.isEditing">Add
                    Note</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleEdit" type="button" v-else>Edit
                    Note</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>