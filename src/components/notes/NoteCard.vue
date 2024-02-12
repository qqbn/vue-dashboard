<script setup lang="ts">
import { ref } from 'vue';

const important = ref<boolean>(true);
</script>
<template>
    <v-card class="pa-4" :style="important ? 'border: 2px solid #6200EE;' : 'border: none;'">
        <v-card-title class="d-flex justify-space-between align-center">Note Title<v-icon icon="mdi-exclamation"
                size="small" color="primary"></v-icon>
        </v-card-title>
        <v-card-subtitle>Date: 12-12-2024</v-card-subtitle>
        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ullamcorper neque. Suspendisse molestie
            convallis sem sit amet ullamcorper. Fusce eget viverra ipsum, sed vestibulum neque. Nulla diam libero, tempor et
            ultrices eu, commodo vel ipsum. Nullam eget posuere enim, vitae finibus magna. In sit amet luctus nulla.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse eget
            enim id lorem</v-card-text>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-file-edit-outline">Edit note</v-btn>
        </v-card-action>
    </v-card>
</template>