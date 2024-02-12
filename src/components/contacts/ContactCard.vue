<script setup lang="ts">

</script>
<template>
    <v-card class="pa-4">
        <v-card-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"></v-card-item>
        <v-card-title>Name Surname</v-card-title>
        <v-card-subtitle>Phone: 123123123</v-card-subtitle>
        <v-card-subtitle>Email: email@yahoo.com</v-card-subtitle>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-email-outline">Send email</v-btn>
        </v-card-action>
    </v-card>
</template>