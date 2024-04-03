<script setup lang="ts">
import { ref } from 'vue';
import { useContactsStore } from '@/stores/contacts';
const store = useContactsStore();

const firstName = ref<string>('Sandra')
const lastName = ref<string>('Adams')
const phoneNumber = ref<string>('123123123')
const eMail = ref<string>('email@yahoo.com')

const handleEdit = () => {
    const obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        eMail: eMail.value,
    }
    store.changeIsEditing(true, obj);
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"></v-card-item>
        <v-card-title>{{ firstName }} {{ lastName }}</v-card-title>
        <v-card-subtitle>Phone: {{ phoneNumber }}</v-card-subtitle>
        <v-card-subtitle>Email: {{ eMail }}</v-card-subtitle>
        <v-card-actions> <v-btn variant="tonal" color="primary" size="x-small">Send email</v-btn>
        </v-card-actions>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-human-edit" @click="handleEdit">Edit</v-btn>
        </v-card-action>
    </v-card>
</template>