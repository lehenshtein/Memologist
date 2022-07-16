import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { UserLoginInterface, UserRegisterInterface, UserTokenInterface } from '@shared/models/user.interface';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CoreService } from '@app/core/state/core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private token: string | null = null;

  constructor(private http: HttpClient, private coreService: CoreService) { }
  register(data: UserRegisterInterface): Observable<{token: string}> {
    console.log(data);
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap(({token}) => {
        this.setAllUserData(token)
      })
    );
  }

  login(data: UserLoginInterface): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap(({token}) => {
        this.setAllUserData(token)
      })
    );
  }

  setAllUserData(token: string | null) {
    this.setAuthentication();
    this.updateStoreUserToken(token);
    if (token) {
      localStorage.setItem('auth-token', token);
    }
    this.setToken = token;
  }

  setAuthentication(): void {
    let isExpired = true;
    if (this.getToken) {
      isExpired = this.jwtHelper.isTokenExpired(this.getToken);
    }
    this.coreService.addAuthenticated(!isExpired);
  }

  updateStoreUserToken(token: string | null) {
    let data: UserTokenInterface;
    if (token) {
      data = {
        name: this.jwtHelper.decodeToken(token).name,
        email: this.jwtHelper.decodeToken(token).email,
        expirationDate: this.jwtHelper.getTokenExpirationDate(token),
        tokenExpired: this.jwtHelper.isTokenExpired(token)
      }
    } else {
      data = {
        name: null,
        email: null,
        expirationDate: null,
        tokenExpired: true
      }
    }
    this.coreService.addUserTokenData(data);
  }

  set setToken(token: string | null) {
    this.token = token;
  }
  get getToken(): string | null {
    return this.token;
  }


  logout() {
    this.setToken = null;
    localStorage.removeItem('auth-token');
    this.setAllUserData(null);
  }


  // const decodedToken = helper.decodeToken(myRawToken);
  // const expirationDate = helper.getTokenExpirationDate(myRawToken);

}
