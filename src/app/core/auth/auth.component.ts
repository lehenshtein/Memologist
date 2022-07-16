import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { UserLoginInterface, UserRegisterInterface } from '@shared/models/user.interface';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { catchError, takeUntil, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export type authPagesTypes = 'sign-in' | 'sign-up';

@Component({
  selector: 'app-sign-in.main-content-size',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends UnsubscribeAbstract implements OnInit {
  page: authPagesTypes = 'sign-in';
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router ) {
    super();
    this.route.routeConfig?.path === 'sign-up' ? this.page = 'sign-up' : this.page = 'sign-in';
  }

  ngOnInit(): void {

  }
  login(data: UserLoginInterface) {
    this.authService.login(data).pipe(
      takeUntil(this.ngUnsubscribe$),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    ).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
  register(data: UserRegisterInterface) {
    this.authService.register(data).pipe(
      takeUntil(this.ngUnsubscribe$),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    ).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
