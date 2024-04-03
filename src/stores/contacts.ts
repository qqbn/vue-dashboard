import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ContactData } from '@/helpers/interfaces';

export const useContactsStore = defineStore('contacts', () => {    
    const isEditing = ref<boolean>(false);
    const editingData = ref<ContactData>({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      eMail: ''
    })

    function changeIsEditing(val: boolean, data: ContactData){
      isEditing.value = val;
      editingData.value = data;
    }
  
    return {changeIsEditing, isEditing, editingData }
})