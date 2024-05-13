import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NoteData } from '@/helpers/interfaces';
import axios from 'axios';
import { apiUrl } from '@/helpers/constants';
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();

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

    function editNote(data: NoteData): void {
      const index = allNotes.value.findIndex(obj => obj.id === data.id);

      if(index != -1){
        allNotes.value[index].title = data.title;
        allNotes.value[index].content = data.content;
        allNotes.value[index].important = data.important;
      }
    }

    function removeNote(id: number){
      allNotes.value = allNotes.value.filter((el: NoteData) => el.id != id);
      removeStore.isRemoved = false;
    }

    function addNote(data: NoteData): void{
      (allNotes.value as NoteData[]).push(data);
    }
  
    return {changeIsEditing, isEditing, editingData, allNotes, loadAllNotes, editNote, removeNote, addNote }
})

  