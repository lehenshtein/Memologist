import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { UserLoginInterface, UserRegisterInterface } from '@shared/models/user.interface';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { takeUntil } from 'rxjs';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '@shared/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

export type authPagesTypes = 'sign-in' | 'sign-up' | 'verification';

@Component({
  selector: 'app-sign-in.main-content-size',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends UnsubscribeAbstract {
  page: authPagesTypes = 'sign-in';
  verificationCode: string | undefined = undefined;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    super();
    this.page = (this.route.routeConfig?.path?.split('/')[0] || 'sign-in') as authPagesTypes;
    this.verificationCode = this.route.snapshot.params['code'];
  }

  login(data: UserLoginInterface) {
    this.authService.login(data).pipe(
      takeUntil(this.ngUnsubscribe$),
    ).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  register(data: UserRegisterInterface) {
    this.authService.register(data).pipe(
      takeUntil(this.ngUnsubscribe$),
    ).subscribe(() => {
      this.notificationService.openSnackBar('info',
        this.translate.instant('Notifications.registered'), this.translate.instant('Notifications.success'));
      this.router.navigate(['/']);
    })
  }

  verify ({verificationCode}: { verificationCode: string }) {
    this.authService.verify(verificationCode).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(() => {
      this.dialog.open(ConfirmModalComponent, {
        data: {title: this.translate.instant('Notifications.success'), text: this.translate.instant('Notifications.verified')},
        maxHeight: '90vh'
      });
      this.router.navigate(['/'])
    })
  }
}
