<script lang="ts" setup>
const emit = defineEmits(['removeWidget'])
</script>
<template>
    <v-btn class="ma-2" color="primary" icon="mdi-delete-circle" size="x-small" @click="emit('removeWidget')">
    </v-btn>
</template>
