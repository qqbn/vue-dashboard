import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TaskData } from '@/helpers/interfaces';

export const useTasksStore = defineStore('tasks', () => {    
    const isEditing = ref<boolean>(false);
    const editingData = ref<TaskData>({
      content: '',
      done: false,
    })

    function changeIsEditing(val: boolean, data: TaskData){
      isEditing.value = val;
      editingData.value = data;
      console.log(editingData.value);
    }
  
    return {changeIsEditing, isEditing, editingData }
})