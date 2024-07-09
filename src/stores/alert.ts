import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {    
    const alertModel = ref<boolean>(false);
    const alertMessage = ref<string>('');
    const timeout = ref<number>(1000);

    const showAlert = (message: string):void => {
        alertModel.value = true;
        alertMessage.value = message;
    }
  
    return {showAlert, alertModel, alertMessage, timeout}
})
