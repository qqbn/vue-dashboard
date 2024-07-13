export interface SelectedWidget {
    name: string,
    component: any,
    widgetId: number,
    availableAreas: number[],
    widgetData?: any;
  }
  
export interface SelectedWidgets {
    [key: string]: SelectedWidget | null,
  }

export interface SavedWidget {
  area: number,
  id: number,
}

export interface WidgetProps {
  data?: SelectedWidget,
  area: number,
}

export interface ChartProps {
  value: number[],
  selectedTime?: string | null 
  selectedType: number,
}

export interface NoteData {
  id: number,
  title: string;
  date: any;
  content: string;
  important: boolean;
}

export interface TaskData {
  id: number,
  content: string;
  done: boolean;
  index?: number;
  added_to_dashboard: boolean;
}

export interface RemindData {
  id: number,
  name: string,
  date: any,
}

export interface ContactData {
  id: number,
  first_name: string,
  last_name: string,
  phone_number: string,
  email: string,
  avatar: number | null,
  added_to_dashboard: boolean,
}

export interface ExpenseData {
  id: number,
  title: string,
  value: number,
  type: number,
  date: any,
}

export interface RemoveData {
  id: number | null,
  type: number | null,
  endpoint: string,
}

export enum ModalType {
  add = "ADD",
  remove = "REMOVE"
}
