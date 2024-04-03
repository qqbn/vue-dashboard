<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useContactsStore } from '@/stores/contacts';
import { storeToRefs } from 'pinia';

const store = useContactsStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const firstName = ref<string>('');
const lastName = ref<string>('');
const phoneNumber = ref<string>('');
const eMail = ref<string>('');
const modalTitle = computed(() => store.isEditing ? 'Edit contact' : 'Add new contact');

const handleSave = (): void => {
    dialog.value = false;
    console.log('form submitted');
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    firstName.value = '';
    lastName.value = '';
    phoneNumber.value = '';
    eMail.value = '';
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    firstName.value = store.editingData.firstName;
    lastName.value = store.editingData.lastName;
    phoneNumber.value = store.editingData.phoneNumber;
    eMail.value = store.editingData.eMail;
})
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
                <v-text-field label="E-mail" type="email" v-model="eMail"></v-text-field>
                <v-file-input label="Contact photo"></v-file-input>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-if="!store.isEditing">Save
                    Contact</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-else>Edit Contact</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>