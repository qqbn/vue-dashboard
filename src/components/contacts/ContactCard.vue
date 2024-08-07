<script setup lang="ts">
import { ref, computed } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import { useRemoveStore } from '@/stores/remove';
import { useAlertStore } from '@/stores/alert'
import { avatarsImages } from '@/helpers/constants.js'
import type { ContactData } from '@/helpers/interfaces';
import axios from 'axios';

const store = useContactsStore();
const removeStore = useRemoveStore();
const alert = useAlertStore();
const emit = defineEmits()
const apiUrl = import.meta.env.VITE_API_URL;

const props = defineProps<{
    contact: ContactData,
}>();

const avatar = computed(() => avatarsImages[props.contact.avatar - 1] || null)

const handleEdit = () => {
    const obj = {
        id: props.contact.id,
        first_name: props.contact.first_name,
        last_name: props.contact.last_name,
        phone_number: props.contact.phone_number,
        email: props.contact.email,
        avatar: props.contact.avatar,
        added_to_dashboard: props.contact.added_to_dashboard,
    }
    store.changeIsEditing(true, obj);
}

const handleRemoveContact = () => {
    removeStore.removeItem(true, { id: props.contact.id, type: 1 });
    emit('removeContact', props.contact.id);
}

const handleCopyMail = () => {
    alert.showAlert('Email has been copied to dashboard!');
    navigator.clipboard.writeText(props.contact.email);
}
const handleAddToDashboard = async (): Promise<void> => {
    try {
        const response = await axios.patch(apiUrl + 'contacts/addToDashboard/' + props.contact.id, { add: !props.contact.added_to_dashboard });
        if (response.status === 200) {
            alert.showAlert(!props.contact.added_to_dashboard ? 'Contact added to dashboard' : 'Contact removed from dashboard');
            store.addToDashboard(props.contact.id);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <v-card class="pa-4">
        <v-card-item :prepend-avatar="avatar"></v-card-item>
        <v-card-title>{{ props.contact.first_name }} {{ contact.last_name }}</v-card-title>
        <v-card-subtitle>Phone: {{ contact.phone_number }}</v-card-subtitle>
        <v-card-subtitle>Email: {{ contact.email }}</v-card-subtitle>
        <v-card-actions>
            <v-btn variant="tonal" color="primary" size="x-small" @click="handleCopyMail">Copy
                email</v-btn>
            <v-btn variant="tonal" color="primary" size="x-small" @click="handleAddToDashboard">{{
                contact.added_to_dashboard ? 'Remove from dashboard' : 'Add to dashboard' }}</v-btn>
        </v-card-actions>
        <v-card-action class="mt-4 d-flex align-center justify-end">
            <v-btn variant="tonal" color="red" append-icon="mdi-bucket-outline" class="mr-2"
                @click="handleRemoveContact">Delete</v-btn>
            <v-btn variant="tonal" color="primary" append-icon="mdi-human-edit" @click="handleEdit">Edit</v-btn>
        </v-card-action>
    </v-card>
</template>