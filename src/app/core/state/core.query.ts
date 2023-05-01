import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoreStore, CoreState } from './core.store';
import { roles, UserInterface, UserTokenInterface } from '@shared/models/user.interface';
import { NavigatorInterface } from '@shared/models/navigator.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoreQuery extends QueryEntity<CoreState> {

  constructor(protected store: CoreStore) {
    super(store);
  }
  userData$: Observable<UserInterface | null> = this.select(store => store.userData);

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
  get userData(): UserInterface | null {
    return this.getValue().userData;
  }
  get tokenExpired(): boolean {
    return this.userTokenData.tokenExpired;
  }
  get userName(): string | null {
    return this.userTokenData.name;
  }
  userName$ = this.select(store => store.userTokenData.name);
  userRole$ = this.select(store => store.userData?.role);
  userMode$ = this.select(store => store.userMode);

  get isBrowser(): boolean {
    return this.getValue().isBrowser; // check for Angular Universal, if app running on back or front
  }

  search$ = this.select(store => store.search);

}
