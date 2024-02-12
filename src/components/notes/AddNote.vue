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
        Add Note
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new contact to list
            </v-card-title>
            <v-card-text>
                <v-form @submi.prevent>
                    <v-text-field label="Note Title" type="input"></v-text-field>
                    <v-textarea label="Note" auto-grow></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-item>
                <v-checkbox label="Important" color="primary"></v-checkbox>
            </v-card-item>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button">Add Note</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>