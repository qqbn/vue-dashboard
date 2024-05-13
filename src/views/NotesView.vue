<script setup lang="ts">
import { onBeforeMount, computed, ref, watch } from "vue";
import NoteCard from "../components/notes/NoteCard.vue"
import AddNote from "../components/notes/AddNote.vue"
import { useEditNoteStore } from '@/stores/editNote';
import { useRemoveStore } from '@/stores/remove';
import { storeToRefs } from 'pinia';

const store = useEditNoteStore();
const removeStore = useRemoveStore();

const removingId = ref<number>();
const { isRemoved } = storeToRefs(removeStore);
const allNotes = computed(() => store.allNotes);

watch(isRemoved, () => {
    if (isRemoved.value && removingId.value) store.removeNote(removingId.value);
})

onBeforeMount(async () => {
    await store.loadAllNotes();
})
</script>
<template>
    <v-container fluid fill-height class="ma-0 pa-6">
        <v-row align="start" justify="start" class="mb-4" no-gutters>
            <v-col cols="12" class="pa-4">
                <AddNote />
            </v-col>
        </v-row>
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" xl="4" lg="4" md="6" sm="12" v-for="note in allNotes" :key="note.id" class="pa-4">
                <NoteCard :note="note" @removeNote="removingId = $event" />
            </v-col>
        </v-row>
    </v-container>
</template>
<style></style>