export interface SelectedWidget {
    name: string,
    component: any,
    widgetId: number,
    availableAreas: number[],
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
}

export interface NoteData {
  title: string;
  date: any;
  note: string;
  isImportant: boolean;
}

export enum ModalType {
  add = "ADD",
  remove = "REMOVE"
}