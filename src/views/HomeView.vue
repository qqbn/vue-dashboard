<script setup lang="ts">
import { ref } from 'vue';
import Widget1 from '../components/widgets/Widget1.vue';
import AddWidget from '../components/widgets/AddWidget.vue';

interface SelectedWidget {
  name: string,
  component: any,
  widgetId: number,
  availableAreas: number[],
}

interface SelectedWidgets {
  [key: string]: SelectedWidget | null,
}

const widgets = ref<SelectedWidget[]>([
  {
    widgetId: 1,
    name: 'Widget1',
    component: Widget1,
    availableAreas: [1, 2, 3]
  },
  {
    widgetId: 2,
    name: 'Widget2',
    component: Widget1,
    availableAreas: [1, 2]
  },
  {
    widgetId: 3,
    name: 'Widget3',
    component: Widget1,
    availableAreas: [1, 2, 3]
  },
  {
    widgetId: 4,
    name: 'Widget4',
    component: Widget1,
    availableAreas: [3]
  }
])

let selectedWidgets = ref<SelectedWidgets | {}>({});
const dialog = ref<boolean>(false);
let availableWidgets = ref<any>(null);
let actualSelectedWidget = ref<SelectedWidget | null>(null);
let actualSelectedArea = ref<number | null>(null);


const selectComponent = (area: number) => {
  actualSelectedWidget.value = null;
  actualSelectedArea.value = area;
  dialog.value = true;
  availableWidgets = widgets.value.filter(el => el.availableAreas.includes(area));
  console.log(availableWidgets);
}

const saveWidget = () => {
  (selectedWidgets.value as SelectedWidgets)['area' + actualSelectedArea.value] = actualSelectedWidget.value;
  dialog.value = false;
}

</script>

<template>
  <v-container fluid fill-height class="ma-0 pa-6">
    <v-row>
      <v-col cols="4" style="border: 1px solid red;">
        <add-widget @select-component="selectComponent(1)" v-if="!selectedWidgets?.area1">
          Area 1
        </add-widget>
        <component v-if="selectedWidgets?.area1" :is="selectedWidgets?.area1?.component"></component>
      </v-col>
      <v-col cols="8" style="border: 1px solid green;">
        <v-row style="border: 1px solid orange;">
          <v-col vols="6">
            <add-widget @select-component="selectComponent(2)" v-if="!selectedWidgets?.area2">
              Area 2
            </add-widget>
          </v-col>
          <v-col vols="6">
            <add-widget @select-component="selectComponent(3)" v-if="!selectedWidgets?.area3">
              Area 3
            </add-widget>
          </v-col>
        </v-row>
        <v-row style="border: 1px solid orchid;">
          <v-col vols="6">
            <add-widget @select-component="selectComponent(4)" v-if="!selectedWidgets?.area4">
              Area 4
            </add-widget>
          </v-col>
          <v-col vols="6">
            <add-widget @select-component="selectComponent(4)" v-if="!selectedWidgets?.area5">
              Area 5
            </add-widget>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="500">
    <v-card class="px-6 py-4">
      <v-card-title>
        Select widget for Area{{ actualSelectedArea }}
      </v-card-title>
      <v-card-subtitle>
        Selected widget: {{ actualSelectedWidget?.name }}
      </v-card-subtitle>
      <v-card-item>
        <v-list item-title="widget" item-value="widgetId" density="compact">
          <v-list-item v-for="widget in availableWidgets" :key="widget.id" @click="actualSelectedWidget = widget">
            {{ widget.name }}
          </v-list-item>
        </v-list>
      </v-card-item>
      <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
        <v-btn variant="tonal" color="primary" @click="saveWidget" type="button"
          v-if="actualSelectedWidget">Save</v-btn>
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
