<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<boolean>(false);

const handleSave = (): void => {
    dialog.value = false;
    console.log('form submitted');
}
</script>
<template>
    <v-btn color="primary" @click="dialog = true">
        Add Remind
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new remind
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent>
                    <v-text-field label="Remind name" type="input"></v-text-field>
                    <h3>Set date to remind you of something</h3>
                    <VueDatePicker v-model="date" inline auto-apply></VueDatePicker>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button">Add Remind</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>