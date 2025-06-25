import {patchState, signalStore, withMethods, withState} from '@ngrx/signals'
import { PeriodicElement } from "../types";
import { PeriodService } from '../period.service';
import { inject } from '@angular/core';

type PeriodState = {
    period: PeriodicElement[];
    loading: boolean;
    filter: string;
};

const initialPeriodState: PeriodState = {
    period: [],
    loading: false,
    filter: ''
};

export const PeriodStore = signalStore(
    {providedIn: 'root'},
    withState(initialPeriodState),
    withMethods(
        (store, periodService = inject(PeriodService)) => ({
            async getAll() {
                 patchState(store, {loading: true});
                 const periods = await periodService.getAll();
                 patchState(store, {period: periods, loading: false});
            }
        })
    )
)