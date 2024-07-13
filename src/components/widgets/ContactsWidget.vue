<script setup lang="ts">
import type { WidgetProps } from '@/helpers/interfaces';
import RemoveWidget from './RemoveWidget.vue';

const props = defineProps<WidgetProps>()
const emit = defineEmits(['removeWidget'])

console.log(props);
</script>

<template>
    <remove-widget @remove-widget="emit('removeWidget', props.data?.widgetId)" />
    <v-card class="pa-2 mb-2" v-for="n in 5" :key="n">
        <v-card-title>Name Surname</v-card-title>
        <v-card-subtitle>Phone: 123123123</v-card-subtitle>
        <v-card-subtitle>Email: email@yahoo.com</v-card-subtitle>
    </v-card>
</template>