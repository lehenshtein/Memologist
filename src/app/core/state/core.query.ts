import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoreStore, CoreState } from './core.store';

@Injectable({ providedIn: 'root' })
export class CoreQuery extends QueryEntity<CoreState> {

  constructor(protected store: CoreStore) {
    super(store);
  }
  get navigator() {
    return this.getValue().navigator;
  }
  navigator$ = this.select(store => store.navigator);
}
