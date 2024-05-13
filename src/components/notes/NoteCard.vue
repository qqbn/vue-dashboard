<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
import { useRemoveStore } from '@/stores/remove';
import type { NoteData } from '@/helpers/interfaces';

const store = useEditNoteStore();
const removeStore = useRemoveStore();
const emit = defineEmits()

const props = defineProps<{
    note: NoteData,
}>();

const handleEditNote = () => {
    const obj = {
        id: props.note.id,
        title: props.note.title,
        date: props.note.date,
        content: props.note.content,
        important: props.note.important,
    }
    store.changeIsEditing(true, obj);
}

const handleRemoveNote = () => {
    removeStore.removeItem(true, { id: props.note.id, type: 2 });
    emit('removeNote', props.note.id);
}
</script>
<template>
    <v-card class="pa-4" :style="props.note.important ? 'border: 2px solid #6200EE;' : 'border: none;'">
        <v-card-title class="d-flex justify-space-between align-center">{{ props.note.title }}<v-icon
                icon="mdi-exclamation" size="small" color="primary"></v-icon>
        </v-card-title>
        <v-card-subtitle>{{ props.note.date }}</v-card-subtitle>
        <v-card-text>{{ props.note.content }}</v-card-text>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2"
                @click="handleRemoveNote">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-file-edit-outline" @click="handleEditNote">Edit
                note</v-btn>
        </v-card-action>
    </v-card>
</template>