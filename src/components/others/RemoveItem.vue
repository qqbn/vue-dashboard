<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';

const dialog = ref<boolean>(false);
const store = useRemoveStore();
const { isRemoving } = storeToRefs(store);
const endpoint = ref<string>('');

watch(dialog, () => {
    if (dialog.value) return;

    store.isRemoving = false;
    dialog.value = false;
})

watch(isRemoving, () => {
    if (!isRemoving.value) return;

    dialog.value = true;
})

const handleRemove = () => {
    dialog.value = false;
    console.log(store.removingData.endpoint);
}

const removingTitle = computed(() => {
    let type;
    switch (store.removingData.type) {
        case 1:
            type = 'contact';
            break;
        case 2:
            type = 'note';
            break;
        case 3:
            type = 'remind';
            break;
        case 4:
            type = 'expense';
            break;
        case 5:
            type = 'task';
            break;
    }

    return 'Do you want to delete ' + type + ' of id: ' + store.removingData.id + '?';
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