<script lang="ts" setup>
import { ref } from 'vue';
import type { TaskData } from '../../helpers/interfaces';
import { useTasksStore } from '@/stores/tasks';
import { useRemoveStore } from '@/stores/remove';

const store = useTasksStore();
const removeStore = useRemoveStore();
const props = defineProps<TaskData>();

const isDone = ref<boolean>(false);
const task = ref<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida tellus at elit interdum, malesuada efficitur ipsum eleifend. Aenean tristique hendrerit arcu. Curabitur et augueLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida tellus at elit interdum, malesuada efficitur ipsum eleifend.');

const setTaskDone = (): void => {
    isDone.value = !isDone.value;
}

const handleEditTask = (): void => {
    const obj = {
        task: task.value,
        isDone: isDone.value,
    }

    store.changeIsEditing(true, obj);
}
</script>
<template>
    <div class="d-flex justify-space-between align-flex-start single-task mt-2 mb-2">
        <p :style="isDone ? 'text-decoration: line-through;' : ''" class="mr-2">
            <span v-if="(index + 1)">{{ index + 1 }}.</span>
            {{ task }}
        </p>
        <div class="icon-box">
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-check-circle-outline" size="small"
                @click="setTaskDone"></v-btn>
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-notebook-edit" size="small"
                @click="handleEditTask"></v-btn>
            <v-btn variant="tonal" color="primary" type="button" icon="mdi-bucket-outline" size="small"
                @click="removeStore.removeItem(true, { id: 3, type: 5 })"></v-btn>
        </div>
    </div>
</template>