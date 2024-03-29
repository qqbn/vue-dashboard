<script setup lang="ts">
import { ref } from 'vue';
import { useEditNoteStore } from '@/stores/editNote';
const store = useEditNoteStore();

const title = ref<string>('Note Title')
const date = ref<any>('Date: 12-12-2024')
const note = ref<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ullamcorper neque. Suspendisse molestie convallis sem sit amet ullamcorper. Fusce eget viverra ipsum, sed vestibulum neque. Nulla diam libero, tempor et ultrices eu, commodo vel ipsum. Nullam eget posuere enim, vitae finibus magna. In sit amet luctus nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse eget enim id lorem")
const important = ref<boolean>(true);

const handleEditNote = () => {
    const obj = {
        title: title.value,
        date: date.value,
        note: note.value,
        isImportant: important.value,
    }
    store.changeIsEditing(true, obj);
}
</script>
<template>
    <v-card class="pa-4" :style="important ? 'border: 2px solid #6200EE;' : 'border: none;'">
        <v-card-title class="d-flex justify-space-between align-center">{{ title }}<v-icon icon="mdi-exclamation"
                size="small" color="primary"></v-icon>
        </v-card-title>
        <v-card-subtitle>{{ date }}</v-card-subtitle>
        <v-card-text>{{ note }}</v-card-text>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-file-edit-outline" @click="handleEditNote">Edit
                note</v-btn>
        </v-card-action>
    </v-card>
</template>