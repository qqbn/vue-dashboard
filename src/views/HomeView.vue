<script setup lang="ts">
import { ref } from 'vue';
import Widget1 from '../components/widgets/Widget1.vue';
console.log('main');
const widgets = ref([
  {
    name: 'Widget1',
    id: 1,
    availableAreas: [1, 2, 3]
  },
  {
    name: 'Widget2',
    id: 2,
    availableAreas: [1, 2]
  },
  {
    name: 'Widget3',
    id: 3,
    availableAreas: [1, 2, 3]
  },
  {
    name: 'Widget4',
    id: 4,
    availableAreas: [3]
  }
])
let selectedComponent = ref(null);
const test = ref<boolean>(false);
const dialog = ref<boolean>(false);
const isWidgetSelected = ref<boolean>(false);


const selectComponent = (area: number) => {
  dialog.value = true;
  test.value = true;
  selectedComponent = Widget1;
}

const selectWidget = () => {
  isWidgetSelected.value = true;

}

</script>

<template>
  <v-container fluid fill-height class="ma-0 pa-6">
    <v-row>
      <v-col cols="4" style="border: 1px solid red;">
        <div style="height: 100%; width: 100%; background-color: orange;" @click="selectComponent(1)"></div>
        <component :is="selectedComponent" v-if="test"></component>
      </v-col>
      <v-col cols="8" style="border: 1px solid green;">
        <v-row style="border: 1px solid orange;">row1</v-row>
        <v-row style="border: 1px solid orchid;">row2</v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="500">
    <v-card class="px-6 py-4">
      <v-card-title>
        Select widget
      </v-card-title>
      <v-card-item>
        <v-list :items="widgets" item-title="widget" item-value="widgetId" density="compact">
          <v-list-item v-for="widget in widgets" :key="widget.id" @click="selectWidget">
            {{ widget.name }}
          </v-list-item>
        </v-list>
      </v-card-item>
      <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
        <v-btn variant="tonal" color="primary" @click="dialog = false" type="button" v-if="isWidgetSelected">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="dashboard-wrapper">

  </div>
</template>
<style scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;

}
</style>
