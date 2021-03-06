import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Core } from './core.model';
import { NavigatorInterface } from '@shared/models/navigator.interface';
import { UserTokenInterface } from '@shared/models/user.interface';

export interface CoreState extends EntityState<Core> {
  navigator: NavigatorInterface,
  userTokenData: UserTokenInterface,
  isAuthenticated: boolean
}

const initState: Partial<CoreState> = {
  isAuthenticated: false,
  userTokenData: {
    name: null,
    email: null,
    expirationDate: null,
    tokenExpired: true
  }
};

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'core'})
export class CoreStore extends EntityStore<CoreState> {

  constructor () {
    super(initState);
  }


}
