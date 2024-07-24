import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RemindData } from '@/helpers/interfaces';
import axios, { all } from 'axios'
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();
const apiUrl = import.meta.env.VITE_API_URL;

export const useRemindsStore = defineStore('reminds', () => {    
    const isEditing = ref<boolean>(false);
    const allReminds = ref<RemindData[] | []>([])
    const editingData = ref<RemindData>({
      name: '',
      date: null,
      id: 0,
    })

    function changeIsEditing(val: boolean, data: RemindData){
      isEditing.value = val;
      editingData.value = data;
    }

    async function loadAllReminds(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'reminds');
        allReminds.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    function addRemind(data: RemindData): void{
      (allReminds.value as RemindData[]).push(data);
    }

    function removeRemind(id: number): void{
      allReminds.value = allReminds.value.filter((el: RemindData) => el.id != id);
      removeStore.isRemoved = false;
    }

    function editRemind(data: RemindData): void{
      const index = allReminds.value.findIndex(obj => obj.id === data.id);

      if(index != -1){
        allReminds.value[index].name = data.name;
        allReminds.value[index].date = data.date;
      }
    }
  
    return {changeIsEditing, isEditing, editingData, loadAllReminds, allReminds, removeRemind, addRemind, editRemind }
})