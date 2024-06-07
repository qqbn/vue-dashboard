<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
const store = useContactsStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const firstName = ref<string>('');
const lastName = ref<string>('');
const phoneNumber = ref<string>('');
const email = ref<string>('');
const modalTitle = computed(() => store.isEditing ? 'Edit contact' : 'Add new contact');
const avatar = ref<number | null>(null);
const avatars = [
    {
        id: 1,
        name: 'Lego 1'
    },
    {
        id: 2,
        name: 'Lego 2'
    },
    {
        id: 3,
        name: 'Lego 3'
    },
    {
        id: 4,
        name: 'Lego 4'
    },
    {
        id: 5,
        name: 'Lego 5'
    }
];

const handleSave = (): void => {
    dialog.value = false;
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    firstName.value = '';
    lastName.value = '';
    phoneNumber.value = '';
    email.value = '';
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    firstName.value = store.editingData.first_name;
    lastName.value = store.editingData.last_name;
    phoneNumber.value = store.editingData.phone_number;
    email.value = store.editingData.email;
    avatar.value = store.editingData.avatar
})

const handleAddContact = async (): Promise<void> => {
    try {
        const response = await axios.post(apiUrl + `contacts/addContact/`, { first_name: firstName.value, last_name: lastName.value, phone_number: phoneNumber.value, email: email.value, avatar: avatar.value });
        if (response.status === 200) {
            store.addContact(response.data);
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }
}
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Contact
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ modalTitle }}
            </v-card-title>
            <v-card-text>
                <v-text-field label="First Name" type="input" v-model="firstName"></v-text-field>
                <v-text-field label="Last Name" type="input" v-model="lastName"></v-text-field>
                <v-text-field label="Phone Number" type="phone" v-model="phoneNumber"></v-text-field>
                <v-text-field label="E-mail" type="email" v-model="email"></v-text-field>
                <v-select label="Contact avatar" :items="avatars" v-model="avatar" item-title="name"
                    item-value="id"></v-select>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleAddContact" type="button"
                    v-if="!store.isEditing">Save
                    Contact</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-else>Edit Contact</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>