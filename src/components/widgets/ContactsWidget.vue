<script setup lang="ts">
import type { SelectedWidget } from '@/helpers/interfaces';
interface Props {
    data?: SelectedWidget,
}

const props = defineProps<Props>()
// console.log(props.data);
</script>

<template>
    <v-btn class="ma-2" color="primary" icon="mdi-delete-circle" @click="$emit('removeComponent', data?.widgetId)"
        size="x-small">
    </v-btn>
    <v-card class="pa-2 mb-2" v-for="n in 5" :key="n">
        <v-card-title>Name Surname</v-card-title>
        <v-card-subtitle>Phone: 123123123</v-card-subtitle>
        <v-card-subtitle>Email: email@yahoo.com</v-card-subtitle>
    </v-card>
</template>