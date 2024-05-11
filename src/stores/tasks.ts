import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TaskData } from '@/helpers/interfaces';
import axios, { all } from 'axios'
import { apiUrl } from '@/helpers/constants';
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();

export const useTasksStore = defineStore('tasks', () => {    
    const isEditing = ref<boolean>(false);
    const allTasks = ref<TaskData[] | []>([]);
    const editingData = ref<TaskData>({
      content: '',
      done: false,
      id: 0,
    })

    function changeIsEditing(val: boolean, data: TaskData): void{
      isEditing.value = val;
      editingData.value = data;
    }

    async function loadAllTasks(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'tasks');
        allTasks.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    function removeTask(id: number): void{
      allTasks.value = allTasks.value.filter((el: TaskData) => el.id != id);
      removeStore.isRemoved = false;
    }

    function addTask(data: TaskData): void{
      (allTasks.value as TaskData[]).push(data);
    }

    function editTask(data: TaskData): void {
      const index = allTasks.value.findIndex(obj => obj.id === data.id);

      if(index != -1){
        allTasks.value[index].content = data.content;
        allTasks.value[index].done = data.done;
      }
    }
  
    return {changeIsEditing, isEditing, editingData, loadAllTasks,allTasks, removeTask, addTask, editTask }
})