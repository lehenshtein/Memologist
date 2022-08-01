import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import { CoreQuery } from '@app/core/state/core.query';
import { environment } from '@environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor (private authService: AuthService, private coreQuery: CoreQuery, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.coreQuery.tokenExpired && this.authService.getToken){
      this.authService.logout();
    }

    if (this.coreQuery.isAuthenticated && this.authService.getToken) {
      request = request.clone({
        setHeaders: {
          authorization: this.authService.getToken
        }
      });
    }
    const requestForStatic = !(request.url.slice(0, 8).indexOf('/assets/') === -1);
    const swRequest = !(request.url.indexOf('ngsw') === -1);

    if (!isPlatformBrowser(this.platformId) && swRequest) {
      return EMPTY; // disabling taking manifest on server
    }
    // console.log(request.url); // leave this for future debug
    // console.log('env url', environment.apiUrl);
    // console.log('env', environment.type);
    // console.log(request);

    request = request.clone({
      url: request.url.indexOf('http://') === -1 && request.url.indexOf('https://') === -1 && !requestForStatic
        ? environment.apiUrl + request.url : request.url
    });
    // console.log(request.url);


    return next.handle(request);
  }
}
