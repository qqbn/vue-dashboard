<script setup lang="ts">
import AddRemind from '../components/reminder/AddRemind.vue';
import RemindCard from '../components/reminder/RemindCard.vue';
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-6">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddRemind />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="4" lg="4" md="6" sm="12" v-for="n in 6" :key="n" class="pa-4">
                <RemindCard />
            </v-col>
        </v-row>
    </v-container>
</template>

<style></style>