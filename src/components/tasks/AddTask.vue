<script lang="ts" setup>
import { ref } from 'vue';
const dialog = ref<boolean>(false);
const date = null;
</script>
<template>
    <v-btn color="primary" @click="dialog = true">
        Add Task
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new task
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent>
                    <v-text-field label="Task" type="input"></v-text-field>
                    <VueDatePicker v-model="date" inline auto-apply></VueDatePicker>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="dialog = false" type="button">Add Task</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>