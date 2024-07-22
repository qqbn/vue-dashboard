<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { textRules } from "@/helpers/validation";
import { useAlertStore } from '@/stores/alert'

const store = useTasksStore();
const alert = useAlertStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const content = ref<string>('');
const done = ref<boolean>(false);
const addToDashboard = ref<boolean>(false);
const taskId = ref<number>(0);
const modalTitle = computed(() => store.isEditing ? 'Edit task' : 'Add new task')
const loading = ref<boolean>(false);
const form = ref()

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
    addToDashboard.value = store.editingData.added_to_dashboard;
})

const handleAddTask = async (): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.post(apiUrl + 'tasks/addTask/', { content: content.value, added_to_dashboard: addToDashboard.value });
        if (response.status === 200) {
            store.addTask(response.data);
            alert.showAlert('Task added!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }

}

const handleEditTask = async (id: number): Promise<void> => {
    loading.value = true;
    try {
        const response = await axios.put(apiUrl + `tasks/editTask/${id}`, { content: content.value, done: done.value, added_to_dashboard: addToDashboard.value });
        if (response.status === 200) {
            store.editTask({ id: id, content: content.value, done: done.value, added_to_dashboard: addToDashboard.value })
            alert.showAlert('Task edited!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
        loading.value = false;
    }
}

const btnText = computed(() => {
    return !store.isEditing ? 'Add remind' : 'Edit remind'
});

const handleSubmitForm = async (): Promise<void> => {
    const { valid } = await form.value.validate();
    if (!valid) return;

    if (!store.isEditing) {
        await handleAddTask()
    } else {
        await handleEditTask(taskId.value);
    }
}
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Task
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="px-6 py-4">
            <v-card-title>{{ modalTitle }}</v-card-title>
            <v-form @submit.prevent="handleSubmitForm" ref="form">
                <v-card-text>
                    <v-checkbox label="Task done" color="primary" v-model="done" v-if="store.isEditing"></v-checkbox>
                    <v-checkbox label="Add task to dashboard" color="primary" v-model="addToDashboard"></v-checkbox>
                    <v-textarea clearable label="Task content*" variant="solo-filled" v-model="content"
                        :rules="textRules"></v-textarea>
                </v-card-text>
                <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                    <v-btn variant="tonal" color="red" @click="dialog = false" :loading="loading">Close</v-btn>
                    <v-btn variant="tonal" color="primary" type="submit" :loading="loading">{{ btnText }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>