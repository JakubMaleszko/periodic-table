export interface PeriodicElement {
    position: number;
    name: string;
    weight: number;
    symbol: string;
}

export interface DialogData {
  column: string;
  element: PeriodicElement;
}