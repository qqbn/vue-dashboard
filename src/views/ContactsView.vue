<script setup lang="ts">
import AddContact from '../components/contacts/AddContact.vue'
import ContactCard from '../components/contacts/ContactCard.vue'
import { useContactsStore } from '@/stores/contacts';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, ref, watch } from "vue";

const store = useContactsStore();
const removeStore = useRemoveStore();

const removingId = ref<number>();
const { isRemoved } = storeToRefs(removeStore);
const allContacts = computed(() => store.allContacts);

watch(isRemoved, () => {
    if (isRemoved.value && removingId.value) store.removeContact(removingId.value);
})

onBeforeMount(async () => {
    await store.loadAllContacts();
})
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-xl-6 pa-lg-6 pa-md-2">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddContact />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="4" lg="4" md="6" sm="12" v-for="contact in allContacts" :key="contact.id" class="pa-4">
                <ContactCard :contact="contact" @removeContact="removingId = $event" />
            </v-col>
        </v-row>
    </v-container>
</template>