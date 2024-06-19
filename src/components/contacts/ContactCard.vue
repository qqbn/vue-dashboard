<script setup lang="ts">
import { ref, computed } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import { useRemoveStore } from '@/stores/remove';
import { avatars } from '@/helpers/constants.js'
import type { ContactData } from '@/helpers/interfaces';

const store = useContactsStore();
const removeStore = useRemoveStore();
const emit = defineEmits()

const props = defineProps<{
    contact: ContactData,
}>();

const avatar = computed(() => avatars[props.contact.avatar - 1])

const handleEdit = () => {
    const obj = {
        id: props.contact.id,
        first_name: props.contact.first_name,
        last_name: props.contact.last_name,
        phone_number: props.contact.phone_number,
        email: props.contact.email,
        avatar: props.contact.avatar,
    }
    store.changeIsEditing(true, obj);
}

const handleRemoveContact = () => {
    removeStore.removeItem(true, { id: props.contact.id, type: 1 });
    emit('removeContact', props.contact.id);
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-item :prepend-avatar="avatar"></v-card-item>
        <v-card-title>{{ props.contact.first_name }} {{ props.contact.last_name }}</v-card-title>
        <v-card-subtitle>Phone: {{ props.contact.phone_number }}</v-card-subtitle>
        <v-card-subtitle>Email: {{ props.contact.email }}</v-card-subtitle>
        <v-card-actions> <v-btn variant="tonal" color="primary" size="x-small">Send email</v-btn>
        </v-card-actions>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2"
                @click="handleRemoveContact">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-human-edit" @click="handleEdit">Edit</v-btn>
        </v-card-action>
    </v-card>
</template>