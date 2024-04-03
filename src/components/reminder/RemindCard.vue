<script setup lang="ts">
import { ref } from 'vue';
import { useRemindsStore } from '@/stores/reminds';
const store = useRemindsStore();

const name = ref<string>('Very important remind');
const date = ref<any>('12/12/2024')
const handleEditNote = () => {
    const obj = {
        name: name.value,
        date: date.value,
    }
    store.changeIsEditing(true, obj);
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-title class="d-flex justify-space-between align-center">{{ name }}<v-icon icon="mdi-clock-alert-outline"
                size="small" color="primary"></v-icon></v-card-title>
        <v-card-subtitle>Date: {{ date }}</v-card-subtitle>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-clock-edit-outline" @click="handleEditNote">Edit
                remind</v-btn>
        </v-card-action>
    </v-card>
</template>