<script setup lang="ts">
import { ref } from 'vue';
import type { SelectedWidget } from '@/helpers/interfaces';
interface Props {
    data?: SelectedWidget,
}

const props = defineProps<Props>()
const important = ref<boolean>(true);
</script>

<template>
    <v-btn class="ma-2" color="primary" icon="mdi-delete-circle" @click="$emit('removeComponent', data?.widgetId)"
        size="x-small">
    </v-btn>
    <v-card class="pa-2 mb-2" v-for="n in 3" :key="n"
        :style="important ? 'border: 2px solid #6200EE;' : 'border: none;'">
        <v-card-title>Note Title</v-card-title>
        <v-card-subtitle>Date: 12-12-2024</v-card-subtitle>
    </v-card>
</template>