<script lang="ts" setup>
import axios from 'axios'
import TaskCard from '../tasks/TaskCard.vue';
import { ref, onBeforeMount } from 'vue';
import { apiUrl } from '@/helpers/constants';
import type { TaskData } from '@/helpers/interfaces';

const allTasks = ref<TaskData[] | null>(null);
const onlyDone = ref<boolean>(false);

const loadAllTask = async (): Promise<void> => {
    try {
        const response = await axios.get(apiUrl + 'tasks');
        allTasks.value = response.data;
        console.log(allTasks.value);
    } catch (error) {
        console.log(error);
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
        <div v-for="(task, index) in allTasks" :key="task.id">
            <v-divider></v-divider>
            <taskCard :index="index" :task="task" v-if="task.id" />
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