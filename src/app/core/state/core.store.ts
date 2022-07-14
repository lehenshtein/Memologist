import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Core } from './core.model';
import { NavigatorInterface } from '@shared/models/navigator.interface';

export interface CoreState extends EntityState<Core> {
  navigator: NavigatorInterface
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'core' })
export class CoreStore extends EntityStore<CoreState> {

  constructor() {
    super();
  }

}
