import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NoteData } from '@/helpers/interfaces';

export const useEditNoteStore = defineStore('editNote', () => {    
    const isEditing = ref<boolean>(false);
    const editingData = ref<NoteData>({
      title: '',
      date: '',
      note: '',
      isImportant: false,
    })

    function changeIsEditing(val: boolean, data: NoteData){
      isEditing.value = val;
      editingData.value = data;
    }
  
    return {changeIsEditing, isEditing, editingData }
})

  