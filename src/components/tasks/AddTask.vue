<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { textRules, minOneChar } from "@/helpers/validation";

const store = useTasksStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const content = ref<string>('');
const done = ref<boolean>(false);
const taskId = ref<number>(0);
const modalTitle = computed(() => store.isEditing ? 'Edit task' : 'Add new task')

const showModal = (): void => {
    dialog.value = !dialog.value;
    content.value = '';
    done.value = false;
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    content.value = store.editingData.content;
    done.value = store.editingData.done;
    taskId.value = store.editingData.id;
})

const handleAddTask = async (): Promise<void> => {
    try {
        const response = await axios.post(apiUrl + 'tasks/addTask/', { content: content.value, });
        if (response.status === 200) {
            store.addTask(response.data);
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }

}

const handleEditTask = async (id: number): Promise<void> => {
    try {
        const response = await axios.put(apiUrl + `tasks/editTask/${id}`, { content: content.value, done: done.value });
        if (response.status === 200) {
            store.editTask({ id: id, content: content.value, done: done.value })
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }
}
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Task
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
                <v-checkbox label="Task done" color="primary" v-model="done" v-if="store.isEditing"></v-checkbox>
                <v-textarea clearable label="Task content*" variant="solo-filled" v-model="content"
                    :rules="textRules"></v-textarea>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleAddTask" type="button" v-if="!store.isEditing"
                    :disabled="!minOneChar(content)">Add
                    Task</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleEditTask(taskId)" type="button" v-else
                    :disabled="!minOneChar(content)">Edit
                    Task</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>