import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NoteData } from '@/helpers/interfaces';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';

export const useEditNoteStore = defineStore('editNote', () => {    
    const isEditing = ref<boolean>(false);
    const allNotes = ref<NoteData[] | []>([]);
    const editingData = ref<NoteData>({
      id: 0,
      title: '',
      date: '',
      content: '',
      important: false,
    })

    function changeIsEditing(val: boolean, data: NoteData){
      isEditing.value = val;
      editingData.value = data;
    }

    async function loadAllNotes(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'notes');
        allNotes.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  
    return {changeIsEditing, isEditing, editingData, allNotes, loadAllNotes }
})

  