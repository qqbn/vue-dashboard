<script setup lang="ts">
import type { ChartProps } from "../../helpers/interfaces";
const props = defineProps<ChartProps>()
</script>
<template>
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

        <v-card-text v-if="selectedTime">
            <div class="text-h6 font-weight-thin">
                Expenses from {{ selectedTime }}
            </div>
        </v-card-text>
    </v-card>
</template>