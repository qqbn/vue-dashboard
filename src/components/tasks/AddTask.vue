<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

const store = useTasksStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const task = ref<string>('');
const isDone = ref<boolean>(false);
const modalTitle = computed(() => store.isEditing ? 'Edit task' : 'Add new task')

const handleEdit = (): void => {
    dialog.value = false;
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    task.value = '';
    isDone.value = false;
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    task.value = store.editingData.task;
    isDone.value = store.editingData.isDone;
})
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Task
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
                <v-checkbox label="Task done" color="primary" v-model="isDone" v-if="store.isEditing"></v-checkbox>
                <v-textarea clearable label="Task content" variant="solo-filled" v-model="task"></v-textarea>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="dialog = false" type="button" v-if="!store.isEditing">Add
                    Task</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleEdit" type="button" v-else>Edit Task</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>