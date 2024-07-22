import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RemoveData } from '@/helpers/interfaces';
const apiUrl = import.meta.env.VITE_API_URL;

export const useRemoveStore = defineStore('remove', () => {    
    const isRemoving = ref<boolean>(false);
    const isRemoved = ref<boolean>(false);
    const removingData = ref<RemoveData>({
      id: null,
      type: null,
      endpoint: '',
    })

    function removeItem(val: boolean, data: any){
        isRemoving.value = val;
        removingData.value.id = data.id;
        removingData.value.type = data.type
        removingData.value.endpoint = getEndpoint(data.type) + data.id;
    }

    function getEndpoint(type: number): string {
      switch(type){
        case 1:
          return apiUrl + 'contacts/delete/';
        case 2: 
          return apiUrl + 'notes/delete/';
        case 3: 
          return apiUrl + 'reminds/delete/';
        case 4: 
          return apiUrl + 'expenses/delete/';
        case 5:
          return apiUrl + 'tasks/delete/';
        default:
          return 'test';
      }
    }
  
    return {removeItem, isRemoving, removingData, isRemoved }
})
