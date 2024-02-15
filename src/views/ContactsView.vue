<script setup lang="ts">
import AddContact from '../components/contacts/AddContact.vue'
import ContactCard from '../components/contacts/ContactCard.vue'
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-xl-6 pa-lg-6 pa-md-2">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddContact />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="4" lg="4" md="6" sm="12" v-for="n in 6" :key="n" class="pa-4">
                <ContactCard />
            </v-col>
        </v-row>
    </v-container>
</template>