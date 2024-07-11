<script setup lang="ts">
import { onBeforeMount, ref, watch, computed } from 'vue';
import AddRemind from '../components/reminder/AddRemind.vue';
import RemindCard from '../components/reminder/RemindCard.vue';
import { useRemindsStore } from '@/stores/reminds';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';
import Alert from '@/components/others/Alert.vue'

const removeStore = useRemoveStore();
const store = useRemindsStore();

const removingId = ref<number>();
const { isRemoved } = storeToRefs(removeStore);
const allReminds = computed(() => store.allReminds)

watch(isRemoved, () => {
    if (isRemoved.value && removingId.value) store.removeRemind(removingId.value);
})

onBeforeMount(async () => {
    await store.loadAllReminds();
})
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-6">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddRemind />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="4" lg="4" md="6" sm="12" v-for="remind in allReminds" :key="remind.id" class="pa-4">
                <RemindCard :remind="remind" @removeRemind="removingId = $event" />
            </v-col>
        </v-row>
    </v-container>
    <Alert />
</template>

<style></style>