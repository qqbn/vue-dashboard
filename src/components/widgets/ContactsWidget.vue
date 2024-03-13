<script setup lang="ts">
import type { SelectedWidget } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';
interface Props {
    data?: SelectedWidget,
}

const props = defineProps<Props>()
const emit = defineEmits(['removeWidget'])
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="n in 5" :key="n">
        <v-card-title>Name Surname</v-card-title>
        <v-card-subtitle>Phone: 123123123</v-card-subtitle>
        <v-card-subtitle>Email: email@yahoo.com</v-card-subtitle>
    </v-card>
</template>