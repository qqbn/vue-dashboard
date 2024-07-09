<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
const alert = useAlertStore();
</script>
<template>
    <v-snackbar v-model="alert.alertModel" color="primary" :timeout="alert.timeout" location="top right">
        {{ alert.alertMessage }}
    </v-snackbar>
</template>