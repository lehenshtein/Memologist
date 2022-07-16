import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoreStore, CoreState } from './core.store';
import { UserTokenInterface } from '@shared/models/user.interface';
import { NavigatorInterface } from '@shared/models/navigator.interface';

@Injectable({ providedIn: 'root' })
export class CoreQuery extends QueryEntity<CoreState> {

  constructor(protected store: CoreStore) {
    super(store);
  }
  get navigator(): NavigatorInterface {
    return this.getValue().navigator;
  }
  navigator$ = this.select(store => store.navigator);
  get isAuthenticated(): boolean {
    return this.getValue().isAuthenticated;
  }
  get userTokenData(): UserTokenInterface {
    return this.getValue().userTokenData;
  }
  get tokenExpired(): boolean {
    return this.userTokenData.tokenExpired;
  }
  get userName(): string | null {
    return this.userTokenData.name;
  }
  userName$ = this.select(store => store.userTokenData.name)
}
