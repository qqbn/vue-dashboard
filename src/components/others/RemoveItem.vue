<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const dialog = ref<boolean>(false);
</script>
<template>
    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                Do you want to delete item?
            </v-card-title>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">No</v-btn>
                <v-btn variant="tonal" color="primary" @click="dialog = false" type="button">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>