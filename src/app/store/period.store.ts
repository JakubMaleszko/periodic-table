import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { PeriodicElement } from "../types";
import { PeriodService } from '../period.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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

    withComputed((store) => ({
        filtered: computed(() => {
            const query = store.filter().toLowerCase().trim();
            if (!query) {
                return store.period();
            }
            return store.period().filter(item =>
                Object.values(item).some(value =>
                    value?.toString().toLowerCase().includes(query)
                )
            );
        })
    })),

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
            },
            async setFilter(filter: string) {
                patchState(store, { filter: filter });
            }
        })
    )
)