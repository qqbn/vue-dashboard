<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeMount } from 'vue';
import { type SelectedWidget, type SelectedWidgets, type SavedWidget, type WidgetData, ModalType } from '../helpers/interfaces';
import ContactsWidget from '@/components/widgets/ContactsWidget.vue';
import NotesWidget from '@/components/widgets/NotesWidget.vue';
import RemindWidget from '@/components/widgets/RemindWidget.vue';
import TaskWidget from '@/components/widgets/TaskWidget.vue';
import AddWidget from '@/components/widgets/AddWidget.vue';
import ExpensesWidget from "@/components/widgets/ExpensesWidget.vue";
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';

const ContactsWidgetComponent = ContactsWidget;

const widgets = ref<SelectedWidget[]>([
  {
    widgetId: 1,
    name: 'Expenses',
    component: ExpensesWidget,
    availableAreas: [1, 2, 3, 4, 5, 6]
  },
  {
    widgetId: 2,
    name: 'Contacts',
    component: ContactsWidgetComponent,
    availableAreas: [1]
  },
  {
    widgetId: 3,
    name: 'Notes',
    component: NotesWidget,
    availableAreas: [2, 3, 4, 5]
  },
  {
    widgetId: 4,
    name: 'Remind',
    component: RemindWidget,
    availableAreas: [2, 3, 4, 5]
  },
  {
    widgetId: 5,
    name: 'Task',
    component: TaskWidget,
    availableAreas: [2, 3, 4, 5]
  }
])

const selectedWidgets = ref<SelectedWidgets>({});
const dialog = ref<boolean>(false);
const availableWidgets = ref<any>(null);
const actualSelectedWidget = ref<SelectedWidget | null>(null);
const actualSelectedArea = ref<number | null>(null);
const savedWidgets = ref<any>([]);
const modalType = ref<string>('');

const selectComponent = (area: number) => {
  actualSelectedWidget.value = null;
  actualSelectedArea.value = area;
  dialog.value = true;
  availableWidgets.value = widgets.value.filter(el => el.availableAreas.includes(area));
  modalType.value = ModalType.add;
}

const saveWidget = () => {
  (selectedWidgets.value as SelectedWidgets)['area' + actualSelectedArea.value] = actualSelectedWidget.value;
  savedWidgets.value.push(saveWidgetObj(actualSelectedArea.value, actualSelectedWidget.value?.widgetId));

  saveToLS();
  dialog.value = false;
}

const saveWidgetObj = (area?: number | null, widgetId?: number) => {
  const obj = {
    area: area,
    id: widgetId,
  }

  return obj;
}

const handleRemoveWidget = (area: number, id?: number): void => {
  dialog.value = true;
  modalType.value = ModalType.remove;
  const tmp = widgets.value.filter(el => el.widgetId === id);
  actualSelectedWidget.value = tmp[0];
  actualSelectedArea.value = area;
}

const removeWidget = (): void => {
  selectedWidgets.value = Object.fromEntries(Object.entries(selectedWidgets.value).filter(([key, value]) => Number(key.slice(-1)) != actualSelectedArea.value));
  savedWidgets.value = savedWidgets.value.filter((el: SavedWidget) => el.area != actualSelectedArea.value);
  saveToLS();
  dialog.value = false;
}

const saveToLS = (): void => {
  localStorage.removeItem('vue-dashboard-widgets');
  localStorage.setItem('vue-dashboard-widgets', JSON.stringify(savedWidgets.value));
}

const getWidgets = async (): Promise<void> => {
  const data = localStorage.getItem('vue-dashboard-widgets');
  if (!data) return;

  savedWidgets.value = JSON.parse(data);
  const widgetsData = await handleGetWidgetsData();
  savedWidgets.value.forEach((element: { id: number; area: string; }) => {
    (selectedWidgets.value as any)['area' + element.area] = { ...widgets.value.find(el => el.widgetId === element.id), ...widgetsData.find((el: any) => el.widgetId === element.id) };
  });
}

const handleGetWidgetsData = async (): Promise<any> => {
  const dataIds = savedWidgets.value.map((obj: any) => obj.id).toString();
  try {
    const response = await axios.get(apiUrl + `dashboard/?widgets=${dataIds}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


getWidgets()
</script>

<template>
  <v-container fluid fill-height class="ma-0 pa-6">
    <v-row>
      <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
        <add-widget @select-component="selectComponent(1)" v-if="!selectedWidgets?.area1">Area 1</add-widget>
        <component v-else :is="{ ...selectedWidgets?.area1?.component }" :data="selectedWidgets?.area1" :area="1"
          @remove-widget="handleRemoveWidget(1, $event)" />
      </v-col>
      <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <add-widget @select-component="selectComponent(2)" v-if="!selectedWidgets?.area2">Area 2</add-widget>
            <component v-else :is="{ ...selectedWidgets?.area2?.component }" :data="selectedWidgets?.area2" :area="2"
              @remove-widget="handleRemoveWidget(2, $event)">
            </component>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <add-widget @select-component="selectComponent(3)" v-if="!selectedWidgets?.area3">Area 3</add-widget>
            <component v-else :is="{ ...selectedWidgets?.area3?.component }" :data="selectedWidgets?.area3" :area="3"
              @remove-widget="handleRemoveWidget(3, $event)"></component>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <add-widget @select-component="selectComponent(4)" v-if="!selectedWidgets?.area4">Area 4</add-widget>
            <component v-else :is="{ ...selectedWidgets?.area4?.component }" :data="selectedWidgets?.area4" :area="4"
              @remove-widget="handleRemoveWidget(4, $event)"></component>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <add-widget @select-component="selectComponent(5)" v-if="!selectedWidgets?.area5">Area 5</add-widget>
            <component v-else :is="{ ...selectedWidgets?.area5?.component }" :data="selectedWidgets?.area5" :area="5"
              @remove-widget="handleRemoveWidget(5, $event)"></component>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="500">
    <v-card class="px-6 py-4" v-if="modalType === ModalType.add">
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
        <v-btn variant="tonal" color="red" @click="dialog = false" type="button">Close</v-btn>
        <v-btn variant="tonal" color="primary" @click="saveWidget" type="button"
          v-if="actualSelectedWidget">Save</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="px-6 py-4" v-if="modalType === ModalType.remove">
      <v-card-title class="text-wrap">
        Do you want to remove {{ actualSelectedWidget?.name }} from Area{{ actualSelectedArea }}?
      </v-card-title>
      <v-card-actions class="d-flex justify-end align-center pa-4" align="center" justify="end">
        <v-btn variant="tonal" color="red" @click="dialog = false" type="button">No</v-btn>
        <v-btn variant="tonal" color="primary" @click="removeWidget" type="button">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
