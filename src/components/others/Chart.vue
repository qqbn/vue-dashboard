<script setup lang="ts">
import type { ChartProps } from "../../helpers/interfaces";
import { typeItems, timeItems } from '@/helpers/constants.js';

const props = defineProps<{
    selectedType?: number,
    selectedTime?: string | null,
    values: number[],
    getExpenseType?: any,
}>()
</script>
<template>
    <v-card class="mx-auto text-center" color="primary" dark max-width="1000">
        <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline :model-value="values" color="rgba(255, 255, 255, .7)" height="100" padding="20"
                    stroke-linecap="round" smooth :auto-line-width="false" line-width="2">
                    <template v-slot:label="item">
                        ${{ item.value }}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>

        <v-card-text v-if="selectedTime">
            <div class="text-h6 font-weight-thin">
                {{ props.getExpenseType(props.selectedType) }} expenses from {{ props.selectedTime }}
            </div>
        </v-card-text>
    </v-card>
</template>