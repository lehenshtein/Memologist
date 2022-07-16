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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private coreQuery: CoreQuery) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.coreQuery.isAuthenticated && this.authService.getToken) {
      request = request.clone({
        setHeaders: {
          authorization: this.authService.getToken
        }
      })
    }
    return next.handle(request);
  }
}
