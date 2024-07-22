import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import type { ContactData } from '@/helpers/interfaces';
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();
const apiUrl = import.meta.env.VITE_API_URL;

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
      added_to_dashboard: false,
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

    function removeContact(id: number){
      allContacts.value = allContacts.value.filter((el: ContactData) => el.id != id);
      removeStore.isRemoved = false;
    }

    function editContact(data: ContactData): void {
      const index = allContacts.value.findIndex(obj => obj.id === data.id);

      if(index != -1){
        allContacts.value[index].first_name = data.first_name;
        allContacts.value[index].last_name = data.last_name;
        allContacts.value[index].phone_number = data.phone_number;
        allContacts.value[index].email = data.email;
        allContacts.value[index].avatar = data.avatar;
        allContacts.value[index].added_to_dashboard = data.added_to_dashboard;
      }
    }

    const addToDashboard = (id: number): void => {
        const index = allContacts.value.findIndex(obj => obj.id === id);
        allContacts.value[index].added_to_dashboard = !allContacts.value[index].added_to_dashboard;
    }
  
    return {changeIsEditing, isEditing, editingData, loadAllContacts, allContacts, addContact, removeContact, editContact, addToDashboard }
})