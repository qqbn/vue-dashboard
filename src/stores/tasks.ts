import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TaskData } from '@/helpers/interfaces';
import axios, { all } from 'axios'
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();
const apiUrl = import.meta.env.VITE_API_URL;

export const useTasksStore = defineStore('tasks', () => {    
    const isEditing = ref<boolean>(false);
    const allTasks = ref<TaskData[] | []>([]);
    const editingData = ref<TaskData>({
      content: '',
      done: false,
      id: 0,
      added_to_dashboard: false,
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
        allTasks.value[index].added_to_dashboard = data.added_to_dashboard;
      }
    }

    const addToDashboard = (id: number): void => {
      const index = allTasks.value.findIndex(obj => obj.id === id);
      allTasks.value[index].added_to_dashboard = !allTasks.value[index].added_to_dashboard;
  }
  
    return {changeIsEditing, isEditing, editingData, loadAllTasks,allTasks, removeTask, addTask, editTask, addToDashboard }
})