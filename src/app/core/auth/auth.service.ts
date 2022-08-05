import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  UserInterface,
  UserLoginInterface,
  UserRegisterInterface,
  UserTokenInterface
} from '@shared/models/user.interface';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CoreService } from '@app/core/state/core.service';
import { PostsStore } from '@app/main/state/posts.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private token: string | null = null;

  constructor (private http: HttpClient, private coreService: CoreService, private postsStore: PostsStore) {
  }

  register (data: UserRegisterInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/auth/register`, data).pipe(
      tap(({token}) => {
        this.setAllUserData(token);
        this.postsStore.reset();
      })
    );
  }
  verify (code: string): Observable<null> {
    return this.http.get<null>(`/auth/verification/${code}`);
  }

  login (data: UserLoginInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/auth/login`, data).pipe(
      tap(({token}) => {
        this.setAllUserData(token);
        this.postsStore.reset();
      })
    );
  }

  setAllUserData (token: string | null) {
    this.setToken = token;
    this.setAuthentication();
    this.updateStoreUserToken(token);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.getUser().pipe(take(1)).subscribe(res => {
        this.coreService.addUserData(res);
      });
    }
    if (token) {
      localStorage.setItem('auth-token', token);
    }
  }

  setAuthentication (): void {
    let isExpired = true;
    if (this.getToken) {
      isExpired = this.jwtHelper.isTokenExpired(this.getToken);
    }
    this.coreService.addAuthenticated(!isExpired);
  }

  updateStoreUserToken (token: string | null) {
    let data: UserTokenInterface;
    if (token) {
      data = {
        name: this.jwtHelper.decodeToken(token).name,
        email: this.jwtHelper.decodeToken(token).email,
        expirationDate: this.jwtHelper.getTokenExpirationDate(token),
        tokenExpired: this.jwtHelper.isTokenExpired(token)
      };
    } else {
      data = {
        name: null,
        email: null,
        expirationDate: null,
        tokenExpired: true
      };
    }
    this.coreService.addUserTokenData(data);
  }

  getUser (): Observable<UserInterface | null> {
    if (this.getToken && !this.jwtHelper.isTokenExpired(this.getToken)) {
      return this.http.get<UserInterface>(`/user`);
    }
    return of(null);
  }

  set setToken (token: string | null) {
    this.token = token;
  }

  get getToken (): string | null {
    return this.token;
  }

  logout () {
    this.setToken = null;
    localStorage.removeItem('auth-token');
    this.setAllUserData(null);
    this.postsStore.reset();
  }

}
