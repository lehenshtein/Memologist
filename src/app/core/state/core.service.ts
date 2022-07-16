import { Injectable } from '@angular/core';
import { CoreStore } from './core.store';
import { NavigatorInterface } from '@shared/models/navigator.interface';
import { UserTokenInterface } from '@shared/models/user.interface';

@Injectable({ providedIn: 'root' })
export class CoreService {

  constructor(private coreStore: CoreStore) {
  }

  addNavigator(navigator: NavigatorInterface) {
    this.coreStore.update({navigator});
  }
  addUserTokenData(userTokenData: UserTokenInterface) {
    this.coreStore.update({userTokenData});
  }
  addAuthenticated(isAuthenticated: boolean) {
    this.coreStore.update({isAuthenticated});
  }
}
