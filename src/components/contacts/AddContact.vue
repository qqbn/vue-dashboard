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
        Add Contact
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Add new contact to list
            </v-card-title>
            <v-card-text>
                <v-form @submi.prevent>
                    <v-text-field label="First Name" type="input"></v-text-field>
                    <v-text-field label="Last Name" type="input"></v-text-field>
                    <v-text-field label="Phone Number" type="phone"></v-text-field>
                    <v-text-field label="E-mail" type="email"></v-text-field>
                    <v-file-input label="Contact photo"></v-file-input>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button">Save Contact</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>