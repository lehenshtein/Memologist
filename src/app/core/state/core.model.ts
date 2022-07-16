import { NavigatorInterface } from '@shared/models/navigator.interface';
import { UserTokenInterface } from '@shared/models/user.interface';

export interface Core {
  navigator: NavigatorInterface,
  userTokenData: UserTokenInterface,
  isAuthenticated: boolean
}
