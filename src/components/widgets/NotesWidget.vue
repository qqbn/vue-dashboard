<script setup lang="ts">
import { ref } from 'vue';
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';
interface Props {
    data?: SelectedWidget,
}

const props = defineProps<Props>()
const important = ref<boolean>(true);
const emit = defineEmits(['removeWidget'])
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="n in 3" :key="n"
        :style="important ? 'border: 2px solid #6200EE;' : 'border: none;'">
        <v-card-title>Note Title</v-card-title>
        <v-card-subtitle>Date: 12-12-2024</v-card-subtitle>
    </v-card>
</template>