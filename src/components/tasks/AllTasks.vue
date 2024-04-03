<script lang="ts" setup>
import TaskCard from '../tasks/TaskCard.vue';
import { ref } from 'vue';
</script>
<template>
    <v-card class="pa-4">
        <v-card-title>Your tasks</v-card-title>
        <v-card-subtitle><v-switch label="Only done tasks" color="primary"></v-switch></v-card-subtitle>
        <div v-for="(n, index) in 5" :key="n">
            <v-divider></v-divider>
            <taskCard :index="index" />
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