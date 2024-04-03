import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RemindData } from '@/helpers/interfaces';

export const useRemindsStore = defineStore('reminds', () => {    
    const isEditing = ref<boolean>(false);
    const editingData = ref<RemindData>({
      name: '',
      date: null,
    })

    function changeIsEditing(val: boolean, data: RemindData){
      isEditing.value = val;
      editingData.value = data;
    }
  
    return {changeIsEditing, isEditing, editingData }
})