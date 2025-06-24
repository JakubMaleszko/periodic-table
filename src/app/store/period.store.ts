import {signalStore, withState} from '@ngrx/signals'
import { PeriodicElement } from "../types";

type PeriodState = {
    period: PeriodicElement[];
    loaded: boolean;
    filter: string;
};

const initialPeriodState: PeriodState = {
    period: [],
    loaded: false,
    filter: ''
};

export const PeriodStore = signalStore(
    withState(initialPeriodState)
)