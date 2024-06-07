import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import type { ContactData } from '@/helpers/interfaces';

export const useContactsStore = defineStore('contacts', () => {    
    const isEditing = ref<boolean>(false);
    const allContacts = ref<ContactData[] | []>([]);
    const editingData = ref<ContactData>({
      id: 0,
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      avatar: 0,
    })

    function changeIsEditing(val: boolean, data: ContactData){
      isEditing.value = val;
      editingData.value = data;
    }

    async function loadAllContacts(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'contacts');
        allContacts.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    function addContact(data: ContactData): void{
      (allContacts.value as ContactData[]).push(data);
    }
  
    return {changeIsEditing, isEditing, editingData, loadAllContacts, allContacts, addContact }
})