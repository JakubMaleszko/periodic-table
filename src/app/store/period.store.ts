import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
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
    { providedIn: 'root' },
    withState(initialPeriodState),
    withMethods(
        (store, periodService = inject(PeriodService)) => ({
            async getAll() {
                patchState(store, { loading: true });
                const periods = await periodService.getAll();
                patchState(store, { period: periods, loading: false });
            },

            async edit(id: any, parameter: any, newValue: any) {
                await periodService.edit(id, parameter, newValue);
                patchState(store, (state) => {
                    return {
                        period: state.period.map(item =>
                            item.position === id ? { ...item, [parameter]: newValue } : item
                        )
                    }
                })
            }
        })
    )
)