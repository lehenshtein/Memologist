import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import { CoreQuery } from '@app/core/state/core.query';
import { environment } from '@environment/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor (private authService: AuthService, private coreQuery: CoreQuery) {
  }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.coreQuery.isAuthenticated && this.authService.getToken) {
      request = request.clone({
        setHeaders: {
          authorization: this.authService.getToken
        }
      });
    }

    const requestForStatic = !(request.url.slice(0, 8).indexOf('/assets/') === -1);

    request = request.clone({
      url: request.url.indexOf('http://') === -1 && request.url.indexOf('https://') === -1 && !requestForStatic
        ? environment.apiUrl + request.url : request.url
    });


    return next.handle(request);
  }
}
