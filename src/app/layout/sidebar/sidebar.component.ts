import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CoreQuery } from '@app/core/state/core.query';
import { AuthService } from '@app/core/auth/auth.service';
import { UserInterface } from '@shared/models/user.interface';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import { takeUntil } from 'rxjs';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { ConfirmModalComponent } from '@shared/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent extends UnsubscribeAbstract implements OnInit, OnChanges {
  @Input() user: UserInterface | null = null;
  @Input() showNavbar: boolean = true;
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>();
  userName$ = this.coreQuery.userName$;
  language = 'ua';
  date = new Date;
  nextEmailDate = new Date();

  constructor (
    private coreQuery: CoreQuery,
    private authService: AuthService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['user'].currentValue) {
      const user: UserInterface = changes['user'].currentValue;
      if (!user.verified) {
        this.updateNextEmailDate(user.verificationDate);
      }
    }
  }

  ngOnInit (): void {
    this.language = this.translate.currentLang;
    // if (!this.coreQuery.tokenExpired) {
    //   // this.userName = this.coreQuery.userName;
    // }
  }

  onChangeLang () {
    this.changeLang.emit();
    this.language === environment.defaultLocale ? this.language = environment.locales.en
      : this.language = environment.defaultLocale;
  }

  logout () {
    this.authService.logout();
    window.location.reload();
  }

  objectLength (obj: { [key: string]: string }): number {
    return Object.keys(obj).length;
  }

  timeToResendMail (): { minutes: number, seconds: number } {
    const timeDiff = Math.abs(this.nextEmailDate.getTime() - this.date.getTime()) / 1000;
    return {
      minutes: Math.round(timeDiff / 60),
      seconds: Math.round(timeDiff % 60)
    };
  }

  updateDate () {
    this.date = new Date();
  }

  resendEmail () {
    this.authService.resendEmail().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(user => {
      this.dialog.open(ConfirmModalComponent, {
        data: {title: this.translate.instant('Notifications.success'), text: this.translate.instant('Notifications.emailResent')},
        maxHeight: '90vh'
      });
      this.updateNextEmailDate(user.verificationDate);
    })
  }

  private updateNextEmailDate(nextDate: Date) {
    const date = new Date(nextDate);
    this.nextEmailDate = new Date(date.setHours(date.getHours() + 1));
  }
}
