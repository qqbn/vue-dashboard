<script setup lang="ts">
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<{
    data: SelectedWidget,
    area: number,
}>()
const emit = defineEmits(['removeWidget'])
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="contact in data.widgetData" :key="contact.id">
        <v-card-title>{{ contact.first_name }} {{ contact.last_name }}</v-card-title>
        <v-card-subtitle>{{ `Phone: ${contact.phone_number}` }}</v-card-subtitle>
        <v-card-subtitle>{{ `Email: ${contact.email}` }}</v-card-subtitle>
    </v-card>
</template>