import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { PeriodStore } from '../../store/period.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-period-table',
  imports: [MatTableModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './period-table.component.html',
  styleUrl: './period-table.component.scss'
})
export class PeriodTableComponent implements OnInit {
  store = inject(PeriodStore)
  ngOnInit(): void {
    this.store.getAll()
  }
  dataSource = this.store.period;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
}
