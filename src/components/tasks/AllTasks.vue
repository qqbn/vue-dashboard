
import type { blob } from 'stream/consumers';
<script lang="ts" setup>
import { ref } from 'vue';
const dialog = ref<boolean>(false);
const date = null;
const taskDone = ref<boolean>(false);
const setTaskDone = (): void => {
    taskDone.value = !taskDone.value;
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-title>Your tasks</v-card-title>
        <v-card-subtitle><v-switch label="Only done tasks" color="primary"></v-switch></v-card-subtitle>
        <div v-for="(n, index) in 5" :key="n">
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-flex-start single-task mt-2 mb-2">
                <p :style="taskDone ? 'text-decoration: line-through;' : ''" class="mr-2">
                    {{ index + 1 }}.
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing
                    elit. Fusce gravida tellus at elit interdum, malesuada
                    efficitur ipsum eleifend. Aenean tristique hendrerit arcu. Curabitur et augueLorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Fusce gravida tellus at elit interdum, malesuada
                    efficitur ipsum eleifend.
                </p>
                <div class="icon-box">
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-check-circle-outline" size="small"
                        @click="setTaskDone"></v-btn>
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-notebook-edit" size="small"></v-btn>
                    <v-btn variant="tonal" color="primary" type="button" icon="mdi-bucket-outline" size="small"></v-btn>
                </div>
            </div>
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