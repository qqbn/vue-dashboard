<script setup lang="ts">
import { ref, watch, computed, defineEmits } from 'vue';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAlertStore } from '@/stores/alert'

const dialog = ref<boolean>(false);
const store = useRemoveStore();
const alert = useAlertStore();
const { isRemoving } = storeToRefs(store);
const type = ref<string>('');
const emit = defineEmits()

watch(dialog, () => {
    if (dialog.value) return;

    store.isRemoving = false;
    dialog.value = false;
})

watch(isRemoving, () => {
    if (!isRemoving.value) return;

    dialog.value = true;
})

const handleRemove = async (): Promise<void> => {
    try {
        const response = await axios.delete(store.removingData.endpoint);
        if (response.status === 200) {
            alert.showAlert(`${type.value.charAt(0).toUpperCase() + type.value.slice(1)} removed!`)
            store.isRemoved = true;
        }
    } catch (error) {
        console.log(error);
    } finally {
        dialog.value = false;
    }
}

const removingTitle = computed(() => {
    switch (store.removingData.type) {
        case 1:
            type.value = 'contact';
            break;
        case 2:
            type.value = 'note';
            break;
        case 3:
            type.value = 'remind';
            break;
        case 4:
            type.value = 'expense';
            break;
        case 5:
            type.value = 'task';
            break;
    }

    return 'Do you want to delete ' + type.value + ' of id: ' + store.removingData.id + '?';
})
</script>
<template>
    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ removingTitle }}
            </v-card-title>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">No</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleRemove" type="button">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>