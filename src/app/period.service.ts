import { Injectable } from '@angular/core';
import { ELEMENT_DATA } from './data';
import { PeriodicElement } from './types';

// {{ For simulating delay from downloading data from backend}}
async function sleep(delay: number) {
  return new Promise(
    resolve => setTimeout(resolve, delay)
  )
}

@Injectable({
  providedIn: 'root'
})

// {{ Service with simulated backend  }}
export class PeriodService {
  async getAll() {
    await sleep(1000);
    return ELEMENT_DATA;
  }
}
