<script lang="ts" setup>
import axios, { all } from 'axios'
import TaskCard from '../tasks/TaskCard.vue';
import { ref, onBeforeMount, watch, computed } from 'vue';
import { apiUrl } from '@/helpers/constants';
import type { TaskData } from '@/helpers/interfaces';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';

const allTasks = ref<TaskData[] | []>([]);
const onlyDone = ref<boolean>(false);
const store = useRemoveStore();
const { isRemoved } = storeToRefs(store);
const removingId = ref<number>();

const loadAllTask = async (): Promise<void> => {
    try {
        const response = await axios.get(apiUrl + 'tasks');
        allTasks.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

watch(isRemoved, () => {
    if (!isRemoved) return;

    if (removingId.value) {
        removeSingleTask(removingId.value);
    }
})

const removeSingleTask = (id: number): void => {
    allTasks.value = allTasks.value.filter((el: any) => el.id != id);
    store.isRemoved = false;
}

const displayedTasks = computed(() => {
    return onlyDone.value ? allTasks.value.filter((el: any) => el.done) : allTasks.value;
})

const setTaskDone = (id: number): void => {
    const task = allTasks.value.find((el: any) => el.id === id)
    if (task) {
        task.done = true;
    }
}


onBeforeMount(async () => {
    loadAllTask()
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
                @setTaskDone="setTaskDone" />
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