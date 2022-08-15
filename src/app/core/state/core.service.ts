import { Injectable } from '@angular/core';
import { CoreStore } from './core.store';
import { NavigatorInterface } from '@shared/models/navigator.interface';
import { roles, UserInterface, UserTokenInterface } from '@shared/models/user.interface';

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
  addUserData(userData: UserInterface | null) {
    this.coreStore.update({userData});
  }
  setIsBrowser(isBrowser: boolean) {
    this.coreStore.update({isBrowser});
  }
  setUserMode(userMode: roles) {
    this.coreStore.update({userMode});
  }
}
