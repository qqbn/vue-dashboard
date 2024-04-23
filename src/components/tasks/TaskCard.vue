<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import type { TaskData } from '../../helpers/interfaces';
import { useTasksStore } from '@/stores/tasks';
import { useRemoveStore } from '@/stores/remove';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';

const store = useTasksStore();
const removeStore = useRemoveStore();
const emit = defineEmits()
const props = defineProps<{
    task: TaskData,
    index: number,
}>();

const isDone = ref<boolean>(props.task.done);
const task = ref<string>(props.task.content);

const setTaskDone = async (): Promise<void> => {
    try {
        const response = await axios.patch(apiUrl + 'tasks/taskDone/' + props.task.id, { isDone: true });
        if (response.status === 200) {
            isDone.value = !isDone.value;
            emit('setTaskDone', props.task.id);
        }
    } catch (error) {
        console.log(error);
    }
}

const handleEditTask = (): void => {
    const obj = {
        content: task.value,
        done: isDone.value,
    }

    store.changeIsEditing(true, obj);
}

const handleRemoveTask = (): void => {
    removeStore.removeItem(true, { id: props.task.id, type: 5 })
    emit('removeTask', props.task.id);
}
</script>
<template>
    <div class="d-flex justify-space-between align-flex-start single-task mt-2 mb-2">
        <p :style="isDone ? 'text-decoration: line-through;' : ''" class="mr-2">
            <span>{{ index + 1 }}.</span>
            {{ props.task.content }}
        </p>
        <div class="icon-box">
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-check-circle-outline" size="small"
                @click="setTaskDone" v-if="!isDone"></v-btn>
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-notebook-edit" size="small"
                @click="handleEditTask"></v-btn>
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-bucket-outline" size="small"
                @click="handleRemoveTask"></v-btn>
        </div>
    </div>
</template>