<script lang="ts" setup>
import { defineEmits, computed } from 'vue';
import type { TaskData } from '../../helpers/interfaces';
import { useTasksStore } from '@/stores/tasks';
import { useRemoveStore } from '@/stores/remove';
import axios from 'axios';
import { useAlertStore } from '@/stores/alert'

const store = useTasksStore();
const removeStore = useRemoveStore();
const alert = useAlertStore();
const emit = defineEmits()
const props = defineProps<{
    task: TaskData,
    index: number,
}>();

const isDone = computed(() => props.task.done)
const apiUrl = import.meta.env.VITE_API_URL;

const setTaskDone = async (): Promise<void> => {
    try {
        const response = await axios.patch(apiUrl + 'tasks/taskDone/' + props.task.id, { done: true });
        if (response.status === 200) {
            alert.showAlert('Task set as done');
            emit('setTaskDone', props.task.id);
        }
    } catch (error) {
        console.log(error);
    }
}

const handleEditTask = (): void => {
    const obj = {
        content: props.task.content,
        done: props.task.done,
        id: props.task.id,
        added_to_dashboard: props.task.added_to_dashboard,
    }

    store.changeIsEditing(true, obj);
}

const handleRemoveTask = (): void => {
    removeStore.removeItem(true, { id: props.task.id, type: 5 })
    emit('removeTask', props.task.id);
}

const handleAddToDashboard = async (): Promise<void> => {
    try {
        const response = await axios.patch(apiUrl + 'tasks/addToDashboard/' + props.task.id, { add: !props.task.added_to_dashboard });
        if (response.status === 200) {
            alert.showAlert(!props.task.added_to_dashboard ? 'Task added to dashboard' : 'Task removed from dashboard');
            store.addToDashboard(props.task.id);
        }
    } catch (error) {
        console.log(error);
    }

}
</script>
<template>
    <div class="d-flex justify-space-between align-flex-start single-task mt-2 mb-2">
        <p :style="isDone ? 'text-decoration: line-through;' : ''" class="mr-2">
            <span>{{ index + 1 }}.</span>
            {{ props.task.content }}
        </p>
        <div class="icon-box">
            <v-tooltip :text="task.added_to_dashboard ? 'Remove from dashboard' : 'Add task to dashboard'"
                location="end">
                <template v-slot:activator="{ props }">
                    <v-btn variant="tonal" color="primary" type="button"
                        :icon="task.added_to_dashboard ? 'mdi-minus-box' : 'mdi-plus-box'" size="small"
                        @click="handleAddToDashboard" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Set task as done task" location="end" v-if="!isDone">
                <template v-slot:activator="{ props }">
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-check-circle-outline" size="small"
                        @click="setTaskDone" v-if="!isDone" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Edit task" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-notebook-edit" size="small"
                        @click="handleEditTask" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Remove Task" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-bucket-outline" size="small"
                        @click="handleRemoveTask" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
        </div>
    </div>
</template>