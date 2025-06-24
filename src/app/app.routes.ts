import { Routes } from '@angular/router';
import { PeriodTableComponent } from './pages/period-table/period-table.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: PeriodTableComponent }
];
