import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, throttleTime } from 'rxjs/operators';
import { navigatorHelper } from '@shared/helpers/navigator.helper';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CoreService } from '@app/core/state/core.service';
import { AuthService } from '@app/core/auth/auth.service';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { Observable, shareReplay, takeUntil } from 'rxjs';
import { CoreQuery } from '@app/core/state/core.query';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { UserInterface } from '@shared/models/user.interface';
import { InfiniteScrollService } from '@shared/services/infinite-scroll.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends UnsubscribeAbstract implements OnInit, AfterViewInit {
  @ViewChild('scrollable') scrollable!: MatDrawerContainer;
  @ViewChild('test') test!: ElementRef;
  updateMessage = this.translate.instant('Messages.update');
  showFiller = false;
  showSidebar = true;
  showNavbar = true;
  showToTop = false;
  user$: Observable<UserInterface | null> = this.coreQuery.userData$.pipe(shareReplay());

  constructor (private swUpdate: SwUpdate,
                public translate: TranslateService,
                private breakpointObserver: BreakpointObserver,
                private coreService: CoreService,
                private coreQuery: CoreQuery,
                private authService: AuthService,
                private ref: ChangeDetectorRef,
                private infiniteScrollService: InfiniteScrollService,
                @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
  }

  ngOnInit (): void {
    this.coreService.setIsBrowser(isPlatformBrowser(this.platformId));
    this.isLoggedIn();
    if (this.coreQuery.isBrowser) {
      (async () => {
        this.coreService.addNavigator(await navigatorHelper());
      })();
    }
    this.resize();
    this.translate.use(environment.defaultLocale);
    this.translateMsg();
    this.checkSw();
  }

  ngAfterViewInit (): void {
    this.scrollable.scrollable.elementScrolled().pipe(
      throttleTime(20),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(res => {
      const scrollElement = this.scrollable.scrollable.getElementRef().nativeElement;
      this.showToTop = scrollElement.scrollTop > 1000;

      this.infiniteScroll(scrollElement);

      this.ref.detectChanges();
    });
    //scrollToTest
    // setTimeout(() => {this.test.nativeElement.scrollIntoView({block: 'center', behavior: 'smooth'})}, 2000)
  }
  scrollToTop() {
    this.scrollable.scrollable.getElementRef().nativeElement.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  private infiniteScroll(scrollElement: HTMLElement) {
    // we need to add clientHeight to scrollTop to get correct values of scrolled from top pixels
    const percentsToBot = (scrollElement.scrollHeight - (scrollElement.scrollTop + scrollElement.clientHeight)) / scrollElement.scrollHeight * 100;
    if (!this.infiniteScrollService.getPreviousScroll) {
      this.infiniteScrollService.setPreviousScroll = percentsToBot;
    }

    if (percentsToBot <= 30 && (this.infiniteScrollService.getPreviousScroll
        && this.infiniteScrollService.getPreviousScroll > percentsToBot)
      && !this.infiniteScrollService.wasOnLoadPosition) {

      this.infiniteScrollService.setPreviousScroll = percentsToBot;
      this.infiniteScrollService.setScrollToBottom(Math.floor(percentsToBot));
      this.infiniteScrollService.wasOnLoadPosition = true;

    }
  }

  onChangeLang (): void {
    if (this.translate.currentLang === environment.defaultLocale) {
      this.translate.use(environment.locales.en);
      return;
    }
    this.translate.use(environment.defaultLocale);
  }

  private isLoggedIn () {
    if (!this.coreQuery.isBrowser) {
      return;
    }
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken) {
      this.authService.setAllUserData(potentialToken);
    }
  };

  private resize () {
    this.breakpointObserver.observe([
      '(max-width: 900px)',
      '(max-width: 1090px)'
    ]).subscribe((result: BreakpointState) => {
      if (result.breakpoints['(max-width: 1090px)']) {
        this.showSidebar = false;
        this.showNavbar = false;
      } else {
        this.showSidebar = true;
        this.showNavbar = true;
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
    ).subscribe(() => {
      if (confirm(this.updateMessage)) {
        window.location.reload();
      }
    });
  }
}
