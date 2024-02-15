<script setup lang="ts">
console.log('remindcard');
</script>
<template>
    <v-card class="pa-4">
        <v-card-title class="d-flex justify-space-between align-center">Remind name <v-icon icon="mdi-clock-alert-outline"
                size="small" color="primary"></v-icon></v-card-title>
        <v-card-subtitle>Date: 12/12/2024</v-card-subtitle>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-clock-edit-outline">Edit remind</v-btn>
        </v-card-action>
    </v-card>
</template>