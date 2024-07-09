<script setup lang="ts">
import AddTask from '../components/tasks/AddTask.vue';
import AllTasks from '../components/tasks/AllTasks.vue';
import Alert from '@/components/others/Alert.vue'
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-xl-6 pa-lg-6 pa-md-2">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddTask />
            </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" xl="8" lg="8" md="12" sm="12" class="pa-4">
                <AllTasks />
            </v-col>
        </v-row>
    </v-container>
    <Alert />
</template>