import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RemoveData } from '@/helpers/interfaces';

export const useRemoveStore = defineStore('remove', () => {    
    const isRemoving = ref<boolean>(false);
    const removingData = ref<RemoveData>({
      id: null,
      type: null,
      endpoint: '',
    })

    function removeItem(val: boolean, data: any){
        isRemoving.value = val;
        removingData.value.id = data.id;
        removingData.value.type = data.type
        removingData.value.endpoint = getEndpoint(data.type);
        console.log(removingData.value);
    }

    function getEndpoint(type: number): string {
      switch(type){
        case 1:
          return 'test1';
        case 2: 
          return 'test2';
        default:
          return 'test';
      }
    }
  
    return {removeItem, isRemoving, removingData }
})
