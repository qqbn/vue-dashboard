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
    const filteredArr = ref<ExpenseData[] | []>([]);
    const canLoadMore = ref<boolean>(false);
    const selectedType = ref<number>(0);
    const selectedPeriod = ref<string>('');
    const editingData = ref<ExpenseData>({
      id: 0,
      title: '',
      value: 0,
      type: 0,
      date: ''
    })

    async function loadAllExpenses(): Promise<void>{
      try {
        const response = await axios.get(apiUrl + 'expenses/list?page=1');
        allExpenses.value = [...response.data.expenses];
        filteredArr.value = [...response.data.expenses];
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
        await filterExpenses();
        canLoadMore.value = response.data.moreExpenses;
        page.value = response.data.page;
      } catch (error) {
        console.log(error);
      }
    }

    async function addExpense(data: ExpenseData): Promise<void>{
      (allExpenses.value as ExpenseData[]).unshift(data);
      allExpenses.value.sort((a: any, b: any) => new Date(b.date).getDate() - new Date(a.date).getDate());
      await filterExpenses();
    }

    const filterExpenses = async (): Promise<void> => {
      const typeFilter = createTypeFilter(selectedType.value);
      const dateFilter = createDateFilter(selectedPeriod.value);
  
      filteredArr.value = allExpenses.value.filter((expense: ExpenseData) => {
          const typeCondition = selectedType.value ? typeFilter(expense.type) : true;
          const dateConditon = (selectedPeriod.value!='No period of time' && selectedPeriod.value != '') ? dateFilter(expense.date) : true;
          return typeCondition && dateConditon;
      })
    }
    
    const createTypeFilter = (type: number): Function => {
      return (value: number) => value === type;
    }
  
    const createDateFilter = (period: string): Function => {
      return (date: any) => new Date(date) >= getPeriodLimit(period);
    }

    const getPeriodLimit = (period: string): any => {
      const now = new Date();

      switch (period) {
          case 'Today':
              return new Date(now.getFullYear(), now.getMonth(), now.getDate());
          case 'Last Week':
              return new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 6);
          case 'Last Month':
              return new Date(now.getFullYear(), now.getMonth() - 1, 1);
          case 'Last Year':
              return new Date(now.getFullYear() - 1, 0, 1);
      }
    }

    const setFilters = async (type: number, period: string): Promise<void> => {
      selectedType.value = type;
      selectedPeriod.value = period;
    }
  
    return {loadAllExpenses, allExpenses, page, canLoadMore, addExpense, loadMoreExpenses, filterExpenses, filteredArr, setFilters }
})