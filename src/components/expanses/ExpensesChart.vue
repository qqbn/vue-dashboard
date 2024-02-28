<script setup lang="ts">
import { ref } from 'vue';
const value = [
    423,
    446,
    675,
    510,
    590,
    610,
    760,
];
const selectedType = ref<[string] | null>(null);
const selectedTime = ref<string | null>('Today');
</script>
<template>
    <div class="w-100 d-flex justify-space-between align-center flex-column flex-md-row">
        <v-select label="Type of expense" :items="['Bills', 'Food', 'Shopping', 'Outside', 'Others']" chips multiple
            class="pa-2 w-100" v-model="selectedType"></v-select>

        <v-select label="Period of time" :items="['Today', 'Week', 'Month', 'Year']" chips class="pa-2 w-100"
            v-model="selectedTime"></v-select>
    </div>
    <v-card class="mx-auto text-center" color="primary" dark max-width="1000">
        <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline :model-value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24"
                    stroke-linecap="round" smooth>
                    <template v-slot:label="item">
                        ${{ item.value }}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>

        <v-card-text>
            <div class="text-h6 font-weight-thin">
                Expenses from {{ selectedTime }}
            </div>
        </v-card-text>
    </v-card>
</template>
<style scoped></style>