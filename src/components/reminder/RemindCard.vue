<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useRemindsStore } from '@/stores/reminds';
import { useRemoveStore } from '@/stores/remove';
import type { RemindData } from '@/helpers/interfaces';
const store = useRemindsStore();
const storeRemove = useRemoveStore();

const props = defineProps<{
    remind: RemindData,
}>();
const emit = defineEmits()

const handleEditRemind = () => {
    const obj = {
        name: props.remind.name,
        date: props.remind.date,
        id: props.remind.id,
    }
    store.changeIsEditing(true, obj);
}

const handleRemoveNote = () => {
    storeRemove.removeItem(true, { id: props.remind.id, type: 3 });
    emit('removeRemind', props.remind.id);
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-title class="d-flex justify-space-between align-center">{{ props.remind.name }}<v-icon
                icon="mdi-clock-alert-outline" size="small" color="primary"></v-icon></v-card-title>
        <v-card-subtitle>Date: {{ props.remind.date }}</v-card-subtitle>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2"
                @click="handleRemoveNote">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-clock-edit-outline" @click="handleEditRemind">Edit
                remind</v-btn>
        </v-card-action>
    </v-card>
</template>