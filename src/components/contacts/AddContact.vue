<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { nameRules, phoneNumberRules, emailRules, fieldRequired } from "@/helpers/validation";
import { avatars } from '@/helpers/constants'
import { useAlertStore } from '@/stores/alert'

const store = useContactsStore();
const { isEditing } = storeToRefs(store);
const alert = useAlertStore();

const dialog = ref<boolean>(false);
const firstName = ref<string>('');
const lastName = ref<string>('');
const phoneNumber = ref<string>('');
const email = ref<string>('');
const contactId = ref<number>(0);
const modalTitle = computed(() => store.isEditing ? 'Edit contact' : 'Add new contact');
const avatar = ref<number | null>(null);
const form = ref();

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
    contactId.value = store.editingData.id;
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
            alert.showAlert('Contact added!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }
}

const handleEditContact = async (id: number): Promise<void> => {
    try {
        const response = await axios.put(apiUrl + `contacts/editContact/${id}`, { first_name: firstName.value, last_name: lastName.value, phone_number: phoneNumber.value, email: email.value, avatar: avatar.value });
        if (response.status === 200) {
            store.editContact({ id: id, first_name: firstName.value, last_name: lastName.value, phone_number: phoneNumber.value, email: email.value, avatar: avatar.value });
            alert.showAlert('Contact edited!');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        dialog.value = false;
    }
}

const btnText = computed(() => {
    return !store.isEditing ? 'Add contact' : 'Edit contact'
});

const handleSubmitForm = async (): Promise<void> => {
    const { valid } = await form.value.validate();
    if (!valid) return;

    if (!store.isEditing) {
        await handleAddContact()
    } else {
        await handleEditContact(contactId.value);
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
            <v-form @submit.prevent="handleSubmitForm" ref="form">
                <v-card-text>
                    <v-text-field label="First Name*" type="input" v-model="firstName"
                        :rules="nameRules"></v-text-field>
                    <v-text-field label="Last Name*" type="input" v-model="lastName" :rules="nameRules"></v-text-field>
                    <v-text-field label="Phone Number*" type="phone" v-model="phoneNumber"
                        :rules="phoneNumberRules"></v-text-field>
                    <v-text-field label="E-mail*" type="email" v-model="email" :rules="emailRules"></v-text-field>
                    <v-select label="Contact avatar" :items="avatars" v-model="avatar" item-title="name" item-value="id"
                        :rules="fieldRequired"></v-select>
                </v-card-text>
                <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                    <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                    <v-btn variant="tonal" color="primary" type="submit">{{ btnText }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>