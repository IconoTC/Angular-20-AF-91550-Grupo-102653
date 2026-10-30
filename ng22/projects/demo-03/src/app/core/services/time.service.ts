import { Injectable, Service } from '@angular/core';

// Formato previo hasta Angular 21
@Injectable({
  providedIn: 'root',
})
export class TimeServiceOld {}

// Formato actual
@Service()
export class TimeService {

  readonly #time = new Date();

  getTime() {
    return this.#time.getTime();
  } 

}
