import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ExpenseData } from '@/helpers/interfaces';
import axios, { all } from 'axios'
import { apiUrl } from '@/helpers/constants';
import { useRemoveStore } from './remove';
const removeStore = useRemoveStore();

export const useExpensesStore = defineStore('expenses', () => {    
    const isEditing = ref<boolean>(false);
    const page = ref<number>(0);
    const allExpenses = ref<ExpenseData[] | []>([]);
    const canLoadMore = ref<boolean>(false);
    const editingData = ref<ExpenseData>({
      id: 0,
      title: '',
      value: 0,
      type: 0,
      date: ''
    })

    // function changeIsEditing(val: boolean, data: TaskData): void{
    //   isEditing.value = val;
    //   editingData.value = data;
    // }

    async function loadAllExpenses(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'expenses/list?page=1');
        allExpenses.value = [...response.data.expenses];
        page.value = response.data.page;
        canLoadMore.value = response.data.moreExpenses;
      } catch (error) {
        console.log(error);
      }
    }

    async function loadMoreExpenses(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + `expenses/list?page=${page.value + 1}`);
        allExpenses.value = [...allExpenses.value, ...response.data.expenses];
        canLoadMore.value = response.data.moreExpenses;
        page.value = response.data.page;
      } catch (error) {
        console.log(error);
      }
    }

    // function removeTask(id: number): void{
    //   allTasks.value = allTasks.value.filter((el: TaskData) => el.id != id);
    //   removeStore.isRemoved = false;
    // }

    function addExpense(data: ExpenseData): void{
      (allExpenses.value as ExpenseData[]).unshift(data);
      allExpenses.value.sort((a: any, b: any) => new Date(b.date).getDate() - new Date(a.date).getDate());
    }

    // function editTask(data: TaskData): void {
    //   const index = allTasks.value.findIndex(obj => obj.id === data.id);

    //   if(index != -1){
    //     allTasks.value[index].content = data.content;
    //     allTasks.value[index].done = data.done;
    //   }
    // }
  
    return {loadAllExpenses, allExpenses, page, canLoadMore, addExpense, loadMoreExpenses }
})