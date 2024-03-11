<script setup lang="ts">
import type { SelectedWidget } from '@/helpers/interfaces';
interface Props {
    data?: SelectedWidget,
}

const props = defineProps<Props>()
</script>

<template>
    <v-btn class="ma-2" color="primary" icon="mdi-delete-circle" @click="$emit('removeComponent', data?.widgetId)"
        size="x-small">
    </v-btn>
    <v-card class="pa-2 mb-2" v-for="n in 3" :key="n">
        <v-card-title class="d-flex justify-space-between align-center">Remind name <v-icon
                icon="mdi-clock-alert-outline" size="small" color="primary"></v-icon></v-card-title>
        <v-card-subtitle>Date: 12/12/2024</v-card-subtitle>
    </v-card>
</template>