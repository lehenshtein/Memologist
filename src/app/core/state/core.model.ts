import { NavigatorInterface } from '@shared/models/navigator.interface';
import { roles, UserInterface, UserTokenInterface } from '@shared/models/user.interface';

export interface Core {
  navigator: NavigatorInterface,
  userTokenData: UserTokenInterface,
  isAuthenticated: boolean,
  userData: UserInterface | null,
  isBrowser: boolean,
  userMode: roles
}
