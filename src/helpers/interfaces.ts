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