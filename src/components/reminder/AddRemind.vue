<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRemindsStore } from '@/stores/reminds';
import { storeToRefs } from 'pinia';

const store = useRemindsStore();
const { isEditing } = storeToRefs(store);

const dialog = ref<boolean>(false);
const name = ref<string>('');
const date = ref<any>(null);
const modalTitle = computed(() => store.isEditing ? 'Edit remind' : 'Add new remind');

const handleSave = (): void => {
    dialog.value = false;
}

const showModal = (): void => {
    dialog.value = !dialog.value;
    name.value = '';
    date.value = null;
}

watch(dialog, () => {
    if (dialog.value) return;

    store.isEditing = false;
    dialog.value = false;
})

watch(isEditing, () => {
    if (!isEditing.value) return;

    dialog.value = true;
    name.value = store.editingData.name;
    date.value = store.editingData.date;
})
</script>
<template>
    <v-btn color="primary" @click="showModal">
        Add Remind
    </v-btn>

    <v-dialog v-model="dialog" width="500">
        <v-card class="px-6 py-4">
            <v-card-title>
                {{ modalTitle }}
            </v-card-title>
            <v-card-text>
                <v-text-field label="Remind name" type="input" v-model="name"></v-text-field>
                <h4>Set date to remind you of something</h4>
                <VueDatePicker v-model="date" inline auto-apply></VueDatePicker>
            </v-card-text>
            <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
                <v-btn variant="tonal" color="red" @click="dialog = false">Close</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-if="!store.isEditing">Add
                    Remind</v-btn>
                <v-btn variant="tonal" color="primary" @click="handleSave" type="button" v-else>Edit Remind</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>