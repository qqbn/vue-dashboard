<script lang="ts" setup>
import TaskCard from '../tasks/TaskCard.vue';
import { ref, onBeforeMount, watch, computed } from 'vue';
import { useRemoveStore } from '@/stores/remove';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

const removeStore = useRemoveStore();
const { isRemoved } = storeToRefs(removeStore);
const store = useTasksStore();

const allTasks = computed(() => store.allTasks)
const onlyDone = ref<boolean>(false);
const removingId = ref<number>();

watch(isRemoved, () => {
    if (isRemoved.value && removingId.value) store.removeTask(removingId.value);
})

const displayedTasks = computed(() => {
    return onlyDone.value ? store.allTasks.filter((el: any) => el.done) : store.allTasks;
})

const setTaskDone = (id: number): void => {
    const task = allTasks.value.find((el: any) => el.id === id)
    if (task) {
        task.done = true;
    }
}

const taskToDashboard = (id: number): void => {
    const task = allTasks.value.find((el: any) => el.id === id)
    if (task) {
        task.added_to_dashboard = !task.added_to_dashboard;
    }
}

onBeforeMount(async () => {
    await store.loadAllTasks();
})
</script>
<template>
    <v-card class="pa-4">
        <v-card-title>Your tasks</v-card-title>
        <v-card-subtitle><v-switch label="Only done tasks" color="primary"
                v-model="onlyDone"></v-switch></v-card-subtitle>
        <div v-for="(task, index) in displayedTasks" :key="task.id">
            <v-divider></v-divider>
            <taskCard :index="index" :task="task" v-if="task.id" @removeTask="removingId = $event"
                @setTaskDone="setTaskDone" @taskToDashboard="taskToDashboard" />
            <v-divider></v-divider>
        </div>
    </v-card>
</template>
<style scoped lang="scss">
.single-task {
    span {
        font-size: 18px;
        font-weight: bold;
    }

    p {
        font-size: 18px;
    }

    @media(max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
}

.icon-box {
    max-width: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 5px;
    height: 100%;

    @media(max-width: 480px) {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        column-gap: 20px;
        margin-top: 10px;
    }
}
</style>