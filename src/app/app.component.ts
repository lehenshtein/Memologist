import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, throttleTime } from 'rxjs/operators';
import { navigatorHelper } from '@shared/helpers/navigator.helper';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CoreService } from '@app/core/state/core.service';
import { AuthService } from '@app/core/auth/auth.service';
import { MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollable') scrollable!: MatDrawerContainer;
  updateMessage = this.translate.instant('Messages.update');
  showFiller = false;
  showSidebar = true;
  showToTop = false;

  constructor (private swUpdate: SwUpdate,
                public translate: TranslateService,
                private breakpointObserver: BreakpointObserver,
                private coreService: CoreService,
                private authService: AuthService,
                private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
    this.isLoggedIn();
    (async () => {
      this.coreService.addNavigator(await navigatorHelper());
    })();
    this.resize();
    this.translate.use(environment.defaultLocale);
    this.translateMsg();
    this.checkSw();
  }

  ngAfterViewInit (): void {
    this.scrollable.scrollable.elementScrolled().pipe(
      throttleTime(300)
    ).subscribe(res => {
      this.showToTop = this.scrollable.scrollable.getElementRef().nativeElement.scrollTop > 1000;
      this.ref.detectChanges();
    });
  }
  scrollToTop() {
    this.scrollable.scrollable.getElementRef().nativeElement.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  onChangeLang (): void {
    if (this.translate.currentLang === environment.defaultLocale) {
      this.translate.use(environment.locales.en);
      return;
    }
    this.translate.use(environment.defaultLocale);
  }

  private isLoggedIn () {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken) {
      this.authService.setToken = potentialToken;
      this.authService.updateStoreUserToken(potentialToken);
      this.authService.setAuthentication();
    }
  };

  private resize () {
    this.breakpointObserver.observe([
      '(max-width: 900px)',
      '(max-width: 1024px)'
    ]).subscribe((result: BreakpointState) => {
      if (result.breakpoints['(max-width: 1024px)']) {
        this.showSidebar = false;
        // hide stuff
      } else {
        this.showSidebar = true;
        // show stuff
      }
    });
  }

  private translateMsg (): void {
    this.translate.stream('Messages').subscribe(() => {
      this.updateMessage = this.translate.instant('Messages.update');
    });
  }

  private checkSw (): void {
    if (!this.swUpdate.isEnabled) {//if no service worker
      return;
    }
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      // map(evt => ({
      //   type: 'UPDATE_AVAILABLE',
      //   current: evt.currentVersion,
      //   available: evt.latestVersion,
      // }))
    ).subscribe(res => {
      console.log(res);
      if (confirm(this.updateMessage)) {
        window.location.reload();
      }
    });
  }
}
