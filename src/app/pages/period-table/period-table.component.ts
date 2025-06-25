import { Component, inject, OnInit, signal } from '@angular/core';
import { PeriodStore } from '../../store/period.store';
import { PeriodicElement } from '../../types';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-period-table',
  imports: [MatTableModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './period-table.component.html',
  styleUrl: './period-table.component.scss'
})
export class PeriodTableComponent implements OnInit {
  readonly store = inject(PeriodStore)
  readonly dialog = inject(MatDialog)
  dataSource = this.store.period;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit(): void {
    this.store.getAll()
  }

  editCell(element: PeriodicElement, column: string) {
    console.log(column, element);
    const dialogWindow = this.dialog.open(PeriodTableDialogComponent, {
      data: { column, element },
    });

  }
}


// {{ Dialog component }}
interface DialogData {
  column: string;
  element: PeriodicElement;
}
@Component({
  selector: 'app-period-table-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './period-table-dialog.component.html',
})
export class PeriodTableDialogComponent {
  readonly store = inject(PeriodStore)
  readonly dialog = inject(MatDialogRef<PeriodTableDialogComponent>)
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  exit(): void {
    this.dialog.close();
  }
  confirm(newValue: string) {
    this.store.edit(this.data.element.position, this.data.column.toLowerCase(), newValue);
    this.dialog.close();
  };
}
